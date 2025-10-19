import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
		credentials: { 
			email: { label: "Password", type: "password" } ,
			password: { label: "Password", type: "password" } 
		},
		async authorize(credentials) {
			if (credentials.password !== "password") return null
			return {
				id: "test",
				name: "Test User",
				email: "test@example.com",
				role: "user"
			}
		},
		}),
	],
	jwt: {
		
	},
	pages: {
		signIn: "/signIn",
		newUser: "/signUp"
	}
	})