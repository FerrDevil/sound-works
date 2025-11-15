import z from "zod";

export const SignInSchema = z.object({
    email: z.string("Представлена не строка").min(1, "Поле обязательно").regex(/^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i, "Неправильный формат email"),
    password: z.string("Представлена не строка").min(1, "Поле обязательно").max(16, "Пароль превышает 16 символов"),
    rememberMe: z.boolean()
})

export const SignUpSchema = z.object({
    email: z.string("Представлена не строка").min(1, "Поле обязательно").regex(/^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i, "Неправильный формат email"),
    name: z.string("Представлена не строка").min(1, "Поле обязательно").max(50, "Отображаемое имя превышает 50 символов") ,
    password: z.string("Представлена не строка").min(1, "Поле обязательно").max(16, "Пароль превышает 16 символов"),
    confirmPassword: z.string("Представлена не строка").min(1, "Поле обязательно").max(16, "Пароль превышает 16 символов"),
    signAgreement: z.boolean().refine(val => val, { message: "Поле обязательно"})
}).refine((data) => data.password === data.confirmPassword && data.password !== "", {
        message: "Пароли не совпадают",
        path: ["confirmPassword"],
    })
