import * as React from "react";
import Footer from "../footer";
import HeaderTop from "../header-top";
import NavbarHorizontal from "../navbar-horizontal";
import NavbarMobile from "../navbar-horizontal/navbar-mobile";

const SectionLayout = ({ children }) => {
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
