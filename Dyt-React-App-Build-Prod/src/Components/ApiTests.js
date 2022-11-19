import { useDispatch } from 'react-redux';
import { CheckUserName } from '../Redux/Actions/Login';

// let payloadLogin = {
//     "contact_info": "8971042783",
//     "country_code": "IN",
//     "mode": ""
// }

// let payloadVerifyOtp = {
//     "contact_info": "8971042783",
//     "country_code": "IN",
//     "otp": "111111"
// }

// payloadUsername = {
//     "username_slug": "deepakmaddam",
// }


const ApiTests = () => {
  const dispatch = useDispatch();

  const submit = () => {
    let payload = {
      "username_slug": "deepakmaddam",
    }
    dispatch(CheckUserName(payload))
      .then((res) => {
      })

  }

  return (
    <div className='container-fluid login__studio'>
      <div className='row'>
        <div className='col'>
          <div className='Log-in'>
            <button onClick={() => submit()}> Click Me </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiTests;