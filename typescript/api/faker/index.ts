import { faker } from "@faker-js/faker";

export const anoncredCredentialTemplate = {
  name: faker.word.noun() + " ID",
  version: "1.0.1",
  description: faker.lorem.sentence(),
  attributes: [
    {
      name: "age",
      label: "Age",
      type: "string",
      description: "Age of the patient",
      required: true,
    },
  ],
  // tag: faker.word.noun().toString(),
  tag: "patient",
};

export const anoncredVerificationTemplate = {
  description: "Verify patient age",
  name: "Patient Age Verification",
  version: "1.0.1",
  requestedAttributes: [
    {
      name: "age",
      label: "Age",
      type: "string",
      description: "Age of the patient",
      required: true,
    },
  ],
};

export const openidSdJwtCredentialTemplate = {
  name: faker.word.noun() + " ID",
  version: "1.0.1",
  description: faker.lorem.sentence(),
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
  schemaType: faker.word.noun(),
};

export const openidSdJwtVerificationTemplate = {
  name: faker.word.noun() + " ID",
  version: "1.0.1",
  description: faker.lorem.sentence(),
  requestedAttributes: [
    {
      name: "age",
      label: "Age",
      type: "number",
      description: "Age of the patient",
      required: true,
    },
  ],
};
export const openidMdocCredentialTemplate = {
  name: faker.word.noun() + " ID",
  version: "1.0.1",
  description: faker.lorem.sentence(),
  attributes: [
    {
      name: "age",
      label: "Age",
      type: "number",
      description: "Age of the patient",
      required: true,
    },
  ],
  docType: faker.word.noun(),
};

export const openidMdocVerificationTemplate = {
  name: faker.word.noun() + " ID",
  version: "1.0.1",
  description: faker.lorem.sentence(),
  requestedAttributes: [
    {
      name: "age",
      label: "Age",
      type: "number",
      description: "Age of the patient",
      required: true,
    },
  ],
};

export const jsonLdCredentialTemplate = {
  name: faker.word.noun() + " ID",
  version: "1.0.1",
  description: faker.lorem.sentence(),
  attributes: [
    {
      name: "age",
      label: "Age",
      type: "integer",
      description: "Age of the patient",
      required: true,
    },
  ],
  schemaType: faker.word.noun(),
};

export const jsonLdVerificationTemplate = {
  name: faker.word.noun() + " ID",
  version: "1.0.1",
  description: faker.lorem.sentence(),
  requestedAttributes: [
    {
      name: "age",
      label: "Age",
      type: "number",
      description: "Age of the patient",
      required: true,
    },
  ],
};
