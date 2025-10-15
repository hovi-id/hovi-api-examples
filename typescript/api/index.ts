import { cheqdWorkFlow } from "./cheqd";
import { openIdWorkFlow } from "./openid";
import dotenv from "dotenv";

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
  const openId = await openIdWorkFlow(); // sdfsdf

  // Cheqd Work Flow
  // const cheqd = await cheqdWorkFlow();
}

main();
