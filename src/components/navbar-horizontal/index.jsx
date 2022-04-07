import React from 'react'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.scss'
const NavbarHorizontal = () => {

    return (
        <header className='navbar-horizant d-flex justify-content-between align-items-center'>
            <h5 className='text-light m-0'><Link className='text-light me-4 navbr_link_md' to='/'>Logo</Link></h5>
            <div className='d-flex justify-content-between align-items-center'>
                <NavLink exact activeClassName="selected" className='me-4 navbr_link_md' to='/'>Yangi tovarlar</NavLink>
                <NavLink activeClassName="selected" className='me-4 navbr_link_md' to='/all-products'>Barcha tovarlar</NavLink>
                <NavLink activeClassName="selected" className='me-4 navbr_link_md' to='/blogs'>Blog</NavLink>
                <NavLink activeClassName="selected" className='me-4 navbr_link_md' to='/articles'>Maqola</NavLink>
                <NavLink activeClassName="selected" className='me-4 navbr_link_md' to='/about-us'>Biz Haqimizda</NavLink>
                <NavLink activeClassName="selected" className='navbr_link_md' to='/contact-us'>Kontakt</NavLink>
            </div>
        </header>
    )
}
export default NavbarHorizontal;