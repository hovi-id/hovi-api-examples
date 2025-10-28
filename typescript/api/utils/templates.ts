import chalk from "chalk";
import { config, TCredentialFormat } from "..";
import { faker } from "@faker-js/faker";

/**
 * Creates a credential template for a specified tenant and credential format.
 *
 * @param tenantId - The unique identifier of the tenant.
 * @param payload - The payload containing the template data to be created.
 * @param format - (Optional) The credential format (e.g., "jsonld"). Defaults to "jsonld" if not provided.
 * @returns A promise that resolves to the created credential template data, or an error object if creation fails.
 *
 * @example
 * ```typescript
 * const template = await createCredentialTemplate("tenant123", { name: "My Template" }, "jsonld");
 * ```
 */
export async function createCredentialTemplate(
  tenantId: string,
  payload: any,
  format: TCredentialFormat
) {
  // Validate payload based on format

  const endpoint = `${config.base_url}/credential-template/${format}/create`;

  try {
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "x-tenant-id": tenantId,
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.api_key}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    if (!data.success) {
      throw new Error(
        `HTTP error! Status: ${resp.status}, Message: ${data.message}`
      );
    }
    console.log("✅ Credential template created successfully:");
    return data;
  } catch (err: any) {
    console.error(`Error creating credential template ${format}`, err.message);
    return { success: false, message: err.message };
  }
}

/**
 * Creates a verification template for a given tenant.
 *
 * Sends a POST request to the verification template endpoint with the provided payload.
 * The format of the template can be specified (defaults to "jsonld" if not provided).
 *
 * @param tenantId - The unique identifier of the tenant.
 * @param payload - The data to be used for creating the verification template.
 * @param format - (Optional) The format of the verification template (e.g., "jsonld").
 * @returns A promise that resolves to the created verification template data, or an error object if the request fails.
 */
export const createVerificationTemplate = async (
  tenantId: string,
  payload: any,
  format: TCredentialFormat
) => {
  const endpoint = `${config.base_url}/verification-template/${format}/create`;
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
    console.log("✅ Verification template created successfully!");
    return data;
  } catch (error: any) {
    console.error(
      `Error creating ${format} verification template:`,
      error.message
    );
    return { success: false, message: error.message };
  }
};

// export const generateCommonValues = () => ({
//   name: faker.person.fullName(),
//   age: faker.number.int({ min: 18, max: 65 }).toString(),
//   email: faker.internet.email(),
//   country: faker.location.country(),
// });
