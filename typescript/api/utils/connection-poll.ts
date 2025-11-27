import { config } from "../index";

/**
 * Periodically checks the status of a connection by polling the API endpoint.
 * This is a generic utility for all ecosystems that use DIDComm connections.
 *
 * @param tenantId - The tenant identifier used for the API request header.
 * @param invitationId - The invitation identifier to check the connection status for.
 * @returns A promise that resolves with the connection data when the connection state is "completed",
 * or rejects if the polling times out or an error occurs.
 */
export const checkConnectionStatus = async (
  tenantId: string,
  invitationId: string
) => {
  let pollCount = 0;
  return new Promise<any>((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        if (pollCount >= 24) {
          clearInterval(interval);
          reject(new Error("Connection status check timed out"));
        }

        const endpoint = `${config.base_url}/connection/find?invitationId=${invitationId}`;
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "x-tenant-id": tenantId,
            Authorization: `Bearer ${config.api_key}`,
          },
        });
        pollCount++;
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        // Check if state matches
        if (
          data.response &&
          data.response.length > 0 &&
          data.response[0]?.state === "completed"
        ) {
          clearInterval(interval);
          resolve(data);
        }
      } catch (error: any) {
        clearInterval(interval);
        console.error("❌ Failed to check connection:", error.message);
        reject(error);
      }
    }, 5000); // 5 seconds interval
  });
};
