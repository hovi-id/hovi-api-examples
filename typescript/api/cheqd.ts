import { faker } from "@faker-js/faker";
import { createConnection } from "./cheqd/connection";
import {
  createCredentialTemplate,
  createVerificationTemplate,
} from "./utils/templates";
import { createTenant } from "./utils/tenant";
import { createCredentialOffer } from "./cheqd/issue";
import { sendProofRequest } from "./cheqd/verify";

/**
 * Executes a workflow for interacting with the cheqd API, including tenant creation,
 * credential template creation, connection establishment, credential offering, verification
 * template creation, and proof request sending.
 *
 * The workflow consists of the following steps:
 * 1. Creates a new tenant with specified details.
 * 2. Creates a new credential template for the tenant.
 * 3. Establishes a new connection for the tenant.
 * 4. Issues a credential offer using the created template and connection.
 * 5. Creates a verification template for proof requests.
 * 6. Sends a proof request using the verification template and connection.
 *
 * @returns {Promise<void>} A promise that resolves when the workflow is complete.
 *
 * @example
 * await cheqdWorkFlow();
 */
export async function cheqdWorkFlow() {
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
          type: "string",
          description: "Age of the patient",
          required: true,
        },
      ],
      // tag: faker.word.noun().toString(),
      tag: "patient",
    },
    "anoncred"
  );

  // Step 3: Create a new connection
  const connectionResponse = await createConnection(
    tenantResponse.response.tenantId
  );

  // Step 4: Create a new credential offer
  const offerCredential = await createCredentialOffer(
    tenantResponse.response.tenantId,
    {
      credentialTemplateId:
        createCredentialTemplateResponse.response.credentialTemplateId,
      connectionId: connectionResponse.connectionId,
      credentialValues: {
        age: "40",
      },
    }
  );

  // Step 4: Create a new verification template
  const createVerificationTemplateResponse = await createVerificationTemplate(
    tenantResponse.response.tenantId,
    {
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
    },
    "anoncred"
  );

  // Step 5: Send a proof request
  const sentProofRequest = await sendProofRequest(
    tenantResponse.response.tenantId,
    createVerificationTemplateResponse.response.verificationTemplateId,
    connectionResponse.connectionId
  );
}
