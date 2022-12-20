import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactComponent as Curriculum } from "./curriculum.svg";

export function CurriculumIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <Curriculum />
        </SvgIcon>
    );
}
