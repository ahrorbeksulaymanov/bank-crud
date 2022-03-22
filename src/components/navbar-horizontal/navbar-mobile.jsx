import React from 'react'
import './style.scss'
import { IoNewspaper } from 'react-icons/io5'
import { MdManageSearch, MdOutlineContactMail } from 'react-icons/md'
import { FcAbout } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const NavbarMobile = () => {

    return (
        <div className='navbar-mobile py-1'>
            <div className="container d-flex justify-content-between">
                <Link to='/'>
                    <div className='text-center'>
                        <IoNewspaper style={{fontSize:"18px"}}/>
                        <p className='text-center text-dark m-0'>Yangi tovarlar</p>
                    </div>
                </Link>
                <Link to='/all-products'>
                    <div className='text-center'>
                        <MdManageSearch style={{fontSize:"22px"}}/>
                        <p className='text-center text-dark m-0'>Barchasi</p>
                    </div>
                </Link>
                <Link to='/'>
                    <div className='text-center'>
                        <FcAbout style={{fontSize:"20px"}}/>
                        <p className='text-center text-dark m-0'>Biz haqimizda</p>
                    </div>
                </Link>
                <Link to='/contact-us'>
                    <div className='text-center'>
                        <MdOutlineContactMail style={{fontSize:"20px"}}/>
                        <p className='text-center text-dark m-0'>Kontakt</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default NavbarMobile;