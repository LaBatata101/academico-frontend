import {
    Box,
    Collapse,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SxProps,
    Toolbar,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Theme } from "pretty-format";

type MenuItem = {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    submenus?: Array<MenuItem>;
};

type SideMenuProps = { menu_items: Array<MenuItem> };

const SideMenuItem = ({
    href,
    icon,
    label,
    sx,
}: {
    href?: string;
    icon?: React.ReactNode;
    label: string;
    sx?: SxProps<Theme>;
}) => (
    <ListItem>
        {href ? (
            <ListItemButton component={Link} to={href}>
                {icon !== undefined && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={label} />
            </ListItemButton>
        ) : (
            <ListItemButton>
                {icon !== undefined && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={label} />
            </ListItemButton>
        )}
    </ListItem>
);

const SideMenuItemWithSubmenus = ({ menu_item }: { menu_item: MenuItem }) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>{menu_item.icon}</ListItemIcon>
                <ListItemText primary={menu_item.label} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {menu_item.submenus &&
                        menu_item.submenus.map((menu_item) => (
                            <SideMenuItem
                                sx={{ pl: 4 }}
                                label={menu_item.label}
                                href={menu_item.href}
                                icon={menu_item.icon}
                            />
                        ))}
                </List>
            </Collapse>
        </>
    );
};

export const SideMenu = ({ menu_items }: SideMenuProps) => {
    return (
        <Drawer
            sx={{
                width: 200,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 200, boxSizing: "border-box" },
            }}
            variant="persistent"
            anchor="left"
            open={true}
        >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
                <List>
                    {menu_items.map((menu_item: MenuItem, index: number) => {
                        if (menu_item.submenus) {
                            return <SideMenuItemWithSubmenus menu_item={menu_item} />;
                        } else {
                            return (
                                <SideMenuItem
                                    key={`${menu_item.label}_${index}`}
                                    href={menu_item.href}
                                    icon={menu_item.icon}
                                    label={menu_item.label}
                                />
                            );
                        }
                    })}
                </List>
            </Box>
        </Drawer>
    );
};
