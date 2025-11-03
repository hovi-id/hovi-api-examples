import { cheqdAnoncredWorkFlow, cheqdJsonLdWorkFlow } from "./cheqd";
import { indicioAnoncredWorkFlow, indicioJsonLdWorkFlow } from "./indicio";
import {
  openIdJsonLdWorkFlow,
  openIdSdJwtWorkFlow,
  openIDmDocWorkFlow,
} from "./open-id";
import dotenv from "dotenv";
import { privadoJsonLdWorkFlow } from "./privado-id";

dotenv.config();

export const config = {
  base_url: process.env.BASE_URL,
  api_key: process.env.API_KEY,
};

// This type is no longer needed by the refactored functions,
// but we can keep it for reference or future use.
export type TCredentialFormat = "mdoc" | "sd-jwt" | "jsonld" | "anoncred";

async function main() {
  console.log("Hovi API Examples Starting...\n");

  // ----------------------------------------------------------------------
  // 1. OpenID Work Flow (FULLY ENABLED EXAMPLE)
  // This workflow does not require a wallet connection to be established
  // and is good for initial testing.
  // ----------------------------------------------------------------------
  // await openIdSdJwtWorkFlow();
  // await openIdJsonLdWorkFlow();
  // await openIDmDocWorkFlow();

  // ----------------------------------------------------------------------
  // 2. Other Ecosystems (COMMENTED OUT FOR CLARITY)
  // These workflows require a wallet to scan a connection QR code.
  // Uncomment the desired block to run a specific ecosystem demonstration.
  // ----------------------------------------------------------------------

  /*
  Indicio Work flow
  */
  //  await indicioAnoncredWorkFlow();
  //  await indicioJsonLdWorkFlow();

  /*
  Cheqd Work Flow
  */
  // await cheqdJsonLdWorkFlow();
  await cheqdAnoncredWorkFlow();

  /*
  Privado Work Flow
  await privadoJsonLdWorkFlow();
  */
}

main().catch((error) => {
  console.error(
    "\n❌ A fatal error occurred during the main execution:",
    error.message
  );
  process.exit(1);
});
