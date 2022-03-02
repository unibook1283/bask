import React from 'react'
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps'
import axios from 'axios'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TextField, Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import PersonIcon from '@mui/icons-material/Person'
import HomeIcon from '@mui/icons-material/Home'
import { spacing } from '@mui/system'
import { useParams, useNavigate } from 'react-router-dom'
import Auth from '../hoc/auth'

const PageWrap = styled.div`
    display: flex;
`

const InfoWrap = styled.div`
    width: 500px;
    height: 100vh;
`

const TopMenu = styled.div`
    display: flex;
    justify-content: space-between;
    height: 40px;
`

const Search = styled.div`
    display: flex;
    margin: 0px 10px 10px 10px;
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

function MapPage() {
    let { address, id } = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [searchText, setSearchText] = useState('성수동')
    const [position, setPosition] = useState({
        lat: 37.542108,
        lng: 127.04965
    })
    const [detail, setDetail] = useState({})

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
            console.log(response.data.documents)
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

    const markerClicked = (elem) => {
        setDetail(elem)
        navigate(`/map/${searchText}/${elem.id}`)
    }

    const goHome = () => {
        navigate('/')
    }

    const goProfile = () => {
        navigate('/profile')
    }

    const favoriteHandler = async () => {
        const filterdDetail = detail    // 이것좀 깔끔하게 해보자
        delete filterdDetail.category_group_code
        delete filterdDetail.category_group_name
        delete filterdDetail.category_name
        delete filterdDetail.distance
        delete filterdDetail.phone
        delete filterdDetail.place_url
        // delete filterdDetail[
        //     'category_group_code',
        //     'category_group_name',
        //     'cateogry_name',
        //     'distance',
        //     'phone',
        //     'place_url'
        // ]
        console.log(filterdDetail)

        try {
            await axios.post('/api/favorites/add', detail)
            alert('즐겨찾기에 추가되었습니다.')
        } catch (e) {
            alert('즐겨찾기 추가에 실패했습니다.')
        }
    }

  return (
    <PageWrap>
        <InfoWrap>
            <TopMenu>
                <IconButton size="large" color="primary" onClick={goHome}>
                    <HomeIcon />
                </IconButton>
                <IconButton size="large" color="primary" onClick={goProfile}>
                    <PersonIcon />
                </IconButton>
            </TopMenu>
            <Search>
                <TextField fullWidth label='동으로 검색 ex) 성수동' size='small' onChange={searchHandler} />
                <Button variant='contained' sx={{ml: 1}} onClick={moveHandler} >이동</Button>
            </Search>
            <HeaderInfo>
                <PlaceName>{id && detail.place_name}</PlaceName>
                <RoadAddressName>{id && detail.road_address_name}</RoadAddressName>
            </HeaderInfo>
            <Button href={detail.place_url} variant='contained' sx={{ mx: 2, width: 350 }} >카카오맵에서 검색</Button>
            <Button variant='contained' sx={{ mx: 2, my: 1, width: 350 }} onClick={favoriteHandler} >즐겨찾기에 추가</Button>
        </InfoWrap>
        <RenderAfterNavermapsLoaded
            ncpClientId={'uekcztg8vy'}
            >
            <NaverMap
                mapDivId={'maps-getting-started-uncontrolled'}
                style={{
                  width: '100%',
                  height: '100vh',
                }}
                defaultCenter={position}
                defaultZoom={12}
            >
                {data.map((elem, index) => {
                    return (
                        <Marker 
                            key={index}
                            position={{ lat: elem.y, lng: elem.x }}
                            onClick={() => markerClicked(elem)}
                        />
                    )
                })}
            </NaverMap>
        </RenderAfterNavermapsLoaded>
    </PageWrap>
  )
}

export default Auth(MapPage, null)