import { jsonLdCredentialTemplate, jsonLdVerificationTemplate } from "./faker";
import { createConnection } from "./privado/connection";
import { createCredentialOffer } from "./privado/issue";
import { sendProofRequest } from "./privado/verify";
import {
  createCredentialTemplate,
  createVerificationTemplate,
} from "./utils/templates";
import { createTenant } from "./utils/tenant";

export async function privadoJsonLdWorkFlow() {
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
    { ...jsonLdCredentialTemplate, privadoCredentialType: "jsonld-sig" },
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
        age: 40,
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
