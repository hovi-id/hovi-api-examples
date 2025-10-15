import { faker } from "@faker-js/faker";
import { createCredentialOffer } from "./openid/issue";
import { sendProofRequest } from "./openid/verify";
import {
  createCredentialTemplate,
  createVerificationTemplate,
} from "./utils/templates";
import { createTenant } from "./utils/tenant";

export async function openIdWorkFlow() {
  // Step 1: Create a new tenant
  const tenantResponse = await createTenant({
    tenantName: "Hovi Tenant",
    tenantLabel: "Hovi API Tenant",
    tenantSecret: "hovisupersecret123",
    imageUrl: "https://example.com/logo.png",
  });
  // Step 2: Create a new credential template
  const createCredentialTemplateResponse = await createCredentialTemplate(
    tenantResponse.response.tenantId,
    {
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
    },
    "sd-jwt"
  );
  // Step 3: Create a new credential offer
  const offerCredential = await createCredentialOffer(
    tenantResponse.response.tenantId,
    {
      credentialTemplateId:
        createCredentialTemplateResponse.response.credentialTemplateId,
      credentialValues: {
        age: faker.number.int({ min: 18, max: 65 }),
      },
    }
  );
  // // Step 4: Create a new verification template
  const createVerificationTemplateResponse = await createVerificationTemplate(
    tenantResponse.response.tenantId,
    {
      name: faker.word.noun() + " ID",
      version: "1.0.1",
      description: faker.lorem.sentence(),
      restriction: {
        credentialTemplateId:
          createCredentialTemplateResponse.response.credentialTemplateId,
      },
      requestedAttributes: [
        {
          name: "age",
          label: "Age",
          type: "number",
          description: "Age of the patient",
          required: true,
        },
      ],
    },
    "sd-jwt"
  );
  // Step 5: Send a proof request
  const sentProofRequest = await sendProofRequest(
    tenantResponse.response.tenantId,
    createVerificationTemplateResponse.response.verificationTemplateId
  );
}
