import { signIn } from '@/configs/auth'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div>
      <h1>
        Авторизация
      </h1>
        <form className='flex flex-col' action={async (formData) => {
        "use server"
        const data = {
          email: formData.get("email") || "",
          password: formData.get("password") || ""
        }
        await signIn("credentials", {
          ...data,
          redirectTo: "/"
        })
      }}>
        <input id='email' name='email' type='email' autoComplete="email"/>
        <input id='password' name='password' type='password' autoComplete="password"/>
        <button type='submit'>signin</button>
      </form>
    </div>
  )
}
