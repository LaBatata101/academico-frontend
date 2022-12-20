import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactComponent as Class } from "./class.svg";

export function ClassIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <Class />
        </SvgIcon>
    );
}
