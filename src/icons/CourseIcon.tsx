import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactComponent as Class } from "./course.svg";

export function CourseIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <Class />
        </SvgIcon>
    );
}
