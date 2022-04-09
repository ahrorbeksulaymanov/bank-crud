import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import {
  BsTelegram,
  BsFacebook,
  BsFillTelephoneOutboundFill,
} from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const Footer = () => {

  const brands = useSelector((state) => state.brands?.brands);
  
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-6">
            <h6 className="text-white">Menyu</h6>
            <Link className="text-decoration-none d-block me-4" to="/">
              Yangi tovarlar
            </Link>
            <Link className="text-decoration-none d-block me-4" to="/all-products">
              Barcha tovarlar
            </Link>
            <Link className="text-decoration-none d-block me-4" to="/blogs">
              Blog
            </Link>
            <Link className="text-decoration-none d-block me-4" to="/articles">
              Qiziqarli maqolalar
            </Link>
            <Link className="text-decoration-none d-block me-4" to="/about-us">
              Biz Haqimizda
            </Link>
            <Link className="text-decoration-none d-block" to="/Kontakt">
              Kontakt
            </Link>
          </div>
          <div className="col-md-3 col-6">
            <h6 className="text-white">Brendlar</h6>
            {
              brands?.slice(0, 6)?.map((item, index) => (
                <Link key={index} className="text-decoration-none d-block me-4" to={`/company/${item?.id}`}>
                  {item?.brnadName}
                </Link>
              ))
            }
          </div>
          <div className="col-md-3 col-6">
            <h6 className="text-white">Brendlar</h6>
            {
              brands?.slice(6, 12)?.map((item, index) => (
                <Link key={index} className="text-decoration-none d-block me-4" to={`/company/${item?.id}`}>
                  {item?.brnadName}
                </Link>
              ))
            }
          </div>
          <div className="col-md-3 col-6">
            <h6 className="text-white">Biz bilan aloqa</h6>
            <a href="#" className="contact-icon-link">
              <BsTelegram className="contact-icon" />
            </a>
            <a href="#" className="contact-icon-link">
              <RiInstagramFill className="contact-icon" />
            </a>
            <a href="#" className="contact-icon-link">
              <BsFacebook className="contact-icon" />
            </a>
            <a href="#" className="contact-icon-link">
              <BsFillTelephoneOutboundFill className="contact-icon" />
            </a>

            <h6 className="text-white mt-4">Biz bilan aloqa</h6>
            <a href="tel:+998930085504" className="contact-icon-link">
              +998 93 008 55 04
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
