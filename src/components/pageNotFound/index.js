import React from "react";
import {Button} from "antd";
import {useHistory} from 'react-router-dom'

const NotFound = () => {
    const history = useHistory();
    return (
        <div className="d-flex justify-content-center align-items-center h-100 w-100">
            <div className="w-100">
                <h4 className="w-100">Page not found</h4>
                <Button type="link" onClick={() => history.push("/")}>Bosh sahifa</Button>
            </div>
        </div>
    )
}

export default NotFound