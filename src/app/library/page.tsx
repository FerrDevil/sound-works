import { auth } from '@/configs/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function LibraryPage() {
	const session = await auth()
	if (!session?.user) return redirect("/signIn")
	return (
		<div>
			вф
		</div>

		
	)
}
