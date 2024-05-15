import React, { useEffect, useState } from 'react';
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Icons } from "../../../assets/icons/icons";
import styles from "../assets/layout.module.css";
import MenuIcon from '@mui/icons-material/Menu';
import { jwtDecode } from "jwt-decode";
import { $host } from "../../../processes/http/http";
import { Link, useLocation } from "react-router-dom";
import {
    ADMIN_ANNOUNCEMENT,
    ADMIN_BOOKINGS,
    ADMIN_HOME,
    ADMIN_REQUESTS,
    ADMIN_SELLER,
    CABINET
} from "../../../processes/utils/consts";

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [CurrentUser, setCurrentUser] = useState({ username: "" });
    const location = useLocation(); // Hozirgi manzilni olish

    const JWT = localStorage.getItem("token")
        ? jwtDecode(localStorage.getItem("token"))
        : null;

    useEffect(() => {
        if (JWT) {
            const getUser = async () => {
                try {
                    const res = await $host.get("user/" + JWT.userId);
                    setCurrentUser(res.data);
                } catch (e) {
                    console.log(e);
                }
            };
            getUser();
        }
    }, []);

    return (
        <Sidebar
            collapsed={collapsed}
            rootStyles={{
                height: '100vh',
                position: 'relative',
                top: '-30% !important',
                background: "#fff"
            }}
        >
            <div className={styles.sideBar_logo}>
                {!collapsed && <Icons.LogoSideBar />}
                <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
                    <MenuIcon />
                </button>
            </div>

            {CurrentUser?.role === 'admin' && (
                <Menu className={styles['sideBar_ul']}
                      menuItemStyles={{
                          button: ({ level, active, disabled }) => {
                              if (level === 0)
                                  return {
                                      color: active ? '#40A2E3' : '#292D32',
                                      backgroundColor: active ? 'rgba(64,162,227,0.14)' : undefined,
                                  };
                          },
                      }}
                >
                    <MenuItem
                        className={styles['sideBar_link']}
                        component={<Link to={CABINET + ADMIN_HOME} />}
                        icon={<Icons.HomeIcon />}
                        active={location.pathname === CABINET + ADMIN_HOME} // active prop
                    >
                        {!collapsed && "Главная"}
                    </MenuItem>
                    <MenuItem
                        className={styles['sideBar_link']}
                        component={<Link to={CABINET + ADMIN_BOOKINGS} />}
                        icon={<Icons.BookingsIcon />}
                        active={location.pathname === CABINET + ADMIN_BOOKINGS} // active prop
                    >
                        {!collapsed && "Бронирования"}
                    </MenuItem>
                    <MenuItem
                        className={styles['sideBar_link']}
                        component={<Link to={CABINET + ADMIN_ANNOUNCEMENT} />}
                        icon={<Icons.AnnouncementIcon />}
                        active={location.pathname === CABINET + ADMIN_ANNOUNCEMENT} // active prop
                    >
                        {!collapsed && "Обьявления"}
                    </MenuItem>
                    <MenuItem
                        className={styles['sideBar_link']}
                        component={<Link to={CABINET + ADMIN_SELLER} />}
                        icon={<Icons.SellersIcon />}
                        active={location.pathname === CABINET + ADMIN_SELLER} // active prop
                    >
                        {!collapsed && "Продавцы"}
                    </MenuItem>
                    <MenuItem
                        className={styles['sideBar_link']}
                        component={<Link to={CABINET + ADMIN_REQUESTS} />}
                        icon={<Icons.RequestsIcon />}
                        active={location.pathname === CABINET + ADMIN_REQUESTS} // active prop
                    >
                        {!collapsed && "Заявления"}
                    </MenuItem>
                </Menu>
            )}
            {CurrentUser?.role === 'superadmin' && (
                <Menu className={styles['sideBar_ul']}
                      menuItemStyles={{
                          button: ({ level, active, disabled }) => {
                              if (level === 0)
                                  return {
                                      color: active ? '#40A2E3' : '#292D32',
                                      backgroundColor: active ? 'rgba(64,162,227,0.14)' : undefined,
                                  };
                          },
                      }}
                >
                    <MenuItem
                        className={styles['sideBar_link']}
                        component={<Link to={CABINET + ADMIN_HOME} />}
                        icon={<Icons.HomeIcon />}
                        active={location.pathname === CABINET + ADMIN_HOME} // active prop
                    >
                        {!collapsed && "Главная"}
                    </MenuItem>
                    <MenuItem
                        className={styles['sideBar_link']}
                        component={<Link to={CABINET + ADMIN_BOOKINGS} />}
                        icon={<Icons.BookingsIcon />}
                        active={location.pathname === CABINET + ADMIN_BOOKINGS} // active prop
                    >
                        {!collapsed && "Бронирования"}
                    </MenuItem>
                    <MenuItem
                        className={styles['sideBar_link']}
                        component={<Link to={CABINET + ADMIN_ANNOUNCEMENT} />}
                        icon={<Icons.AnnouncementIcon />}
                        active={location.pathname === CABINET + ADMIN_ANNOUNCEMENT} // active prop
                    >
                        {!collapsed && "Обьявления"}
                    </MenuItem>
                    <MenuItem
                        className={styles['sideBar_link']}
                        component={<Link to={CABINET + ADMIN_SELLER} />}
                        icon={<Icons.SellersIcon />}
                        active={location.pathname === CABINET + ADMIN_SELLER} // active prop
                    >
                        {!collapsed && "Продавцы"}
                    </MenuItem>
                    <MenuItem
                        className={styles['sideBar_link']}
                        component={<Link to={CABINET + ADMIN_REQUESTS} />}
                        icon={<Icons.RequestsIcon />}
                        active={location.pathname === CABINET + ADMIN_REQUESTS} // active prop
                    >
                        {!collapsed && "Заявления"}
                    </MenuItem>
                    <MenuItem
                        className={styles['sideBar_link']}
                        component={<Link to={CABINET + ADMIN_REQUESTS} />}
                        icon={<Icons.Logout />}
                        style={{marginTop:"200px"}}
                        active={location.pathname === CABINET + ADMIN_REQUESTS} // active prop
                    >
                        {!collapsed && "LogOut"}
                    </MenuItem>
                </Menu>
            )}
        </Sidebar>
    );
};

export default SideBar;
