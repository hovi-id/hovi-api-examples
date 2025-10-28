import chalk from "chalk";
import qrcode from "qrcode-terminal";
import { config, TCredentialFormat } from "..";

/**
 * Creates a credential offer for a given tenant by sending a POST request to the credential offer endpoint.
 *
 * @param tenantId - The unique identifier of the tenant for whom the credential offer is being created.
 * @param payload - The payload containing the credential offer details to be sent in the request body.
 * @returns A promise that resolves to the response data if the offer is created successfully, or an error object if the operation fails.
 *
 * @remarks
 * - Logs success and displays a QR code for the credential offer URI upon successful creation.
 * - Handles and logs errors, returning a standardized error object on failure.
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
        `\n✅ Credential Offer for ${format} Created Successfully!`
      )
    );
    console.log(chalk.magentaBright("\n📱 Scan this QR code:\n"));
    qrcode.generate(data.response.credentialOfferUri, { small: true });

    console.log(chalk.gray("\n-------------------------------------------\n"));
    return data;
  } catch (error: any) {
    console.error(`Error creating credential offer:`, error.message);
    return { success: false, message: error.message };
  }
}
