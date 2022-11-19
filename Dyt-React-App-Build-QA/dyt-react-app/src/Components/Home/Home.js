import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Header from '../Shared/Header/Header';
import {
    HOME_COVER, QUOTE1, WORSHOP1, QUOTE2, workshopNum, WorkShop, GatedContent, GatedNumb,
    WorkShopSubHead, RecWorkShop, ViewWorkShop, HostWorshp, step1, HostWorkshops,
    EarnMoney, CREATEWORKSHOPS, reviewContent, GatedSubHeading, Gstep1, Gstep2,
    Gstep3, CREATEGATEDWORKSHOPS, GatedReview, ContentCreator, PrivacyPolicies,
    FAQs, TermsConditions, gatedcontentreview, MANAGE_GATED_CONTENT
} from '../../Constant/Strings';
import './Home.scss';
import PrimaryButton from '../Shared/Button/PrimaryButton';
import WorkshopCard from '../Shared/WorkshopCard/WorkshopCard';
import { DownArrow } from '../../Constant/Images';
import { Footer } from './../Shared/Footer';
import { getWorkShopList } from '../../Redux/Actions/WorkShop';

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(true);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        dispatch(getWorkShopList(4))
            .then((res) => {
                setData(res.data.results)
                setTimeout(() => setLoading(false), 500);
            })
            .catch((err) => {
            })

    }, [])

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);
    }, [])

    const listenToScroll = () => {
        let heightToHideFrom = 500;
        const winScroll = document.body.scrollTop ||
            document.documentElement.scrollTop;
        setHeight(true);

        if (winScroll > heightToHideFrom) {
            isVisible && setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };

    // let log = document.querySelector('#log');
    // const logKey = (e) => {
    //     log.textContent = `bn: ${e.ctrlKey}`;
    //     navigate('/workshops')
    // }
    // document.addEventListener('click', logKey);



    return (
        <div className='container-fluid background-mainscreen'>
            <div className='row home-page mb-0'>
                {/* <video className='home-page-bgVideo' src="/Assests/Video/Dyt-CoverVideo.mp4" loop muted autoPlay></video> */}
                <div className=''>
                    <div className='col'>
                        <Header />
                    </div>
                    <div className='cover-text'>
                        <h2 className='mb-5 haeding '>{HOME_COVER}</h2>
                        <p className='homescreen-quotes' >{QUOTE1} </p>
                        <p className='homescreen-quotes' >{QUOTE2}</p>
                        <hr width="36%" className='mt-5' />
                        <div className='cover-footer'>
                            <div className=''>
                                <h2 className='mt-5 num'>{workshopNum}</h2>
                                <p className='num-desc'>{WorkShop} Hours
                                </p>
                            </div>
                            <div className='gated'>
                                <h2 className='mt-5 num'>{GatedNumb}</h2>
                                <p className='num-desc'>{GatedContent}</p>
                            </div>
                        </div>
                    </div>

                </div>


                {isVisible && (
                    <a href='#workshop' className='anchor' id='hide'><div className="ball" ><i className="fa fa-chevron-down fa-2x"></i></div></a>
                )}
            </div>
            <div className='background'>
                <div id='workshop' className='workshop-block'>
                    <div className='row mt-5'>
                        <div className='col'>
                            <div className='workshops-container d-flex'>
                                <div className='work-heading'>{WorkShop}</div>
                                <hr className='' />
                            </div>
                        </div>
                    </div>
                    <div className='workshop-content d-flex justify-content-between p-3'>
                        <div className='col'>
                            <div className='workshop-content'>
                                <h2 className='at-wr work-subheading'>{WORSHOP1}</h2>
                                <p>{WorkShopSubHead}</p>
                                <PrimaryButton color="#7000FF" message={ViewWorkShop} onPrimaryClick={() => navigate('/workshops')} id='log' />
                            </div>
                        </div>
                        <div className='col workshop-content-image ml-3'>
                            <div className='image'>
                                <img src='../../../Assests/Images/WorkshopImg.png' width="100%" />
                            </div>
                        </div>
                    </div>

                    <div className='row p-3'>
                        <div className='col'>
                            <div className='viewing'>
                                {data.length > 0 && (
                                    <div className='view-all mb-4 mt-5'>{RecWorkShop}</div>
                                )}
                                <div className='block-shopss mt-5'>
                                    {data?.map(datum => (
                                        <WorkshopCard
                                            key={datum.id}
                                            id={datum.id}
                                            hostName={datum.webinar_host}
                                            coverImage={datum.cover_image_urls?.['512X512'] || datum.cover_image_urls?.actual || '../../../Assests/Images/WrkShopCard.png'}
                                            hostAvatar={datum.webinar_host_profile_pic}
                                            workShopTime={datum.start_date}
                                            workShopTitle={datum.webinar_title}
                                            duration={datum.duration}
                                            price={datum.selling_price}
                                            actualPrice={datum.actual_price}
                                        />

                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className=' ml-0 mr-0 '>
                    <div className='create-workshop'>

                        <div className='cover-work'>
                            <img src='../../../Assests/Images/CreateCover.png' width="100%" className='process-flow' />
                        </div>

                        <div className='workshop-steps '>
                            <div className=' p-0'>
                                <div className='workshop-steps workshop-steps-heading'>{HostWorshp}
                                </div>
                                <div className='workshop-step-flow'>
                                    <div className=''>
                                        <div className='step-1 mt-5'>STEP 1</div>
                                        <div className='step-header'>{HostWorkshops}</div>
                                        <div className='process-desc mt-3 mb-3'>
                                            <span className="pr-2">{DownArrow}</span>
                                            <div className='step-desc pl-2'>Create a workshop on any subject of your <br />
                                                choice and set a price</div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='step-1'>STEP 2</div>
                                        <div className='step-header'>{EarnMoney}</div>
                                        <div className='process-desc mt-3'>
                                            <span>{DownArrow}</span>
                                            <div className='step-desc ml-2'>Earn from every attendee and get it credited<br /> to your DYT wallet</div>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <PrimaryButton color="#7000FF" message="MANAGE WORKSHOPS" onPrimaryClick={() => localStorage.getItem('user_token') ? navigate(`/my-workshops`) : navigate(`/login`)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='review-cont'>
                            <h2>"</h2>
                            <div className='rev'>{reviewContent}</div>
                            <hr className='mb-1' />
                            <div className='author'>Tanvi Yadav</div>
                            <div className='author-desgn'>Holy Fire Reiki Practitioner</div>
                        </div>

                    </div>
                </div>

                <div className='gated-content'>
                    <div className='row mt-5'>
                        <div className='col'>
                            <div className='workshops-containers d-flex'>
                                <hr />
                                <div className='gated-text'>{GatedContent}</div>
                            </div>
                        </div>
                    </div>
                    <div className=' '>
                        <div className=''>
                            <div className='create-workshop create-workshop-gated'>
                                <div className='workshop-steps'>
                                    <div className=' p-0 m-0'>
                                        <div className='workshop-steps workshop-steps-heading'>{GatedSubHeading}</div>
                                        <div className='workshop-step-flow'>
                                            <div className=''>
                                                <div className='step-1 mt-5' style={{ color: '#FFB800' }} >STEP 1</div>
                                                <div className='step-header'>Create Gated Content</div>
                                                <div className='process-desc mt-3 mb-3'>
                                                    <span>{DownArrow}</span>
                                                    <div className='step-desc pl-2'>{Gstep1}</div>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='step-1 mt-5' style={{ color: '#FFB800' }}>STEP 2</div>
                                                <div className='step-header'>Share With Fans</div>
                                                <div className='process-desc mt-3 mb-3'>
                                                    <span>{DownArrow}</span>
                                                    <div className='step-desc pl-2'>{Gstep2}</div>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='step-1 mt-5' style={{ color: '#FFB800' }}>STEP 3</div>
                                                <div className='step-header'>Earn Money</div>
                                                <div className='process-desc mt-3 mb-3'>
                                                    <span>{DownArrow}</span>
                                                    <div className='step-desc pl-2'>{Gstep3}</div>
                                                </div>
                                            </div>
                                            <PrimaryButton color="#7000FF" message={MANAGE_GATED_CONTENT} onPrimaryClick={() => localStorage.getItem('user_token') ? navigate(`/gated-contents`) : navigate(`/login`)} />
                                            {/* <button type='button' className='button mt-3'>{CREATEGATEDWORKSHOPS}<i className="fa fa-arrow-right fa-xs"></i></button> */}
                                        </div>
                                    </div>
                                </div>
                                <div className='review-contt'>
                                    <h2>"</h2>
                                    <div className='rev mb-5'>{gatedcontentreview} </div>
                                    <hr className='' />
                                    <div className='author' style={{ color: '#FFB800' }}>Dea</div>
                                    <div className='author-desgn'>Marketer</div>
                                </div>
                                <div className='cover-contentt'>
                                    <img src='../../../Assests/Images/GatedCover.png' width="100%" className='process-flow' />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <Footer className='homepage-footer' />

        </div>
    )
}

export default Home