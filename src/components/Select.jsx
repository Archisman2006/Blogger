import { useId,forwardRef } from "react"

const Select= forwardRef(function Select({options,label,className,...props},ref){
    const id=useId();
    return (
        <div>
        {label  && <label htmlFor={id} className={className}>{label}</label>}
        <select {...props} ref={ref} id={id}>
        {
            options?.map((option)=>(
            <option value={option} key={option}>{option}</option> 
            ))
        }
        </select>
        </div>
    )
});

export {Select};