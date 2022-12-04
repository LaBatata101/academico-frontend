import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactComponent as Discipline } from "./discipline.svg";

export function DisciplineIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <Discipline />
        </SvgIcon>
    );
}
