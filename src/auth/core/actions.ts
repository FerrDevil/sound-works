"use server"

import { AUTH_COOKIES_NAME, setSession } from "@/auth/core/auth"
import { db } from "@/db/db"
import { usersTable } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { SignInData, SignUpData } from "./types"
import { SignInSchema, SignUpSchema } from "./schemas"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export async function signInAction(signInData: SignInData){
	const {data, success} = SignInSchema.safeParse(signInData)
	if (!success) return {code: 400, error: "Incorrect user input"}
	const users = await db.select({id: usersTable.id, role: usersTable.role}).from(usersTable).where(and(eq(usersTable.email, data.email), eq(usersTable.password, data.password))).limit(1)
	if (users.length === 0) return {code: 401, error: "No such user exists"}
	await setSession(users[0], data.rememberMe ? "cookie": "session")     
}



export async function signUpAction(signUpData: SignUpData){
	const {data, success} = SignUpSchema.safeParse(signUpData)
	if (!success) return {code: 400, error: "Incorrect user input"}
	const users = await db.select().from(usersTable).where(eq(usersTable.email, data.email)).limit(1)
	if (users.length > 0) return {code: 403, error: "User already exists"}
	try{
		const user = await db.insert(usersTable).values({
			name: data.name,
			email: data.email,
			password: data.password,
		}).$returningId()
		const users = await db.select({ id: usersTable.id, role: usersTable.role }).from(usersTable).where(eq(usersTable.id, user[0].id)).limit(1)
		await setSession(users[0] , "session" )  
	}
	catch {
		return {code: 500, error: "Internal server error"}
	}
}

export async function signOut() {
	(await cookies()).delete(AUTH_COOKIES_NAME)
	redirect("/")
	
}