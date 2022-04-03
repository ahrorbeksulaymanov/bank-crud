import React from "react";
import {Redirect, Route, Switch} from 'react-router-dom'
import { all_routes } from ".";
import RenderComponent from "./renderRoutes";
import NotFound from "../components/pageNotFound";

const RoutesMiddleware = () => {

  return (
    <Switch>
        {
            all_routes.length && all_routes.map((item, index) => {
                return(
                    <RenderComponent
                        key={index}
                        path={item.path}
                        exact={item.exact}
                        component={item.component}
                        structure={item.config.structure}
                    />
                )
            })
        }
        <Route component={NotFound} url={"/page-not-found"}/>
        <Redirect to={"/page-not-found"}/>
    </Switch>
  );
};
export default RoutesMiddleware;
