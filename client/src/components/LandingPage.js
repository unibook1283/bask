import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { logoutUser } from '../_actions/user_action'
import Auth from '../hoc/auth'

import axios from 'axios'

function LandingPage() {
    const dispatch = useDispatch()

    const logoutHandler = async () => {
        // await dispatch(logoutUser())
        try {
            await dispatch(logoutUser())
            alert('로그아웃 되었습니다.')
        } catch (e) {
            alert('Error')
        }
    }

  return (
    <div>
        LandingPage
        <br/>
        <Link to='/register'>register</Link>
        <br/>
        <Link to='/login'>login</Link>
        <br/>
        <Link to='/map'>map</Link>
        <br/>
        <Link to='/profile'>favorites</Link>
        <br/>

        <Button variant='contained' onClick={logoutHandler}>Logout</Button>
    </div>
  )
}

export default Auth(LandingPage, null)