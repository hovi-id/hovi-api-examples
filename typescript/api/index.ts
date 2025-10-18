import { cheqdAnoncredWorkFlow, cheqdJsonLdWorkFlow } from "./cheqd";
import { indicioAnoncredWorkFlow, indicioJsonLdWorkFlow } from "./indicio";
import {
  openIdJsonLdWorkFlow,
  openIdSdJwtWorkFlow,
  openIDmDocWorkFlow,
} from "./openid";
import dotenv from "dotenv";
import { privadoJsonLdWorkFlow } from "./privado";

dotenv.config();
export const config = {
  base_url: process.env.BASE_URL,
  api_key: process.env.API_KEY,
};

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
  const privado = await privadoJsonLdWorkFlow();
}

main();
