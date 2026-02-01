import { useId,forwardRef } from "react"

const Input=forwardRef(function Input(
    {label,type="text",className,inputclass,...props},ref
){
    const id=useId();
return (
    <div className={`${className}`}>
        {
            label && <label htmlFor={id}>{label}</label>
        }
        <input  type={type} className={`${inputclass}`} ref={ref} {...props}  id={id}/>
    </div>
)
});
export {Input};