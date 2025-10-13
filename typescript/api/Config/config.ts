import dotenv from "dotenv";
import path from "path";

export const config = dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  base_url: process.env.BASE_URL,
  api_key: process.env.API_KEY,
  cloud_wallet_url: process.env.CLOUD_WALLET_URL,
  cloud_wallet_api_key: process.env.CLOUD_WALLET_API_KEY,
};
