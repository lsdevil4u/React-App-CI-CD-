import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MyGatedContent } from "../../../Constant/Strings";
import { getGatedContentList } from "../../../Redux/Actions/GatedContent";
import { Footer } from "../../Shared/Footer";
import { GatedContentCard } from "../../Shared/GatedContentCard";
import { Header } from "../../Shared/Header";
import { Loader } from "../../Shared/Loader";
import './PurchasedGatedContentList.scss'

const PurchasedGatedContentList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getGatedContentList())
            .then((res) => {
                setData(res.data.results)
                setTimeout(() => setLoading(false), 500);
            })
            .catch((err) => {
            })

    }, [])

    return (
        <div className='container-fluid gated_content_list'>

            {
                loading ? <Loader />
                    :
                    <>
                        <div className='row'>
                            <div className='col'>
                                <div className=''>
                                    <Header />

                                </div>
                            </div>
                        </div>

                        <div className="Gatedcard-list-layout">
                            <div className="">

                                <div className='heading-text'>
                                    <h1>{MyGatedContent}</h1>
                                    <button onClick={() => navigate('/gated-content-create')} className='create-btn'>CREATE GATED CONTENT <i className="fa fa-arrow-right fa-xs"></i></button>
                                </div>
                                {
                                    data?.length > 0 ?

                                        <div className="GatedContentList_card-list-layout">
                                            {data?.map(datum => (
                                                <div className="GatedContentList_card-list-plot" key={datum.id} >
                                                    <GatedContentCard
                                                        id={datum?.id}
                                                        title={datum?.title}
                                                        contentUrl={datum?.content?.content}
                                                        contentType={datum?.content?.type_of_content}
                                                        expireTime={datum?.expiry_time}
                                                        price={datum?.price}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        :
                                        <div className="no-gated-content">
                                            There's no gated content. Let's create one
                                        </div>
                                }


                            </div>
                        </div>
                        <div className={data.length > 0 ? "" : "fixed-footer"}>

                            <Footer />

                        </div>
                    </>


            }

        </div>
    );


}

export default PurchasedGatedContentList;