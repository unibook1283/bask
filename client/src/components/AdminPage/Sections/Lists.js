import React from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { deleteCourt, updateCourt } from '../../../_actions/court_action'

const ListsWrap = styled.div`
    width: 900px;
    height: calc(100vh - 65px);
`

function Lists(props) {
    const courts = props.courts
    const setCourts = props.setCourts
    const setOnMapCourt = props.setOnMapCourt

    const dispatch = useDispatch()

    async function reverseGeocode (court) {
		let url = `/map-reversegeocode/v2/gc?coords=${court.y},${court.x}&orders=addr,roadaddr&output=json`

		try {
			const response = await axios.get(url, {
				headers: {
					'X-NCP-APIGW-API-KEY-ID': process.env.REACT_APP_NAVER_GEOCODE_KEY_ID,
					'X-NCP-APIGW-API-KEY': process.env.REACT_APP_NAVER_GEOCODE_KEY
				}
			})

            const update = {
                courtId: court._id, // findById 하기 위해 넣어줌.
                valid: true
            }

            if (response.data.results[0] !== undefined) {
                const addr = response.data.results[0].region
                const address_name = addr.area1.alias + ' ' + addr.area2.name + ' ' + addr.area3.name + ' ' + addr.area4.name
                update.address_name = address_name
            }
			
            if (response.data.results[1] !== undefined) {
                const roadaddr = response.data.results[1]
                const road_address_name = roadaddr.region.area1.alias + ' ' + roadaddr.region.area2.name + ' ' + roadaddr.land.name + ' ' + roadaddr.land.number1 + ' ' + roadaddr.land.number2
                update.road_address_name = road_address_name
            }
            
            await dispatch(updateCourt(update))
		} catch (e) {
			console.log(e)
		} 
	}
    
    const onMapCourtHandler = (court) => {
        setOnMapCourt(court)
    }

    const validateHandler = (court) => {
        reverseGeocode(court)
    }

    const unvalidateHandler = async (court) => {
        try {
            await dispatch(deleteCourt(court))
            setOnMapCourt(undefined)
        } catch (e) {
            alert('Error')
        }
    }
    
  return (
    <ListsWrap>
        <TableContainer>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>농구장 이름</TableCell>
                        <TableCell>골대 개수</TableCell>
                        <TableCell>바닥</TableCell>
                        <TableCell>골대 높이</TableCell>
                        <TableCell>제보자 id</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {courts.map((court) => (
                        <TableRow
                            key={court._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                {court.name}
                            </TableCell>
                            <TableCell>{court.goalposts}</TableCell>
                            <TableCell>{court.floor}</TableCell>
                            <TableCell>{court.height}</TableCell>
                            <TableCell>{court.owner.name}</TableCell>
                            <TableCell>
                                <Button sx={{mr: 1}} variant='contained' onClick={() => onMapCourtHandler(court)} >지도에서 보기</Button>
                                <Button sx={{mr: 1}} variant='contained' onClick={() => validateHandler(court)} >추가</Button>
                                <Button variant='contained' onClick={() => unvalidateHandler(court)} >삭제</Button>
                            </TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </ListsWrap>
  )
}

export default Lists