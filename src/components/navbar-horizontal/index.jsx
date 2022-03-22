import React from 'react'
import { Link } from 'react-router-dom';
import './style.scss'
const NavbarHorizontal = () => {

    return (
        <header className='navbar-horizant d-flex justify-content-between'>
            <h5 className='text-light'>Logo</h5>
            <div className='d-flex justify-content-between'>
                <Link className='text-light me-4' to='/'>Yangi tovarlar</Link>
                <Link className='text-light me-4' to='/all-products'>Barcha tovarlar</Link>
                <Link className='text-light me-4' to='/'>Blog</Link>
                <Link className='text-light me-4' to='/'>Qiziqarli maqolalar</Link>
                <Link className='text-light me-4' to='/'>Biz Haqimizda</Link>
                <Link className='text-light' to='/contact-us'>Kontakt</Link>
            </div>
        </header>
    )
}
export default NavbarHorizontal;