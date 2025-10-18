import qrcode from "qrcode-terminal";
import chalk from "chalk";
import { config } from "..";

/**
 * Creates a new connection for the specified tenant and displays a QR code for invitation.
 *
 * This function sends a POST request to the connection creation endpoint, generates a QR code
 * for the invitation, and waits for the connection to be established. If successful, it returns
 * the connection status. If an error occurs, it logs the error and returns an object indicating failure.
 *
 * @param tenantId - The unique identifier of the tenant for whom the connection is being created.
 * @param label - (Optional) A custom label for the connection. Defaults to "Hovi Connection" if not provided.
 * @returns The established connection status object on success, or an error object on failure.
 */
export async function createConnection(tenantId: string, label: string) {
  const endpoint = `${config.base_url}/connection/create`;

  const payload = { label: label || "Your Connection label" };
  console.log(endpoint, {
    method: "POST",
    headers: {
      "x-tenant-id": tenantId,
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.api_key}`,
    },
    body: JSON.stringify(payload),
  });
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
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    console.log("data", data);
    qrcode.generate(data.response.invitationUri, { small: true });
    chalk.green(
      `Accept the connection request using the QR code above in next 2 min otherwise you will have to create the connection again.`
    );
    const connectionStatus = await checkConnectionStatus(
      tenantId,
      data.response.invitationId
    );
    chalk.green("Connection established!");
    return connectionStatus.response[0];
  } catch (error: any) {
    console.error("❌ Failed to create connection:", error.message);
    return { success: false, message: error.message };
  }
}

/**
 * Periodically checks the status of a connection by polling the API endpoint at a fixed interval.
 *
 * @param tenantId - The tenant identifier used for the API request header.
 * @param invitationId - The invitation identifier to check the connection status for.
 * @returns A promise that resolves with the connection data when the connection state is "completed",
 *          or rejects if the polling times out or an error occurs.
 *
 * @remarks
 * - Polls the endpoint every 5 seconds, up to a maximum of 24 times (2 minutes).
 * - If the connection state becomes "completed", the promise resolves with the response data.
 * - If the maximum number of polls is reached without completion, the promise rejects with a timeout error.
 * - Any HTTP or network errors will also cause the promise to reject.
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

        // const endpoint = `${config.base_url}/connection/find?invitationId=${invitationId}`;
        const endpoint = `${config.base_url}/connection/invitation/find?invitationId=${invitationId}`;
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
        console.log("data", data);
        // Check if state matches
        if (data.response[0]?.state === "completed") {
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
