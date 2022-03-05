import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../_actions/user_action'
import Auth from '../hoc/auth'

const PageWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 80vh;
`

const LoginWrap = styled.div`
    width: 400px;
    height: 300px;
`

const Inputs = styled.div`
    margin-bottom: 20px;
`

function RegisterPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const nameChanged = (e) => {
        setName(e.target.value)
    }
    
    const emailChanged = (e) => {
        setEmail(e.target.value)
    }

    const passwordChanged = (e) => {
        setPassword(e.target.value)
    }

    const confirmPasswordChanged = (e) => {
        setConfirmPassword(e.target.value)
    }

    const registerHandler = async () => {
        if (password !== confirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }
        let body = {
            name,
            email,
            password
        }
        try {
            await dispatch(registerUser(body))


            // await axios.post('/api/users/register', body)
            alert('회원가입 완료')
            navigate('/login')
        } catch (e) {
            alert('Error')
        }
    }

  return (
    <PageWrap>
        <LoginWrap>
            <h1>Register</h1>
            <Inputs>
                <TextField required fullWidth label='name' type='' margin='dense' size='small' onChange={nameChanged}/>
                <TextField required fullWidth label='email' type='email' margin='dense' size='small' onChange={emailChanged}/>
                <TextField required fullWidth label='password' type='password' margin='dense' size='small' onChange={passwordChanged} />
                <TextField required fullWidth label='confirmPassword' type='password' margin='dense' size='small' onChange={confirmPasswordChanged}/>
            </Inputs>
            
            <Button fullWidth variant='contained' onClick={registerHandler}>Register</Button>
        </LoginWrap>
    </PageWrap>
  )
}

export default Auth(RegisterPage, false)