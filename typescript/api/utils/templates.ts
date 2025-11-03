import { config } from "..";

/**
 * Helper function to make the API call for creating a template.
 * @param tenantId - The tenant's unique identifier.
 * @param payload - The template payload.
 * @param format - The credential format (jsonld, anoncred, etc.).
 * @param templateType - 'credential' or 'verification'.
 * @returns The API response.
 */
async function postTemplate(
  tenantId: string,
  payload: any,
  format: string,
  templateType: "credential" | "verification"
) {
  const endpoint = `${config.base_url}/${templateType}-template/${format}/create`;

  try {
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "x-tenant-id": tenantId,
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.api_key}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    if (!data.success) {
      throw new Error(
        `HTTP error! Status: ${resp.status}, Message: ${data.message}`
      );
    }
    console.log(
      `✅ ${format.toUpperCase()} ${templateType} template created successfully:`
    );
    return data;
  } catch (err: any) {
    console.error(
      `Error creating ${format} ${templateType} template:`,
      err.message
    );
    throw err; // Re-throw error to stop workflow
  }
}

// --- Credential Templates ---

export async function createCredentialTemplateJsonLd(
  tenantId: string,
  payload: any
) {
  return postTemplate(tenantId, payload, "jsonld", "credential");
}

export async function createCredentialTemplateAnoncred(
  tenantId: string,
  payload: any
) {
  return postTemplate(tenantId, payload, "anoncred", "credential");
}

export async function createCredentialTemplateSdJwt(
  tenantId: string,
  payload: any
) {
  return postTemplate(tenantId, payload, "sd-jwt", "credential");
}

export async function createCredentialTemplateMdoc(
  tenantId: string,
  payload: any
) {
  return postTemplate(tenantId, payload, "mdoc", "credential");
}

// --- Verification Templates ---

export async function createVerificationTemplateJsonLd(
  tenantId: string,
  payload: any
) {
  return postTemplate(tenantId, payload, "jsonld", "verification");
}

export async function createVerificationTemplateAnoncred(
  tenantId: string,
  payload: any
) {
  return postTemplate(tenantId, payload, "anoncred", "verification");
}

export async function createVerificationTemplateSdJwt(
  tenantId: string,
  payload: any
) {
  return postTemplate(tenantId, payload, "sd-jwt", "verification");
}

export async function createVerificationTemplateMdoc(
  tenantId: string,
  payload: any
) {
  return postTemplate(tenantId, payload, "mdoc", "verification");
}
