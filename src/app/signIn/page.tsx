
import { redirect } from 'next/navigation'

import { getSession } from '@/auth/core/auth'
import SignInForm from '@/auth/components/forms/SignInForm'

export default async function SignInPage() {
  const session = await getSession()
  if (session) redirect("/")
  return (
    <main className="flex flex-col p-5 overflow-auto isolate md:ml-(--main-content-ml)  max-sm:pb-[150px] md:pb-[70px] gap-6">
      <div className='m-auto p-4 bg-[#1F1F1F] gap-8 grid max-w-[600px] w-[100%] rounded-[8px]'>
        <h1 className='text-xl'>Авторизация</h1>
        <SignInForm/>
      </div>
    </main>
  )
}


