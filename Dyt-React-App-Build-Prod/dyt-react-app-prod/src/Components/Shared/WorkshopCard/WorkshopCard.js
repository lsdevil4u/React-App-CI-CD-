import Moment from 'moment';
import { useNavigate } from 'react-router-dom';
import './WorkshopCard.scss';


const WorkshopCard = ({
    id,
    coverImage,
    hostName,
    hostAvatar,
    workShopTime,
    workShopTitle,
    duration,
    price,
    actualPrice,
    approvalStatus,
    isRegistered,
    startDate,
    showPurchaseDetails,

}) => {
    const todaysdate = Moment(new Date())
    const startdate = Moment(startDate)

    const navigate = useNavigate();

    let statusColor;
    let statusText;
    if (approvalStatus === 'expired') {
        statusColor = 'rgba(68, 59, 78, 1)'
        statusText = 'Expired'
    }
    if (approvalStatus === 'approved') {
        statusColor = '#06B436'
        statusText = 'Approved'
    }
    if (approvalStatus === 'pending') {
        statusColor = ' #FFB800'
        statusText = 'Pending'
    }
    if (approvalStatus === 'rejected') {
        // statusColor = '#C40406'
        statusColor = 'orangered'
        statusText = 'Rejected'
    }

    return (

        <div className='container-fluid workshop-card' onClick={() => navigate(`/workshop/${id}`, { state: { showPurchaseDetails: showPurchaseDetails } })}>
            <div className='row'>
                <div className='col'>
                    <div className='cards'>
                        <div className='image-container'> <span style={{ backgroundColor: statusColor }} className='workshop-status'>{statusText}</span> <img src={coverImage || '../../Assests/Images/WrkShopCard.png'} width="100%" className='workshop-card-image' /></div>
                        <div className='image-card'>
                            <div className='d-flex workshop_card_info'>
                                <img src={hostAvatar || '../../Assests/Images/Thumbnail.png'} width="10%" className='thum-pic' />
                                <div className='user-name'>{hostName}</div>
                                <div className='time mt-3 '>{duration}</div>
                            </div>
                            <div className='user-info mt-4'>{workShopTitle}</div>
                            <div className='date'>Start Date : {Moment(workShopTime).format('DD-MM-YYYY @ hh:m A')}</div>
                        </div>
                        <div className='rup-block mt-0 p-0'>
                            <div >
                                {(isRegistered && Math.abs(startdate.diff(todaysdate, 'minute')) <= 30) ? <div className='ruppee'> Join </div> : isRegistered ? <div className='ruppee'> Enrolled </div> : <div className='ruppee'>{`₹ ${price}`} {actualPrice && <sup>₹{actualPrice}</sup>}</div>}
                                {
                                    // actualPrice ? <div className='scracth'> ₹{actualPrice}</div> : <></>
                                }

                                <img src='../../Assests/Images/rightArrow.png' alt='rightArrow' className='fa-greater-than' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkshopCard;