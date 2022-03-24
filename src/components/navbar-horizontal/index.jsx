import React from 'react'
import { Link } from 'react-router-dom';
import './style.scss'
const NavbarHorizontal = () => {

    return (
        <header className='navbar-horizant d-flex justify-content-between align-items-center'>
            <h5 className='text-light m-0'><Link className='text-light me-4 navbr_link_md' to='/'>Logo</Link></h5>
            <div className='d-flex justify-content-between align-items-center'>
                <Link className='text-light me-4 navbr_link_md' to='/'>Yangi tovarlar</Link>
                <Link className='text-light me-4 navbr_link_md' to='/all-products'>Barcha tovarlar</Link>
                <Link className='text-light me-4 navbr_link_md' to='/'>Blog</Link>
                <Link className='text-light me-4 navbr_link_md' to='/'>Qiziqarli maqolalar</Link>
                <Link className='text-light me-4 navbr_link_md' to='/'>Biz Haqimizda</Link>
                <Link className='text-light navbr_link_md' to='/contact-us'>Kontakt</Link>
            </div>
        </header>
    )
}
export default NavbarHorizontal;