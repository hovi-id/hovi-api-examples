import chalk from "chalk";
import qrcode from "qrcode-terminal";
import { config } from "..";

/**
 * Helper function to post an OpenID credential offer and display a QR code.
 * @param tenantId - The tenant's unique identifier.
 * @param payload - The offer payload.
 * @param format - The credential format (jsonld, sd-jwt, mdoc).
 * @returns The API response.
 */
async function postOpenIdCredentialOffer(
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
        `\n✅ Credential Offer for ${format.toUpperCase()} Created Successfully!`
      )
    );
    console.log(chalk.magentaBright("\n📱 Scan this QR code:\n"));
    qrcode.generate(data.response.credentialOfferUri, { small: true });

    console.log(chalk.gray("\n-------------------------------------------\n"));
    return data;
  } catch (error: any) {
    console.error(`Error creating ${format} credential offer:`, error.message);
    throw error; // Re-throw error to stop workflow
  }
}

export async function offerCredentialJsonLd(tenantId: string, payload: any) {
  return postOpenIdCredentialOffer(tenantId, payload, "jsonld");
}

export async function offerCredentialSdJwt(tenantId: string, payload: any) {
  return postOpenIdCredentialOffer(tenantId, payload, "sd-jwt");
}

export async function offerCredentialMdoc(tenantId: string, payload: any) {
  return postOpenIdCredentialOffer(tenantId, payload, "mdoc");
}
