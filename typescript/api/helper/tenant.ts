import config from "../Config/config";
import { CreateTenantRequest } from "../types";
/**
 * Creates a new tenant using the provided payload or default values.
 *
 * Sends a POST request to the `/tenant/create` endpoint with the tenant details.
 * If no payload is provided, default tenant information will be used.
 *
 * @param payload - Optional. The tenant creation request payload. If omitted, default values are used.
 * @returns A promise that resolves to a `CreateTenantResponse` object containing the result of the tenant creation operation.
 *
 * @throws Will throw an error if the HTTP request fails or the response is not OK.
 */

export async function createTenant(payload?: CreateTenantRequest) {
  const defaultPayload: CreateTenantRequest = {
    tenantName: "Hovi Tenant",
    tenantLabel: "Hovi API Tenant",
    tenantSecret: "hovisupersecret123",
    imageUrl: "https://example.com/logo.png",
  };

  const finalPayload = { ...defaultPayload, ...payload };

  try {
    const response = await fetch(`${config.base_url}/tenant/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.api_key}`,
      },
      body: JSON.stringify(finalPayload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.dir(data, { depth: "infinity" });
    return data;
  } catch (error: any) {
    console.error("Error creating tenant:", error.message);
    return {
      success: false,
      message: error.message || "Unknown error occurred",
    };
  }
}
