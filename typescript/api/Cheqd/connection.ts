import qrcode from "qrcode-terminal";
import chalk from "chalk";
import { config } from "..";

export async function createConnection(tenantId: string, label?: string) {
  const endpoint = `${config.base_url}/connection/create`;

  const payload = { label: label || "Hovi Connection" };

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
    qrcode.generate(data.response.invitationBase64, { small: true });
    chalk.green(
      `Accept the connection request using the QR code above in next 2 min otherwise you will have to create the connection again.`
    );
    const connectionStatus = await checkConnectionStatus(
      tenantId,
      data.response.invitationId
    );
    console.log("connectionStatus", connectionStatus.response[0]);
    chalk.green("Connection established!");
    return connectionStatus.response[0];
  } catch (error: any) {
    console.error("❌ Failed to create connection:", error.message);
    return { success: false, message: error.message };
  }
}

export const checkConnectionStatus = async (
  tenantId: string,
  invitationId: string
) => {
  let pollCount = 0;
  return new Promise<any>((resolve, reject) => {
    console.log({
      tenantId,
      invitationId,
    });
    const interval = setInterval(async () => {
      try {
        if (pollCount >= 24) {
          clearInterval(interval);
          reject(new Error("Connection status check timed out"));
        }

        // const endpoint = `${config.base_url}/connection/find?invitationId=${invitationId}`;
        const endpoint = `${config.base_url}/connection`;
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
