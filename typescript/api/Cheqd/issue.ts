import chalk from "chalk";
import { config } from "..";

/**
 * Helper function to post a credential offer.
 * @param tenantId - The tenant's unique identifier.
 * @param payload - The offer payload.
 * @param format - The credential format (jsonld, anoncred).
 * @returns The API response.
 */
async function postCredentialOffer(
  tenantId: string,
  payload: any,
  format: string
) {
  const endpoint = `${config.base_url}/credential/${format}/offer`;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "x-tenant-id": tenantId,
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.api_key}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(
      chalk.bold.green(
        `\n✅ An ${format.toUpperCase()} Credential Offer Sent To Your Wallet Successfully!`
      )
    );
    console.log(chalk.gray("\n-------------------------------------------\n"));
    return data;
  } catch (error: any) {
    console.error(`Error creating ${format} credential offer:`, error.message);
    throw error; // Re-throw error to stop workflow
  }
}

export async function offerCredentialJsonLd(tenantId: string, payload: any) {
  return postCredentialOffer(tenantId, payload, "jsonld");
}

export async function offerCredentialAnoncred(tenantId: string, payload: any) {
  return postCredentialOffer(tenantId, payload, "anoncred");
}
