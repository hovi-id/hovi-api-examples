import { TCredentialFormat } from "../types";

export function validatePayloadFormat(
  format: TCredentialFormat,
  payload: any
): boolean {
  const requiredFieldsByFormat: Record<TCredentialFormat, string[]> = {
    jsonld: ["name", "version", "description", "attributes", "schemaType"],
    "sd-jwt": ["name", "version", "description", "attributes", "schemaType"],
    mdoc: ["name", "version", "description", "attributes", "docType"],
    anoncred: ["name", "version", "description", "attributes", "tag"],
  };

  const requiredFields = requiredFieldsByFormat[format];
  return requiredFields.every((key) => key in payload);
}
