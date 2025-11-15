"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { SignInData } from "../../core/types"
import { signInAction } from "../../core/actions"
import Input from "../Input/Input"
import { SignInSchema } from "@/auth/core/schemas"

export default function SignInForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    getValues
        
    } = useForm<SignInData>(
        {
            resolver: zodResolver(SignInSchema),
            mode: "onChange",
            defaultValues: {
                email: "",
                password: "",
                rememberMe: false
            }
        }
    )
   

    const onSubmit: SubmitHandler<SignInData> = async (data) => {
        const response = await signInAction(data)
        if (response) return console.log(response)
    }


    return (
        <form className='flex flex-col gap-5' onSubmit={(handleSubmit(onSubmit))} >
            <Input isError={!!errors.email} errorMessage={errors.email?.message} id='email' autoComplete="email" placeholder="Email" {...register("email")} /> 
            <Input isError={!!errors.password} errorMessage={errors.password?.message} id='password' type='password' autoComplete="password" placeholder="Пароль" {...register("password")} /> 
            <div className='flex gap-3'>
                <input className='ml-2 cursor-pointer'  id='rememberMe'  type='checkbox'  {...register("rememberMe")}/>
                <label className='cursor-pointer select-none' htmlFor='rememberMe'>Запомнить меня?</label>
            </div>
            
            
            <button disabled={ !isDirty || Object.keys(errors).length !== 0} className='rounded-[5px] p-3 bg-[#434343] disabled:bg-[#312f2f] disabled:text-[#c4c4c4] not-disabled:cursor-pointer select-none' type='submit' >Войти</button>
        </form>
    )
}
