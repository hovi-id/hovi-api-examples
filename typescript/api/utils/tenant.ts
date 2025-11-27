import { config } from "..";

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
export async function createTenant(payload: any) {
  try {
    const endpoint = `${config.base_url}/tenant/create`;
    if (!config.base_url || !config.api_key) {
      throw new Error(
        "Please set the config.base_url and config.api_key environment variables."
      );
    }
    const response: any = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.api_key}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(`HTTP error! Status: ${response.message}`);
    }
    return data;
  } catch (error: any) {
    console.error("Error creating tenant:", error.message);
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
}
