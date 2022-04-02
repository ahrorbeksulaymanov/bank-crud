import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import {useEffect, useState} from "react";
import RoutesMiddleware from "./routes/reuterMiddleware";
import axios from "axios";
import {PATH_API} from "./constants";
import ScrollToTop from "react-scroll-to-top";
import {IoIosArrowUp} from "react-icons/io";
import "swiper/css/bundle";
import MainContext from "./context";
import {useLocation,useHistory} from 'react-router-dom'
import LoaderMain from "./components/loader";

function App() {
    const location = useLocation().pathname;
    const history=useHistory();
    const [user, setUser] = useState({});
    const [loading,setLoading]=useState(false);

    console.log(location);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoading(true)
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
                        setLoading(false)
                    } else {
                        localStorage.clear();
                        setLoading(false)
                    }
                })
                .catch((err) => {
                    localStorage.clear();
                    setLoading(false)
                });
        }
    }, []);

    return (
        loading?<LoaderMain/>:
        <div className="App">
            <ScrollToTop smooth component={<IoIosArrowUp className="to_tp"/>}/>
            <MainContext.Provider value={{user, setUser}}>
                <RoutesMiddleware/>
            </MainContext.Provider>
        </div>
    );
}

export default App;
