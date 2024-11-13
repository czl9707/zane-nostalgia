"use client"

import * as React from 'react';
import Button, { ButtonProps } from './button';
import { useRouter } from 'next/navigation';

const ButtonLink = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & ButtonProps & { href: string }>(
    function ButtonLink({ href, ...props }, ref) {
        const router = useRouter();
        return <Button {...props} ref={ref} onClick={() => router.push(href)} />
    }
)

export default ButtonLink;