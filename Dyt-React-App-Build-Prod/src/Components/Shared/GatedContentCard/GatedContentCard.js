import './GatedContentCard.scss';
import Moment from 'moment';
import { useNavigate } from 'react-router-dom';

const GatedContentCard = ({
    id,
    title,
    contentUrl,
    contentType,
    expireTime,
    price
}) => {
    const navigate = useNavigate();

    return (
        <div className='container-fluid gated-content-page' onClick={() => navigate(`/gated-content/${id}`)} >
            <div className='row'>
                <div className='col'>
                    <div className='container gated-content-page_card-layout p-0'>
                        <div className='card img-fluid '>
                            {/* {contentUrl?.includes(`.pdf`) ? */}
                            {contentType === 'doc' ?
                                <img src={'../../../Assests/Images/dummyPdf.png'} alt='GatedContver' className='cover-image' />
                                :
                                < img src={contentUrl || '../../../Assests/Images/GatedContCover.png'} alt='GatedContCover' className='cover-image' />

                            }

                            <div className='card-img-overlay transparent'>
                                <div className='card-title'>{title}</div>
                                <div className='card-text d-flex'>
                                    <div className='card-text_content-heading'>Content : </div>
                                    <span className='card-text_content'> {contentType || "Text"}</span>
                                </div>
                                {expireTime &&
                                    <div className='card-text d-flex'>
                                        <div className='card-text_content-heading'>Expires On : </div>
                                        <span className='card-text_content'> {Moment(expireTime).format('DD-MM-YYYY @ hh:m A')} </span>
                                    </div>
                                }
                            </div>
                            <div className='card-footer '>
                                <div className='card-footer_ruppee'>₹ {price}</div>
                                {/* <div className='card-footer_status'>Live</div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GatedContentCard;