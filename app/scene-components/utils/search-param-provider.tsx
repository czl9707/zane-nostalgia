"use client"

import * as React from 'react';
import { useSearchParams } from "next/navigation";

export default function SearchParamProvider({ children }: { children: React.ReactElement }) {
    const searchParams = useSearchParams();
    return React.cloneElement(children, Object.fromEntries(searchParams.entries()));
}