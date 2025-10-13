/**
 * Represents the request payload for creating a new tenant.
 *
 * @property tenantName - The unique name of the tenant.
 * @property tenantLabel - A human-readable label for the tenant.
 * @property tenantSecret - A secret key associated with the tenant.
 * @property imageUrl - (Optional) URL to the tenant's image or logo.
 * @property webhooks - (Optional) List of webhook URLs associated with the tenant.
 * @property dids - (Optional) Array of DID (Decentralized Identifier) objects linked to the tenant.
 */
export interface CreateTenantRequest {
  tenantName: string;
  tenantLabel: string;
  tenantSecret: string;
  imageUrl?: string;
  webhooks?: string[];
  dids?: Did[];
}
export interface Did {
  did: string;
  seed: string;
}

export type Ecosystem = "open-id" | "cheqd" | "privado-id" | "indicio";
export type TCredentialFormat = "mdoc" | "sd-jwt" | "jsonld" | "anoncred";

/** Minimal “required” payload for each format & ecosystem */
export type RequiredPayloadMap = {
  [E in Ecosystem]: {
    [F in TCredentialFormat]?: object; // define the minimal shape
  };
};

/** Strongly typed minimal payloads */
/**
 * Represents the minimal payload structure for a base entity.
 *
 * @property name - The name of the entity.
 * @property version - The version of the entity.
 * @property description - A brief description of the entity.
 * @property attributes - An array of attribute definitions for the entity.
 * @property attributes[].name - The name of the attribute.
 * @property attributes[].label - The display label for the attribute.
 * @property attributes[].type - The data type of the attribute.
 * @property attributes[].description - A description of the attribute.
 * @property attributes[].required - Indicates if the attribute is required.
 * @property attributes[].disclosurable - (Optional) Indicates if the attribute is disclosurable, required by some formats.
 */
export interface TBaseMinimalPayload {
  name: string;
  version: string;
  description: string;
  attributes: {
    name: string;
    label: string;
    type: string;
    description: string;
    required: boolean;
    disclosurable?: boolean; // only if required by some formats
  }[];
}
export interface JsonLdMinimal extends TBaseMinimalPayload {
  schemaType: string;
}
export interface SdJwtMinimal extends TBaseMinimalPayload {
  schemaType: string;
}
export interface AnoncredMinimal extends TBaseMinimalPayload {
  tag: string;
}
export interface MdocMinimal extends TBaseMinimalPayload {
  docType: string;
}

/** Union of all minimal payloads */
export type TCredentialTemplatePayload =
  | JsonLdMinimal
  | SdJwtMinimal
  | AnoncredMinimal
  | MdocMinimal;

// export interface TCreateCredentialTemplateResponse {
//   success: boolean;
//   message?: string;
//   data?: any;
// }

export type TCredentialTemplateOfferPayload = {
  credentialTemplateId: string;
  credentialValues?: object;
  connectionId?: string;
  holderDid?: string;
};

export type TVerificationTemplate = {
  name: string;
  version: string;
  description: string;
  restrictions?: {
    credentialTemplateId: string;
  };
};
