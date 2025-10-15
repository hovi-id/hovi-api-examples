import chalk from "chalk";
import { config } from "..";
import { CreateTenantRequest } from "../types";
/**
 * Creates a new tenant by sending a POST request to the configured API endpoint.
 *
 * @param payload - The tenant creation request payload conforming to `CreateTenantRequest`.
 * @returns A promise that resolves to the response data from the API. If an error occurs,
 *          returns an object with `success: false` and an error `message`.
 *
 * @throws Will throw an error if `config.base_url` or `config.api_key` is not set,
 *         or if the HTTP response is not OK.
 */
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
