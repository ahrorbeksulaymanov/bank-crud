import axios from "axios";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { PATH_API } from "../../constants";
import { setBrands, setGenders } from "../../redux/actions";
import Footer from "../footer";
import HeaderTop from "../header-top";
import NavbarHorizontal from "../navbar-horizontal";
import NavbarMobile from "../navbar-horizontal/navbar-mobile";

const SectionLayout = ({ children }) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brands?.brands);
  const genders = useSelector((state) => state.genders?.genders);

  const getBrands = async () => {
    const response = await axios.get(PATH_API + '/brand').catch(err => {
      console.log("Err", err);
    })
    dispatch(setBrands(response?.data?.data))
  }

  const getGenders = async () => {
    const response = await axios.get(PATH_API + '/gender').catch(err => {
      console.log("Err", err);
    })
    dispatch(setGenders(response?.data?.data))
  }

  useEffect(() => {
    if(brands.length === 0){
      getBrands()
    }
    if(genders.length === 0){
      getGenders()
    }
  }, [])
  
  return (
    <>
      <div>
        <div className="container">
          <HeaderTop />
          <NavbarHorizontal />
          {children}
        </div>
        <NavbarMobile />
        <Footer />
      </div>
    </>
  );
};

export default SectionLayout;
