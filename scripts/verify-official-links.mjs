#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')
const sourcePath = resolve(projectRoot, 'src/data/officialResearch.json')
const jsonReportPath = resolve(projectRoot, 'reports/official-link-check.json')
const markdownReportPath = resolve(projectRoot, 'reports/official-link-check.md')
const timeoutMs = Number(process.env.LINK_CHECK_TIMEOUT_MS ?? 12000)

function todayIso() {
  return new Date().toISOString()
}

async function fetchWithTimeout(url, method) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, {
      method,
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'DessertCafePlannerLinkCheck/1.0' },
    })
    return {
      ok: response.ok,
      method,
      status: response.status,
      statusText: response.statusText,
      finalUrl: response.url,
    }
  } finally {
    clearTimeout(timeout)
  }
}

async function checkUrl(item) {
  const startedAt = todayIso()
  try {
    let result = await fetchWithTimeout(item.url, 'HEAD')
    // 일부 정부/보안 사이트는 HEAD를 막으므로 GET으로 재시도
    if ([403, 405, 406, 429, 500, 501].includes(result.status)) {
      result = await fetchWithTimeout(item.url, 'GET')
    }
    return { ...item, checkedAt: startedAt, ...result, error: null }
  } catch (error) {
    return {
      ...item,
      checkedAt: startedAt,
      ok: false,
      method: 'HEAD/GET',
      status: null,
      statusText: null,
      finalUrl: item.url,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

function toMarkdown(results) {
  const lines = [
    '# 공식 링크 검증 리포트',
    '',
    `- 생성 시각: ${todayIso()}`,
    `- 소스: ${sourcePath}`,
    `- 총 링크: ${results.length}`,
    `- 성공: ${results.filter((item) => item.ok).length}`,
    `- 확인 필요/실패: ${results.filter((item) => !item.ok).length}`,
    '',
    '| 상태 | HTTP | 기관 | 페이지 | 최종 URL | 메모 |',
    '|---|---:|---|---|---|---|',
  ]

  for (const item of results) {
    const status = item.ok ? '✅ OK' : '⚠️ 확인 필요'
    const http = item.status ?? 'ERR'
    const url = `[링크](${item.finalUrl || item.url})`
    const memo = item.error ? `오류: ${item.error}` : item.notes
    lines.push(`| ${status} | ${http} | ${item.agency} | ${item.name} | ${url} | ${String(memo).replaceAll('|', '/')} |`)
  }

  lines.push('', '주의: 이 리포트는 URL 접속 가능성만 확인합니다. 법률/세금/허가/Veteran 혜택 적용 여부는 반드시 공식 기관 또는 전문가에게 재확인해야 합니다.')
  return `${lines.join('\n')}\n`
}

const source = JSON.parse(await readFile(sourcePath, 'utf8'))
const results = []
for (const item of source) {
  results.push(await checkUrl(item))
}

await mkdir(dirname(jsonReportPath), { recursive: true })
await writeFile(jsonReportPath, `${JSON.stringify({ generatedAt: todayIso(), source: sourcePath, results }, null, 2)}\n`)
await writeFile(markdownReportPath, toMarkdown(results))

const failed = results.filter((item) => !item.ok)
console.log(`Official link check complete: ${results.length - failed.length}/${results.length} OK`)
console.log(`JSON: ${jsonReportPath}`)
console.log(`Markdown: ${markdownReportPath}`)
if (failed.length > 0) {
  console.log('Needs review:')
  for (const item of failed) console.log(`- ${item.name}: ${item.status ?? item.error}`)
}
