import React from 'react'
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps'
import { useNavigate } from 'react-router-dom'

export default class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {};
//     // console.log(props)
//   }
  
  render() {
    const { position, data, setDetail, searchText, navigate } = this.props;
    const markerClicked = (elem) => {
        setDetail(elem)
        navigate(`/map/${searchText}/${elem.id}`)
    }
    return (
        <RenderAfterNavermapsLoaded
            ncpClientId={'uekcztg8vy'}
        >
            <NaverMap 
                id="maps-access-instance"
                style={{
                    width: '85vw',
                    height: 'calc(100vh - 65px)',
                }}
                defaultCenter={position}
                defaultZoom={12}
                naverRef={ref => { this.naverMapRef = ref }}
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
                <Marker 
                    position={{ lat: 37.3595704, lng: 127.105399 }}
                    onClick={() => {
                        alert('여기는 네이버 입니다.')
                    }}
                />
            </NaverMap>
        </RenderAfterNavermapsLoaded>
    )
  }
}

