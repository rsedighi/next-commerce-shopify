// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn:
    SENTRY_DSN ||
    'https://251ec291ba764838b4d86cb8f1310f6d@o867305.ingest.sentry.io/5823706',
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps,
  integrations: [
    new Sentry.Integrations.BrowserTracing({
      // custom options
    }),
  ],
  tracesSampleRate: 1.0,
})
