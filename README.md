# Playwright CLI

Command-line interface for automated browser testing with Playwright.

## Prerequisites

- Node.js 18+
- npm or yarn

## Setup

### 1. Install Dependencies

```bash
npm install
```

This installs:
- `@playwright/test` — Playwright testing framework
- `@playwright/mcp` — Model Context Protocol support for AI integration

### 2. Install Browsers

Playwright needs browser binaries for Chrome, Firefox, WebKit:

```bash
npx playwright install
```

### 3. Verify Installation

```bash
npx playwright --version
```

## Running Tests

```bash
npm test
```

Or use Playwright CLI directly:

```bash
npx playwright test
```

### Common Commands

```bash
# Run tests in headed mode (browser visible)
npx playwright test --headed

# Run specific test file
npx playwright test tests/example.spec.ts

# Run tests in debug mode
npx playwright test --debug

# Generate test report
npx playwright show-report
```

## Project Structure

```
.
├── tests/              # Test files
├── playwright.config.ts # Playwright configuration (optional)
├── package.json        # Dependencies
├── .gitignore          # Git ignore rules
└── README.md          # This file
```

## Configuration

Create `playwright.config.ts` to customize:
- Browser types (chromium, firefox, webkit)
- Parallel execution
- Retries
- Timeouts
- Report generation

Example:
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: { baseURL: 'http://localhost:3000' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
});
```

## Debugging

### UI Mode
```bash
npx playwright test --ui
```

### Inspector
```bash
npx playwright test --debug
```

### Trace Viewer
```bash
npx playwright show-trace trace.zip
```

## Documentation

- [Playwright Docs](https://playwright.dev)
- [API Reference](https://playwright.dev/docs/api/class-page)
- [Best Practices](https://playwright.dev/docs/best-practices)

## Troubleshooting

**Browsers not found:**
```bash
npx playwright install
```

**Port already in use:**
Change `baseURL` in `playwright.config.ts` or kill process using the port.

**Tests timing out:**
Increase timeout in config:
```typescript
use: { navigationTimeout: 30000 }
```
