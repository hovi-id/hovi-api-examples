import config from "../Config/config";
import { TCredentialFormat, CredentialFormatMap } from "../types";
import { validatePayloadFormat } from "../utils/checkPayloadType";
import { JsonLd } from "../utils/mockData";

/**
 * Create a credential template with only required fields.
 * @param ecosystem e.g. "open-id", "cheqd", "privado-id", "indicio"
 * @param format credential format
 * @param tenantId the x-tenant-id header
 * @param token auth token
 * @param payload minimal required payload object for that format/ecosystem
 */
export async function createCredentialTemplate<T extends TCredentialFormat>(
  tenantId: string,
  format?: TCredentialFormat,
  payload?: CredentialFormatMap[T]
) {
  // Validate payload based on format
  let defaultPayload = {};
  if (!payload) {
    defaultPayload = JsonLd;
  }
  const finalPayload = { ...defaultPayload, ...payload };
  if (!validatePayloadFormat(format || "jsonld", finalPayload)) {
    console.error(
      `❌ Invalid payload: Missing required fields for format "${format}"`
    );
    return {
      success: false,
      message: `Invalid payload for format: ${format}`,
    };
  }

  const endpoint = `${config.base_url}/credential-template/${
    format || "jsonld"
  }/create`;

  try {
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "x-tenant-id": tenantId,
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.api_key}`,
      },
      body: JSON.stringify(finalPayload),
    });

    if (!resp.ok) {
      throw new Error(`HTTP error: ${resp.status}`);
    }
    const data = await resp.json();
    console.log("✅ Credential template created successfully:", data);
    return data;
  } catch (err: any) {
    console.error(
      `Error creating credential template ${format}):`,
      err.message
    );
    return { success: false, message: err.message };
  }
}
