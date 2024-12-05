"use client"

import * as React from 'react';
import { useSearchParams } from "next/navigation";

export default function SearchParamProvider({ Component }: { Component: React.FC<Record<string, string>> }) {
    const searchParams = useSearchParams();

    return <Component {...Object.fromEntries(searchParams.entries())} />
}