import React, { useState } from 'react'
import { TextField , Button, FormControl, InputLabel, Select, MenuItem, Link } from '@mui/material'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { addCourt } from '../../../_actions/court_action'
const Inputs = styled.div`
  display: flex;
  flex-direction: column;
`

function Request(props) {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [goalposts, setGoalposts] = useState(0)
  const [floor, setFloor] = useState('')
  const [height, setHeight] = useState('')

  const nameChanged = (e) => {
    setName(e.target.value)
  }

  const goalpostsChanged = (e) => {
    setGoalposts(e.target.value)
  }

  const floorChanged = (e) => {
    setFloor(e.target.value)
  }

  const heightChanged = (e) => {
    setHeight(e.target.value)
  }

  const submitHandler = async () => {
    let body = {
      name,
      goalposts,
      floor,
      height,
      x: props.newCourt.lat,
      y: props.newCourt.lng
    }
    try {
      const res = await dispatch(addCourt(body))
      if (res.payload.isAuth === false) {
        alert(res.payload.errorMessage)
        return
      }
      alert('제출되었습니다.')
      props.setOpen(false)
    } catch (e) {
      alert(e.response.data.errorMessage)
    }
  }

  if (props.newCourt === undefined) {
    return (
      <div>
        
        지도에서 마우스 우클릭으로 추가할 코트의 위치를 설정할 수 있습니다. 설정 후 돌아와주세요. (
          {/* <Link href='/login'>로그인 </Link> */}로그인
        후 이용가능)
      {/* 로그인 여부에 따라 저게 보이고 안보이고 하고싶은데 isAuth 가져오기가 어려운데 */}
      </div>
    )
  } else {
    return (
      <Inputs>
        <TextField required label='농구장 이름' onChange={nameChanged} />
        <TextField required label='골대 개수' sx={{mt: 1}} onChange={goalpostsChanged} />
        <FormControl required sx={{mt: 1}} >
          <InputLabel>코트 바닥</InputLabel>
          <Select
            value={floor}
            onChange={floorChanged}
          >
            <MenuItem value={'우레탄'}>우레탄</MenuItem>
            <MenuItem value={'플라스틱'}>플라스틱</MenuItem>
            <MenuItem value={'마루'}>마루</MenuItem>
            <MenuItem value={'아스팔트'}>아스팔트</MenuItem>
          </Select>
        </FormControl>
        <FormControl required sx={{mt: 1}} >
          <InputLabel>골대 높이</InputLabel>
          <Select
            value={height}
            onChange={heightChanged}
          >
            <MenuItem value={'높음'}>높음</MenuItem>
            <MenuItem value={'보통'}>보통</MenuItem>
            <MenuItem value={'낮음'}>낮음</MenuItem>
          </Select>
        </FormControl>
        <Button sx={{mt: 3}} variant='contained' onClick={submitHandler}>제출</Button>

      </Inputs>
    )
  }
  
}

export default Request