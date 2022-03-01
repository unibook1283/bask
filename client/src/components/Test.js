import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'


function Test() {

    // async function fetchData () {
    //     let url = `/v1/search/local.json?query=농구장&display=100`

    //     try {
    //         const response = await axios.get(url, {
    //             headers: {
    //                 'X-Naver-Client-Id': '5oJDDCPZ5gUMZ1i0nynX',
    //                 'X-Naver-Client-Secret': 'qNEJ39pbBh'
    //             }
    //         })
    //         console.log(response)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    // async function fetchData () {
    //     let url = `/map-geocode/v2/geocode?query=강북구 솔샘로 174`

    //     try {
    //         const response = await axios.get(url, {
    //             headers: {
    //                 'X-NCP-APIGW-API-KEY-ID': 'uekcztg8vy',
    //                 'X-NCP-APIGW-API-KEY': 'ffc5N4sxOJXK2Tbo1q3oXnzvhNAb3sLF8SlWt3vr'
    //             }
    //         })
    //         console.log(response)
    //     } catch (e) {
    //         console.log(e)
    //     } 
    // }

    async function fetchData () {
        let url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=카카오프렌즈&y=37.514322572335935&x=127.06283102249932&radius=20000`
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': 'KakaoAK 18e8723aefd055828585037a465d79a6'
                }
            })
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

  return (
    <div>
        
    </div>
  )
}

export default Test