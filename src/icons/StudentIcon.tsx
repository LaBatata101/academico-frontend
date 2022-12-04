import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactComponent as Student } from "./student.svg";

export function StudentIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <Student />
        </SvgIcon>
    );
}
