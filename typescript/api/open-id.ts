// FILE: typescript/api/open-id.ts (MODIFIED)

import { faker } from "@faker-js/faker";
import {
  offerCredentialJsonLd,
  offerCredentialMdoc,
  offerCredentialSdJwt,
} from "./open-id/issue"; // Import refactored functions
import { sendProofRequest } from "./open-id/verify"; // Import from original location
import {
  createCredentialTemplateJsonLd,
  createCredentialTemplateMdoc,
  createCredentialTemplateSdJwt,
  createVerificationTemplateJsonLd,
  createVerificationTemplateMdoc,
  createVerificationTemplateSdJwt,
} from "./utils/templates"; // Import from centralized location
import { createTenant } from "./utils/tenant";
import {
  jsonLdCredentialTemplate,
  jsonLdVerificationTemplate,
  openidMdocCredentialTemplate,
  openidMdocVerificationTemplate,
  openidSdJwtCredentialTemplate,
  openidSdJwtVerificationTemplate,
} from "./faker";
import chalk from "chalk";

export async function openIdSdJwtWorkFlow() {
  console.log(chalk.blue.bold("\n--- Starting OpenID SD-JWT Workflow ---"));
  // Step 1: Create a new tenant
  const tenantResponse = await createTenant({
    tenantName: "OpenIdSdJwtTenant",
    tenantLabel: "OpenID SD-JWT",
    tenantSecret: "secret-5",
    imageUrl: "https://yourdomain.com/logo.png",
  });
  const tenantId = tenantResponse.response.tenantId;

  // Step 2: Create a new credential template
  const createCredentialTemplateResponse = await createCredentialTemplateSdJwt(
    tenantId,
    openidSdJwtCredentialTemplate
  );
  const credentialTemplateId =
    createCredentialTemplateResponse.response.credentialTemplateId;

  // Step 3: Create a new credential offer
  await offerCredentialSdJwt(tenantId, {
    credentialTemplateId: credentialTemplateId,
    credentialValues: {
      age: faker.number.int({ min: 18, max: 65 }),
    },
  });

  // Step 4: Create a new verification template
  const createVerificationTemplateResponse =
    await createVerificationTemplateSdJwt(tenantId, {
      ...openidSdJwtVerificationTemplate,
      restrictions: {
        credentialTemplateId: credentialTemplateId,
      },
    });
  const verificationTemplateId =
    createVerificationTemplateResponse.response.verificationTemplateId;

  // Step 5: Send a proof request
  await sendProofRequest(tenantId, verificationTemplateId);
  console.log(chalk.blue.bold("--- OpenID SD-JWT Workflow Complete ---"));
}

export async function openIdJsonLdWorkFlow() {
  console.log(chalk.blue.bold("\n--- Starting OpenID JSON-LD Workflow ---"));
  // Step 1: Create a new tenant
  const tenantResponse = await createTenant({
    tenantName: "OpenIdJsonLdTenant",
    tenantLabel: "OpenID JSON-LD",
    tenantSecret: "secret-6",
    imageUrl: "https://yourdomain.com/logo.png",
  });
  const tenantId = tenantResponse.response.tenantId;

  // Step 2: Create a new credential template
  const createCredentialTemplateResponse = await createCredentialTemplateJsonLd(
    tenantId,
    jsonLdCredentialTemplate
  );
  const credentialTemplateId =
    createCredentialTemplateResponse.response.credentialTemplateId;

  // Step 3: Create a new credential offer
  await offerCredentialJsonLd(tenantId, {
    credentialTemplateId: credentialTemplateId,
    credentialValues: {
      age: faker.number.int({ min: 18, max: 65 }),
    },
  });

  // Step 4: Create a new verification template
  const createVerificationTemplateResponse =
    await createVerificationTemplateJsonLd(tenantId, {
      ...jsonLdVerificationTemplate,
      restrictions: {
        credentialTemplateId: credentialTemplateId,
      },
    });
  const verificationTemplateId =
    createVerificationTemplateResponse.response.verificationTemplateId;

  // Step 5: Send a proof request
  await sendProofRequest(tenantId, verificationTemplateId);
  console.log(chalk.blue.bold("--- OpenID JSON-LD Workflow Complete ---"));
}

export async function openIDmDocWorkFlow() {
  console.log(chalk.blue.bold("\n--- Starting OpenID mDoc Workflow ---"));
  // Step 1: Create a new tenant
  const tenantResponse = await createTenant({
    tenantName: "OpenIdMdocTenant",
    tenantLabel: "OpenID mDoc",
    tenantSecret: "secret-7",
    imageUrl: "https://yourdomain.com/logo.png",
  });
  const tenantId = tenantResponse.response.tenantId;

  // Step 2: Create a new credential template
  const createCredentialTemplateResponse = await createCredentialTemplateMdoc(
    tenantId,
    openidMdocCredentialTemplate
  );
  const credentialTemplateId =
    createCredentialTemplateResponse.response.credentialTemplateId;

  // Step 3: Create a new credential offer
  await offerCredentialMdoc(tenantId, {
    credentialTemplateId: credentialTemplateId,
    credentialValues: {
      age: faker.number.int({ min: 18, max: 65 }),
    },
  });

  // Step 4: Create a new verification template
  const createVerificationTemplateResponse =
    await createVerificationTemplateMdoc(tenantId, {
      ...openidMdocVerificationTemplate,
      restrictions: {
        credentialTemplateId: credentialTemplateId,
      },
    });
  const verificationTemplateId =
    createVerificationTemplateResponse.response.verificationTemplateId;

  // Step 5: Send a proof request
  await sendProofRequest(tenantId, verificationTemplateId);
  console.log(chalk.blue.bold("--- OpenID mDoc Workflow Complete ---"));
}
