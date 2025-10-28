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
export type TCredentialFormat = "mdoc" | "sd-jwt" | "jsonld" | "anoncred";

/**
 * The main entry point for executing authentication workflows.
 *
 * This function sequentially runs the OpenId workflow and, optionally, the Cheqd workflow.
 *
 * @returns {Promise<void>} A promise that resolves when all workflows have completed.
 */
async function main() {
  // OpenId Work Flow
  // const openId = await openIdJsonLdWorkFlow();
  // const openId = await openIdSdJwtWorkFlow();
  // const openId = await openIDmDocWorkFlow();

  // Indicio Work flow
  // const indicio = await indicioJsonLdWorkFlow();
  // const indicio = await indicioAnoncredWorkFlow();

  // Cheqd Work Flow
  // const cheqd = await cheqdAnoncredWorkFlow();
  // const cheqd = await cheqdJsonLdWorkFlow();

  // Privado Work Flow
  // const privado = await privadoJsonLdWorkFlow();
}

main();
