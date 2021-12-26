import React from 'react'

export default function Title({ children }) {
    return (
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            {children}
        </h2>
    )
}

