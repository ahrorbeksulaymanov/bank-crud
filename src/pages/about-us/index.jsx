import React from 'react'
import aboutImg from '../../assets/images/about-img.jpg'
import SliderTeamMembers from './aboutSlider';

const AboutUs = () => {

    return (
        <div className='py-5'>
            <img src={aboutImg} className='about-us-img' alt="" />
            <p className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, earum. Quasi tempora molestiae modi obcaecati doloremque odio esse, necessitatibus minus totam laborum unde beatae, aut, autem officiis! Eligendi quas hic incidunt ipsam voluptatem laboriosam qui cumque assumenda nulla laudantium beatae quisquam corporis veritatis, modi at excepturi? Iusto animi atque eius sed ut nulla inventore perspiciatis deleniti, odio minima facere assumenda maiores! Corporis fugit id architecto quod tenetur similique reiciendis suscipit at eligendi? Amet incidunt, repellat eveniet officia odit sapiente asperiores ipsa quis optio cupiditate ratione error inventore rerum quia autem tempora explicabo veritatis. Nihil sapiente commodi, sit delectus illum dolorum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, earum. Quasi tempora molestiae modi obcaecati doloremque odio esse, necessitatibus minus totam laborum unde beatae, aut, autem officiis! Eligendi quas hic incidunt ipsam voluptatem laboriosam qui cumque assumenda nulla laudantium beatae quisquam corporis veritatis, modi at excepturi? Iusto animi atque eius sed ut nulla inventore perspiciatis deleniti, odio minima facere assumenda maiores! Corporis fugit id architecto quod tenetur similique reiciendis suscipit at eligendi? Amet incidunt, repellat eveniet officia odit sapiente asperiores ipsa quis optio cupiditate ratione error inventore rerum quia autem tempora explicabo veritatis. Nihil sapiente commodi, sit delectus illum dolorum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, earum. Quasi tempora molestiae modi obcaecati doloremque odio esse, necessitatibus minus totam laborum unde beatae, aut, autem officiis! Eligendi quas hic incidunt ipsam voluptatem laboriosam qui cumque assumenda nulla laudantium beatae quisquam corporis veritatis, modi at excepturi? Iusto animi atque eius sed ut nulla inventore perspiciatis deleniti, odio minima facere assumenda maiores! Corporis fugit id architecto quod tenetur similique reiciendis suscipit at eligendi? Amet incidunt, repellat eveniet officia odit sapiente asperiores ipsa quis optio cupiditate ratione error inventore rerum quia autem tempora explicabo veritatis. Nihil sapiente commodi, sit delectus illum dolorum.</p>
            <SliderTeamMembers />
        </div>
    )
}
export default AboutUs;