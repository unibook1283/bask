import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const PageWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`

const LoginWrap = styled.div`
    width: 400px;
    height: 300px;
`

const Inputs = styled.div`
    margin-bottom: 20px;
`

function LoginPage() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const emailChanged = (e) => {
        setEmail(e.target.value)
    }

    const passwordChanged = (e) => {
        setPassword(e.target.value)
    }

    const loginHandler = async () => {
        let body = {
            email,
            password
        }
        try {
            const data = await axios.post('/api/users/login', body)
            navigate('/')
        } catch (e) {
            alert('Error')
        }
    }

  return (
    <PageWrap>
        <LoginWrap>
            <h1>Login</h1>
            <Inputs>
                <TextField fullWidth label='email' type='email' size='small' onChange={emailChanged}/>
                <TextField fullWidth label='password' type='password' margin='dense' size='small' onChange={passwordChanged} />
            </Inputs>
            
            <Button fullWidth variant='contained' onClick={loginHandler}>Login</Button>
            <Link href='/register'>register now!</Link>
        </LoginWrap>
    </PageWrap>
  )
}

export default LoginPage