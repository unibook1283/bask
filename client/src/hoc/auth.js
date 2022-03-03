import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null) {
    //option:
    //null  =>  아무나 출입이 가능한 페이지
    //true  =>  로그인한 유저만 출입이 가능한 페이지
    //false =>  로그인한 유저는 출입 불가능한 페이지
    
    //adminRoute => admin 유저만 출입이 가능한 페이지

    function AuthenticationCheck() {
        const dispatch = useDispatch()
        const navigate = useNavigate()

        useEffect(() => {
            dispatch(auth()).then((data) => {
                // 로그인 안한 유저
                if (!data.payload.isAuth) {
                    if (option) {
                        navigate('/login')
                    }
                } else {
                    // 로그인 한 유저
                    if (adminRoute && !data.payload.isAdmin) {
                        navigate('/')
                    } else {
                        if (option === false) {
                            navigate('/')
                        }
                    }
                }
            })
            
          
        }, [])
        
        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}