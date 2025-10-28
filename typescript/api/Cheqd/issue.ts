import chalk from "chalk";
import { config, TCredentialFormat } from "..";

/**
 * Creates a credential offer by sending a POST request to the specified endpoint.
 *
 * @param tenantId - The unique identifier for the tenant, used for authentication.
 * @param payload - The payload containing the credential offer details to be sent in the request body.
 * @returns A promise that resolves to the response data from the API if successful, or an error object if the request fails.
 *
 * @example
 * ```typescript
 * const offer = await createCredentialOffer('tenant123', { credentialData: { ... } });
 * ```
 */
export async function createCredentialOffer(
  tenantId: string,
  payload: any,
  format: TCredentialFormat
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
        `\n✅An ${format}Credential Offer Sent To Your Wallet Successfully!`
      )
    );

    console.log(chalk.gray("\n-------------------------------------------\n"));
    return data;
  } catch (error: any) {
    console.error(`Error creating credential offer:`, error.message);
    return { success: false, message: error.message };
  }
}
