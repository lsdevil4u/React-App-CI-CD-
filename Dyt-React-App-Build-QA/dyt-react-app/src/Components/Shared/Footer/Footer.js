import React from 'react'
import './Footer.scss'
import { QUOTE1, QUOTE2 } from '../../../Constant/Strings'

const Footer = ({ className }) => {
    return (
        <div className={`studio-footer ${className}`}>

            <div className='studio-footer-logoside'>
                <div className='d-flex flex-row logoandslogo'>
                    <img className='footer-logo' src="/Assests/Logo/Logo2.png" alt="Dyt studio, go to homepage" />
                    {/* <div className='ml-5' >Dyt <br /> Studio</div> */}
                </div>

                <div>
                    {QUOTE1}
                    <br />
                    {QUOTE2}
                </div>
            </div>

            <div className='studio-footer-infoside'>
                <a href='https://doyourthng.com/dyt-studio-privacy-policy/' target='_blank'>
                    <div>Privacy Policy</div>
                </a>
                <a href='https://doyourthng.com/dyt-faq/' target='_blank'>
                    <div>FAQ’s</div>
                </a>
                <a href='https://doyourthng.com/dyt-studio-terms-and-condition/' target='_blank'>
                    <div>Terms & Conditions</div>
                </a>

            </div>
        </div>
    )
}

export default Footer