import BankList from "../components/content";
import AddBank from "../components/content/dataAdd";
import PageOne from "../components/emptyPages/pageOne";
import PageTwo from "../components/emptyPages/pageTwo";
import LoginPage from "../components/login";
import HomePage from "../pages/homePage";

export const all_routes = [
    {
        title: "Home page",
        path: "/",
        component: HomePage,
        exact:true,
        config: {
            showLink: true,
            structure: "nonlayout"
        }
    },
    {
        title: "Bank",
        path: "/admin",
        component: BankList,
        exact:true,
        config: {
            showLink: true,
            structure: "layout"
        }
    },
    {
        title: "Bank",
        path: "/admin/bank/:id",
        component: AddBank,
        exact:true,
        config: {
            showLink: false,
            structure: "layout"
        }
    },
    {
        title: "Login",
        path: "/login",
        component: LoginPage,
        exact: true,
        config: {
            showLink: false,
            structure: "nonlayout"
        }
    },
    {
        title: "Page one",
        path: "/pageone",
        component: PageOne,
        exact: true,
        config: {
            showLink: false,
            structure: "layout"
        }
    },
    {
        title: "Page two",
        path: "/pagetwo",
        component: PageTwo,
        exact: true,
        config: {
            showLink: false,
            structure: "layout"
        }
    }
]