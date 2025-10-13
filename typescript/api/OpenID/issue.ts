import config from "../Config/config";
import { TCredentialFormat, TCredentialTemplateOfferPayload } from "../types";
import logger from "../utils/logger";

export async function createCredentialOffer(
  tenantId: string,
  payload?: TCredentialTemplateOfferPayload,
  format?: TCredentialFormat
) {
  const endpoint = `${config.base_url}/credential/${format || "jsonld"}/offer`;
  let defaultPayload = {};
  if (!payload || !payload.credentialValues) {
    defaultPayload = {
      credentialValues: { firstName: "Hovi Joe" },
    };
  }
  const finalPayload = { ...defaultPayload, ...payload };
  console.log({ endpoint, finalPayload });
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
    logger.info(`${format} Credential offer created successfully`, data);
    return data;
  } catch (error: any) {
    console.error(`Error creating ${format} credential offer:`, error.message);
    return { success: false, message: error.message };
  }
}
