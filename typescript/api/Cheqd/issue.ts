import chalk from "chalk";
import { TCredentialFormat, TCredentialTemplateOfferPayload } from "../types";
import logger from "../utils/logger";
import qrcode from "qrcode-terminal";
import { config } from "..";

export async function createCredentialOffer(tenantId: string, payload: any) {
  const endpoint = `${config.base_url}/credential/anoncred/offer`;
  console.log("payload", payload);
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
    console.log(
      chalk.bold.green(
        "\n✅An Credential Offer Sent To Your Wallet Successfully!"
      )
    );
    // console.log(chalk.magentaBright("\n📱 Scan this QR code:\n"));

    console.log(chalk.gray("\n-------------------------------------------\n"));
    return data;
  } catch (error: any) {
    console.error(`Error creating credential offer:`, error.message);
    return { success: false, message: error.message };
  }
}
