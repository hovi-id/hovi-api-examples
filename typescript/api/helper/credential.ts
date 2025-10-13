import config from "../Config/config";
import {
  TCredentialFormat,
  Ecosystem,
  TCredentialTemplatePayload,
  RequiredPayloadMap,
} from "../types";
import logger from "../utils/logger";

/**
 * Create a credential template with only required fields.
 * @param ecosystem e.g. "open-id", "cheqd", "privado-id", "indicio"
 * @param format credential format
 * @param tenantId the x-tenant-id header
 * @param token auth token
 * @param payload minimal required payload object for that format/ecosystem
 */
export async function createCredentialTemplate(
  tenantId: string,
  ecosystem?: Ecosystem,
  format?: TCredentialFormat,
  payload?: TCredentialTemplatePayload
) {
  // Validate that this ecosystem supports the format
  const requiredDef =
    RequiredPayloads[ecosystem || "open-id"]?.[format || "jsonld"];
  if (!requiredDef) {
    throw new Error(
      `Format "${format}" is not supported in ecosystem "${ecosystem}".`
    );
  }
  let defaultPayload = {};
  if (!payload) {
    defaultPayload = {
      name: "Hovi API Credential",
      version: "1.0.0",
      description: "A sample credential template created via Hovi API",
      attributes: [
        {
          name: "firstName",
          label: "First Name",
          type: "string",
          description: "The given name of the individual",
          required: true,
        },
      ],
      schemaType: "ExampleSchemaType",
    };
  }
  const finalPayload = { ...defaultPayload, ...payload };

  // Optionally, you could validate that `payload` has exactly those required keys (no extras)
  // For now, assume caller gives correct shape.

  const endpoint = `${config.base_url}/credential-template/${
    format || "jsonld"
  }/create`;

  // console.log({
  //   endpoint,
  //   apikey: config.api_key,
  //   finalPayload,
  // });

  try {
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "x-tenant-id": tenantId,
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.api_key}`,
      },
      body: JSON.stringify(finalPayload),
    });

    if (!resp.ok) {
      throw new Error(`HTTP error: ${resp.status}`);
    }
    const data = await resp.json();
    logger.info(`Credential template created successfully`, data);
    return data;
  } catch (err: any) {
    console.error(
      `Error creating credential template (${ecosystem}/${format}):`,
      err.message
    );
    return { success: false, message: err.message };
  }
}

const RequiredPayloads: RequiredPayloadMap = {
  "open-id": {
    jsonld: {
      name: "",
      version: "",
      description: "",
      attributes: [
        { name: "", label: "", type: "", description: "", required: true },
      ],
      schemaType: "",
    },
    "sd-jwt": {
      name: "",
      version: "",
      description: "",
      attributes: [
        {
          name: "",
          label: "",
          type: "",
          description: "",
          required: true,
          disclosurable: false,
        },
      ],
      schemaType: "",
    },
    mdoc: {
      name: "",
      version: "",
      description: "",
      attributes: [
        {
          name: "",
          label: "",
          type: "",
          description: "",
          required: true,
          disclosurable: false,
        },
      ],
      docType: "",
    },
    // open-id might not support mdoc or anoncred depending on ecosystem
  },
  cheqd: {
    jsonld: {
      name: "",
      version: "",
      description: "",
      categoryId: "",
      attributes: [
        { name: "", label: "", type: "", description: "", required: true },
      ],
      schemaType: "",
    },
    anoncred: {
      name: "",
      version: "",
      description: "",
      attributes: [
        { name: "", label: "", type: "", description: "", required: true },
      ],
      tag: "",
    },
    // maybe sd-jwt / mdoc not supported in cheqd
  },
  "privado-id": {
    jsonld: {
      name: "",
      version: "",
      description: "",
      attributes: [
        { name: "", label: "", type: "", description: "", required: true },
      ],
      schemaType: "",
      privadoCredentialType: "",
    },
    // etc.
  },
  indicio: {
    jsonld: {
      name: "",
      version: "",
      description: "",
      attributes: [
        { name: "", label: "", type: "", description: "", required: true },
      ],
      schemaType: "",
    },
    anoncred: {
      name: "",
      version: "",
      description: "",
      attributes: [
        { name: "", label: "", type: "", description: "", required: true },
      ],
      tag: "",
    },
  },
};
