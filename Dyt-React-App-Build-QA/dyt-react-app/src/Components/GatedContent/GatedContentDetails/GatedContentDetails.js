import React, { useEffect, useState } from 'react';
import './GatedContentDetails.scss';
import { Header } from './../../Shared/Header';
import { GatedContDetails } from './../../../Constant/Strings';
import Footer from '../../Shared/Footer/Footer';
import PurchaseDetailsTable from './../../Shared/PurchaseDetailsTable/PurchaseDetailsTable';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteGatedContent, gatedContentAttendees, getGatedDetails } from '../../../Redux/Actions/GatedContent';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import Moment from 'moment';
import Swal from 'sweetalert2';
import Popup from './../../Shared/Popup/Popup';


const GatedContentDetails = () => {
    const [datum, setDatum] = useState([]);
    const [userData, setUserdata] = useState([]);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);
    const { gated_content_id } = useParams()
    const location = useLocation()
    const dispatch = useDispatch();

    const navigate = useNavigate()
    let encoded = base64_encode(gated_content_id);

    const [openLogout, setOpenLogout] = useState(false);

    const ConfirmDeleteGatedConetnt = () => {
        setOpenLogout(true);
    }
    const CancelLogout = () => {
        setOpenLogout(false);
    }

    const handleDeleteGatedConetnt = () => {
        dispatch(deleteGatedContent(gated_content_id))
            .then((res) => {
                navigate('/gated-contents')
            })
            .catch((err) => {

            })
    }

    useEffect(() => {

        dispatch(getGatedDetails(gated_content_id))
            .then((res) => {
                setDatum(res.data)
                dispatch(gatedContentAttendees(gated_content_id))
                    .then((res) => {
                        setShowPurchaseDetails(true)
                        setUserdata(res.data)
                        setTimeout(() => setLoading(false), 500);
                    })
                    .catch((err) => {
                    })
            })
            .catch((err) => {
            })
    }, [])



    const copyToClipBoard = () => {
        navigator.clipboard.writeText(`${process.env.REACT_APP_APP_URL}/content/${encoded}`)
        setCopied(true);
    }


    return (
        <div className='container-fluid gatedcontent-details-page'>
            <div className='row'>
                <div className='col'>
                    <div className='header'>
                        <Header />
                    </div>
                </div>
            </div>

            <div className='details-body'>
                <div className='row'>
                    <div className='col'>
                        <div className='details-heading'>
                            <div className='gated-content-details'>{GatedContDetails}</div>
                            <div className='details-heading-actions'>
                                <button
                                    // onClick={handleDeleteGatedConetnt}
                                    onClick={ConfirmDeleteGatedConetnt}
                                    className='delete-content'>DELETE CONTENT
                                </button>

                                {openLogout && (
                                    < Popup
                                        titleImage='../../../Assests/Images/errorPopImg.png'
                                        confirmText="Are you sure you want to delete ?"
                                        CancelOnClick={CancelLogout}
                                        cancelBtn="Cancel"
                                        PrimaryBtnMsg='Yes'
                                        PrimaryBtnwidth='13rem'
                                        onPClick={handleDeleteGatedConetnt}
                                    />
                                )}

                                <div onClick={copyToClipBoard} >
                                    {
                                        !copied ?
                                            <button className='copy-link'>COPY LINK</button>
                                            :
                                            <button className='animate-charcter'>COPIED</button>

                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col display-flex'>
                        <div className='purchased-details'>
                            <div className='heading'>{datum.title}</div>
                            <div className='description'>
                                {datum.message}
                            </div>
                            <div className='purchase-time-details'>
                                <div className='content-price-container'>
                                    <div className='heading'>Content Price</div>
                                    <div className='price'>₹ {datum.price}</div>
                                </div>
                                <div className='content-price-container'>
                                    <div className='heading'>Total Purchases </div>
                                    <div className='price'>{datum.total_purchases || 0}</div>
                                </div>
                                {datum.expiry_time && <div className='content-price-container'>
                                    <div className='heading'>Expires on</div>
                                    <div className='price'>{Moment(datum.expiry_time).format('DD-MM-YYYY @ hh:m A')}</div>
                                </div>}
                                <div className='content-price-container'>
                                    <div className='heading'>Amount Earned</div>
                                    <div className='price'>₹ {(datum?.total_purchases || 0) * (datum.price || 0)}</div>
                                </div>
                            </div>
                        </div>
                        {/* <div className='EditIcon'><img src="../../../Assests/Images/EditIcon.png"  alt='edit'/></div> */}
                        <div className='card'>
                            <div className='content-card'>
                                <div className='container'>
                                    <div className='card img-fluid'>
                                        {datum?.content?.content?.includes(`.pdf`) ?
                                            <img src='../../../Assests/Images/dummyPdf.png' className='cover-img' />
                                            :
                                            <img src={datum?.content?.content || '../../Assests/Images/GatedContCover.png'} className='cover-img' alt='cover' />
                                        }
                                        <div className='card-img-overlay transparent'>
                                            <div className='card-title'>
                                                {/* <div className='thumbnail-Pic'>
                                                    <img src='../../Assests/Images/thumbnailPayment.png' className='card-title-image' />
                                                    <div className='name'>Rishab Shetty</div>
                                                    <div className='pic-details'>Hey ! This is the pic from NASA..</div>
                                                </div> */}
                                            </div>

                                            <div className='card-text'>{datum.message}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <PurchaseDetailsTable /> */}

                {userData.length > 0 &&
                    <div className='workshop-details-enrolled-user-table'>
                        <PurchaseDetailsTable
                            userData={userData}
                        />
                    </div>
                }

            </div>

            <div className='footer'>
                <Footer />
            </div>
        </div>
    )
}

export default GatedContentDetails