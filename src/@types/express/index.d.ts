export {};

declare global {
  namespace Express {
    interface Request {
      user: {
        id?: string;
      };
    }
  }
}

declare module "http" {
  interface IncomingHttpHeaders {
    "olx-token"?: string;
  }
}
