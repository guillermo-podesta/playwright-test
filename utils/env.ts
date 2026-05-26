import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
  quiet: true,
});

const environmentVariablesSchema = z.object({
  SAUCE_USERNAME: z.string().min(1, { message: 'Required' }),
  SAUCE_PASSWORD: z.string().min(1, { message: 'Required' }),
});

type EnvironmentVariables = z.infer<typeof environmentVariablesSchema>;

const environmentVariables = environmentVariablesSchema.parse({
  SAUCE_USERNAME: process.env.SAUCE_USERNAME,
  SAUCE_PASSWORD: process.env.SAUCE_PASSWORD,
});

export default environmentVariables;
export type { EnvironmentVariables };
