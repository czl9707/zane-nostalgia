import * as React from 'react';


interface IconOwnProps {
    size?: number
    viewBoxSize?: string
}
export type IconProps = IconOwnProps & React.HTMLAttributes<SVGSVGElement>;

export const SvgIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function SvgIcon({ size = 1, viewBoxSize = "0 -960 960 960", ...other }, ref) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                height={`${size * 2}rem`} width={`${size * 2}rem`}
                viewBox={viewBoxSize} fill="#e8eaed"
                {...other} ref={ref} />
        );
    }
)

export const DummyIcon = SvgIcon;

export const KeyboardArrowDown = React.forwardRef<SVGSVGElement, IconProps>(
    function KeyboardArrowDown(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M480-357.85 253.85-584 296-626.15l184 184 184-184L706.15-584 480-357.85Z" />
            </SvgIcon>
        );
    }
)

export const Menu = React.forwardRef<SVGSVGElement, IconProps>(
    function Menu(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M140-254.62v-59.99h680v59.99H140ZM140-450v-60h680v60H140Zm0-195.39v-59.99h680v59.99H140Z" />
            </SvgIcon>
        );
    }
)

export const Close = React.forwardRef<SVGSVGElement, IconProps>(
    function Close(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z" />
            </SvgIcon>
        );
    }
)

export const Copy = React.forwardRef<SVGSVGElement, IconProps>(
    function Copy(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M362.31-260Q332-260 311-281q-21-21-21-51.31v-455.38Q290-818 311-839q21-21 51.31-21h335.38Q728-860 749-839q21 21 21 51.31v455.38Q770-302 749-281q-21 21-51.31 21H362.31Zm0-60h335.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H362.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Zm-140 200Q192-120 171-141q-21-21-21-51.31v-515.38h60v515.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h395.38v60H222.31ZM350-320v-480 480Z" />
            </SvgIcon>
        );
    }
)

export const Check = React.forwardRef<SVGSVGElement, IconProps>(
    function Check(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M382-253.85 168.62-467.23 211.38-510 382-339.38 748.62-706l42.76 42.77L382-253.85Z" />
            </SvgIcon>
        );
    }
)

export const Error = React.forwardRef<SVGSVGElement, IconProps>(
    function Error(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M480-290.77q13.73 0 23.02-9.29t9.29-23.02q0-13.73-9.29-23.02-9.29-9.28-23.02-9.28t-23.02 9.28q-9.29 9.29-9.29 23.02t9.29 23.02q9.29 9.29 23.02 9.29Zm-30-146.15h60v-240h-60v240ZM480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm-.07-60q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </SvgIcon>
        );
    }
);


export const Orbit = React.forwardRef<SVGSVGElement, IconProps>(
    function Orbit(props, ref) {
        return (
            <SvgIcon {...props} style={{ transform: "scale(0.75)" }} ref={ref}>
                <path d="M240-100q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 22-6.5 42.5T354-159v-27q30 13 62 19.5t64 6.5q134 0 227-93t93-227h80q0 83-31.5 156T763-197q-54 54-127 85.5T480-80q-45 0-88-9.5T309-118q-16 9-33.5 13.5T240-100Zm0-80q25 0 42.5-17.5T300-240q0-25-17.5-42.5T240-300q-25 0-42.5 17.5T180-240q0 25 17.5 42.5T240-180Zm240-160q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41ZM80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q45 0 88 9.5t83 28.5q16-9 33.5-13.5T720-860q58 0 99 41t41 99q0 58-41 99t-99 41q-58 0-99-41t-41-99q0-22 6.5-42.5T606-801v27q-30-13-62-19.5t-64-6.5q-134 0-227 93t-93 227H80Zm640-180q25 0 42.5-17.5T780-720q0-25-17.5-42.5T720-780q-25 0-42.5 17.5T660-720q0 25 17.5 42.5T720-660ZM240-240Zm480-480Z" />
            </SvgIcon>
        );
    }
)

export const Github = React.forwardRef<SVGSVGElement, IconProps>(
    function Github(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} viewBoxSize="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
            </SvgIcon>
        );
    }
)

export const DoubleArrow = React.forwardRef<SVGSVGElement, IconProps>(
    function DoubleArrow(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="m262.77-210 193.08-270-193.08-270h73.38l193.08 270-193.08 270h-73.38Zm234.92 0 193.08-270-193.08-270h73.39l193.07 270-193.07 270h-73.39Z" />
            </SvgIcon>
        );
    }
)

export const FloatLandscape2 = React.forwardRef<SVGSVGElement, IconProps>(
    function FloatLandscape2(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M512.31-392.31h200v-240h-200v240ZM172.31-180Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21h615.38Q818-780 839-759q21 21 21 51.31v455.38Q860-222 839-201q-21 21-51.31 21H172.31Zm0-60h615.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM160-240v-480 480Z" />
            </SvgIcon>
        );
    }
)

export const FitScreen = React.forwardRef<SVGSVGElement, IconProps>(
    function FitScreen(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M800-600v-107.69q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H680v-60h107.69Q818-780 839-759q21 21 21 51.31V-600h-60Zm-700 0v-107.69Q100-738 121-759q21-21 51.31-21H280v60H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46V-600h-60Zm580 420v-60h107.69q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-360h60v107.69Q860-222 839-201q-21 21-51.31 21H680Zm-507.69 0Q142-180 121-201q-21-21-21-51.31V-360h60v107.69q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85H280v60H172.31Zm84.61-156.92v-286.16h446.16v286.16H256.92Zm60-60h326.16v-166.16H316.92v166.16Zm0 0v-166.16 166.16Z" />
            </SvgIcon>
        );
    }
)