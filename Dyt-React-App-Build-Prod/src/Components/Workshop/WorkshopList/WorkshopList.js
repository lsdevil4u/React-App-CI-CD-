import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getWorkShopList } from '../../../Redux/Actions/WorkShop';
import { Header } from "../../Shared/Header";
import { Loader } from "../../Shared/Loader";
import WorkshopCard from "../../Shared/WorkshopCard/WorkshopCard";
import './WorkshopList.scss';
// import { SearchBar } from './../../Shared/SearchBar';
import { Footer } from "../../Shared/Footer";
import { Exploreworkshops } from "../../../Constant/Strings";



const WorkshopList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWorkShopList())
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
                loading ?
                    <Loader />
                    :
                    <div className='container-fluid workshops_list'>
                        <div className="content">
                            <div className='row'>
                                <div className='col'>
                                    <div className=''>
                                        <Header />

                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col search-bar-list'>
                                    <div className='search-bar-list_container'>
                                        {/* <SearchBar /> */}
                                    </div>
                                </div>
                            </div>



                            <div className="row">
                                <div className="col">
                                    <h1>{Exploreworkshops}</h1>
                                    {
                                        data?.length > 0 ?

                                            <div className="WorkshopList_card-list-layout">
                                                {data?.map(datum => (
                                                    <div className="WorkshopList_card-list-plot" key={datum.id}>
                                                        <WorkshopCard
                                                            id={datum.id}
                                                            hostName={datum.webinar_host}
                                                            coverImage={datum?.cover_image_urls?.['512X512'] || datum?.cover_image_urls?.actual}
                                                            hostAvatar={datum.webinar_host_profile_pic}
                                                            workShopTime={datum.start_date}
                                                            workShopTitle={datum.webinar_title}
                                                            duration={datum.duration}
                                                            price={datum.selling_price}
                                                            actualPrice={datum.actual_price}
                                                            isRegistered={datum.is_registered}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            :
                                            <div className="Noworkshops">
                                                No workshops available . Come back later
                                            </div>
                                    }


                                </div>
                            </div>
                        </div>
                        <div className={data.length > 0 ? "footer" : "fixed-footer"}>
                            <Footer />

                        </div>
                    </div>


            }
        </>

    );
}

export default WorkshopList;