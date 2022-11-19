import React from 'react'
import './PurchaseDetailsTable.scss';
import Moment from 'moment';
import { userIcon, mailIdIcon, calender, phoneIcon } from '../../../Constant/Images';


const PurchaseDetailsTable = (
    {
        userData
    }
) => {
    console.log(userData, 'userData');
    return (
        <div className='PurchaseDetailsTable'>
            {userData.length > 0 && (
                <>

                    <div className='heading'>Buyer Details</div>
                    <table className='purchase-details'>
                        <thead className=''>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Purchase Date</th>
                                <th>Phone</th>
                                {/* <th>Instagram Id</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData.map((datum, i) => (
                                    <tr key={i} className='table-body'>
                                        <td className='table-image'>
                                            {/* <td className='p-0' style={{ border: "none" }}> */}
                                            <img src={datum?.user_details?.avatar['128X128'] || '../../Assests/Images/Thumbnail.png'} className='userAvatar' />
                                            {/* </td> */}
                                            <div className='user-icon' style={{ border: "none" }}>{datum?.user_details?.name} </div>
                                        </td>
                                        <td> {datum?.user_details?.email}</td>
                                        <td>{Moment(datum?.created).format('DD-MM-YYYY hh:mm:ss')}</td>
                                        <td>+91 {datum?.user_details?.contact_number}</td>
                                        {/* <td>_gamers_paradise</td> */}
                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>
                </>
            )}

            {/* mobile responsive design */}

            {userData.map((datum, i) => (
                <div className='purchase-details-reps' key={i} >
                    <div className='details-row'>{userIcon} <span className='user-name'>{datum?.user_details?.name}</span></div>
                    <div className='details-row'>{mailIdIcon} <span className='user-name'>{datum?.user_details?.email}</span></div>
                    <div className='details-row'>{calender} <span className='user-name'>{Moment(datum?.created).format('DD-MM-YYYY hh:mm:ss')}</span></div>
                    <div className='details-row'>{phoneIcon} <span className='user-name'>+91 {datum?.user_details?.contact_number}</span></div>
                </div>
            ))}

        </div>
    )
}

export default PurchaseDetailsTable