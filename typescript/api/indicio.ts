import { createConnection } from "./indicio/connection";
import {
  createCredentialTemplate,
  createVerificationTemplate,
} from "./utils/templates";
import { createTenant } from "./utils/tenant";
import { createCredentialOffer } from "./indicio/issue";
import { sendProofRequest } from "./indicio/verify";
import {
  anoncredCredentialTemplate,
  anoncredVerificationTemplate,
  jsonLdCredentialTemplate,
  jsonLdVerificationTemplate,
} from "./faker";

/**
 * Executes a workflow for interacting with the indicio API, including tenant creation,
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
 * await indicioWorkFlow();
 */
export async function indicioJsonLdWorkFlow() {
  // Step 1: Create a new tenant
  const tenantResponse = await createTenant({
    tenantName: "YourTenantName", // Replace with your tenant's name
    tenantLabel: "YourTenantLabel", // Replace with a descriptive label
    tenantSecret: "YourTenantSecret", // Replace with a secure secret key
    imageUrl: "https://yourdomain.com/logo.png", // Replace with your logo URL
  });
  // Step 2: Create a new credential template
  const createCredentialTemplateResponse = await createCredentialTemplate(
    tenantResponse.response.tenantId,
    jsonLdCredentialTemplate,
    "jsonld"
  );

  // Step 3: Create a new connection
  const connectionResponse = await createConnection(
    tenantResponse.response.tenantId,
    "Your Connection Name"
  );

  // Step 4: Create a new credential offer
  const offerCredential = await createCredentialOffer(
    tenantResponse.response.tenantId,
    {
      credentialTemplateId:
        createCredentialTemplateResponse.response.credentialTemplateId,
      connectionId: connectionResponse.connectionId,
      credentialValues: {
        age: 45,
      },
      holderDid: tenantResponse.response.dids[0].did,
    },
    "jsonld"
  );

  // Step 4: Create a new verification template
  const createVerificationTemplateResponse = await createVerificationTemplate(
    tenantResponse.response.tenantId,
    {
      ...jsonLdVerificationTemplate,
      restrictions: {
        credentialTemplateId:
          createCredentialTemplateResponse.response.credentialTemplateId,
      },
    },
    "jsonld"
  );

  // Step 5: Send a proof request
  const sentProofRequest = await sendProofRequest(
    tenantResponse.response.tenantId,
    createVerificationTemplateResponse.response.verificationTemplateId,
    connectionResponse.connectionId
  );
}
export async function indicioAnoncredWorkFlow() {
  // Step 1: Create a new tenant
  const tenantResponse = await createTenant({
    tenantName: "YourTenantName", // Replace with your tenant's name
    tenantLabel: "YourTenantLabel", // Replace with a descriptive label
    tenantSecret: "YourTenantSecret", // Replace with a secure secret key
    imageUrl: "https://yourdomain.com/logo.png", // Replace with your logo URL
  });
  // Step 2: Create a new credential template
  const createCredentialTemplateResponse = await createCredentialTemplate(
    tenantResponse.response.tenantId,
    anoncredCredentialTemplate,
    "anoncred"
  );

  // Step 3: Create a new connection
  const connectionResponse = await createConnection(
    tenantResponse.response.tenantId,
    "Your Connection Name"
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
    },
    "anoncred"
  );

  // Step 4: Create a new verification template
  const createVerificationTemplateResponse = await createVerificationTemplate(
    tenantResponse.response.tenantId,
    anoncredVerificationTemplate,
    "anoncred"
  );

  // Step 5: Send a proof request
  const sentProofRequest = await sendProofRequest(
    tenantResponse.response.tenantId,
    createVerificationTemplateResponse.response.verificationTemplateId,
    connectionResponse.connectionId
  );
}
