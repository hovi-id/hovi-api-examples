import config from "../Config/config";

/**
 * Creates a verification template using the Hovi API.
 *
 * Sends a POST request to the verification-template endpoint with the provided payload.
 * If the payload is missing required fields (`name`, `version`, or `description`), default values are used.
 *
 * @param tenantId - The tenant ID to be sent in the request header (`x-tenant-id`).
 * @param payload - (Optional) The payload object containing template details. If not provided or missing required fields, defaults are used.
 * @param format - (Optional) The format of the verification template (e.g., "jsonld"). Defaults to "jsonld" if not specified.
 * @returns A promise that resolves to the response data from the API, or an error object if the request fails.
 */
export const createVerificationTemplate = async (
  tenantId: string,
  payload?: any,
  format?: string
) => {
  const endpoint = `${config.base_url}/verification-template/${
    format || "jsonld"
  }/create`;
  let defaultPayload = {};
  if (!payload || !payload.name || !payload.version || !payload.description) {
    defaultPayload = {
      name: "Hovi API Verification Template",
      version: "1.0.0",
      description: "A sample verification template created via Hovi API",
    };
  }
  payload = { ...defaultPayload, ...payload };
  console.log({ endpoint, payload });
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
    console.log("response", data);
    return data;
  } catch (error: any) {
    console.error(
      `Error creating ${format} verification template:`,
      error.message
    );
    return { success: false, message: error.message };
  }
};
