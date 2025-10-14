import chalk from "chalk";
import config from "../Config/config";
import { TCredentialFormat, TCredentialTemplateOfferPayload } from "../types";
import logger from "../utils/logger";
import qrcode from "qrcode-terminal";
/**
 * Creates a credential offer for a specified tenant.
 *
 * @param tenantId - The unique identifier of the tenant.
 * @param payload - (Optional) The payload containing credential values and other offer details.
 * @param format - (Optional) The credential format (e.g., "jsonld"). Defaults to "jsonld" if not provided.
 * @returns A promise that resolves to the response data from the credential offer creation API.
 *
 * @remarks
 * - If `payload` or `payload.credentialValues` is not provided, a default payload with a sample `firstName` is used.
 * - Logs the endpoint and payload for debugging.
 * - Throws an error if the API response is not successful.
 * - Logs the successful creation of the credential offer.
 * - Returns an error object if the operation fails.
 */
export async function createCredentialOffer(
  tenantId: string,
  payload?: TCredentialTemplateOfferPayload,
  format?: TCredentialFormat
) {
  const endpoint = `${config.base_url}/credential/${format || "jsonld"}/offer`;
  let defaultPayload = {};
  if (!payload || !payload.credentialValues) {
    defaultPayload = {
      credentialValues: { fullName: "Hovi Joe", employeeId: "12345" },
    };
  }
  const ecosystemName = config.api_key?.split("-")[0];
  if (
    payload?.holderDid &&
    (ecosystemName === "openId" || ecosystemName === "privado-id")
  ) {
  }
  const finalPayload = { ...defaultPayload, ...payload };
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "x-tenant-id": tenantId,
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.api_key}`,
      },
      body: JSON.stringify(finalPayload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(
      chalk.bold.green("\n✅ Credential Offer Created Successfully!")
    );
    // console.log(chalk.magentaBright("\n📱 Scan this QR code:\n"));
    // qrcode.generate(data.response.credentialOfferUri, { small: true });

    console.log(chalk.gray("\n-------------------------------------------\n"));
    return data;
  } catch (error: any) {
    console.error(`Error creating ${format} credential offer:`, error.message);
    return { success: false, message: error.message };
  }
}
