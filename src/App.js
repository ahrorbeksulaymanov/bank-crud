import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import RoutesMiddleware from "./routes/reuterMiddleware";
import axios from "axios";
import { PATH_API } from "./constants";
import ScrollToTop from "react-scroll-to-top";
import { IoIosArrowUp } from "react-icons/io";
import "swiper/css/bundle";
import MainContext from "./context";
import { Provider } from 'react-redux';
import { store } from "./redux/store";
function App() {
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
          } else {
            localStorage.clear();
          }
        })
        .catch((err) => {
          localStorage.clear();
        });
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
      <ScrollToTop smooth component={<IoIosArrowUp className="to_tp" />} />
      <MainContext.Provider value={{ user }}>
        <RoutesMiddleware />
      </MainContext.Provider>
      </Provider>
    </div>
  );
}

export default App;
