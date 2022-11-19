import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GatedContent } from "../../../Constant/Strings";
import { getGatedContentList } from "../../../Redux/Actions/GatedContent";
import { Footer } from "../../Shared/Footer";
import { GatedContentCard } from "../../Shared/GatedContentCard";
import { Header } from "../../Shared/Header";
import { Loader } from "../../Shared/Loader";
import './GatedContentList.scss'

const GatedContentList = () => {
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
        <>
            {
                loading ? <Loader />
                    :
                    <div className='container-fluid gated_content_list'>
                        <div className="content">
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
                                        <h1>{GatedContent}</h1>
                                        {/* <a href="#"> */}

                                        <button onClick={() => navigate('/gated-content-create')} className='create-btn'>CREATE GATED CONTENT <i className="fa fa-arrow-right fa-xs"></i></button>
                                        {/* </a> */}
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
                        </div>
                        <div className={data.length > 0 ? "footer" : "fixed-footer"}>
                            <Footer />
                        </div>

                    </div>
            }
        </>
    );


}

export default GatedContentList;