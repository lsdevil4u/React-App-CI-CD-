import React, { useState, useEffect } from 'react';
import { USER_NAME, PHONE_NUMBER, EMAIL_ID, GENDER, NOTIFY_MESSAGE } from '../../../Constant/Strings';
import PrimaryButton from '../../Shared/Button/PrimaryButton';
import Header from '../../Shared/Header/Header';
import InputText from '../../Shared/InputText/InputText';
import { ProfileUpdate } from '../../../Redux/Actions/Profile';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import StudioAnimate from '../../Shared/Animations/StudioAnimate/StudioAnimate';
import { CheckUserName } from './../../../Redux/Actions/Login';
import Swal from 'sweetalert2'
import './SignUp.scss';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { dateTimeCalender } from '../../../Constant/Images';
import { UserNameValidate } from './../../Shared/Validators/Validators';

const SignUp = () => {

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const checkU = useSelector((state) => state?.CheckUserName,
    shallowEqual
  );

  useEffect(() => {
    if (localStorage.getItem('user_token') !== null && localStorage.getItem('user_token') !== 'undefined') {
      navigate(-3);
    }
  }, [])

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState(!localStorage.getItem('country_code') ? localStorage.getItem('contact_info') : '');
  const [phone, setPhone] = useState(localStorage.getItem('country_code') ? localStorage.getItem('contact_info') : '');
  const [gender, setGender] = useState("");
  const Gender = gender.slice(0, 1).toLocaleUpperCase();

  const [userValidation, setUserValidation] = useState(false);
  const [userError, setUserError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [phoneValidation, setPhoneValidation] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [dropdown, setDropdown] = useState(false);

  const birthDay = birthDate.getDate();
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth() + 1;
  const DOB = `${birthDay}-${birthMonth}-${birthYear}`

  const customDateOfBirth = (date) => {
    setBirthDate(date)
  }

  const confirmSignUp = (e) => {
    e.preventDefault();
    if (!checkU?.response?.available) { setUserError(true); return; } else { setUserError(false) };
    if (!userName.length > 0) { setUserValidation(true) };
    if (!email.length > 0) { setEmailValidation(true) };
    if (!phone.length > 0) { setPhoneValidation(true) } else { setPhoneValidation(false) }
    if (
      (email === "") || (phone === "") || (userName === "")
    ) {
      return;
    }
    else {
      const payload = {
        "email": email,
        "username": userName,
        "contact_number": phone,
        "gender": Gender,
        "country_code": "IN",
        // "dob": DOB,
      }
      dispatch(ProfileUpdate(payload))
        .then((res) => {
          localStorage.setItem('user_token', res.get_tokens_for_user.access)
          localStorage.setItem('username', userName)
          localStorage.setItem('avatar', res.avatar)
          localStorage.setItem('email', email)
          localStorage.setItem('contact_number', phone)
          localStorage.setItem('current_user_id', res.id)
          // localStorage.setItem('dob', birthDate)
          navigate(-2);

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
  }

  const handleChange = (e) => {
    setPhone(e.target.value)
    const result = e.target.value.replace(/\D/g, '');
    setPhone(result);
  }

  const SelectOption = (e) => {
    setGender(e.target.value);
  }
  const getUserName = () => {
    return (userValidation ? "Username can't be empty" : userError ? "User name not available choose another" : "");
  }
  const getEmail = () => {
    return (emailValidation ? "Email can't be empty" : emailError ? "" : "")
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailValidation(false);
  }
  const getPhone = () => {
    return (phoneValidation ? "Phone number can't be empty" : phoneError ? "" : "")
  }

  //for checking username

  const handleUser = (e) => {
    setUserValidation(false);
    setUserName(e.target.value);
    const payload = {
      "username_slug": e.target.value
    }
    dispatch(CheckUserName(payload))
      .then((res) => {
        if (res.available === true) {
          setUserError(false);
        }
        else {
          setUserError(true);
        }
      })
      .catch((err) => {
      })
  }

  return (
    <>
      <StudioAnimate />
      <div className='container-fluid onboarding_page'>
        <div className='row header'>
          <div className='col'>
            <div className=''>
              <Header />
            </div>
          </div>
        </div>
        <div className='row onboard-flow pl-0'>
          <div className='col pl-0'>
            <div className='sign-text mt-3'>Onboarding</div>
            <form className='signup-container border-gradient' onSubmit={e => confirmSignUp(e)} >
              <div>
                <div className='user-name mt-3'>{USER_NAME}</div>
                <div className='mt-3'>
                  <span className='user-check' id='username'>
                    {checkU?.response?.available === true && userName?.length > 0 && (
                      <i className="fa fa-check"></i>
                    )}
                    {checkU?.response?.available === false && userName?.length > 0 && (
                      <img src='../../Assests/Images/wrongMark.png' alt="wrong" width="12rem" />
                    )}
                  </span>
                  <InputText
                    name="userName"
                    type="text"
                    // id="user"
                    placeholder=""
                    onChange={(e) => handleUser(e)}
                    value={userName}
                    // errorMessage="Enter valid username and min 3 characters"
                    required="true"
                    pattern="^[A-Za-z0-9_]{3,16}$"
                    // onKeyUp={validateName()}
                    validation={(userValidation || userError)}
                    validationTitle={getUserName()}
                  />
                </div>
              </div>

              <div>
                <div className='user-name mt-3'>{PHONE_NUMBER}</div>
                <div className='mt-4 d-flex'>
                  <input value="+91" className='in-code ' disabled={true} />
                  <div className=''>
                    <InputText
                      disabled={localStorage?.country_code === 'IN' ? true : false}
                      type="text"
                      placeholder=""
                      name="phone"
                      value={phone}
                      pattern="[6,7,8,9]{1}[0-9]{9}"
                      maxLength="10"
                      onChange={(e) => handleChange(e)}
                      // required="true"
                      errorMessage="Please enter valid phone number"
                      style={{ width: "17.8rem" }}
                      validation={(phoneValidation || phoneError)}
                      validationTitle={getPhone()}
                    // style={{ marginLeft: "-2.2rem" }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className='user-name mt-3'>{EMAIL_ID}</div>
                <div className='mt-3'>
                  <InputText
                    disabled={localStorage?.country_code === '' ? true : false}
                    type="email"
                    placeholder=""
                    name="email"
                    value={email}
                    pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                    onChange={(e) => handleEmail(e)}
                    // required="true"
                    errorMessage="Please enter valid email address"
                    validation={(emailValidation || emailError)}
                    validationTitle={getEmail()}
                  />
                </div>
              </div>

              <div className='age-gen-div'>
                <div className='user-name mt-3'>DOB</div>
                <div className='mt-4'>
                  <label htmlFor='calender-workshop-calender' className='date-time-input'>
                    <div className='dateTimeCalender'>
                      {dateTimeCalender}
                    </div>

                    <div>
                      <DatePicker
                        selected={birthDate}
                        onChange={(date) => customDateOfBirth(date)}
                        className='calendar-datepicker input-bx'
                        dateFormat="dd/MM/yyyy"
                        calenderClassName="custom-calendar"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        maxDate={new Date()}
                      />
                    </div>

                  </label>
                </div>
                <div className='user-name mt-3'>{GENDER}</div>
                <div className='mt-4'>
                  <select className='gender-op' onChange={(e) => SelectOption(e)} value={gender}>
                    <option value='male' className='dropdown-list'>Male</option>
                    <option value='female' className='dropdown-list'>Female</option>
                    <option value='other' className='dropdown-list'>Other</option>
                  </select>

                  {/* <div className='gender-dropdown'>
                    <div className='gender-dropdown-selected' onClick={() => setDropdown(!dropdown)}>
                      <span>
                        <span className='dp-icons'>{ } </span>
                      </span>
                    </div>

                    <div>

                    </div>
                  </div> */}

                </div>
              </div>

              {/* <div className='notify'>
                <label className="select">
                  <input type="checkbox" className='mr-2'
                  />
                  <span className="checkmark"></span>
                </label>
                <span className='not-msg'>{NOTIFY_MESSAGE}</span>
              </div> */}
              <div className=''>
                <PrimaryButton message="Submit"
                  onPrimaryClick={(e) => confirmSignUp(e)}
                  width="100%"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp