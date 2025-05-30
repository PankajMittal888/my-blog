import React, { useId, forwardRef } from 'react';

const Select = forwardRef(function Select({
    options,
    className = "",
    label,
    ...props
}, ref) {
    const id = useId();

    return (
        <div className='w-full'>
            {label && (
                <label htmlFor={id} className='inline-block mb-1 pl-1 text-sm font-medium text-gray-700'>
                    {label}
                </label>
            )}
            <select
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                {...props}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;
