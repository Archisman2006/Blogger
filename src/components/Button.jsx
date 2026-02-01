export  function Button({children,type="button",className="",...props}){
    return (
        <button {...props}  className={className} >
        {children}
        </button>
    )
}