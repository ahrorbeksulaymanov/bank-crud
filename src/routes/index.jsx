import BankList from "../components/content";
import AddBank from "../components/content/dataAdd";
import PageOne from "../components/emptyPages/pageOne";
import PageTwo from "../components/emptyPages/pageTwo";
import LoginPage from "../components/login";
import HomePage from "../pages/homePage";
import AllProductsPage from '../pages/all-products';
import ShowItemPage from "../pages/show-item";
import ContactUs from "../pages/contact-us";
import CompanyPage from "../pages/company-page";
import DiscountList from "../pages/filters/discount";
import AddDiscount from "../pages/filters/discount/dataAdd";
import SizeList from "../pages/filters/size";
import AddSize from "../pages/filters/size/dataAdd";
import SeasonList from "../pages/filters/season";
import AddSeason from "../pages/filters/season/dataAdd";
import GenderList from "../pages/filters/gender";
import AddGender from "../pages/filters/gender/dataAdd";
import BrandList from "../pages/brand";
import AddBrand from "../pages/brand/dataAdd";
import CategoryList from "../pages/filters/category";
import AddCategory from "../pages/filters/category/dataAdd";
import ProductList from "../pages/product";
import AddProduct from "../pages/product/dataAdd";
import Articles from "../pages/articles";
import AboutUs from "../pages/about-us";
import Blogs from "../pages/blogs";
import FeaturesList from "../pages/features";
import AddFeatures from "../pages/features/dataAdd";

export const all_routes = [
    {
        title: "Home page",
        path: "/",
        component: HomePage,
        exact:true,
        config: {
            showLink: true,
            structure: "sectionlayout"
        }
    },
    {
        title: "All products",
        path: "/all-products",
        component: AllProductsPage,
        exact:true,
        config: {
            showLink: true,
            structure: "sectionlayout"
        }
    },
    {
        title: "Item show",
        path: "/product/:id",
        component: ShowItemPage,
        exact:true,
        config: {
            showLink: true,
            structure: "sectionlayout"
        }
    },
    {
        title: "Contact Us",
        path: "/contact-us",
        component: ContactUs,
        exact:true,
        config: {
            showLink: true,
            structure: "sectionlayout"
        }
    },
    {
        title: "Articles",
        path: "/articles",
        component: Articles,
        exact:true,
        config: {
            showLink: true,
            structure: "sectionlayout"
        }
    },
    {
        title: "About Us",
        path: "/about-us",
        component: AboutUs,
        exact:true,
        config: {
            showLink: true,
            structure: "sectionlayout"
        }
    },
    {
        title: "Blogs",
        path: "/blogs",
        component: Blogs,
        exact:true,
        config: {
            showLink: true,
            structure: "sectionlayout"
        }
    },
    {
        title: "Company",
        path: "/company/:id",
        component: CompanyPage,
        exact:true,
        config: {
            showLink: true,
            structure: "sectionlayout"
        }
    },
    {
        title: "Admin",
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
        title: "Discount",
        path: "/discount",
        component: DiscountList,
        exact:true,
        config: {
            showLink: false,
            structure: "layout"
        }
    },
    {
        title: "Discount Add",
        path: "/discount-add/:id",
        component: AddDiscount,
        exact:true,
        config: {
            showLink: false,
            structure: "layout"
        }
    },
    {
        title: "Size",
        path: "/size",
        component: SizeList,
        exact:true,
        config: {
            showLink: false,
            structure: "layout"
        }
    },
    {
        title: "Size Add",
        path: "/size-add/:id",
        component: AddSize,
        exact:true,
        config: {
            showLink: false,
            structure: "layout"
        }
    },
    {
        title: "Season",
        path: "/season",
        component: SeasonList,
        exact:true,
        config: {
            showLink: false,
            structure: "layout"
        }
    },
    {
        title: "Season Add",
        path: "/season-add/:id",
        component: AddSeason,
        exact:true,
        config: {
            showLink: false,
            structure: "layout"
        }
    },
    {
        title: "Gender",
        path: "/gender",
        component: GenderList,
        exact:true,
        config: {
            showLink: false,
            structure: "layout"
        }
    },
    {
        title: "Gender Add",
        path: "/gender-add/:id",
        component: AddGender,
        exact:true,
        config: {
            showLink: false,
            structure: "layout"
        }
    },
    {
        title: "Category",
        path: "/category",
        component: CategoryList,
        exact:true,
        config: {
            showLink: false,
            structure: "layout"
        }
    },
    {
        title: "Category Add",
        path: "/category-add/:id",
        component: AddCategory,
        exact:true,
        config: {
            showLink: false,
            structure: "layout"
        }
    },
    {
        title: "Brand",
        path: "/brand",
        component: BrandList,
        exact:true,
        config: {
            showLink: false,
            structure: "layout"
        }
    },
    {
        title: "Brand Add",
        path: "/brand-add/:id",
        component: AddBrand,
        exact:true,
        config: {
            showLink: false,
            structure: "layout"
        }
    },
    {
        title: "Product",
        path: "/product",
        component: ProductList,
        exact:true,
        config: {
            showLink: false,
            structure: "layout"
        }
    },
    {
        title: "Product add",
        path: "/product-add/:id",
        component: AddProduct,
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
    },
    {
        title: "Features",
        path: "/product/features/:id",
        component: FeaturesList,
        exact:true,
        config: {
            showLink: true,
            structure: "layout"
        }
    },
    {
        title: "Features",
        path: "/product/features-add/:id/:featureId",
        component: AddFeatures,
        exact:true,
        config: {
            showLink: true,
            structure: "layout"
        }
    },
]