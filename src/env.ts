import * as z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.url().startsWith("postgresql://"),
});

export const env = envSchema.parse(Bun.env);
