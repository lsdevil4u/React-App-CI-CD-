import { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Moment from 'moment';
import { Header } from './../../Shared/Header';
import {
    cardHeading, Enrollments, workShopDetailsSub, Duration,
    workshopOn, Whatwillyoulearn, whatYouLearnPoints, Rewards,
    requirements, TandC, CancellationPolicy, QA, qaSubHeading,
    haveDoubts, questionSuccess, SuccessMessage, notesSubHeading,
    WkshpDetail, whatYouLearnPoints2, whatYouLearnPoints3,
} from '../../../Constant/Strings';
import { CrossIcon, verticalDots } from '../../../Constant/Images';

import { Footer } from '../../Shared/Footer';
import { getWorkShopAttendeeList, getWorkshopDetail } from '../../../Redux/Actions/WorkShop';
import './WorkShopDetails.scss';
import { Loader } from '../../Shared/Loader';
import { PurchaseDetailsTable } from '../../Shared/PurchaseDetailsTable';
import PrimaryButton from '../../Shared/Button/PrimaryButton';
import { Rating } from '../../Shared/Rating';
import { AddToCalendar } from '../../Shared/AddToCalendar';
import { CountDownTimer } from '../../Shared/CountDownTimer';


const WorkShopDetails = () => {


    const [datum, setDatum] = useState([]);
    const [userdata, setUserdata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);
    const { workshop_id } = useParams()
    const location = useLocation()
    const dispatch = useDispatch();
    const [searchBar, setSearchBar] = useState(false);
    const [questionAnsSuccess, setQuestionAnsSuccess] = useState(false);
    const [overView, setOverView] = useState(false);
    const [questionToggle, setQuestionToggle] = useState(false);
    const [toggleState, setToggleState] = useState(1);
    const [notesToggle, setNotesToggle] = useState(false);
    const [toggleAction, setToggleAction] = useState(false);
    const navigate = useNavigate()

    // const OpenSearchbar = () => {
    //     setSearchBar(!searchBar);
    // }
    // const CloseSearchbar = () => {
    //     setSearchBar(false);
    // }
    const overViewdata = () => {
        setOverView(true);
    }

    const toggleTab = (index) => {
        setToggleState(index)
    }

    const questionSection = () => {
        setQuestionToggle(true);
    }
    const cancelQA = () => {
        setQuestionToggle(!questionToggle)
    }

    const cancelNotes = () => {
        setNotesToggle(!notesToggle)
    }
    const Notesectiontoggle = () => {
        setNotesToggle(true);
    }

    const closeQuestionSucessSection = () => {
        setQuestionAnsSuccess(!questionAnsSuccess);
    }

    const saveNotes = () => {
        setNotesToggle(!notesToggle)

    }

    useEffect(() => {

        dispatch(getWorkshopDetail(workshop_id))
            .then((res) => {
                // console.log(datum?.start_date);

                setDatum(res.data)
                if (location?.state?.showPurchaseDetails !== true) {
                    setTimeout(() => setLoading(false), 500);
                }

            })
            .catch((err) => {
            })
        if (location?.state?.showPurchaseDetails === true) {
            dispatch(getWorkShopAttendeeList(workshop_id))
                .then((res) => {
                    setShowPurchaseDetails(true)
                    setUserdata(res.data)
                    setTimeout(() => setLoading(false), 500);
                })
                .catch((err) => {
                })
        }

    }, [])

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(`${process.env.REACT_APP_APP_URL}/workshop/${workshop_id}`)
    }

    return (
        <>

            {
                loading ?
                    <Loader />
                    :
                    <div className='container-fluid workshop-details'>

                        <div className='row'>
                            <div className='col'>
                                <div className='workshop-details_header'>
                                    <Header />
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <div className='details-heading'>
                                    <h1>{WkshpDetail}</h1>
                                    {/* <div>
                                        <button onClick={copyToClipBoard} className='copy-link'>COPY LINK</button>

                                    </div> */}
                                    <div>
                                        <CountDownTimer
                                            startDate={datum?.start_date}
                                        />
                                    </div>
                                </div>
                                <div className='card-body'>
                                    <div>
                                        <div className='workshop-details_text-body'>
                                            {/* <div className='workshop-details_title'>Workshops &#62; Fashion</div> */}
                                            <div className='workshop-details_heading mt-3'>{datum.webinar_title}</div>
                                            <div className='workshop-details_sub-heading mt-4'>{datum.description}</div>
                                        </div>

                                        <div className='workshop-details_timedate-body'>
                                            <div className='duration-card'>
                                                <img src="../../../Assests/Images/ClockIcon.png" className="" />
                                                <div className='card-content-details'>
                                                    <div className='card-content-details_title'>{Duration}</div>
                                                    <div className='card-content-details_title'>{datum.duration}</div>
                                                </div>
                                            </div>

                                            {datum.total_enrolled > 15 && <div className='workshop-details_card-cont'>
                                                <img src="../../../Assests/Images/EnrollIcon.png" className="" />
                                                <div className='card-content-details'>
                                                    <div className='card-content-details_title'>{Enrollments}</div>
                                                    <div className='card-content-details_title'>{datum.total_enrolled}</div>
                                                </div>
                                            </div>}

                                            <div className='add-tocalendar'>
                                                <AddToCalendar
                                                // startDate={datum.start_date}
                                                />
                                            </div>
                                        </div>

                                        <div className='details-date'>
                                            <div className=''>{workshopOn}<span className='date'>{Moment(datum.start_date).format('DD-MM-YYYY @ hh:mm A')}</span></div>
                                        </div>

                                        {/* <div className='ratings'>
                                            <div className='ratings_rate'>4.5</div>
                                            <img src="../../Assests/Images/StarRating.png" className='' />
                                            <div>Ratings</div>
                                            <div>(25)</div>
                                        </div> */}

                                        <div className='purchase-details-body'>
                                            <div className='content-price-container'>
                                                <div className='heading'>Content Price</div>
                                                <div className='price'>₹ {datum.selling_price}</div>
                                            </div>
                                            {/* <div className='content-price-container'>
                                                <div className='heading'>Total Purchases </div>
                                                <div className='price'>{datum.total_purchases || 0}</div>
                                            </div>
                                            <div className='content-price-container'>
                                                <div className='heading'>Amount Earned</div>
                                                <div className='price'>₹ 10</div>
                                            </div> */}
                                        </div>



                                    </div>

                                    <div className='deatils-page-cover'>
                                        <img src={datum?.cover_image_urls?.['512X512'] || datum?.cover_image_urls?.actual || '../../../Assests/Images/WrkShopCard.png'} className='main-card-image' />

                                        {(Moment(new Date()).isSameOrAfter(Moment(datum.start_date)))
                                            ?

                                            (datum.end_date) &&
                                            <div className='main-card-image book-now'>WorkShop Completed</div>
                                            // <></>
                                            :
                                            (datum.is_host || ( Math.abs(Moment(new Date()).diff(Moment(datum.start_date), 'minutes')) <= 30 && datum.is_registered)) ?
                                                <a href={datum.webinar_link} target="_blank"><div className='main-card-image book-now'>  Join </div></a>
                                                :
                                                datum.is_registered ?
                                                    <div className='main-card-image book-now'>Join status will be visible 30 Min Before the Workshop</div>
                                                    : <div onClick={() => navigate(`/workshop/checkout/${workshop_id}`, { state: datum })} className='main-card-image book-now'>Book Now at ₹ {datum.selling_price}</div>
                                        }
                                        {/* <div className='main-card-image book-now'>WorkShop Completed</div> */}


                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* workshop community sections */}

                        <div className='group'>

                            {/* <div className="search">
                                <span className="icon">
                                    <span onClick={OpenSearchbar} className={searchBar ? 'searchBtn active' : 'searchBtn'}>
                                        <ion-icon name="search-outline" ></ion-icon>

                                    </span>
                                    <span onClick={CloseSearchbar} className={searchBar ? 'closeBtn active' : 'closeBtn'}>
                                        <ion-icon name="close-outline" ></ion-icon>
                                    </span>

                                </span>
                            </div> */}

                            <ul className='navigation'>
                                <li ><a className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'} onClick={() => toggleTab(1)}>Overview</a></li>
                                {/* <li ><a className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'} onClick={() => toggleTab(2)}>Q&A</a></li>
                                <li ><a className={toggleState === 3 ? 'tabs active-tabs' : 'tabs'} onClick={() => toggleTab(3)}>Notes</a></li> */}
                                {/* <li ><a className={toggleState === 4 ? 'tabs active-tabs' : 'tabs'} onClick={() => toggleTab(4)}>Announcements</a></li> */}
                                {/* <li ><a className={toggleState === 4 ? 'tabs active-tabs' : 'tabs'} onClick={() => toggleTab(4)}>Reviews</a></li> */}
                            </ul>


                            {/* <div className={searchBar ? 'searchBox active' : 'searchBox'}>
                                <input type='search' placeholder='Search here....' />
                            </div> */}



                            <div className='content-tabs'>

                                <div className={toggleState === 1 ? 'details-points  active-content' : 'details-points '}>
                                    {/* cancellation policy */}

                                    <div className='overview'>
                                        <div className='dyanamic-part'>

                                            {/* what will you learn */}

                                            <div className='row'>
                                                <div className='col '>
                                                    {datum.what_you_will_learn.length > 0 &&
                                                        <div className='information'>
                                                            <div className='information-heading'>{Whatwillyoulearn}</div>
                                                        </div>
                                                    }
                                                    {
                                                        datum.what_you_will_learn.map((item, index) => (

                                                            <div className='sub-heading' key={index}>
                                                                <img src='../../../Assests/Images/RightTickIcon.png' />
                                                                <div className='sub-heading-details'> {item}</div>
                                                            </div>
                                                        )
                                                        )
                                                    }

                                                </div>
                                            </div>

                                            {/* rewards */}

                                            <div className='row rewards-container'>
                                                <div className='col'>
                                                    {datum.rewards.length > 0 &&
                                                        <div className='rewards'>
                                                            <div className='rewards-heading'>{Rewards}</div>
                                                        </div>
                                                    }
                                                    {
                                                        datum.rewards.map((item, index) => (
                                                            <div className='sub-heading' key={index}>
                                                                <img src='../../../Assests/Images/RightTickIcon.png' />
                                                                <div className='sub-heading-details'>{item}</div>
                                                            </div>
                                                        )
                                                        )
                                                    }

                                                </div>
                                            </div>

                                            {/* requirements */}

                                            <div className='row requirements-container'>
                                                <div className='col'>
                                                    {datum.requirement.length > 0 &&
                                                        <div className='requirements'>
                                                            <div className='requirements-heading'>{requirements}</div>
                                                        </div>
                                                    }
                                                    {
                                                        datum.requirement.map((item, index) => (
                                                            <div className='sub-heading' key={index}>
                                                                <img src='../../../Assests/Images/RightTickIcon.png' />
                                                                <div className='sub-heading-details'>{item}</div>
                                                            </div>
                                                        ))
                                                    }

                                                </div>
                                            </div>
                                        </div>


                                        {/* terms and conditions  */}

                                        <div className='tandc'>
                                            <div className='row'>
                                                <div className='col rules'>
                                                    <div className='details'>
                                                        <div className='details-heading'>{TandC}</div>
                                                    </div>
                                                    <div className='details-sub-heading'>
                                                        <img src='../../../Assests/Images/RightTickIcon.png' />
                                                        <div className='sub-heading-details'>{whatYouLearnPoints}</div>
                                                    </div>
                                                    <div className='details-sub-heading'>
                                                        <img src='../../../Assests/Images/RightTickIcon.png' />
                                                        <div className='sub-heading-details'>{whatYouLearnPoints2}</div>
                                                    </div>

                                                </div>
                                            </div>

                                            {/* cancellation policy */}

                                            <div className='row'>
                                                <div className='col'>
                                                    <div>
                                                        <div className='Policies'>{CancellationPolicy}</div>
                                                    </div>

                                                    <div className='policies-sub-heading'>
                                                        <img src='../../../Assests/Images/RightTickIcon.png' />
                                                        <div className='sub-heading-details'>{whatYouLearnPoints3}</div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* questions and answer section */}

                                <div className={toggleState === 2 ? 'content active-content' : 'content'} >
                                    <div className='qa-section'>
                                        <div className='qa-section-heading'>
                                            <div className='qa-header'>{QA}</div>
                                            {!questionToggle && (
                                                <button className='ask-qa' onClick={questionSection}>Ask Question</button>
                                            )}
                                        </div>
                                        {!questionToggle && (
                                            <div className='qa-subheading'>{haveDoubts}</div>
                                        )}
                                        {questionToggle && (
                                            <>
                                                <div className='qa-subheading'>{qaSubHeading}</div>
                                                <div className='qa-input-section'>

                                                    <div className="input-q">
                                                        <input
                                                            type='text'
                                                            placeholder='e.g I have a doubt in this topic you covered in the workshop'
                                                            className='qa-input-feild'
                                                        // value=''
                                                        />
                                                    </div>
                                                    <div className='config-buttons'>
                                                        <button type='cancel' id='' className='cancel-btn' onClick={cancelQA}>Cancel</button>
                                                        <PrimaryButton message='Publish' className='publish-btn' onPrimaryClick={() => { setQuestionAnsSuccess(true); setQuestionToggle(!questionToggle) }} />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* question success section */}

                                        {questionAnsSuccess && (
                                            <div className='success-section'>
                                                <img src='../../../Assests/Gifs/SuccessQA.gif' className='success-qa' />
                                                <div>
                                                    <div className='success-gif'>
                                                        <div className='question-success-message'>{questionSuccess}</div>
                                                        <div className='cancel-btn' onClick={closeQuestionSucessSection}>{CrossIcon}</div>
                                                    </div>
                                                    <div className='SuccessMessage'>{SuccessMessage}</div>
                                                </div>
                                            </div>
                                        )}


                                        <div className='qa-section-part'>
                                            <div className='user-name-icon'>SS</div>
                                            <div>
                                                <div className='user-question'>When will the workshop start and what will be the duration ?</div>
                                                <div className='replied-answer'>Workshop starts on  24th June , 2022 at 10:00 AM</div>
                                                <div className='question-asked-user'>Asked  by Sanya Singh <span>2 days ago</span></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* notes section */}

                                <div className={toggleState === 3 ? 'content active-content' : 'content'}>
                                    <div className='notes-section'>
                                        <div className='notes-heading'>Notes</div>
                                        {!notesToggle && (
                                            <>
                                                <div className='notes-sub-heading'>{notesSubHeading}</div>
                                                <button className='addNote-btn' onClick={Notesectiontoggle}>Add Note</button>
                                            </>
                                        )}

                                        {notesToggle && (
                                            <div className=''>
                                                <textarea className='notes-textarea' cols='10' rows='15' placeholder='write down something important...'></textarea>
                                                <div className='note-btn'>import CountDownTimer from './../../Shared/CountDownTimer/CountDownTimer';

                                                    <button type='cancel' className='cancel-btn' onClick={cancelNotes}>Cancel</button>
                                                    <PrimaryButton
                                                        message='Save Note'
                                                        className='saveNote-btn'
                                                        onPrimaryClick={saveNotes}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className='created-notes'>
                                            <div className='created-content'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                Lorem Ipsums Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                Lorem Ipsums
                                            </div>
                                            <div className='icon' onClick={() => setToggleAction(!toggleAction)}>{verticalDots}</div>
                                            {toggleAction && (
                                                <div className='actionDropdown'>
                                                    <div onClick={() => setToggleAction(!toggleAction)}>Delete</div>
                                                    <div onClick={() => setToggleAction(!toggleAction)}>Edit</div>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>

                                {/* reviews section */}

                                <div className={toggleState === 4 ? 'content active-content' : 'content'}>
                                    <div className='reviews-section'>
                                        <div className='review-heading'>Reviews</div>
                                        <Rating />
                                    </div>
                                </div>

                            </div>

                        </div>


                        {(location?.state?.showPurchaseDetails && showPurchaseDetails) &&
                            <div className='workshop-details-enrolled-user-table'>
                                <PurchaseDetailsTable
                                    userData={userdata}
                                />
                            </div>
                        }
                        <div className='details-footer mt-5'>
                            <Footer />
                        </div>
                    </div>
            }
        </>
    )
}

export default WorkShopDetails;