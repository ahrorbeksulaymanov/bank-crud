import React from "react";
import { Switch} from 'react-router-dom'
import { all_routes } from ".";
import RenderComponent from "./renderRoutes";

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
    </Switch>
  );
};
export default RoutesMiddleware;
