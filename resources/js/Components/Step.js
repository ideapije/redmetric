import React from 'react'
import classNames from 'classnames'

export default function Step({ items }) {

    const Item = ({ title, subtitle, active = false }) => (
        <div className={classNames(
            'border-t-4', 'pt-4',
            {
                'border-red-500': active,
                'border-gray-200': !active
            }
        )}>
            <p className={classNames(
                'uppercase',
                'font-bold',
                {
                    'text-red-500': active,
                    'text-gray-400': !active
                })}
            >
                {title}
            </p>
            <p className="font-semibold">{subtitle}</p>
        </div>
    )

    return (
        <div className="grid grid-cols-6 gap-4 w-3/4 m-auto pt-5">
            {items && items.map((item, ix) => <Item {...item} key={ix} />)}
        </div>
    )
}
