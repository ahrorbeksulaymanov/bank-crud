import React from 'react'
import './style.scss'
import { IoNewspaper } from 'react-icons/io5'
import { MdManageSearch, MdOutlineContactMail } from 'react-icons/md'
import { FcAbout } from 'react-icons/fc'
import { NavLink } from 'react-router-dom'

const NavbarMobile = () => {

    return (
        <div className='navbar-mobile py-1'>
            <div className="container d-flex justify-content-between">
                <NavLink exact activeClassName='selecter-mobile' to='/'>
                    <div className='text-center'>
                        <IoNewspaper style={{fontSize:"18px"}}/>
                        <p className='text-center text-dark m-0'>Yangi tovarlar</p>
                    </div>
                </NavLink>
                <NavLink activeClassName='selecter-mobile' to='/all-products'>
                    <div className='text-center'>
                        <MdManageSearch style={{fontSize:"22px"}}/>
                        <p className='text-center text-dark m-0'>Barchasi</p>
                    </div>
                </NavLink>
                <NavLink activeClassName='selecter-mobile' to='/about-us'>
                    <div className='text-center'>
                        <FcAbout style={{fontSize:"20px"}}/>
                        <p className='text-center text-dark m-0'>Biz haqimizda</p>
                    </div>
                </NavLink>
                <NavLink activeClassName='selecter-mobile' to='/contact-us'>
                    <div className='text-center'>
                        <MdOutlineContactMail style={{fontSize:"20px"}}/>
                        <p className='text-center text-dark m-0'>Kontakt</p>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}
export default NavbarMobile;