import config from "../Config/config";

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
