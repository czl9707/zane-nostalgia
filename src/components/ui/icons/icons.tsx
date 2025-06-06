import * as React from 'react';


interface IconOwnProps {
    size?: string
    viewBoxSize?: string,
}
export type IconProps = IconOwnProps & React.HTMLAttributes<SVGSVGElement>;

export const SvgIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function SvgIcon({ size = "2rem", viewBoxSize = "0 -960 960 960", ...other }, ref) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                height={size} width={size}
                viewBox={viewBoxSize}
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

export const Animation = React.forwardRef<SVGSVGElement, IconProps>(
    function Animation(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M360-100q-54.15 0-101.31-20.46-47.15-20.46-82.46-55.77-35.31-35.31-55.77-82.46Q100-305.85 100-360q0-76 39.89-139.35 39.88-63.34 106.73-95.26 19.23-40.16 49.11-70.04 29.89-29.89 69.66-48.73 30.69-66.08 93.88-106.35Q522.46-860 600-860q54.15 0 101.31 20.46 47.15 20.46 82.46 55.77 35.31 35.31 55.77 82.46Q860-654.15 860-600q0 79.61-39.69 140.77-39.7 61.15-106.93 93.84-19.23 40.16-48.92 69.85-29.69 29.69-69.85 48.92-31.92 66.08-94.5 106.35Q437.54-100 360-100Zm.77-60q38.77 0 76.38-15.77 37.62-15.77 63.62-46.54-59.54 5.39-112.27-15.27-52.73-20.65-91.5-59.04-38.77-38.77-59.42-91.3-20.66-52.54-15.27-112.08-30.39 26.38-46.35 63.42Q160-399.54 160-360q0 42 16 78.19t43 63.19q27.38 27 63.58 42.81Q318.77-160 360.77-160ZM480-280q45.31 0 81.81-18.08T622-342.31q-60.15 5.39-112.88-15.58-52.73-20.96-91.5-59.34-38.77-38.77-59.73-91.31-20.97-52.54-15.58-112.69-27.31 24.84-44.42 61.54Q280.77-523 280.77-480q0 42 15.5 78t43.11 63q27 28 62.81 43.5T480-280Zm120.77-120q18 0 34.5-3t33.5-9q22-60 6.5-115.5t-53.5-93.5q-38-38-93.5-53.5t-115.5 6.5q-6 17-9 33.5t-3 34.5q0 42 15.5 78t43.5 63q27 28 63 43.5t78 15.5Zm137.69-58.77q29.23-26 45.39-61.34Q800-555.46 800-600q0-42-15.5-78T741-741q-27-28-63-43.5T600-800q-43.08 0-78.58 16.35-35.5 16.34-62.65 45.96 60.15-5.39 112.88 15.58 52.73 20.96 91.5 59.34 38.77 38.77 59.73 91.31 20.96 52.54 15.58 112.69Z" />
            </SvgIcon>
        );
    }
)

export const Code = React.forwardRef<SVGSVGElement, IconProps>(
    function Code(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M320-253.85 93.85-480 320-706.15l42.77 42.77-184 184L362.15-296 320-253.85Zm320 0-42.77-42.77 184-184L597.85-664 640-706.15 866.15-480 640-253.85Z" />
            </SvgIcon>
        );
    }
)

export const Tune = React.forwardRef<SVGSVGElement, IconProps>(
    function Tune(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M450-130v-220h60v80h320v60H510v80h-60Zm-320-80v-60h220v60H130Zm160-160v-80H130v-60h160v-80h60v220h-60Zm160-80v-60h380v60H450Zm160-160v-220h60v80h160v60H670v80h-60Zm-480-80v-60h380v60H130Z" />
            </SvgIcon>
        );
    }
)

export const Download = React.forwardRef<SVGSVGElement, IconProps>(
    function Download(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M480-328.46 309.23-499.23l42.16-43.38L450-444v-336h60v336l98.61-98.61 42.16 43.38L480-328.46ZM252.31-180Q222-180 201-201q-21-21-21-51.31v-108.46h60v108.46q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-108.46h60v108.46Q780-222 759-201q-21 21-51.31 21H252.31Z" />
            </SvgIcon>
        );
    }
)


