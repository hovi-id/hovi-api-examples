import chalk from "chalk";
import { config } from "..";
import { TCredentialFormat, CredentialFormatMap } from "../types";
import { faker } from "@faker-js/faker";

export async function createCredentialTemplate(
  tenantId: string,
  payload: any,
  format?: TCredentialFormat
) {
  // Validate payload based on format

  const endpoint = `${config.base_url}/credential-template/${
    format || "jsonld"
  }/create`;
  // console.log("Payload:", payload);
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

    if (!resp.ok) {
      throw new Error(`HTTP error: ${resp.status}`);
    }
    const data = await resp.json();
    console.log("✅ Credential template created successfully:", data);
    return data;
  } catch (err: any) {
    console.error(
      `Error creating credential template ${format}):`,
      err.message
    );
    return { success: false, message: err.message };
  }
}

export const createVerificationTemplate = async (
  tenantId: string,
  payload: any,
  format?: string
) => {
  const endpoint = `${config.base_url}/verification-template/${
    format || "jsonld"
  }/create`;

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
