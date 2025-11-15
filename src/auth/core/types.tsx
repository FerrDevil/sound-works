import z from "zod"
import { SignInSchema, SignUpSchema } from "./schemas"

export type SignInData = z.infer<typeof SignInSchema>

export type SignUpData = z.infer<typeof SignUpSchema> 