import React, { useState, useEffect } from 'react';
import Header from '../../Shared/Header/Header';
import { EMAIL_PHONE } from '../../../Constant/Strings';
import InputText from './../../Shared/InputText/InputText';
import LoginOtp from '../../Shared/LoginOtp/LoginOtp';
import PrimaryButton from '../../Shared/Button/PrimaryButton';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { LoginPage } from '../../../Redux/Actions/Login';
import { validEmail, PHONE_VALIDTE } from '../../Shared/Validators/Validators';
import StudioAnimate from '../../Shared/Animations/StudioAnimate/StudioAnimate';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import Loader from './../../Shared/Loader/Loader';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('user_token') !== null) {
      navigate(-1);
    }
  }, [])


  const login = useSelector((state) => state?.Login,
    shallowEqual
  );

  const loginpage = useSelector((state) => state?.Login?.response,
    shallowEqual
  );

  const [toggleLog, setToggleLog] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);
  const [contactInfoValidation, setContactInfoValidation] = useState(false);
  const [phoneValidation, setPhoneValidation] = useState(false);

  function isNumber(str) {
    if (str.trim() === '') {
      return false;
    }
    return !isNaN(str);
  }
  const getContactInfoMsg = () => {
    return (contactInfoValidation ? "This Field can not be empty" : emailValidation ? "Email address is not valid" : phoneValidation ? "Phone number is not valid" : "");
  }

  // api call for login

  const submitOtp = (e) => {
    e.preventDefault();

    var country_code = '';
    if (!contactInfo.length > 0) { setContactInfoValidation(true); return; } else { setContactInfoValidation(false) };

    if (isNumber(contactInfo)) {
      if (!PHONE_VALIDTE.test(contactInfo)) { setPhoneValidation(true); return; } else { setPhoneValidation(false) };
      country_code = 'IN'
    } else {
      if (!validEmail.test(contactInfo)) { setEmailValidation(true); return; } else { setEmailValidation(false) };
      country_code = ''
    }


    const payload = {
      "contact_info": contactInfo,
      "country_code": country_code,
      "mode": ""
    }
    setToggleLog(true);
    dispatch(LoginPage(payload))
      .then((res) => {
        localStorage.setItem('contact_info', contactInfo)
        localStorage.setItem('country_code', country_code)
      })
      .catch((err) => {
      })
  }



  return (
    <>
      {login?.isLoginPending && <Loader />}
      <StudioAnimate />
      <div className='container-fluid login__studio'>
        <div className='row auth-bg header'>
          <div className='col'>
            <div className=''>
              <Header />
            </div>
          </div>
        </div>
        <div className='row login-form pl-0'>
          <div className='col pl-0'>
            <div className='log-text mb-2'>Login</div>
            <form className='log-container border-gradient mr-2' onSubmit={(e) => {e.preventDefault();}}>
              <div className='email-phone-cont mt-1'>{EMAIL_PHONE}</div>
              <div className='mt-5 ml-0'>
                <InputText
                  disabled={toggleLog ? true : false}
                  type='text'
                  value={contactInfo}
                  placeholder='johndoe@gmail.com'
                  onChange={(e) => {
                    setContactInfo(e.target.value);
                  }}
                  validation={(contactInfoValidation || emailValidation || phoneValidation)}
                  validationTitle={getContactInfoMsg()}
                />
              </div>

              {toggleLog === false && (
                <div>
                  <PrimaryButton
                    message="Send OTP"
                    color="#8852CE"
                    onPrimaryClick={(e) => submitOtp(e)}
                  />
                </div>
              )}
              {toggleLog && (
                <div className=''>
                  <LoginOtp login={loginpage} />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;