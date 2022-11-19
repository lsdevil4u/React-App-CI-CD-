import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import {useParams, useSearchParams } from 'react-router-dom';
import { AppAuthLogin } from './../../../Redux/Actions/Profile';

const AppLogin = () => {
    const [searchParams] = useSearchParams();
    const { user_id } = useParams()
    console.log(searchParams)
    const token = searchParams.get('token')
    const path = searchParams.get('path')
    const dispatch = useDispatch();
    

    useEffect(() => {
        if (localStorage.getItem('user_token') == null) {
            localStorage.setItem('user_token', token)
            window.location.reload()
        } else {
            dispatch(AppAuthLogin(user_id))
            .then((res) => {
                localStorage.setItem('user_token', res.get_tokens_for_user.access)
                localStorage.setItem('username', res.username)
                localStorage.setItem('avatar', res.avatar)
                localStorage.setItem('email', res.email)
                localStorage.setItem('contact_number', res.contact_number)
                localStorage.setItem('current_user_id', res.id)
                window.location.href = "/"+path
            })
        }
      }, [])
    
    return (
        <div>Polit</div>
    )
}

export default AppLogin