import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TextField, Button, Link, Modal, Box } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import Auth from '../../hoc/auth'
import { useDispatch } from 'react-redux'
import { addFavorite } from '../../_actions/favorite_action'
import Map from './Sections/Map'
import NewMap from './Sections/NewMap'
import Request from './Sections/Request'

const PageWrap = styled.div`
    display: flex;
`

const InfoWrap = styled.div`
    width: 500px;
    height: calc(100vh - 65px);
    display: flex;
    flex-direction: column;
`

const MainInfo = styled.div`
    flex: auto;
`

const Search = styled.div`
    display: flex;
    margin: 15px 10px 10px 10px;
`

const HeaderInfo = styled.div`
    text-align: center;
    height:90px;
`

const PlaceName = styled.h1`
    padding-top: 18px;
    font-size: 18px;
    font-weight: 300;
`

const RoadAddressName = styled.h2`
    font-size: 12px;
    font-weight: 200;
`

const Buttons = styled.div`
    width: 395px;
`

const RequestCourt = styled.div`
    display: flex;
    justify-content: flex-end;
    align-self: bottom;
`

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function MapPage() {
    let { address, id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [data, setData] = useState([])
    const [searchText, setSearchText] = useState('성수동')
    const [position, setPosition] = useState({
        lat: 37.542108,
        lng: 127.04965
    })
    const [detail, setDetail] = useState({})
    const [open, setOpen] = useState(false)
    const [newCourt, setNewCourt] = useState()

    async function geocode (address) {
        let url = `/map-geocode/v2/geocode?query=${address}`

        try {
            const response = await axios.get(url, {
                headers: {
                    'X-NCP-APIGW-API-KEY-ID': process.env.REACT_APP_NAVER_GEOCODE_KEY_ID,
                    'X-NCP-APIGW-API-KEY': process.env.REACT_APP_NAVER_GEOCODE_KEY
                }
            })
            setPosition({
                lat: response.data.addresses[0].y,
                lng: response.data.addresses[0].x
            })
        } catch (e) {
            console.log(e)
        } 
    }

    async function fetchData () {   // 이것도 redux로 해야되나?
        let url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=농구장&y=${position.lat}&x=${position.lng}&radius=20000`
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`
            }
            })
            setData(response.data.documents)    // module화 하고싶은데 setData를 어찌 처리할지 고민중
            
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        geocode(address)
    }, [address])

    useEffect(() => {
        fetchData()
    }, [position])
    
    const searchHandler = (e) => {
        setSearchText(e.target.value)
    }

    const moveHandler = () => {
        navigate(`/map/${searchText}`)
    }
    
    const favoriteHandler = async () => {
        // 이것좀 깔끔하게 해보자
        delete detail.category_group_code
        delete detail.category_group_name
        delete detail.category_name
        delete detail.distance
        delete detail.phone
        delete detail.place_url
        try {
            const res = await dispatch(addFavorite(detail))
            if (res.payload.isAuth === false) {
                alert(res.payload.errorMessage)
                return
            }
            alert('즐겨찾기에 추가되었습니다.')
        } catch (e) {
            alert(e.response.data.errorMessage)
        }
    }

  return (
    <PageWrap>
        <InfoWrap>
            <MainInfo>
                <Search>
                    <TextField fullWidth label='동으로 검색 ex) 성수동' size='small' onChange={searchHandler} />
                    <Button variant='contained' sx={{ml: 1}} onClick={moveHandler} >이동</Button>
                </Search>
                <HeaderInfo>
                    <PlaceName>{id && detail.place_name}</PlaceName>
                    <RoadAddressName>{id && detail.road_address_name}</RoadAddressName>
                </HeaderInfo>
                {detail.id && (
                    <Buttons>
                        <Button fullWidth href={detail.place_url} variant='contained' sx={{ mx: 2 }} >카카오맵에서 검색</Button>
                        <Button fullWidth variant='contained' sx={{ mx: 2, my: 1 }} onClick={favoriteHandler} >즐겨찾기에 추가</Button>
                    </Buttons>
                )}
            </MainInfo>

            
            <RequestCourt>
                <Button onClick={() => setOpen(true)}>찾으시는 코트가 없나요?</Button>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}

                >
                    <Box sx={style}>
                        <Request setOpen={setOpen} newCourt={newCourt} />
                    </Box>
                </Modal>
            </RequestCourt>
            
        </InfoWrap>
        <NewMap position={position} data={data} setDetail={setDetail} searchText={searchText} navigate={navigate} newCourt={newCourt} setNewCourt={setNewCourt} />
    </PageWrap>
  )
}

export default Auth(MapPage, null)