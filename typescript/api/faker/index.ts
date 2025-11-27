import { faker } from "@faker-js/faker";

export function createCredentialTemplate(attrType: any, extra = {}) {
  return {
    name: faker.word.noun() + " ID",
    version: "1.0.1",
    description: faker.lorem.sentence(),
    attributes: [
      {
        name: "age",
        label: "Age",
        type: attrType,
        description: "Age of the patient",
        required: true,
      },
    ],
    ...extra,
  };
}

export function createVerificationTemplate(attrType: any, extra = {}) {
  return {
    name: faker.word.noun() + " Verification",
    version: "1.0.1",
    description: faker.lorem.sentence(),
    requestedAttributes: [
      {
        name: "age",
        label: "Age",
        type: attrType,
        description: "Age of the patient",
        required: true,
      },
    ],
    ...extra,
  };
}

export const jsonLdVerificationTemplatePrivadoId = {
  name: faker.word.noun() + " Verification",
  version: "1.0.1",
  description: faker.lorem.sentence(),
  conditions: [
    {
      allowedIssuers: ["*"],
      credentialSubject: {
        age: {
          $eq: 40,
        },
      },
    },
  ],
};

export const anoncredCredentialTemplate = createCredentialTemplate("string", {
  tag: "patient",
});

export const anoncredVerificationTemplate = createVerificationTemplate(
  "string",
  {
    description: "Verify patient age",
  }
);

export const openidSdJwtCredentialTemplate = createCredentialTemplate(
  "number",
  {
    schemaType: faker.word.noun(),
    attributes: [
      {
        name: "age",
        label: "Age",
        type: "number",
        description: "Age of the patient",
        required: true,
        disclosurable: false,
      },
    ],
  }
);

export const openidSdJwtVerificationTemplate =
  createVerificationTemplate("number");

export const openidMdocCredentialTemplate = createCredentialTemplate("number", {
  docType: faker.word.noun(),
});

export const openidMdocVerificationTemplate =
  createVerificationTemplate("number");

export const jsonLdCredentialTemplate = createCredentialTemplate("number", {
  schemaType: faker.word.noun(),
});

export const jsonLdVerificationTemplate = createVerificationTemplate("number");

export const jsonLdCredentialTemplatePrivadoId = createCredentialTemplate(
  "integer",
  {
    schemaType: faker.word.noun(),
    privadoCredentialType: "jsonld-sig",
  }
);
