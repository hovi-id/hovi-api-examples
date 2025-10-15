import { config } from "..";

/**
 * Sends a proof request to the verification API endpoint.
 *
 * @param tenantId - The tenant identifier used for authentication.
 * @param verificationTemplateId - The ID of the verification template to use for the proof request.
 * @param connectionId - (Optional) The connection ID to associate with the proof request.
 * @returns An object containing the success status and response data or error message.
 *
 */
export const sendProofRequest = async (
  tenantId: string,
  verificationTemplateId: string,
  connectionId?: string
) => {
  const endpoint = `${config.base_url}/verification/send-proof-request`;
  const payload = {
    verificationTemplateId: verificationTemplateId,
    // connectionId: "sample-connection-id", // Replace with actual connection ID
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
    console.log("Proof request sent successfully:", data);
    return { success: true, data };
  } catch (error: any) {
    console.error(`Error sending proof request:`, error.message);
    return { success: false, message: error.message };
  }
};
