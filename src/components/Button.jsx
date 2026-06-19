import React from 'react'

function Button({
    children,
    type = 'button',                // Explicit setting type = "button"   -->    Does not trigger form's onSubmit
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props                        // ...props - for sending forward   -->   onClick, disabled, etc.
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button