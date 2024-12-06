"use client"

import * as React from 'react';
import { useSearchParams } from "next/navigation";

export default function SearchParamProvider({ contentElement }: { contentElement: React.ReactElement }) {
    const searchParams = useSearchParams();
    return React.cloneElement(contentElement, Object.fromEntries(searchParams.entries()))
}