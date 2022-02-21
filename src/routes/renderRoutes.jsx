import React from 'react';
import { Route } from 'react-router';
import MyLayout from '../components/layout';
import NonLayout from '../components/layout/nonLayout';

const RenderComponent = ({ component: Component, structure }) => {

    return (
        <Route
            render={(props) => {
                if(structure === "layout"){
                    return (
                        <MyLayout>
                            <Component {...props} />
                        </MyLayout>
                    )
                }else{
                    return (
                        <NonLayout>
                            <Component {...props} />
                        </NonLayout>
                    )
                }
            }}
        />
    )
}
export default RenderComponent;