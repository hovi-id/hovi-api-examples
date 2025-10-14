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

// export type Ecosystem = "open-id" | "cheqd" | "privado-id" | "indicio";
export type TCredentialFormat = "mdoc" | "sd-jwt" | "jsonld" | "anoncred";

export type Attribute = {
  name: string;
  label: string;
  type: string;
  description: string;
  required: boolean;
  disclosurable?: boolean;
};

export type JsonLdPayload = {
  name: string;
  version: string;
  description: string;
  attributes: Attribute[];
  schemaType: string;
  categoryId?: string;
  privadoCredentialType?: string;
};

export type SdJwtPayload = {
  name: string;
  version: string;
  description: string;
  attributes: Attribute[];
  schemaType: string;
};

export type MdocPayload = {
  name: string;
  version: string;
  description: string;
  attributes: Attribute[];
  docType: string;
};

export type AnonCredPayload = {
  name: string;
  version: string;
  description: string;
  attributes: Attribute[];
  tag: string;
};

export type CredentialFormatMap = {
  jsonld: JsonLdPayload;
  "sd-jwt": SdJwtPayload;
  mdoc: MdocPayload;
  anoncred: AnonCredPayload;
};

export type TCredentialTemplateOfferPayload = {
  credentialTemplateId: string;
  credentialValues?: { [key: string]: any };
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
