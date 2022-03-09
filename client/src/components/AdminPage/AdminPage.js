import React, { useState, useEffect } from 'react'
import Auth from '../../hoc/auth'
import Lists from './Sections/Lists'
import Map from './Sections/Map'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { getUnvalidCourt } from '../../_actions/court_action'

const PageWrap = styled.div`
  	display: flex;
`
// court db에 admin이 확인해서 넣었는지 아직 안넣었는지 bool로 나타내는 property를 하나 더 만들자
// geocode도 써야겠는데 확인을 눌렀을 때 geocode 하면 좋겠다.
function AdminPage() {
	const dispatch = useDispatch()

	const [courts, setCourts] = useState([])
	const [onMapCourt, setOnMapCourt] = useState()

	const fetchCourts = async () => {
		try {
			const data = await dispatch(getUnvalidCourt())
			setCourts(data.payload)
		} catch (e) {
			alert('Error')
		}
	}

  	

	useEffect(() => {
		fetchCourts()
	}, [courts])


	return (
		<PageWrap>
			<Lists courts={courts} setCourts={setCourts} setOnMapCourt={setOnMapCourt} />
			<Map onMapCourt={onMapCourt}/>
		</PageWrap>
	)
}

export default Auth(AdminPage, true, true)