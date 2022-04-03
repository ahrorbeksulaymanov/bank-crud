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
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LoaderMain from "./components/loader";

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
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
            setLoading(false);
          } else {
            localStorage.clear();
            setLoading(false);
          }
        })
        .catch((err) => {
          localStorage.clear();
          setLoading(false);
        });
    }
  }, []);

  return loading ? (
    <LoaderMain />
  ) : (
    <Provider store={store}>
      <div className="App">
        <ScrollToTop smooth component={<IoIosArrowUp className="to_tp" />} />
        <MainContext.Provider value={{ user, setUser }}>
          <RoutesMiddleware />
        </MainContext.Provider>
      </div>
    </Provider>
  );
}

export default App;
