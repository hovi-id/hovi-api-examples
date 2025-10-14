import { createConnection } from "./helper/connection";
import { createCredentialTemplate } from "./helper/credential";
import { createTenant } from "./helper/tenant";
import { createVerificationTemplate } from "./helper/verification";
import { createCredentialOffer } from "./OpenID/issue";
import { sendProofRequest } from "./OpenID/verify";

/**
 * Main entry point for the Hovi API example code.
 *
 * This function demonstrates the sequence of API calls required to
 * create a tenant, create a credential template, create a credential
 * offer, create a verification template, and send a proof request.
 *
 */
async function openIdWorkFlow() {
  // Step 1: Create a new tenant
  const tenantResponse = await createTenant();

  // Step 2: Create a new credential template
  const createCredentialTemplateResponse = await createCredentialTemplate(
    tenantResponse.response.tenantId
  );

  // Step 3: Create a new credential offer
  const offerCredential = await createCredentialOffer(
    tenantResponse.response.tenantId,
    {
      credentialTemplateId:
        createCredentialTemplateResponse.response.credentialTemplateId,
    }
  );

  // Step 4: Create a new verification template
  const createVerificationTemplateResponse = await createVerificationTemplate(
    tenantResponse.response.tenantId,
    {
      restriction: {
        credentialTemplateId:
          createCredentialTemplateResponse.response.credentialTemplateId,
      },
    }
  );

  // Step 5: Send a proof request
  const sentProofRequest = await sendProofRequest(
    tenantResponse.response.tenantId,
    createVerificationTemplateResponse.response.verificationTemplateId
  );
}
// openIdWorkFlow();

async function cheqdWorkFlow() {
  // Step 1: Create a new tenant
  const tenantResponse = await createTenant();

  // Step 2: Create a new credential template
  const createCredentialTemplateResponse = await createCredentialTemplate(
    tenantResponse.response.tenantId
  );

  // Step 2: Create a new connection
  const connectionResponse = await createConnection(
    tenantResponse.response.tenantId
  );

  // Step 3: Create a new credential offer
  const offerCredential = await createCredentialOffer(
    tenantResponse.response.tenantId,
    {
      credentialTemplateId:
        createCredentialTemplateResponse.response.credentialTemplateId,
      connectionId: connectionResponse.response.connectionId,
      holderDid: tenantResponse.response.dids[0].did,
    }
  );

  // Step 4: Create a new verification template
  const createVerificationTemplateResponse = await createVerificationTemplate(
    tenantResponse.response.tenantId,
    {
      restriction: {
        credentialTemplateId:
          createCredentialTemplateResponse.response.credentialTemplateId,
      },
    }
  );

  // Step 5: Send a proof request
  const sentProofRequest = await sendProofRequest(
    tenantResponse.response.tenantId,
    createVerificationTemplateResponse.response.verificationTemplateId,
    connectionResponse.response.connectionId
  );
}
cheqdWorkFlow();
