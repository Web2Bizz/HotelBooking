namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    HOST: string;
    PG_DATABASE: string;
    PG_ADDRESS: string;
    PG_PORT: number;
    PG_USER: string;
    PG_PASSWORD: string;
    ADMIN_API_HOSTNAME: string;
  }
}