import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RoutesMiddleware from "./routes/reuterMiddleware";
import axios from "axios";
import { PATH_API } from "./constants";
import { Spin } from "antd";

function App() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    history.push("/login");
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("tokenExpiration") == 1645372769277
    ) {
      const token = localStorage.getItem("token");
      axios({
        url: PATH_API + `/Account/GetUserInfo`,
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res?.status === 200 || res?.status === "200") {
            history.push("/");
            setLoading(false);
          } else {
            localStorage.clear();
            history.push("/login");
          }
        })
        .catch((err) => {
          localStorage.clear();
          history.push("/login");
        });
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <Spin className="" size="large" tip="Loading..." spinning={loading}>
      {loading ? <div style={{width:"100%", height:"100vh", backgroundColor:"#fff"}}></div>:
      <div className="App">
        <RoutesMiddleware />
      </div>}
    </Spin>
  );
}

export default App;
