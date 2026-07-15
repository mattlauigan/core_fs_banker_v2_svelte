export interface LoginData {
  token_type: "Access" | "Bearer" | "Refresh";
  expires_in: number
  access_token: string
  token?: string
}
