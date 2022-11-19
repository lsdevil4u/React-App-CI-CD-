import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Header } from '../../Shared/Header';
import { getEnrolledWorkshops } from '../../../Redux/Actions/WorkShop';
import WorkshopCard from '../../Shared/WorkshopCard/WorkshopCard';
import { Loader } from '../../Shared/Loader';
import './EnrolledWorkshops.scss'
import { Footer } from '../../Shared/Footer';
import { MyLearnings } from '../../../Constant/Strings';



const EnrolledWorkshops = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEnrolledWorkshops())
            .then((res) => {
                setData(res.data.results)
                setTimeout(() => setLoading(false), 500);
            })
            .catch((err) => {
            })

    }, [])
    return (
        <>
            {
                loading ? <Loader />
                    :
                    <div className='container-fluid workshops_list'>
                        <div className='content'>
                            <div className='row'>
                                <div className='col'>
                                    <div className=''>
                                        <Header />

                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <h1 >{MyLearnings}</h1>
                                    {
                                        data?.length > 0 ?

                                            <div className="WorkshopList_card-list-layout">
                                                {data.map(datum => (
                                                    <div className="WorkshopList_card-list-plot">
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
                                                            isRegistered={datum.is_registered}
                                                            startDate={datum.start_date}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            :
                                            <div className='noWorkshops'>
                                                No workshops!
                                                Why not enroll in one?
                                            </div>
                                    }

                                </div>
                            </div>
                        </div>
                        <div className={data.length > 0 ? "" : "fixed-footer"}>

                            <Footer />
                        </div>

                    </div>
            }
        </>
    )
}

export default EnrolledWorkshops;
