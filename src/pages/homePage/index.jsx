import React from 'react'
import HeaderTop from '../../components/header-top'
import NavbarHorizontal from '../../components/navbar-horizontal';
import NewProducts from '../../components/newProducts';
const HomePage = () => {

    return (
        <div className='container'>
            <HeaderTop />
            <NavbarHorizontal />
            <NewProducts />
        </div>
    )
}
export default HomePage;