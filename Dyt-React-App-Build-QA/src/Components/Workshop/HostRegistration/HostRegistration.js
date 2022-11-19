import { React, useEffect, useState } from 'react'
import './HostRegistration.scss'
import Header from './../../Shared/Header/Header';
import Footer from './../../Shared/Footer/Footer';
import { WorkshopSH1, WorkshopSH2, BecomeaHost } from '../../../Constant/Strings';
import InputText from './../../Shared/InputText/InputText';
import PrimaryButton from './../../Shared/Button/PrimaryButton';
import { WhiteTick } from './../../Shared/Svg/Svg';
import { validEmail, EMAIL_VALIDATE, nameValidate, PHONE_VALIDTE, linkValidate } from '../../Shared/Validators/Validators';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { createHostAccount } from '../../../Redux/Actions/WorkShop';
import ResponseModals from '../../Shared/Screens/ResponseModals/ResponseModals';
import { useNavigate } from 'react-router-dom';

const HostRegistration = () => {

    const dispatch = useDispatch();
    const hostRegister = useSelector((state) => state?.CreateHostAccount, shallowEqual);

    const [regForm, setRegForm] = useState({
        email: localStorage.getItem('email') || '',
        fullname: localStorage.getItem('username') || '',
        phone: localStorage.getItem('contact_number') || '',
        insta_url: '',
        yt_url: '',
        tw_url: '',
        fb_url: '',
        linked_in_url: '',
        overview: '',
        user_learning: '',
        avg_duration: '',
        overview: '',
        user_learning: '',
        public_speaking_rating: `3`,

    })

    const handleRegForm = (event) => {
        const { name, value, type, checked } = event.target
        setRegForm(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    const [emailValidation, setEmailValidation] = useState(false);
    const [nameValidation, setNameValidation] = useState(false);
    const [phoneValidation, setPhoneValidation] = useState(false);
    const [avg_duration, setDuration] = useState(false)
    const [pages, setPages] = useState(1);
    const [response, setResponse] = useState('')
    const navigate = useNavigate()
    const [InstaLinkValidate, setInstaLinkValidate] = useState(false);
    const [YtLinkValidate, setYtLinkValidate] = useState(false);
    const [FbLinkValidate, setFbLinkValidate] = useState(false);
    const [TwLinkValidate, setTwLinkValidate] = useState(false);
    const [LinkedInLinkValidate, setLinkedInLinkValidate] = useState(false);

    console.log(pages, 'Pages');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (pages === 1) {
            setPages(prevValue => prevValue + 1);
        }
        if (pages === 1 && (regForm.email?.length > 0 && !validEmail.test(regForm.email))) { setEmailValidation(true); return } else { setEmailValidation(false); }
        if (pages === 1 && (regForm.fullname?.length > 0 && !validEmail.test(regForm.fullname))) { setNameValidation(true); return } else { setNameValidation(false); }
        if (pages === 1 && (regForm.phone?.length > 0 && !validEmail.test(regForm.phone))) { setPhoneValidation(true); return } else { setPhoneValidation(false); }

        if (pages === 2 && (regForm.insta_url?.length > 0 && !linkValidate.test(regForm.insta_url))) { setInstaLinkValidate(true); return; } else { setInstaLinkValidate(false) };
        if (pages === 2 && (regForm.yt_url?.length > 0 && !linkValidate.test(regForm.yt_url))) { setYtLinkValidate(true); return; } else { setYtLinkValidate(false) };
        if (pages === 2 && (regForm.fb_url?.length > 0 && !linkValidate.test(regForm.fb_url))) { setFbLinkValidate(true); return; } else { setFbLinkValidate(false) };
        if (pages === 2 && (regForm.tw_url?.length > 0 && !linkValidate.test(regForm.tw_url))) { setTwLinkValidate(true); return; } else { setTwLinkValidate(false) };
        if (pages === 2 && (regForm.linked_in_url?.length > 0 && !linkValidate.test(regForm.linked_in_url))) { setLinkedInLinkValidate(true); return; } else { setLinkedInLinkValidate(false) };
        if (pages === 2) {
            setPages(prevValue => prevValue + 1);
        }

        if (pages === 3 && regForm.avg_duration === "") { setDuration(true); return; } else { setDuration(false) };
        if (pages === 3) {
            dispatch(createHostAccount(regForm))
                .then(response => { setResponse(response); navigate('/my-workshops') })
                .catch(error => setResponse(error))
        }
    }

    const handleBack = (event) => {
        event.preventDefault();

        if (pages === 2) {
            setPages(prevValue => prevValue - 1);
        }
        if (pages === 3) {
            setPages(2)
        }
    }


    return (
        <>
            {/* {hostRegister?.isLoadingPending && <Loading />} */}

            <div className='hostRegistration-page'>
                <Header />
                <div className=''>

                    <div className='registration-screen'>
                        <div className='text-side'>
                            <div className='registration-header'>{BecomeaHost}</div>
                            <div className='sub-header'>{WorkshopSH1}</div>
                            <div className='sub-header'>{WorkshopSH2}</div>
                        </div>

                        <div className='form-side'>
                            {((response?.status >= 200 && response?.status < 300) || response.status === undefined) ?
                                <div>
                                    <div className='d-flex justify-content-around'>

                                        <span className='progress-status'>
                                            <span className=''>
                                                {
                                                    pages > 1
                                                        ?
                                                        <div className='progress-stages progress-stages-checked'>{WhiteTick}</div>
                                                        :
                                                        <div className='progress-stages'>1</div>
                                                }
                                            </span>
                                            <span className=''>Basics</span>
                                        </span>

                                        <span className='progress-status'>
                                            <span>
                                                {
                                                    pages > 2 ?
                                                        <div className='progress-stages progress-stages-checked'>{WhiteTick}</div>
                                                        :
                                                        <div className='progress-stages'>2</div>
                                                }

                                            </span>
                                            <span>Social Media</span>
                                        </span>

                                        <span className='progress-status'>
                                            <span>
                                                {
                                                    pages > 3 ?
                                                        <div className='progress-stages progress-stages-checked'>{WhiteTick}</div>
                                                        :
                                                        <div className='progress-stages'>3</div>
                                                }
                                            </span>
                                            <span>Others</span>
                                        </span>

                                    </div>
                                    <hr />
                                    <form className='reg-form mb-3' onSubmit={handleSubmit}>
                                        {(pages === 1)
                                            &&
                                            <div className='reg-form-basics'>
                                                <div className=''>Email</div>

                                                <InputText
                                                    placeholder='DonJoey@email.com'
                                                    type="email"
                                                    className="input-box"
                                                    onChange={handleRegForm}
                                                    name="email"
                                                    value={regForm.email}
                                                />
                                                {emailValidation && ((regForm.email?.length > 0 && !validEmail.test(regForm.email)) && <span className='warnings'>Invalid Email</span>)}

                                                <div>Full Name</div>
                                                <InputText
                                                    placeholder='Fullname'
                                                    type="text"
                                                    className={`input-box ${regForm.fullname?.length > 0 && !nameValidate.test(regForm.fullname) && "warning-textbox"} `}
                                                    onChange={handleRegForm}
                                                    name='fullname'
                                                    value={regForm.fullname}
                                                />
                                                {nameValidation && ((regForm.fullname?.length > 0 && !nameValidate.test(regForm.fullname)) && <span className='warnings'>Invalid Name</span>)}

                                                <div>Phone Number</div>
                                                <InputText
                                                    placeholder='Phone Number'
                                                    type="number"
                                                    className={`phone-number-input input-box ${regForm.phone?.length > 0 && !PHONE_VALIDTE.test(regForm.phone) && "warning-textbox"}`}
                                                    onChange={handleRegForm}
                                                    name="phone"
                                                    value={regForm.phone}
                                                />
                                                {phoneValidation && ((regForm.phone?.length > 0 && !PHONE_VALIDTE.test(regForm.phone)) && <span className='warnings'>Invalid Phone Number</span>)}
                                            </div>}


                                        {(pages === 2)
                                            &&
                                            <div className='reg-form-socials'>
                                                <div>Instagram Account Link</div>
                                                <InputText
                                                    placeholder='instagram.com/JohnDoe'
                                                    type="text"
                                                    className={`phone-number-input input-box ${regForm.insta_url?.length > 0 && !linkValidate.test(regForm.insta_url) && "warning-textbox"}`}
                                                    onChange={handleRegForm}
                                                    name="insta_url"
                                                    value={regForm.insta_url}
                                                />
                                                {InstaLinkValidate && (
                                                    regForm.insta_url?.length > 0 &&
                                                    (!linkValidate.test(regForm.insta_url)) && <span className='warnings'>Invalid Link</span>
                                                )}


                                                <div>YouTube Account Link</div>
                                                <InputText
                                                    placeholder='youtube.com/JohnDoe'
                                                    type="text"
                                                    className={`phone-number-input input-box ${regForm.yt_url?.length > 0 && !linkValidate.test(regForm.yt_url) && "warning-textbox"}`}
                                                    onChange={handleRegForm}
                                                    name='yt_url'
                                                    value={regForm.yt_url}
                                                />
                                                {YtLinkValidate && (
                                                    regForm.yt_url?.length > 0 &&
                                                    (!linkValidate.test(regForm.yt_url)) && <span className='warnings'>Invalid Link</span>
                                                )}

                                                <div>Twitter Account Link</div>
                                                <InputText
                                                    placeholder='twitter.com/JohnDoe'
                                                    type="text"
                                                    className={`phone-number-input input-box ${regForm.tw_url?.length > 0 && !linkValidate.test(regForm.tw_url) && "warning-textbox"}`}
                                                    onChange={handleRegForm}
                                                    name='tw_url'
                                                    value={regForm.tw_url}
                                                />
                                                {TwLinkValidate && ((regForm.tw_url?.length > 0 && !linkValidate.test(regForm.tw_url)) && <span className='warnings'>Invalid Link</span>)}


                                                <div>Facebook Account Link</div>
                                                <InputText
                                                    placeholder='facebook.com/JohnDoe'
                                                    type="text"
                                                    className={`phone-number-input input-box ${regForm.fb_url?.length > 0 && !linkValidate.test(regForm.fb_url) && "warning-textbox"}`}
                                                    onChange={handleRegForm}
                                                    name='fb_url'
                                                    value={regForm.fb_url}
                                                />
                                                {FbLinkValidate && (
                                                    (regForm.fb_url?.length > 0 && !linkValidate.test(regForm.fb_url)) && <span className='warnings'>Invalid Link</span>
                                                )}


                                                <div>LinkedIn Account Link</div>
                                                <InputText
                                                    placeholder='linkd.in/JohnDoe'
                                                    type="text"
                                                    className={`phone-number-input input-box ${regForm.linked_in_url?.length > 0 && !linkValidate.test(regForm.linked_in_url) && "warning-textbox"}`}
                                                    onChange={handleRegForm}
                                                    name="linked_in_url"
                                                    value={regForm.linked_in_url}
                                                />

                                                {LinkedInLinkValidate && (
                                                    (regForm.linked_in_url?.length > 0 && !linkValidate.test(regForm.linked_in_url)) && <span className='warnings'>Invalid Link</span>
                                                )}

                                            </div>
                                        }


                                        {(pages === 3)
                                            &&
                                            <div className='reg-form-others'>
                                                <div>Overview of your workshop topics</div>
                                                <textarea
                                                    placeholder='Type here'
                                                    className="reg-form-textarea"
                                                    autoComplete='on'
                                                    autoCorrect='on'
                                                    maxLength='200'
                                                    onChange={handleRegForm}
                                                    name="overview"
                                                    value={regForm.overview}
                                                />
                                                <div>What will the user learn?</div>
                                                <textarea
                                                    placeholder='Type here'
                                                    className="reg-form-textarea"
                                                    autoComplete='on'
                                                    autoCorrect='on'
                                                    maxLength='200'
                                                    onChange={handleRegForm}
                                                    name="user_learning"
                                                    value={regForm.user_learning}
                                                />
                                                <span>
                                                    <div>Approximate avg_duration of your workshop</div>
                                                    <label className="container flexed">
                                                        <input
                                                            type="radio"
                                                            name="avg_duration"
                                                            onChange={handleRegForm}
                                                            checked={regForm.avg_duration === "lt_hour"}
                                                            value="lt_hour"
                                                        />
                                                        Less than one Hour
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <label className="container flexed">
                                                        <input
                                                            type="radio"
                                                            name="avg_duration"
                                                            onChange={handleRegForm}
                                                            checked={regForm.avg_duration === "eql_hour"}
                                                            value="eql_hour"
                                                        />
                                                        Exact one Hour
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <label className="container flexed">
                                                        <input
                                                            type="radio"
                                                            name="avg_duration"
                                                            onChange={handleRegForm}
                                                            checked={regForm.avg_duration === "gt_hour"}
                                                            value="gt_hour"
                                                        />
                                                        More than one Hour
                                                        <span className="checkmark"></span>
                                                    </label>

                                                </span>
                                                {avg_duration && ((pages === 3 && regForm.avg_duration === "") && <span className='warnings'>Choose any of the option</span>)}

                                            </div>
                                        }
                                        {/* <PrimaryButton
                                            message='Next'
                                            className='next-btn'
                                            onClick={checkForfields}
                                            backButton={pages > 1}
                                            onPrimaryClick={handleSubmit}
                                            onBackClick={handleBack}
                                        /> */}
                                        <PrimaryButton
                                            message='Next'
                                            className='next-btn'
                                            backButton={pages > 1}
                                            onBackClick={handleBack}
                                            onPrimaryClick={(e) => handleSubmit(e)}
                                        />
                                    </form>
                                </div>
                                :
                                <ResponseModals response={response} setResponse={setResponse} />
                            }

                        </div>
                    </div>

                </div>
                <Footer
                    className="regForm-footer"
                />
            </div>
        </>
    )
}

export default HostRegistration