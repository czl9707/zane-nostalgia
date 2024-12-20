import { styled } from "@pigment-css/react";
import Button from "../../components/ui/button";
import Link from "next/link";

const ExtendingButtonContainer = styled(Button)(({ theme }) => ({
    paddingTop: "0.75rem", paddingBottom: "0.75rem",
    ".former": {
        transition: `width ${theme.transition.short} ease-out`,
        width: ".5rem"
    },
    ".latter": {
        transition: `width ${theme.transition.short} ease-out`,
        width: "1.5rem"
    },
    "&:hover": {
        ".former": { width: "2rem" },
        ".latter": { width: "0rem" },
    }
}));

export default function ExtendingButton({ href, content }: { href: string, content: string }) {
    return (
        <Link href={href}>
            <ExtendingButtonContainer variant="filled" color="primary" >
                <div style={{ width: "1.5rem" }} />
                {content}
                <div className="former" />
                {">"}
                <div className="latter" />
            </ExtendingButtonContainer>
        </Link>
    )
}