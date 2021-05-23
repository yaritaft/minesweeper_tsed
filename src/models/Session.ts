export class Session {
  token: string;
  userId: string;
}

export interface TokenHeader{
    authentication: string;
}