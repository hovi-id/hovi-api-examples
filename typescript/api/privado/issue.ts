import chalk from "chalk";
import { config } from "..";

/**
 * Creates a Privado credential offer.
 * @param tenantId - The tenant's unique identifier.
 * @param payload - The offer payload.
 * @returns The API response.
 */
export async function offerCredentialJsonLd(tenantId: string, payload: any) {
  const format = "jsonld"; // Privado only uses jsonld for this flow
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
        `\n📱 An ${format.toUpperCase()} Credential Offer Sent To Your Wallet Successfully!`
      )
    );
    console.log(chalk.gray("\n-------------------------------------------\n"));
    return data;
  } catch (error: any) {
    console.error(`Error creating ${format} credential offer:`, error.message);
    throw error; // Re-throw error to stop workflow
  }
}
