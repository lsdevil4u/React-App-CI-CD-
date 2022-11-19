import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENTER_OTP, NOTIFY_MESSAGE } from '../../../Constant/Strings';
import PrimaryButton from '../Button/PrimaryButton';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { LoginPage, VerifyOtp } from '../../../Redux/Actions/Login';
import './LoginOtp.scss';
import Swal from 'sweetalert2';

const LoginOtp = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const Login = useSelector((state) => state?.Login,
        shallowEqual
    );


    const [counter, setCounter] = useState(30);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [value, setValue] = useState('');

    const handleChange = event => {
        const result = event.target.value.replace(/\D/g, '');
        setValue(result);
    };

    //validations for otp fields
    const preventPasteNegative = (e) => {
        const clipboardData = e.clipboardData || window.clipboardData;
        const pastedData = parseFloat(clipboardData.getData('text'));
        if (pastedData < 0) {
            e.preventDefault();
        }
    };
    const preventMinus = (e) => {
        if (e.code === 'Minus') {
            e.preventDefault();
        }
    };




    //for otp fields

    // const handleChange = (event, id) => {
    //     const result = event.target.value.replace(/\D/g, '');
    //     if (result) {
    //         let temp_otp = otp
    //         temp_otp[id] = event.target.value
    //         setOtp(temp_otp)
    //         if (id < 6) {
    //             document.getElementById(`otp_${id + 1}`).focus();
    //         }
    //     } else {
    //         event.target.value = result;
    //     }
    // };
    // const handleKeyDown = (event, id) => {
    //     console.log(id)
    //     console.log(otp)
    //     if (event.key === 'Backspace') {
    //         event.target.value = '';
    //         let temp_otp = otp
    //         temp_otp[id] = event.target.value
    //         setOtp(temp_otp)
    //         if (id > 0) {
    //             document.getElementById(`otp_${id - 1}`).focus();
    //         }
    //     }
    // };





    //api call for register

    const submitLogin = () => {
        // var final_otp = otp.join('');
        const payload = {
            "contact_info": localStorage.getItem('contact_info'),
            "country_code": localStorage.getItem('country_code'),
            // "otp": parseInt(final_otp, 10),
            "otp": Number(value),
        }
        dispatch(VerifyOtp(payload))
            .then((res) => {
                if (res.new_user === false) {
                    // localStorage.setItem('user_token', res.token)
                    localStorage.setItem('user_token', res.token)
                    localStorage.setItem('username', res.user.username)
                    localStorage.setItem('avatar', res.user.avatar)
                    localStorage.setItem('email', res.user.email)
                    localStorage.setItem('contact_number', res.user.contact_number)
                    localStorage.setItem('current_user_id', res.user.id)

                }
                res.new_user === true ? navigate('/onboarding') : window.location.reload();
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    text: `OTP is Incorrect or Expired`,
                    color: 'white',
                    background: 'black',
                    confirmButtonColor: '#8852CE',
                })
            })
            .finally((err) => {
            }
            )
    }

    const generateOtp = (e, mode) => {
        e.preventDefault();
        const payload = {
            "contact_info": localStorage.getItem('contact_info'),
            "country_code": localStorage.getItem('country_code'),
            "mode": mode
        }
        dispatch(LoginPage(payload))
            .then((res) => {
                setCounter(30)
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    text: `Somthing went wrong. Please try again`,
                    color: 'white',
                    background: 'black',
                    confirmButtonColor: '#8852CE',
                })
            })
    }

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter, otp]);

    return (
        <div className='container-fluid login_otp'>
            <div className='row'>
                <div className='col otp-body ml-2 pl-0'>
                    <div className='count-otp mt-3 mb-3'>{ENTER_OTP}</div>
                    <div className='otp '>

                        {/* {[...Array(6)].map((e, i) => (
                            <input key={i} type='text' className='spacing' maxLength="1"
                                pattern='[0-9]$' onPaste={preventPasteNegative} onKeyDownCapture={preventMinus} onKeyDown={(e) => handleKeyDown(e, i)}
                                onWheel={(e) => e.target.blur()} onChange={(event) => handleChange(event, i)} id={`otp_${i}`} />
                        ))} */}
                        <input
                            type='tel'
                            maxLength="6"
                            onPaste={preventPasteNegative}
                            onKeyDownCapture={preventMinus}
                            onWheel={(e) => e.target.blur()}
                            className='otp-feild'
                            id='otp'
                            value={value}
                            onChange={handleChange}
                        />

                    </div>

                    {counter !== 0 ?
                        // <div className='timer'><div className='time-out'>Resend Otp in </div> {`${counter}`}</div>
                        <p className='timer'>Resend OTP in<span className='time-out'>{` ${counter}`}</span></p>
                        :
                        <span>

                            <div className='resend-otp mt-3' >
                                Didn't get otp ? Resend
                            </div>
                            <div className='mt-3 mb-3'>
                                <div className='social'>
                                    {(localStorage?.country_code === "") && (
                                        <div className='social-container mr-2 mail' onClick={(e) => generateOtp(e)}>
                                            <img src="../../../Assests/Images/MailBox.png" className='social-icon' />
                                            <span>mail id</span>
                                        </div>
                                    )}

                                    {(localStorage?.country_code !== "") && (
                                        <div className='d-flex'>
                                            <div className='social-container mrl-2' style={{ width: "6.7rem", fontSize: ".8rem" }} onClick={(e) => generateOtp(e)}>
                                                <img src="../../../Assests/Images/MsgBox.png" className='social-icon' />
                                                <span>messages</span>
                                            </div>
                                            <div className='social-container mr-0' style={{ width: "6.7rem", fontSize: ".8rem" }} onClick={(e) => generateOtp(e, 'ivr')}>
                                                <img src="../../../Assests/Images/Phone.png" className='social-icon' />
                                                <span>phone</span>
                                            </div>
                                            <div className='social-container mr-0' style={{ width: "6.7rem", fontSize: ".8rem" }} onClick={(e) => generateOtp(e, 'whats_app')}>
                                                <img src="../../../Assests/Images/Whatsapp.png" className='social-icon' />
                                                <span>whatsapp</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </span>}


                    <div>
                        <PrimaryButton color="#2F9201" message="Login" onPrimaryClick={submitLogin} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginOtp;