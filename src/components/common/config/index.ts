import { registerAs } from "@nestjs/config";

export default registerAs("config", () => {
  return {
    DB_URI: `${process.env.MONGODB_URL}/${process.env.DATABASE_URL}`,
    PORT: parseInt(process.env.PORT, 10) || 3000,
    JWT_KEY: process.env.JWT_KEY,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  };
});
