import { faker } from "@faker-js/faker";
import { createCredentialOffer } from "./open-id/issue";
import { sendProofRequest } from "./open-id/verify";
import {
  createCredentialTemplate,
  createVerificationTemplate,
} from "./utils/templates";
import { createTenant } from "./utils/tenant";
import {
  openidMdocCredentialTemplate,
  openidMdocVerificationTemplate,
  openidSdJwtCredentialTemplate,
  openidSdJwtVerificationTemplate,
} from "./faker";

/**
 * Executes the OpenID workflow, which includes the following steps:
 * 1. Creates a new tenant with specified details.
 * 2. Creates a new credential template for the tenant.
 * 3. Issues a credential offer based on the created template.
 * 4. Creates a verification template with restrictions based on the credential template.
 * 5. Sends a proof request using the verification template.
 *
 * This function demonstrates the end-to-end process of tenant creation, credential issuance,
 * and verification using the OpenID API.
 *
 * @returns {Promise<void>} A promise that resolves when the workflow is complete.
 */
export async function openIdSdJwtWorkFlow() {
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
    openidSdJwtCredentialTemplate,
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
    },
    "sd-jwt"
  );
  // Step 4: Create a new verification template
  const createVerificationTemplateResponse = await createVerificationTemplate(
    tenantResponse.response.tenantId,
    {
      ...openidSdJwtVerificationTemplate,
      restrictions: {
        credentialTemplateId:
          createCredentialTemplateResponse.response.credentialTemplateId,
      },
    },
    "sd-jwt"
  );
  // Step 5: Send a proof request
  const sentProofRequest = await sendProofRequest(
    tenantResponse.response.tenantId,
    createVerificationTemplateResponse.response.verificationTemplateId
  );
}

export async function openIdJsonLdWorkFlow() {
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
    openidSdJwtCredentialTemplate,
    "jsonld"
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
    },
    "jsonld"
  );
  // Step 4: Create a new verification template
  const createVerificationTemplateResponse = await createVerificationTemplate(
    tenantResponse.response.tenantId,
    {
      ...openidSdJwtVerificationTemplate,
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
    createVerificationTemplateResponse.response.verificationTemplateId
  );
}

export async function openIDmDocWorkFlow() {
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
    openidMdocCredentialTemplate,
    "mdoc"
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
    },
    "mdoc"
  );
  // Step 4: Create a new verification template
  const createVerificationTemplateResponse = await createVerificationTemplate(
    tenantResponse.response.tenantId,
    {
      ...openidMdocVerificationTemplate,
      restrictions: {
        credentialTemplateId:
          createCredentialTemplateResponse.response.credentialTemplateId,
      },
    },
    "mdoc"
  );
  // Step 5: Send a proof request
  const sentProofRequest = await sendProofRequest(
    tenantResponse.response.tenantId,
    createVerificationTemplateResponse.response.verificationTemplateId
  );
}
