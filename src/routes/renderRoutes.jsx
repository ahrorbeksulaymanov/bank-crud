import React, {useContext} from "react";
import {Route} from "react-router";
import MyLayout from "../components/layout";
import NonLayout from "../components/layout/nonLayout";
import SectionLayout from "../components/sectionLayout";
import MainContext from "../context";
import NotFound from "../components/pageNotFound";

const RenderComponent = ({component: Component, structure}) => {
    const {user}=useContext(MainContext);
    return (
        <Route
            render={(props) => {
                if (structure === "layout") {
                    return user&&user?.roles&&user?.roles[0]==="ROLE_ADMIN"?(
                        <MyLayout>
                            <Component {...props} />
                        </MyLayout>
                    ):(
                        <NotFound/>
                    );
                } else if (structure === "sectionlayout") {
                    return (
                        <SectionLayout>
                            <Component {...props} />
                        </SectionLayout>
                    );
                } else {
                    return (
                        <NonLayout>
                            <Component {...props} />
                        </NonLayout>
                    );
                }
            }}
        />
    );
};
export default RenderComponent;
