
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Header } from '../../Shared/Header';
import { getMyWorkshops, getWorkshopHostStatus } from '../../../Redux/Actions/WorkShop';

import './MyWorkshops.scss'
import { Loader } from '../../Shared/Loader';
import WorkshopCard from '../../Shared/WorkshopCard/WorkshopCard';
import { Myworkshops } from './../../../Constant/Strings';
import { Footer } from '../../Shared/Footer';
import { useNavigate } from 'react-router-dom';


const MyWorkshops = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    // const [hostStatus, setHostStatus] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getMyWorkshops())
            .then((res) => {
                setData(res.data.results)

                if (res?.data?.results?.length <= 0) {
                    dispatch(getWorkshopHostStatus()).then((res) => {
                        // setHostStatus(res?.data)
                        setTimeout(() => setLoading(false), 0);
                        navigate('/manage-workshop', { state: { data: res?.data } })

                    })
                        .catch((err) => {
                        })
                }
                else {
                    setTimeout(() => setLoading(false), 0);
                }
            })
            .catch((err) => {
            })

    }, [])


    return (

        <>
            {
                loading ? <Loader />
                    :

                    <div className='container-fluid workshops-list'>
                        <div className='row'>
                            <div className='col'>
                                <div className=''>
                                    <Header />
                                </div>
                            </div>
                        </div>


                        <div className="row my-workshops-body">
                            <div className="col">
                                <div className='heading-text'>
                                    <h1>{Myworkshops}</h1>
                                    <button onClick={() => navigate('/create-workshop')} className='create-btn'>CREATE WORKSHOP <i className="fa fa-arrow-right fa-xs"></i></button>
                                </div>
                                {
                                    data?.length > 0 ?
                                        <div className="WorkshopList_card-list-layout">
                                            {data.map((datum, i) => (
                                                <div className="WorkshopList_card-list-plot" key={i}>
                                                    <WorkshopCard
                                                        key={datum.id}
                                                        id={datum.id}
                                                        hostName={datum.webinar_host}
                                                        coverImage={datum.cover_image_urls['512X512'] || datum.cover_image_urls.actual}
                                                        hostAvatar={datum.webinar_host_profile_pic}
                                                        workShopTime={datum.start_date}
                                                        workShopTitle={datum.webinar_title}
                                                        duration={datum.duration}
                                                        price={datum.selling_price}
                                                        actualPrice={datum.actual_price}
                                                        approvalStatus={datum.approval_status}
                                                        showPurchaseDetails={true}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        :
                                        <div className="Noworkshops">
                                            No workshops available . Create one.
                                        </div>
                                }

                            </div>
                        </div>


                        <Footer />
                    </div>
            }
        </>
    )
}

export default MyWorkshops;
