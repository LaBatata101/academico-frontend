import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactComponent as Teacher } from "./teacher.svg";

export function TeacherIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <Teacher />
        </SvgIcon>
    );
}
