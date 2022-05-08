declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGODB_URL: string;
      TOKEN_SECRET: string;
    }
  }
}

export {}
