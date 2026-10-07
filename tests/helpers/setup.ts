import "dotenv/config"
import { vi } from "vitest"

process.env.BETTER_AUTH_SECRET ??= "test-secret-that-is-long-enough-for-tests-0123456789"
process.env.IP_HASH_SECRET ??= "test-ip-hash-secret"
// Integration tests use TEST_DATABASE_URL so they never touch a development or production database.
if (process.env.TEST_DATABASE_URL) process.env.DATABASE_URL = process.env.TEST_DATABASE_URL
// Never send real email from tests.
delete process.env.SMTP_HOST

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.7" }),
  cookies: async () => ({ get: () => undefined, getAll: () => [], set: () => {}, delete: () => {} }),
}))
