// FILE: typescript/api/privado-id.ts (MODIFIED)

import { faker } from "@faker-js/faker";
import { jsonLdCredentialTemplatePrivadoId } from "./faker";
import { createConnection } from "./privado/connection";
import { offerCredentialJsonLd } from "./privado/issue"; // Import refactored function
import { sendProofRequest } from "./privado/verify"; // Import from original location
import {
  createCredentialTemplateJsonLd,
  createVerificationTemplateJsonLd,
} from "./utils/templates"; // Import from centralized location
import { createTenant } from "./utils/tenant";
import chalk from "chalk";

export async function privadoJsonLdWorkFlow() {
  console.log(chalk.blue.bold("\n--- Starting PrivadoID JSON-LD Workflow ---"));
  // Step 1: Create a new tenant
  const tenantResponse = await createTenant({
    tenantName: "PrivadoJsonLdTenant",
    tenantLabel: "Privado JSON-LD",
    tenantSecret: "secret-8",
    imageUrl: "https://yourdomain.com/logo.png",
  });
  const tenantId = tenantResponse.response.tenantId;

  // Step 2: Create a new credential template
  const createCredentialTemplateResponse = await createCredentialTemplateJsonLd(
    tenantId,
    jsonLdCredentialTemplatePrivadoId
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
      age: 40,
    },
    holderDid: tenantResponse.response.dids[0].did,
  });

  // Step 5: Create a new verification template
  const createVerificationTemplateResponse =
    await createVerificationTemplateJsonLd(tenantId, {
      name: faker.word.noun() + " ID",
      version: "1.0.1",
      description: faker.lorem.sentence(),
      restrictions: {
        credentialTemplateId: credentialTemplateId,
      },
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
    });
  const verificationTemplateId =
    createVerificationTemplateResponse.response.verificationTemplateId;

  // Step 6: Send a proof request
  await sendProofRequest(
    tenantId,
    verificationTemplateId,
    connectionResponse.connectionId
  );
  console.log(chalk.blue.bold("--- PrivadoID JSON-LD Workflow Complete ---"));
}
