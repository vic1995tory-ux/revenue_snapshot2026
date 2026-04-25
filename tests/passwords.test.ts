import { describe, expect, it } from "vitest";
import {
  createPasswordRecord,
  derivePasswordAttempt,
} from "../lib/passwords";

describe("password hashing", () => {
  it("creates a scrypt password record", async () => {
    const record = await createPasswordRecord("CorrectHorseBatteryStaple123");

    expect(record.password_version).toBe("scrypt-v1");
    expect(record.password_hash).toMatch(/^[a-f0-9]{128}$/i);
    expect(record.password_salt).toMatch(/^[a-f0-9]{32}$/i);
  });

  it("derives the same hash for the same password and salt", async () => {
    const record = await createPasswordRecord("StrongPass123");
    const attempt = await derivePasswordAttempt(
      "StrongPass123",
      record.password_salt,
      record.password_version
    );

    expect(attempt.password_hash).toBe(record.password_hash);
  });

  it("derives a different hash for the wrong password", async () => {
    const record = await createPasswordRecord("StrongPass123");
    const attempt = await derivePasswordAttempt(
      "WrongPass123",
      record.password_salt,
      record.password_version
    );

    expect(attempt.password_hash).not.toBe(record.password_hash);
  });
});
