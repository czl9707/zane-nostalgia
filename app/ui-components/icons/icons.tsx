import * as React from 'react';


interface IconOwnProps {
    size?: number
    viewBoxSize?: string
}
type IconProps = IconOwnProps & React.HTMLAttributes<SVGSVGElement>;

const SvgIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function SvgIcon({ size = 1, viewBoxSize = "0 -960 960 960", ...other }, ref) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                height={`${size * 2}rem`} width={`${size * 2}rem`}
                viewBox={viewBoxSize} fill="#e8eaed"
                {...other} ref={ref} />
        );
    }
)

const DummyIcon = SvgIcon;

const Orbit = React.forwardRef<SVGSVGElement, IconProps>(
    function Orbit(props, ref) {
        return (
            <SvgIcon {...props} style={{ transform: "scale(0.75)" }} ref={ref}>
                <path d="M240-100q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 22-6.5 42.5T354-159v-27q30 13 62 19.5t64 6.5q134 0 227-93t93-227h80q0 83-31.5 156T763-197q-54 54-127 85.5T480-80q-45 0-88-9.5T309-118q-16 9-33.5 13.5T240-100Zm0-80q25 0 42.5-17.5T300-240q0-25-17.5-42.5T240-300q-25 0-42.5 17.5T180-240q0 25 17.5 42.5T240-180Zm240-160q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41ZM80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q45 0 88 9.5t83 28.5q16-9 33.5-13.5T720-860q58 0 99 41t41 99q0 58-41 99t-99 41q-58 0-99-41t-41-99q0-22 6.5-42.5T606-801v27q-30-13-62-19.5t-64-6.5q-134 0-227 93t-93 227H80Zm640-180q25 0 42.5-17.5T780-720q0-25-17.5-42.5T720-780q-25 0-42.5 17.5T660-720q0 25 17.5 42.5T720-660ZM240-240Zm480-480Z" />
            </SvgIcon>
        );
    }
)

const KeyboardArrowDown = React.forwardRef<SVGSVGElement, IconProps>(
    function KeyboardArrowDown(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M480-357.85 253.85-584 296-626.15l184 184 184-184L706.15-584 480-357.85Z" />
            </SvgIcon>
        );
    }
)

const Menu = React.forwardRef<SVGSVGElement, IconProps>(
    function Menu(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M140-254.62v-59.99h680v59.99H140ZM140-450v-60h680v60H140Zm0-195.39v-59.99h680v59.99H140Z" />
            </SvgIcon>
        );
    }
)

const Close = React.forwardRef<SVGSVGElement, IconProps>(
    function Close(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z" />
            </SvgIcon>
        );
    }
)

const Copy = React.forwardRef<SVGSVGElement, IconProps>(
    function Copy(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M362.31-260Q332-260 311-281q-21-21-21-51.31v-455.38Q290-818 311-839q21-21 51.31-21h335.38Q728-860 749-839q21 21 21 51.31v455.38Q770-302 749-281q-21 21-51.31 21H362.31Zm0-60h335.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H362.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Zm-140 200Q192-120 171-141q-21-21-21-51.31v-515.38h60v515.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h395.38v60H222.31ZM350-320v-480 480Z" />
            </SvgIcon>
        );
    }
)

const Check = React.forwardRef<SVGSVGElement, IconProps>(
    function Check(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M382-253.85 168.62-467.23 211.38-510 382-339.38 748.62-706l42.76 42.77L382-253.85Z" />
            </SvgIcon>
        );
    }
)

const MeteorShower = React.forwardRef<SVGSVGElement, IconProps>(
    function MeteorShower(props, ref) {
        return (
            <SvgIcon {...props} viewBoxSize='0 0 256 256' style={{ transform: "scale(0.75)" }} ref={ref} >
                <path d="M96 124a36 36 0 1 0 36 36a36 36 0 0 0-36-36m0 48a12 12 0 1 1 12-12a12 12 0 0 1-12 12m128.49-52.49a12 12 0 0 1 0 17l-48 48a12 12 0 0 1-17-17l48-48a12 12 0 0 1 17 0m-36-20a12 12 0 0 1 0 17l-20 20a12 12 0 0 1-17-17l20-20a12 12 0 0 1 17 0m44-27l-16 16a12 12 0 0 1-17-17l16-16a12 12 0 0 1 17 17m-113 15l72-72a12 12 0 0 1 17 17l-72 72a12 12 0 1 1-17-17m30.23 109.26a12 12 0 0 1 0 17A76 76 0 1 1 42.26 106.26L125 23.51a12 12 0 1 1 17 17l-82.77 82.72a52 52 0 0 0 73.54 73.54a12 12 0 0 1 16.97 0Z" />
            </SvgIcon>
        );
    }
)


export {
    Orbit,
    KeyboardArrowDown,
    DummyIcon,
    Menu,
    Close,
    MeteorShower,
    Copy,
    Check
}