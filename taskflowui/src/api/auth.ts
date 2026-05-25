import client from "./client"
import type { AuthResponse, LoginPayload, RegisterPayload, User } from "../types"

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await client.post("/auth/login", payload)
  return data
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await client.post("/auth/register", payload)
  return data
}

export async function refreshToken(token: string): Promise<AuthResponse> {
  const { data } = await client.post("/auth/refresh", {
    refresh_token: token,
  })
  return data
}

export async function getMe(): Promise<User> {
  const { data } = await client.get("/auth/me")
  return data
}
