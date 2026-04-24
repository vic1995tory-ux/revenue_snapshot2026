import crypto from "crypto";

const SCRYPT_KEYLEN = 64;
const SCRYPT_OPTIONS = {
  N: 16384,
  r: 8,
  p: 1,
  maxmem: 32 * 1024 * 1024,
} as const;

export type PasswordVersion = "scrypt-v1";

export type PasswordRecord = {
  password_hash: string;
  password_salt: string;
  password_version: PasswordVersion;
};

function normalizePassword(value: string) {
  return value.normalize("NFKC");
}

function scryptHex(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(
      normalizePassword(password),
      salt,
      SCRYPT_KEYLEN,
      SCRYPT_OPTIONS,
      (error, derivedKey) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(derivedKey.toString("hex"));
      }
    );
  });
}

export async function createPasswordRecord(password: string): Promise<PasswordRecord> {
  const password_salt = crypto.randomBytes(16).toString("hex");
  const password_hash = await scryptHex(password, password_salt);

  return {
    password_hash,
    password_salt,
    password_version: "scrypt-v1",
  };
}

export async function derivePasswordAttempt(
  password: string,
  passwordSalt: string,
  passwordVersion: string
): Promise<PasswordRecord> {
  if (passwordVersion !== "scrypt-v1") {
    throw new Error("Unsupported password version.");
  }

  if (!/^[a-f0-9]{32}$/i.test(passwordSalt)) {
    throw new Error("Invalid password salt.");
  }

  return {
    password_hash: await scryptHex(password, passwordSalt),
    password_salt: passwordSalt,
    password_version: "scrypt-v1",
  };
}
