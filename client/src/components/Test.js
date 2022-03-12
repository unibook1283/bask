import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getSearchedCourt } from '../_actions/court_action'

function Test() {
    const dispatch = useDispatch()
    
    const fetchDbCourts = async () => {
        let body = {
            qwe: 'qwe',
            qwer: 2
        }
        try {
            const dbCourts = await dispatch(getSearchedCourt(body))
            console.log(dbCourts)
        } catch (e) {
            alert('Error')
        }
    }

    useEffect(() => {
        fetchDbCourts()
    }, [])

    return (
        <div>test</div>
    )
}

export default Test