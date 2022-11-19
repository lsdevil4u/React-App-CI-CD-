import React from 'react'
import Footer from '../../Footer/Footer'
import { Header } from '../../Header'
import './PageNotFound.scss'



const PageNotFound = () => {
    return (
        <div className='PageNotFound-page'>
            <div className='header'>
                <Header />
            </div>
            <div className='pagenotfound-img'>

                <img className='pagenotfound-im' alt='page not found! try searching something else.' src='/Assests/Images/PageNotFound.png' />
                <div className='pagenotfound-text'>Woah, seems like DYT Studio doesn't have this page!</div>
                <a href='/'>
                    <div>Go To Home</div>
                </a>
            </div>
            <div className='footer'>
                <Footer />
            </div>
        </div>
    )
}

export default PageNotFound