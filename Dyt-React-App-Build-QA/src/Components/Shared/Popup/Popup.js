import React, { useState } from 'react';
import './Popup.scss';
import PrimaryButton from './../Button/PrimaryButton';

const Popup = (
    {
        titleImage, titleMsg, confirmText, PrimaryBtnwidth, PrimaryBtnMsg, cancelBtn, CancelOnClick, onPClick
    }
) => {

    // const [openModal, setOpenModal] = useState(false);
    // const modal = () => {
    //     setOpenModal(true);
    // }
    // const cancel = () => {
    //     setOpenModal(false);
    // }

    return (
        <div className='Popup-modal'>
            {/* {openModal && ( */}
            <div className='modal-bg'>
                <div className='pop-up'>
                    <div className=''>
                        <img
                            src={titleImage}
                            // src='../../../Assests/Images/errorPopImg.png'
                            alt='pop-img'
                            className='pop-cover-img'
                        />
                        <div className='titleMsg'>{titleMsg}</div>
                        <div className='confirmText'>{confirmText}</div>
                        <div className='footer-btns'>
                            <button className='cancel-btn' onClick={CancelOnClick}>{cancelBtn}</button>
                            <PrimaryButton message={PrimaryBtnMsg} width={PrimaryBtnwidth} className="primary-btn" onPrimaryClick={onPClick} />
                        </div>
                    </div>
                </div>
            </div>
            {/* )} */}
        </div>
    )
}

export default Popup