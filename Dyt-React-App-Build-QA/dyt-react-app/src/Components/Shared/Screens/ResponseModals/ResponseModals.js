import React from 'react'
import './ResponseModals.scss'
import { useNavigate, useLocation } from 'react-router-dom'

const ResponseModals = ({ response, setResponse }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const confirmation = (response?.status >= 200 && response?.status < 300 ? true : false)
    // const confirmation = true
    let redirectTo = ""
    let redirectText = ""
    let messagePass = ""
    let responseMessage = ""
    if (location?.pathname === '/create-workshop') {
        responseMessage = "Submission Successfull!"
        messagePass = "Workshop request is under review Confirmation will be sent by email To view your created workshops, go to Host Workshops"
        redirectTo = '/my-workshops';
        redirectText = "Go To Manage Workshops"
    }
    if (location?.pathname === '/host-registration') {
        responseMessage = "Submission Successfull!"
        messagePass = "Our team will review your workshop details , you'll get a confirmation email"
        redirectTo = '/my-workshops';
        redirectText = "Go Back To HomePage"
    }
    if (location?.pathname === '/workshop/checkout') {
        responseMessage = "Successfully Enrolled!"
        messagePass = `We'll send you a confirmation email on your registered email ID To join the workshop, go to "My Learnings" Page `
        redirectTo = '/my-workshops';
        // redirectTo = '/create-workshop';
        redirectText = "Go To Host Workshops"
    }
    if (location?.pathname === '/gated-content-create') {
        responseMessage = "Wahh!"
        messagePass = "Your content is created successfully. To view details, go to Gated Content "
        redirectTo = '/gated-contents';
        redirectText = "Go To Gated Content"
    }


    return (
        <div>
            <div className='reg-form-successfull mb-3'>
                <div> <img className='reg-form-status-animation' src={`/Assests/Gifs/${confirmation ? 'success' : "cancel"}.gif`} alt="Successfull, successfully enrolled" /> </div>
                {confirmation ? <div className='success-msg'>{responseMessage}</div> : <div className='success-msg'> Something Went Wrong!</div>}
                {confirmation ?
                    <div className='success-desc'>{messagePass}</div>
                    :
                    <div className='success-desc'></div>
                }

                {confirmation ?
                    <div onClick={() => navigate(redirectTo)} className='redirections cursorPointer'>{redirectText}</div>
                    :
                    <div onClick={() => { setResponse('') }} className='redirections'>Try Again</div>}
            </div>
        </div>
    )
}

export default ResponseModals