import chalk from "chalk";
import { config } from "..";
import { CreateTenantRequest } from "../types";
export async function createTenant(payload: CreateTenantRequest) {
  try {
    const endpoint = `${config.base_url}/tenant/create`;
    console.log(endpoint);
    if (!config.base_url || !config.api_key) {
      throw new Error(
        "Please set the config.base_url and config.api_key environment variables."
      );
    }
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.api_key}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log("🏢Tenant created successfully");
    const data = await response.json();
    // console.dir(data, { depth: "infinity" });
    return data;
  } catch (error: any) {
    console.error("Error creating tenant:", error.message);
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
}
