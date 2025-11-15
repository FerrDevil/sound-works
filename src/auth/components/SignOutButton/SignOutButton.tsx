"use client"

import { signOut } from "@/auth/core/actions"
import type { ButtonHTMLAttributes, PropsWithChildren } from "react"

type SignOutButtonProps = PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>

export default function SignOutButton({children, ...props} : SignOutButtonProps) {
  return (
    <button {...props} onClick={() => signOut()}>
        {children}
    </button>
  )
}
