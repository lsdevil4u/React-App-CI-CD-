import React, { useState } from 'react'
import './CheckoutPageForm.scss'
import Footer from './../../Shared/Footer/Footer';
import Header from './../../Shared/Header/Header';
import PrimaryButton from '../../Shared/Button/PrimaryButton';
import { WhiteTick } from '../../Shared/Svg/Svg';
import InputText from '../../Shared/InputText/InputText';
import { checkoutPage } from '../../../Constant/Strings';
import { validEmail, PHONE_VALIDTE, nameValidate } from '../../Shared/Validators/Validators';
import { useDispatch } from 'react-redux';
import GatedContentCard from '../../Shared/GatedContentCard/GatedContentCard';
import ResponseModals from '../../Shared/Screens/ResponseModals/ResponseModals';
import { PurchaseWebinar, verifyWorkShopPayment } from './../../../Redux/Actions/WorkShop';
import { displayRazorpayPaymentSdk } from '../../Utils/razorpay';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Moment from 'moment';

const CheckoutPageForm = () => {
    const dispatch = useDispatch()
    const { workshop_id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const [checkOutForm, setCheckOutForm] = useState({
        email: localStorage.getItem('email') || '',
        fullname: localStorage.getItem('username') || '',
        phonenumber: localStorage.getItem('contact_number') || '',
        price: 1
    })

    if (location.state == null) {
        navigate(`/workshop/${workshop_id}`)
    }

    const handlechange = (event) => {
        const { name, value, type, checked } = event.target;
        setCheckOutForm(prevValue => {
            return {
                ...prevValue,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    const [apiResponse, setApiResponse] = useState()
    const verifyPaymentStatus = (payload) => {
        dispatch(verifyWorkShopPayment(payload)
        ).then((response) => {
            setApiResponse(response)
        }
        ).catch(err => {
            setApiResponse(err)
        })

    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (validEmail.test(checkOutForm.email)
            // && nameValidate.test(checkOutForm.fullname)
            && PHONE_VALIDTE.test(checkOutForm.phonenumber)) {
            dispatch(PurchaseWebinar(checkOutForm, workshop_id))
                .then((response) => {
                    displayRazorpayPaymentSdk(
                        checkOutForm.price,
                        checkOutForm.phonenumber,
                        checkOutForm.email,
                        response.order_id,
                        verifyPaymentStatus
                    )
                }
                )
                .catch(error => setApiResponse(error))
        }
    }


    return (
        <div className='CheckoutPageForm-page'>
            <div className='header'><Header /></div>

            <div className=''>
                <div className='registration-screen'>
                    <div className='text-side '>
                        <div className='registration-header'>{checkoutPage}</div>

                        <div className='checkout-slide'>
                            <div> <img className='checkout-slide checkout-slide-img' src={location?.state?.cover_image_urls?.['512X512'] || location?.state?.cover_image_urls?.actual || '../../../Assests/Images/WrkShopCard.png'} alt="cover image of workshop being checked out" /> </div>

                            <div className='checkout-slide-details'>

                                <div className='checkout-slide-details-duration'>
                                    <span>{location?.state?.webinar_host} </span> <span>{location?.state?.duration}</span>
                                </div>
                                <div className='checkout-slide-details-title'>
                                    {location?.state?.webinar_title}
                                </div>
                                <div className='checkout-slide-details-desc'>
                                    {location?.state?.description}
                                </div>
                                <div className='checkout-slide-details-price'>
                                    {location?.state?.price}
                                </div>
                                <div className='checkout-slide-details-schedule'>
                                    Workshop On <span> {Moment(location?.state?.start_date).format('DD-MM-YYYY @ hh:m A')} </span>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className='checkout-card'>
                        <div className='registration-header'>{checkoutPage}</div>
                        <GatedContentCard

                        />
                    </div>

                    <div className='form-side'>
                        {((apiResponse?.status >= 200 && apiResponse?.status < 300) || apiResponse?.status === undefined) ?
                            <div>

                                <div className=''>

                                    <div className='progress-status'>
                                        <h1 className=''>Enter Basic Details</h1>
                                    </div>

                                </div>
                                <hr />
                                <div className='reg-form mb-3'>
                                    {<div className='reg-form-basics'>
                                        <div className=''>Email</div>
                                        <InputText
                                            placeholder='JohnDoe@email.com'
                                            type="email"
                                            className="input-box"
                                            onChange={handlechange}
                                            name="email"
                                            value={checkOutForm.email}
                                        />
                                        {(checkOutForm.email?.length > 0 && !validEmail.test(checkOutForm.email)) && <span className='warnings'>Invalid Email</span>}

                                        <div className=''>Full Name</div>
                                        <InputText
                                            placeholder='JohnDoe'
                                            type="text"
                                            className="input-box"
                                            onChange={handlechange}
                                            name="fullname"
                                            value={checkOutForm.fullname}
                                        />
                                        {/* {(checkOutForm.fullname?.length > 0 && !nameValidate.test(checkOutForm.fullname)) && <span className='warnings'>Invalid Name</span>} */}
                                        <div className=''>Phone Number</div>
                                        <InputText
                                            placeholder='Type Here'
                                            type="number"
                                            className="input-box"
                                            onChange={handlechange}
                                            name="phonenumber"
                                            value={checkOutForm.phonenumber}
                                        />
                                        {(checkOutForm.phonenumber?.length > 0 && !PHONE_VALIDTE.test(checkOutForm.phonenumber)) && <span className='warnings'>Invalid Phone Number</span>}
                                    </div>}
                                </div>
                                <PrimaryButton
                                    message='Next'
                                    className='next-btn'
                                    onPrimaryClick={handleSubmit}
                                />
                            </div>
                            :
                            <ResponseModals response={apiResponse} setResponse={setApiResponse} />
                        }


                    </div>
                </div>
            </div>


            <div className='footer'><Footer /></div>
        </div>


    )
}

export default CheckoutPageForm