"use client"

type InputProps = {
    isError: boolean,
    errorMessage?: string, 
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ isError, errorMessage, ...props } : InputProps) {
  return (
    <div className="grid gap-3 ">
        <div className='relative grid input-wrapper'>
            <input {...props} placeholder=' ' aria-invalid={isError ? "true" : "false"}/>
            <label htmlFor={props.id}>{props.placeholder}</label>
        </div>
        { isError && <span className=" ml-2 text-[0.8rem] text-(--error-color)">{errorMessage}</span>}

    </div>
  )
}
