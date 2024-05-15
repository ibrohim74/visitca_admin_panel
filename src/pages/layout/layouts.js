import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";

import {jwtDecode} from "jwt-decode";
import {$host} from "../../processes/http/http";
import {Admin, Moderate} from "../../processes/utils/Routes";
import Sidebar from "./sideBar/sideBar";
import Topbar from "./topBar/topBar";
import BreadCrumb from "../../component/breadCrumb";


const LayoutCabinet = () => {
    const [isSidebar, setIsSidebar] = useState(true);
    const JWT = jwtDecode(localStorage.getItem("token"));
    const [CurrentUser, setCurrentUser] = useState();
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await $host.get("user/" + JWT.userId);
                setCurrentUser(res.data);
                console.log(res);
            } catch (e) {
                console.log(e);
            }
        };
        getUser();
    }, []);
    return (
        <div>
            <Topbar/>

            <div className={"layout-app"}>
                <Sidebar/>
                <main className="content">
                    <BreadCrumb user={CurrentUser?.role}/>
                    <Routes>

                        {CurrentUser?.role === "superadmin" &&
                            Admin.map(({path, Component}) => (
                                <Route key={path} path={path} element={Component}/>
                            ))}
                        {CurrentUser?.role === "admin" &&
                            Admin.map(({path, Component}) => (
                                <Route key={path} path={path} element={Component}/>
                            ))}
                        {CurrentUser?.role === "moderate" &&
                            Moderate.map(({path, Component}) => (
                                <Route key={path} path={path} element={Component}/>
                            ))}
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default LayoutCabinet;