export const File = React.forwardRef<SVGSVGElement, IconProps>(
    function File(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M252.31-100Q222-100 201-121q-21-21-21-51.31v-615.38Q180-818 201-839q21-21 51.31-21H570l210 210v477.69Q780-142 759-121q-21 21-51.31 21H252.31ZM540-620v-180H252.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v615.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-620H540ZM240-800v180-180V-160v-640Z" />
            </SvgIcon>
        );
    }
)

export const BackHand = React.forwardRef<SVGSVGElement, IconProps>(
    function BackHand(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M507.38-60Q427.69-60 358-97.31T244.62-201.23l-172-263.15 15.54-15.54q15.38-16 37.57-18.23 22.19-2.23 40.42 10.54L300-397.38V-780q0-12.38 8.63-21.19Q317.25-810 330-810q12.39 0 21.19 8.81Q360-792.38 360-780v497.77L189.69-398.31l105.39 162.62q35 54.46 91.32 85.07Q442.72-120 507.38-120q104.92 0 178.77-73.46Q760-266.92 760-372.23V-750q0-12.38 8.62-21.19Q777.25-780 790-780q12.38 0 21.19 8.81T820-750v377.77q0 130.41-91.02 221.32T507.38-60Zm-53.92-430v-370q0-12.38 8.63-21.19t21.39-8.81q12.75 0 21.37 8.81 8.61 8.81 8.61 21.19v370h-60Zm153.46 0v-330q0-12.38 8.63-21.19t21.39-8.81q12.75 0 21.37 8.81 8.61 8.81 8.61 21.19v330h-60ZM474.85-305Z" />
            </SvgIcon>
        );
    }
)

export const Shuffle = React.forwardRef<SVGSVGElement, IconProps>(
    function Shuffle(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M564.62-180v-60h114L544.69-373.92l42.77-42.77L720-284.15v-110.08h60V-180H564.62Zm-342.47 0L180-222.15 677.85-720H564.62v-60H780v214.23h-60v-112.08L222.15-180Zm149.08-367L180-738.23 221.77-780 413-588.77 371.23-547Z" />
            </SvgIcon >
        );
    }
)

export const Casino = React.forwardRef<SVGSVGElement, IconProps>(
    function Casino(props, ref) {
        return (
            <SvgIcon {...props} ref={ref}>
                <path d="M311.54-263.08q20.19 0 34.33-14.13Q360-291.35 360-311.54q0-20.19-14.13-34.33Q331.73-360 311.54-360q-20.19 0-34.33 14.13-14.13 14.14-14.13 34.33 0 20.19 14.13 34.33 14.14 14.13 34.33 14.13Zm0-336.92q20.19 0 34.33-14.13Q360-628.27 360-648.46q0-20.19-14.13-34.33-14.14-14.13-34.33-14.13-20.19 0-34.33 14.13-14.13 14.14-14.13 34.33 0 20.19 14.13 34.33Q291.35-600 311.54-600ZM480-431.54q20.19 0 34.33-14.13 14.13-14.14 14.13-34.33 0-20.19-14.13-34.33-14.14-14.13-34.33-14.13-20.19 0-34.33 14.13-14.13 14.14-14.13 34.33 0 20.19 14.13 34.33 14.14 14.13 34.33 14.13Zm168.46 168.46q20.19 0 34.33-14.13 14.13-14.14 14.13-34.33 0-20.19-14.13-34.33Q668.65-360 648.46-360q-20.19 0-34.33 14.13Q600-331.73 600-311.54q0 20.19 14.13 34.33 14.14 14.13 34.33 14.13Zm0-336.92q20.19 0 34.33-14.13 14.13-14.14 14.13-34.33 0-20.19-14.13-34.33-14.14-14.13-34.33-14.13-20.19 0-34.33 14.13Q600-668.65 600-648.46q0 20.19 14.13 34.33Q628.27-600 648.46-600ZM212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM200-760v560-560Z" />
            </SvgIcon >
        );
    }
)

