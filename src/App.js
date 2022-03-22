import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import RoutesMiddleware from "./routes/reuterMiddleware";
import axios from "axios";
import { PATH_API } from "./constants";
import ScrollToTop from "react-scroll-to-top";
import {IoIosArrowUp} from 'react-icons/io'

function App() {
  const history = useHistory();

  useEffect(() => {
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
            history.push("/admin");
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
      history.push("/");
    }
  }, []);

  return (
      <div className="App">
        <ScrollToTop smooth component={<IoIosArrowUp className="to_tp" />} />
        <RoutesMiddleware />
      </div>
  );
}

export default App;
