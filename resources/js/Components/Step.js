import React from 'react';
import classNames from 'classnames';
import { GridItem, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';

export default function Step({ items, page }) {

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
    );

    const columns = useBreakpointValue({ base: 1, md: 6 });
    return (
        <SimpleGrid columnGap={4} w="75%" pt={5} m="auto" columns={columns}>
            {items && items.map((item, ix) => (
                <GridItem colSpan={1} key={ix}>
                    <Item {...item} active={(ix + 1 === page)} />
                </GridItem>
            ))}
        </SimpleGrid>
    );
}
