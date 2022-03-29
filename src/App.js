import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RoutesMiddleware from "./routes/reuterMiddleware";
import axios from "axios";
import { PATH_API } from "./constants";
import ScrollToTop from "react-scroll-to-top";
import { IoIosArrowUp } from "react-icons/io";
import "swiper/css/bundle";
import MainContext from "./context";

function App() {
  const history = useHistory();
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    // if (token) {
      axios({
        url: PATH_API + `/auth/me`,
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res?.status === 200 || res?.status === "200") {
            setUser(res.data);
            // history.push("/admin");
          } else {
            localStorage.clear();
            history.push("/login");
          }
        })
        .catch((err) => {
          localStorage.clear();
          history.push("/login");
        });
    // } else {
    //   // history.push("/");
    // }
  }, []);

  return (
    <div className="App">
      <ScrollToTop smooth component={<IoIosArrowUp className="to_tp" />} />
      <MainContext.Provider value={{ user }}>
        <RoutesMiddleware />
      </MainContext.Provider>
    </div>
  );
}

export default App;
