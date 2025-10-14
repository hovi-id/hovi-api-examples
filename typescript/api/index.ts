import { cheqdWorkFlow } from "./cheqd";
import { openIdWorkFlow } from "./openid";
import dotenv from "dotenv";

dotenv.config();
export const config = {
  base_url: process.env.BASE_URL,
  api_key: process.env.API_KEY,
};
/**
 * Main entry point for the Hovi API example code.
 *
 * This function demonstrates the sequence of API calls required to
 * create a tenant, create a credential template, create a credential
 * offer, create a verification template, and send a proof request.
 *
 */
async function main() {
  // OpenId Work Flow
  // const openId = await openIdWorkFlow();

  // Cheqd Work Flow
  const cheqd = await cheqdWorkFlow();
}

main();
