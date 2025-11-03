// FILE: typescript/api/privado/connection.ts (MODIFIED)

import qrcode from "qrcode-terminal";
import chalk from "chalk";
import { config } from "..";
import { checkConnectionStatus } from "../utils/connection-poll";

/**
 * Creates a new privado connection and waits for it to be established.
 *
 * @param tenantId - The unique identifier of the tenant.
 * @param label - (Optional) A custom label for the connection.
 * @returns The established connection status object.
 */
export async function createConnection(tenantId: string, label?: string) {
  const endpoint = `${config.base_url}/connection/create`;
  const payload = { label: label || "Your Connection label" };
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
    console.log(
      chalk.green(
        `Accept the connection request using the QR code above in next 2 min otherwise you will have to create the connection again.`
      )
    );

    // Use the centralized utility
    const connectionStatus = await checkConnectionStatus(
      tenantId,
      data.response.invitationId
    );

    console.log(chalk.green("Connection established!"));
    return connectionStatus.response[0];
  } catch (error: any) {
    console.error("❌ Failed to create connection:", error.message);
    throw error; // Re-throw error to stop workflow
  }
}
