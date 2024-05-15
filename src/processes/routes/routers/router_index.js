import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import {LOGIN} from "../../utils/consts";
import {Layout} from "../../utils/Routes";
// import Login from "../../../pages/auth/login";
import Layouts from "../../../pages/layout/layouts";
import Login from "../../../pages/auth/login";

const RouterIndex = () => {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<Login/>} />
        {/*<Route path={LOGIN} element={<Layouts/>} />*/}
        {token ? (
          Layout.map(({ path, Component }) => (
            <Route key={path} path={`${path}/*`} element={Component} />
          ))
        ) : (
          <Route path="*" element={<Navigate to={LOGIN} />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default RouterIndex;
