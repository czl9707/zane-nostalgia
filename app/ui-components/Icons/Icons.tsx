import * as React from 'react';


interface IconOwnProps {
    size?: number
}
type IconProps = IconOwnProps & React.HTMLAttributes<SVGSVGElement>;

const SvgIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function SvgIcon({ size = 1, ...other }, ref) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                height={`${size * 2}rem`} width={`${size * 2}rem`}
                viewBox="0 -960 960 960" fill="#e8eaed"
                {...other} ref={ref} />
        );
    }
)

const DummyIcon = SvgIcon;

const Orbit = React.forwardRef<SVGSVGElement, IconProps>(
    function Orbit({ size = 1, ...other }, ref) {
        return (
            <SvgIcon {...other} size={size * 0.75} ref={ref}>
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
    function KeyboardArrowDown(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M140-254.62v-59.99h680v59.99H140ZM140-450v-60h680v60H140Zm0-195.39v-59.99h680v59.99H140Z" />
            </SvgIcon>
        );
    }
)
const Close = React.forwardRef<SVGSVGElement, IconProps>(
    function KeyboardArrowDown(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z" />
            </SvgIcon>
        );
    }
)


export { Orbit, KeyboardArrowDown, DummyIcon, Menu, Close }