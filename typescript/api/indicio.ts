// FILE: typescript/api/indicio.ts (MODIFIED)

import { createConnection } from "./indicio/connection";
import {
  createCredentialTemplateAnoncred,
  createCredentialTemplateJsonLd,
  createVerificationTemplateAnoncred,
  createVerificationTemplateJsonLd,
} from "./utils/templates"; // Import from centralized location
import { createTenant } from "./utils/tenant";
import {
  offerCredentialAnoncred,
  offerCredentialJsonLd,
} from "./indicio/issue"; // Import refactored functions
import { sendProofRequest } from "./indicio/verify"; // Import from original location
import {
  anoncredCredentialTemplate,
  anoncredVerificationTemplate,
  jsonLdCredentialTemplate,
  jsonLdVerificationTemplate,
} from "./faker";
import chalk from "chalk";

export async function indicioJsonLdWorkFlow() {
  console.log(chalk.blue.bold("\n--- Starting INDICIO JSON-LD Workflow ---"));
  // Step 1: Create a new tenant
  const tenantResponse = await createTenant({
    tenantName: "IndicioJsonLdTenant",
    tenantLabel: "Indicio JSON-LD",
    tenantSecret: "secret-3",
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

  // Step 3: Create a new connection
  const connectionResponse = await createConnection(
    tenantId,
    "Your Connection Name"
  );

  // Step 4: Create a new credential offer
  await offerCredentialJsonLd(tenantId, {
    credentialTemplateId: credentialTemplateId,
    connectionId: connectionResponse.connectionId,
    credentialValues: {
      age: 45,
    },
    holderDid: tenantResponse.response.dids[0].did,
  });

  // Step 5: Create a new verification template
  const createVerificationTemplateResponse =
    await createVerificationTemplateJsonLd(tenantId, {
      ...jsonLdVerificationTemplate,
      restrictions: {
        credentialTemplateId: credentialTemplateId,
      },
    });
  const verificationTemplateId =
    createVerificationTemplateResponse.response.verificationTemplateId;

  // Step 6: Send a proof request
  await sendProofRequest(
    tenantId,
    verificationTemplateId,
    connectionResponse.connectionId
  );
  console.log(chalk.blue.bold("--- INDICIO JSON-LD Workflow Complete ---"));
}

export async function indicioAnoncredWorkFlow() {
  console.log(chalk.blue.bold("\n--- Starting INDICIO Anoncred Workflow ---"));
  // Step 1: Create a new tenant
  const tenantResponse = await createTenant({
    tenantName: "IndicioAnoncredTenant",
    tenantLabel: "Indicio Anoncred",
    tenantSecret: "secret-4",
    imageUrl: "https://yourdomain.com/logo.png",
  });
  const tenantId = tenantResponse.response.tenantId;

  // Step 2: Create a new credential template
  const createCredentialTemplateResponse =
    await createCredentialTemplateAnoncred(
      tenantId,
      anoncredCredentialTemplate
    );
  const credentialTemplateId =
    createCredentialTemplateResponse.response.credentialTemplateId;

  // Step 3: Create a new connection
  const connectionResponse = await createConnection(
    tenantId,
    "Your Connection Name"
  );

  // Step 4: Create a new credential offer
  await offerCredentialAnoncred(tenantId, {
    credentialTemplateId: credentialTemplateId,
    connectionId: connectionResponse.connectionId,
    credentialValues: {
      age: "40",
    },
  });

  // Step 5: Create a new verification template
  const createVerificationTemplateResponse =
    await createVerificationTemplateAnoncred(
      tenantId,
      anoncredVerificationTemplate
    );
  const verificationTemplateId =
    createVerificationTemplateResponse.response.verificationTemplateId;

  // Step 6: Send a proof request
  await sendProofRequest(
    tenantId,
    verificationTemplateId,
    connectionResponse.connectionId
  );
  console.log(chalk.blue.bold("--- INDICIO Anoncred Workflow Complete ---"));
}
