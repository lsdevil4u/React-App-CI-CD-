import { useState } from 'react';
import './ManageWorkshops.scss';
import Header from './../../Shared/Header/Header';
import { registerHost, registerUnderReview, registerSuccess, registerSuccessDiscription, registerFailure } from '../../../Constant/Strings';
import PrimaryButton from '../../Shared/Button/PrimaryButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer } from '../../Shared/Footer';


const ManageWorkshops = () => {
    const navigate = useNavigate();
    const location = useLocation()

    const [toggle, setToggle] = useState(false);
    const [registerHosts, setRegisterHosts] = useState(false);
    const registedAsHost = () => {
        navigate('/host-registration')
    }
    return (
        <div className='container-fluid ManageWorkshops'>
            <div className='row'>
                <div className='col'>
                    <div className='header'>
                        <Header />
                    </div>
                </div>
            </div>

            <div className='row ManageWorkshops-container'>
                <div className='col'>
                    <div className='mang-cont'>
                        <div className='heading'>Manage Workshops</div>
                        {location?.state?.data?.is_host === true && location?.state?.data?.approval_status == "approved" && (
                            <button onClick={() => navigate('/create-workshop')} className='create-btn'>CREATE WORKSHOP <i className="fa fa-arrow-right fa-xs"></i> </button>
                        )}
                    </div>
                </div>
            </div>

            {
                location?.state?.data?.is_host === false && (
                    <div className='row'>
                        <div className='col'>
                            <div className='register-host'>
                                <img src='../../../Assests/Images/registerHost.png' className='registerHost' />
                                <div className='register-host-discription'>{registerHost}</div>
                                <div className='register-cont'>

                                    <PrimaryButton message="REGISTER AS HOST" className="host-btn" onPrimaryClick={registedAsHost} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                location?.state?.data?.is_host === true && location?.state?.data?.approval_status == "pending" && (
                    <div className='row'>
                        <div className='col'>
                            <div className='register-host-underreview'>
                                <img src='../../../Assests/Images/registerUnderReview.png' className='registerHost' />
                                <div className='register-host-discription'>{registerUnderReview}</div>
                                <PrimaryButton message="Explore Workshops" className="host-btn" onPrimaryClick={() => navigate('/workshops')} />
                            </div>
                        </div>
                    </div>
                )
            }

            {location?.state?.data?.is_host === true && location?.state?.data?.approval_status == "approved" && (
                <div className='row'>
                    <div className='col'>
                        <div className='register-success'>
                            <img src='../../../Assests/Images/SuccessTick.png' className='registerHost' />
                            <div className='register-success-heading'>{registerSuccess}</div>
                            <div className='register-host-discription'>{registerSuccessDiscription}</div>
                        </div>
                    </div>
                </div>
            )
            }
            {location?.state?.data?.is_host === true && location?.state?.data?.approval_status == "rejected" && (
                <div className='row'>
                    <div className='col'>
                        <div className='register-success'>
                            <img src='../../../Assests/Images/rejectIcon.png' className='registerHost' />
                            <div className='register-success-heading'>{registerFailure}</div>
                            {/* <div className='register-host-discription'>{registerSuccessDiscription}</div> */}
                        </div>
                    </div>
                </div>
            )
            }


            <div className='manage-workshops-footer '>
                <Footer />
            </div>
        </div>
    )
}

export default ManageWorkshops