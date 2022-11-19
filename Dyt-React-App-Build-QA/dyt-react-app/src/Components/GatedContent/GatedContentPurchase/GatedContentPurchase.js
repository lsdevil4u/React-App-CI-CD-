import { useEffect, useState } from 'react';
import './GatedContentPurchase.scss';
import { Header } from './../../Shared/Header';
import StudioAnimate from '../../Shared/Animations/StudioAnimate/StudioAnimate';
import { UnlockContent, ContactDetails, coupounText, ExpiresInText } from '../../../Constant/Strings';
import InputText from '../../Shared/InputText/InputText';
import { validEmail, PHONE_VALIDTE, nameValidate } from '../../Shared/Validators/Validators';
import PrimaryButton from '../../Shared/Button/PrimaryButton';
import Footer from './../../Shared/Footer/Footer';
import { gatedContentCreateOrder, gatedContentVerifyPayment, getSecuredGatedContent } from '../../../Redux/Actions/GatedContent';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Loader } from '../../Shared/Loader';
import { displayRazorpayPaymentSdk } from '../../Utils/razorpay';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { saveAs } from 'file-saver'


const GatedContentPurchase = () => {
    const [datum, setDatum] = useState([]);
    const [userdata, setUserdata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiResponse, setApiResponse] = useState('');
    const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);
    let { gated_content_id } = useParams()
    gated_content_id = base64_decode(gated_content_id);
    const location = useLocation()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('user_token')) {
            return navigate('/login');
        }
        dispatch(getSecuredGatedContent(gated_content_id))
            .then((res) => {
                setDatum(res.data)
                setUnLocked(res.data?.has_access || false)
                setCheckOutForm(prevValue => {
                    return {
                        ...prevValue,
                        price: res?.data?.price
                    }
                })
                if (location?.state?.showPurchaseDetails !== true) {
                    setTimeout(() => setLoading(false), 1);
                }
            })
            .catch((err) => {
            })
        // if (location?.state?.showPurchaseDetails === true){
        //     dispatch(getWorkShopAttendeeList(gated_content_id))
        //     .then((res) => {
        //         setShowPurchaseDetails(true)
        //         setUserdata(res.data)
        //         setTimeout(() => setLoading(false), 500);
        //     })
        //     .catch((err) => {
        //     })
        // } 

    }, [])

    const handleDownloadContent = (url) => {
        let filename = url.split('/').pop()
        saveAs(url, filename)
    }

    const [paymentCheckout, setPaymentCheckout] = useState(false)
    const [downloadContent, setDownloadContent] = useState(false)
    const [unLocked, setUnLocked] = useState(false)


    const [checkOutForm, setCheckOutForm] = useState({
        email: localStorage.getItem('email'),
        fullname: localStorage.getItem('username'),
        phonenumber: localStorage.getItem('contact_number'),
        price: datum?.price,
    })
    const handlechange = (event) => {
        const { name, value, type, checked } = event.target;
        setCheckOutForm(prevValue => {
            return {
                ...prevValue,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    const paymentCheckoutForm = () => {
        setPaymentCheckout(true);
        // setUnLocked(true);
    }
    const downloadContentCard = () => {
        setDownloadContent(true);
        setPaymentCheckout(false);
        setUnLocked(false);
    }

    const verifyPaymentStatus = (payload) => {
        dispatch(gatedContentVerifyPayment(payload)
        ).then((response) => {

            setApiResponse(response)
            if (response?.payment_status === "success")
                setUnLocked(true)
        }
        ).catch(err => {

            setApiResponse(err)
            if (err?.payment_status === "failed")
                setUnLocked(false)
        })

    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (validEmail.test(checkOutForm.email) && nameValidate.test(checkOutForm.fullname) && PHONE_VALIDTE.test(checkOutForm.phonenumber)) {
            dispatch(gatedContentCreateOrder(checkOutForm, gated_content_id))
                .then((response) => {
                    displayRazorpayPaymentSdk(
                        datum.price,
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
        <>
            {loading ? <Loader />
                :
                <>
                    <StudioAnimate />
                    <div className='container-fluid gated-content-purchasePage'>
                        <div className='row header'>
                            <div className='col'>
                                <div className=''>
                                    {/* <Header /> */}
                                </div>
                            </div>
                        </div>

                        {/* for locked Content */}
                        {!unLocked && <div>
                            <div className={`${paymentCheckout ? "locked-container" && "locked-form" : "gated-content-cardbody"}`}>
                                {true && downloadContent === false && (
                                    <div className='row gated-content-cardbody locked-container'>
                                        <div className='col'>
                                            <div className="container payment-locked">
                                                <div className='card img-fluid'>
                                                    <img src={datum?.content?.content || '../../Assests/Images/GatedContCover.png'} className='cover-image' />

                                                    <div onClick={paymentCheckoutForm} className='card-img-overlay transparent'>
                                                        <div className='card-title'>
                                                            <div className='thumbnail-Pic'>
                                                                <img src={datum?.user_details?.avatar['128X128'] || datum?.user_details?.avatar?.actual || '../../Assests/Images/Thumbnail.png'} className='card-title-image' />
                                                                <div>
                                                                    <div className='name'> {datum?.user_details?.username} </div>
                                                                    <div className='pic-details'> {datum?.title} </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className='card-text'>
                                                            <img src='../../Assests/Images/lockIcon.png' className='lock-image' />
                                                        </div>
                                                        <div className='card-text'>
                                                            <button className='payment-button'>{UnlockContent} ₹ {datum.price}</button>
                                                        </div>
                                                    </div>
                                                    <div className='payment-footer'>{ContactDetails}</div>

                                                </div>
                                                {/* <div className='coupon-code-container'>
                                        <div className='d-flex coupon-codetext'>
                                            <div>
                                                <img src='../../Assests/Images/coupounIcon.png' className='coupounIcon' />

                                            </div>
                                            <span className='coupountext'>{coupounText}</span>
                                        </div>
                                        <div className='expires-text'>{ExpiresInText}</div>
                                    </div> */}
                                            </div>
                                        </div>

                                    </div>
                                )}

                                {/* basic details form */}

                                {true && paymentCheckout && (
                                    <div className='form-side locked-form'>

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
                                                    {(checkOutForm.fullname?.length > 0 && !nameValidate.test(checkOutForm.fullname)) && <span className='warnings'>Invalid Name</span>}
                                                    <div className=''>Phone Number</div>
                                                    <InputText
                                                        placeholder='Enter phone number'
                                                        type="number"
                                                        className="input-box"
                                                        onChange={handlechange}
                                                        name="phonenumber"
                                                        value={checkOutForm.phonenumber}
                                                    />
                                                    {(checkOutForm.phonenumber?.length > 0 && !PHONE_VALIDTE.test(checkOutForm.phonenumber)) && <span className='warnings'>Invalid Phone Number</span>}

                                                    {/* <div className=''>Instagram Username</div>
                                        <InputText
                                            placeholder="_john_doe_"
                                            type="text"
                                            className="input-box"
                                            onChange={handlechange}
                                            name="insta-username"
                                            value={checkOutForm.username}
                                        /> */}

                                                </div>}
                                            </div>
                                            <PrimaryButton message="Make Payment" className='payment-btn' onPrimaryClick={handleSubmit} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>}

                        {/* unlocked content  */}

                        {unLocked && (

                            // <div className={`${downloadContent ? "unlocked-content-card" : "locked-form"}`}>
                            <div className='unlocked-content-card'>
                                <div className='container payment-unlocked'>
                                    <div className='card img-fluid'>
                                        <img src={datum?.content?.content || '../../Assests/Images/GatedContCover.png'} className='cover-img' />
                                        <div className='card-img-overlay transparent'>
                                            <div className='card-title'>
                                                <div className='thumbnail-Pic'>
                                                    <img src={datum?.user_details?.avatar['40X40'] || datum?.user_details?.avatar?.actual || '../../Assests/Images/thumbnailPayment.png'} className='card-title-image' />
                                                    <div className='name'>{datum?.user_details?.username}</div>
                                                    <div className='pic-details'>{datum?.title} </div>
                                                </div>
                                            </div>

                                            {datum?.message && <div className='card-text'> {datum?.message} </div>}
                                        </div>
                                    </div>
                                    {
                                        datum?.content?.content && <button className='download-button' onClick={() => handleDownloadContent(datum?.content?.download_link)} ><img src='../../Assests/Images/DownloadIcon.png' className='download-icon' /> DOWNLOAD CONTENT </button>
                                    }

                                </div>
                            </div>

                        )}

                        {/* footer */}
                        <div className='footer'>
                            {/* <Footer /> */}
                        </div>

                    </div>
                </>
            }
        </>

    )
}

export default GatedContentPurchase