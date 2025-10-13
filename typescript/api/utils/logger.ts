import chalk from "chalk";

const timestamp = () => new Date().toISOString();
const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(chalk.blue(`[INFO] [${timestamp()}]`), message, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(chalk.green(`[SUCCESS] [${timestamp()}]`), message, ...args);
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(chalk.yellow(`[WARN] [${timestamp()}]`), message, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(chalk.red(`[ERROR] [${timestamp()}]`), message, ...args);
  },
};
export default logger;
