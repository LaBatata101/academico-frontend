import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

type MenuItem = {
    label: string;
    href: string;
    icon?: React.ReactNode;
};

type SideMenuProps = { menu_items: Array<MenuItem> };

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
                    {menu_items.map((menu_item: MenuItem, index: number) => (
                        <ListItem key={`${menu_item.label}_${index}`}>
                            <ListItemButton component={Link} to={menu_item.href}>
                                {menu_item.icon !== undefined && (
                                    <ListItemIcon>{menu_item.icon}</ListItemIcon>
                                )}
                                <ListItemText primary={menu_item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};
