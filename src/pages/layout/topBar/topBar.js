import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {CABINET} from "../../../processes/utils/consts";
import {jwtDecode} from "jwt-decode";
import {$host} from "../../../processes/http/http";
import styles from '../assets/layout.module.css'
import {Icons} from "../../../assets/icons/icons";
const Topbar = () => {
    const [showAccMenu, setshowAccMenu] = useState(false);
    const accMenuRef = useRef();
    const accButtonRef = useRef();   
    const
        JWT = localStorage.getItem("token")
            ? jwtDecode(localStorage.getItem("token"))
            : null;
    const [CurrentUser, setCurrentUser] = useState({username: ""});
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

    const removeToken = () => {
        localStorage.clear();
        setshowAccMenu(false); // This will cause the component to re-render
    };

    const handleOpenAccMenu = () => {
        setshowAccMenu(true);
    };
    const handleCloseAccMenu = () => {
        setshowAccMenu(false);
    };

    const handleClickOutside = (event) => {
        if (
            accMenuRef.current &&
            !accMenuRef.current.contains(event.target) &&
            accButtonRef.current !== event.target
        ) {
            handleCloseAccMenu();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const isLoggedIn = () => {
        return JWT != null;
    };
    return (
        <div className={`${styles["top-box"]} ${styles.container}`} >
            <div className={styles['top-box-left']}>

            </div>
            <div className={styles['top-box-center']}>

            </div>

            <div className={styles['top-box-right']}>
                {isLoggedIn() ? (
                    <>
                        <div ref={accButtonRef} onClick={handleOpenAccMenu} className={styles['topBarUser']}>
                            {CurrentUser.username}
                            <div>
                                <Icons.TopBarUSer/>
                            </div>
                        </div>
                        {showAccMenu && (
                            <>
                                <div ref={accMenuRef} className={styles["account-menu"]}>
                                    <div>
                                        <Link
                                            className={styles["menu-btn"]}
                                        >
                                            Аккаунт
                                        </Link>
                                        <Link className={styles["menu-btn"]}>Избранные</Link>
                                        <Link className={styles["menu-btn"]}>
                                            Забронированные
                                        </Link>
                                    </div>
                                    <div className={styles["menu-btn"]} onClick={removeToken}>
                                        Выйти
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <div>
                            <Link  className={styles["auth-btn"]}>
                                sign in
                            </Link>
                        </div>
                        <div>
                            <Link  className={styles["auth-btn"]}>
                                sign up
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Topbar;