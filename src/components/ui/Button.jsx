import React from 'react';


const Button = ({
    children,
    onClick,
    type = 'button',
    disabled = false,
    className = '',
    ...props
}) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition ${className}`}
        {...props}
    >
        {children}
    </button>
);

export {Button} ;