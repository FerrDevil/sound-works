
import { redirect } from 'next/navigation'

import { getSession } from '@/auth/core/auth'
import SignUpForm from '@/auth/components/forms/SignUpForm'

export default async function SignUpPage() {
  const session = await getSession()
  if (session) redirect("/")
  return (
    <main className="flex flex-col p-5 overflow-auto isolate md:ml-(--main-content-ml) pb-[70px] gap-6">
      <div className='m-auto px-10 py-6 max-sm:p-4  bg-[#1F1F1F] gap-8 grid max-w-[600px] w-[100%] rounded-[8px]'>
        <h1 className='text-xl'>Регистрация</h1>
        <SignUpForm/>
        </div>
    </main>
  )
}


