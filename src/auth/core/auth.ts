
import type { JWTPayload } from "jose"
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { cache } from 'react'

 
const secretKey = process.env.AUTH_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

const COOKIE_MAX_AGE =  30 * 24 * 60 * 60 
export const AUTH_COOKIES_NAME = process.env.AUTH_COOKIES_NAME || ""


interface SessionPayload extends JWTPayload {
    id: string,
    role: "user" | "admin"
}
 
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  
  try {
    
    return {
      payload: (await jwtVerify(session, encodedKey, { algorithms: ['HS256'] })).payload as  SessionPayload,
      error: null
    }
    
  } catch  {
    return {
      payload: null,
      error: {
        error: "JWT verify error"
      }
    }
    
  }

}

export async function setSession(payload: SessionPayload , storageType: "session" | "cookie" = "cookie" ) {
    const jwtToken = await encrypt(payload)
    const cookiesObject = await cookies()
    if (storageType === "cookie"){
      cookiesObject.set(AUTH_COOKIES_NAME, jwtToken, {
        secure: false,
        sameSite: "lax",
        httpOnly: true,
        maxAge:COOKIE_MAX_AGE
      })
    }
    else if (storageType === "session"){
      cookiesObject.set(AUTH_COOKIES_NAME, jwtToken, {
        secure: false,
        sameSite: "lax",
        httpOnly: true,
      })
    }
    
}

export const getSession = cache(async function (): Promise<SessionPayload | null> {
    const jwtToken = (await cookies()).get(AUTH_COOKIES_NAME)?.value
    const {error, payload} = await decrypt(jwtToken)
    if(error) return null
    return payload
})

