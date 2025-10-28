import { config } from "..";

/**
 * Sends a proof request to the verification API endpoint.
 *
 * @param tenantId - The unique identifier for the tenant making the request.
 * @param verificationTemplateId - The ID of the verification template to use for the proof request.
 * @param connectionId - (Optional) The ID of the connection to which the proof request should be sent.
 * @returns A promise that resolves to an object indicating success and containing the response data if successful,
 *          or an error message if the request fails.
 *
 * @example
 * ```typescript
 * const result = await sendProofRequest('tenant123', 'template456', 'connection789');
 * if (result.success) {
 *   // handle success
 * } else {
 *   // handle error
 * }
 * ```
 */
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
    console.log("✅Proof request sent  successfully:");
    return { success: true, data };
  } catch (error: any) {
    console.error(`Error sending proof request:`, error.message);
    return { success: false, message: error.message };
  }
};
