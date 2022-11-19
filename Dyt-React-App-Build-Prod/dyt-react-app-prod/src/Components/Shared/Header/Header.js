import React, { useState, useEffect } from 'react';
import { DYT_LOGO } from '../../../Constant/Images';
import './Header.scss';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { crossBtn } from '../Svg/Svg';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Popup from './../Popup/Popup';
import { LogOut } from './../../../Constant/Images';

const Header = () => {
  let navigate = useNavigate();
  const location = useLocation();

  const [userName, setUserName] = useState(false);


  // const userN = localStorage.getItem('username').toString().slice(0, 1);
  const userN = localStorage?.username?.toString()
  const firstLetter = userN?.slice(0, 1)?.toUpperCase();
  const avatarImage = localStorage?.avatar

  let statusColor;
  let statusText;
  if (false) {
    statusColor = "#FFB800"
    statusText = `Your host application is under review. We are verifying your details.`
  }
  if (false) {
    statusColor = "#2F9201"
    statusText = `You are now a host on DYT Studio.To schedule one, go to Workshops > Host Workshop`
  }
  if (true) {
    statusColor = "orangered"
    statusText = `Your host application has been rejected. For details, please check your email.`
  }
  const [topBarClosed, setTopBarClosed] = useState(true)

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  }

  const [openLogout, setOpenLogout] = useState(false);
  const Logout = () => {
    setDropBar(!dropbar);
    setOpenLogout(true);
  }
  const CancelLogout = () => {
    setOpenLogout(false);
  }
  const LogoutPage = () => {
    setOpenLogout(false);
    navigate('/');
    localStorage.clear();
    setUserName(false);
  }


  const [dropbar, setDropBar] = useState(false);
  const showDropBar = () => {
    setDropBar(!dropbar);
  }

  return (
    <div className='container-fluidd studio-header'>
      <div className='row'>
        {location.pathname === "/" && <div className={` ${topBarClosed ? "d-none" : `row top-statusbar`}`} style={{ backgroundColor: statusColor }}> {statusText} <div onClick={() => setTopBarClosed(true)} className='close-btn'>{crossBtn}</div> </div>}
        {/* {location.pathname === "/" && <div className='row top-statusbar' style={{ backgroundColor: statusColor }}> {statusText}</div>} */}
        <div className='col'>
          <nav className='navigation'>
            <div className='d-flex header' onClick={() => navigate('/')}>
              <img src={DYT_LOGO} alt='logo' className='d-flex logo ml-5' />
              {/* <span className='p-1'>
                <span className='dyt-text'>DYT</span>
                <div className='studio-text'>Studio</div>
              </span> */}
            </div>

            {window.location.pathname !== "/login" && window.location.pathname !== "/onboarding" && (
              <ul className='ul'>
                <li><a>Workshops <span><i className="fa fa-chevron-down"></i></span></a>
                  <ul>
                    <li onClick={() => navigate(`/workshops`)} ><a href='#'>Explore</a></li>
                    <li onClick={() => localStorage.getItem('user_token') ? navigate(`/my-learnings`) : navigate(`/login`)} ><a href='#'>Enrolled </a></li>
                    <li onClick={() => localStorage.getItem('user_token') ? navigate(`/my-workshops`) : navigate(`/login`)}><a href='#'>Manage </a></li>

                  </ul>
                </li>

                <li><a>Gated Content<span> <i className="fa fa-chevron-down"></i></span></a>
                  <ul>
                    <li onClick={() => localStorage.getItem('user_token') ? navigate(`/gated-contents`) : navigate(`/login`)}  ><a href='#'>Manage </a></li>
                  </ul>
                </li>
              </ul>
            )}

          </nav>

          {!localStorage.getItem('current_user_id') && window.location.pathname !== "/login" && window.location.pathname !== "/onboarding" && (
            <button className='login-btn' onClick={() => navigate('/login')}>Log In</button>
          )
          }

          {/* user icon details */}



          {localStorage.getItem('current_user_id') && window.location.pathname !== "/login" && window.location.pathname !== "/onboarding" && (
            <div className='user-blog'>
              <div className='user-Name' onClick={showDropBar}>{localStorage.getItem('avatar') == 'null' ? firstLetter : <img src={avatarImage} alt='avatar' className='avatar-img' />}</div>
              <div className={dropbar ? 'user-detailsdropdown active' : 'user-detailsdropdown'}>
                <div className='logout-btn' onClick={Logout}>Log Out</div>
              </div>
            </div>
          )}


          {openLogout && (
            < Popup
              titleImage='../../../Assests/Images/errorPopImg.png'
              confirmText="Are you sure you want to log out of this application?"
              CancelOnClick={CancelLogout}
              cancelBtn="Cancel"
              PrimaryBtnMsg='Log Out'
              PrimaryBtnwidth='13rem'
              onPClick={LogoutPage}
            />
          )}



          {/* mobile side menu bar */}

          <div className='mobile-menu'>
            <div className='navbar'>
              <Link to="#" className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
              <ul className='nav-menu-items' onClick={showSidebar}>
                {/* <li>
                  <ul>
                    <div>dfghj</div>
                  </ul>
                </li> */}
                <li className="navbar-toggle">
                  <ul className='user-block'>
                    {localStorage.getItem('current_user_id') && (
                      <div className='user-name'>{localStorage.getItem('avatar') == 'null' ? firstLetter : <img src={avatarImage} alt='avatar' className='avatar-img' />}</div>
                    )}
                    <div className='user-details'>
                      <div className='userName'>Hi, {localStorage.getItem('username')}</div>
                      <div className='wel-back'>Welcome Back !</div>
                    </div>
                  </ul>
                  <Link to='#' className='menu-bars'>
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>
                <li className='nav-text'><a href='#'>Workshops</a>
                  <ul>
                    <li onClick={() => navigate(`/workshops`)} ><a >Explore </a></li>
                    <li onClick={() => localStorage.getItem('user_token') ? navigate(`/my-learnings`) : navigate(`/login`)}><a >Enrolled</a></li>
                    <li onClick={() => localStorage.getItem('user_token') ? navigate(`/my-workshops`) : navigate(`/login`)} ><a >Manage</a></li>
                  </ul>
                </li>
                <li className='nav-texts'><a href='#'>Gated Content</a>
                  <ul>
                    <li onClick={() => navigate(`/gated-contents`)}  ><a>Manage</a></li>
                  </ul>
                </li>

                {localStorage.getItem('current_user_id') && (
                  <li className='log-out' onClick={Logout}>
                    <ul className='d-flex'>
                      <button className='logging-out'>Log Out</button>
                      <div className='logout-logo'>{LogOut}</div>
                    </ul>
                  </li>
                )}
              </ul>

            </nav>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;