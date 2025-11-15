"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { SignUpData } from "@/auth/core/types"
import { signUpAction } from "@/auth/core/actions"
import Input from "../Input/Input"
import { SignUpSchema } from "@/auth/core/schemas"

export default function SignUpForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        
    } = useForm<SignUpData>(
        {
            resolver: zodResolver(SignUpSchema),
            mode: "onChange",
            defaultValues: {
                email: "",
                name: "",
                password: "",
                confirmPassword: "",
                signAgreement: false
            }
        }
    )
   

    const onSubmit: SubmitHandler<SignUpData> = async (data) => {
        const response = await signUpAction(data)
        if (response) return console.log(response)
    }

    return (
        <form className='flex flex-col gap-5' onSubmit={(handleSubmit(onSubmit))} >
            <Input isError={!!errors.email} errorMessage={errors.email?.message} id='email' autoComplete="email" placeholder="Email" {...register("email")} /> 
            <Input isError={!!errors.name} errorMessage={errors.name?.message} id='name' autoComplete="name" placeholder="Отображаемое имя" {...register("name")} /> 
            <Input isError={!!errors.password} errorMessage={errors.password?.message} id='password' type='password' autoComplete="password" placeholder="Пароль" {...register("password")} /> 
            <Input isError={!!errors.confirmPassword} errorMessage={errors.confirmPassword?.message} id='confirmPassword' type='password' placeholder="Повторите пароль" {...register("confirmPassword")} /> 
            <div className='flex gap-3'>
                <input className='ml-2 cursor-pointer'  id='signAgreement'  type='checkbox'  {...register("signAgreement")}/>
                <label className='cursor-pointer select-none md:truncate text-[0.8rem]' htmlFor='signAgreement'>Я соглашаюсь с правилами сервиса и на обработку персональных данных</label>
            </div>
            
            
            <button disabled={ !isDirty || Object.keys(errors).length !== 0} className='rounded-[5px] p-3 bg-[#434343] disabled:bg-[#312f2f] disabled:text-[#c4c4c4] not-disabled:cursor-pointer select-none' type='submit' >Зарегистрироваться</button>
        </form>
    )
}
