declare namespace Express {
  interface Request {
    user?: {
      id: number;
      email: number;
    };
  }
}
