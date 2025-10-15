import { config } from "..";

export const sendProofRequest = async (
  tenantId: string,
  verificationTemplateId: string,
  connectionId?: string
) => {
  const endpoint = `${config.base_url}/verification/send-proof-request`;
  const payload = {
    verificationTemplateId: verificationTemplateId,
    connectionId,
  };
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
    return { success: true, data };
  } catch (error: any) {
    console.error(`Error sending proof request:`, error.message);
    return { success: false, message: error.message };
  }
};
