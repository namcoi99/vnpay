import crypto from "crypto";

export const buildSearchParams = (params: Record<string, unknown>) => {
  const searchParams = new URLSearchParams();
  const sortedParams = Object.entries(params).sort(([key1], [key2]) =>
    key1.toString().localeCompare(key2.toString())
  );
  for (const [key, value] of sortedParams) {
    // Skip empty value
    if (value === "" || value === undefined || value === null) {
      continue;
    }
    searchParams.append(key, value.toString());
  }
  return searchParams;
};

export function generateSecureHash(data: string, secretKey: string) {
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(data, "utf-8")).digest("hex");
  return signed;
}
