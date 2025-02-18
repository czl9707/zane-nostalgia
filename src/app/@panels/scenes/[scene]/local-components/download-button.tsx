"use client"

import * as React from 'react';

import Button from "@/components/ui/button"
import { Download } from "@/components/ui/icons/icons"

interface DownloadButtonProps {
    content: string,
    fileName: string,
}

export default function DownloadButton({ content, fileName }: DownloadButtonProps) {
    function handleClick() {
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    return (
        <Button variant='filled' color="primary" onClick={handleClick}>
            Download {fileName}
            <Download />
        </Button>
    )
}