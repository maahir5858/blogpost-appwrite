import React from 'react'

// React 19 version   -->

// const Input = forwardRef((props, ref) => {
//   return <input ref={ref} />;
// });

// React 18 version   -->  forwardRef( ({...props}, ref) => { } )

function Input({
    label,
    type = 'text',
    className = '',
    ref,
    ...props
}) {
    return (
        <div>
            label && (<label>{label}</label>)
    
            <input 
                ref={ref}
                type={type} 
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                {...props}
            />
        </div>
    )
}

// const inputRef = useRef();
// <Input ref={inputRef} />

// inputRef.current.focus();            // USAGE...

export default Input