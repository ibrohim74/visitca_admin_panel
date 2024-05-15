import React from 'react';
import {Breadcrumb} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import {Admin, Moderate} from "../processes/utils/Routes";
import {useLocation} from "react-router-dom";

const BreadCrumb = (props) => {
    const {pathname} = useLocation()
    const urlParts = pathname.split('/');
    const homeIcon = <HomeOutlined />;
    const currentPath = urlParts[urlParts.length - 1];



    return (
        <div style={{marginBottom:"16px"}} >
            {props.user === 'admin' && Admin.map((item, index) => {
                    if (item.path === currentPath) {
                        return (
                            <Breadcrumb
                                separator=">"
                                key={index} // Assign a unique key prop based on index
                                items={[
                                    {
                                        key: 'home',
                                        href: item?.path,
                                        title: homeIcon,
                                    },
                                    {
                                        key: 'user',
                                        href: item.path,
                                        title: (
                                            <>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </>
                                        ),
                                    },
                                ]}
                            />
                        );
                    }
                    return null;
                })}

            {props.user === 'support' && Moderate.map((item, index) => {
                if (item.path === currentPath) {
                    return (
                        <Breadcrumb
                            key={index} // Assign a unique key prop based on index
                            items={[
                                {
                                    key: 'home',
                                    href: item?.path,
                                    title: homeIcon,
                                },
                                {
                                    key: 'user',
                                    href: item.path,
                                    title: (
                                        <>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </>
                                    ),
                                },
                            ]}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
};

export default BreadCrumb;