import { configureAxe } from 'vitest-axe'
import type { AxeResults } from 'axe-core'
import { expect } from 'vitest'
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'

/**
 * axe configured for WCAG Level AA (2.0 / 2.1 / 2.2).
 * Color-contrast rules stay disabled in jsdom (vitest-axe default) —
 * contrast must be verified in a real browser later.
 */
export const axe = configureAxe({
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
  },
})

/**
 * Renders UI into the document and runs WCAG AA checks on the full tree
 * (includes document-level rules such as html-has-lang / document-title).
 */
export async function expectNoA11yViolations(ui: ReactElement): Promise<AxeResults> {
  render(ui)
  const results = await axe(document.documentElement)
  expect(results).toHaveNoViolations()
  return results
}
