import config from "../Config/config";

/**
 * Sends a proof request to the verification API endpoint.
 *
 * @param tenantId - The unique identifier for the tenant. This is used to specify which tenant is making the request.
 * @param verificationTemplateId - (Optional) The ID of the verification template to use for the proof request.
 * @returns A promise that resolves to an object containing the success status and the response data or error message.
 *
 * @example
 * ```typescript
 * const result = await sendProofRequest('tenant-123', 'template-456');
 * if (result.success) {
 *   // Handle successful response
 * } else {
 *   // Handle error
 * }
 * ```
 */
export const sendProofRequest = async (
  tenantId: string,
  verificationTemplateId: string
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
    return { success: true, data };
  } catch (error: any) {
    console.error(`Error sending proof request:`, error.message);
    return { success: false, message: error.message };
  }
};
