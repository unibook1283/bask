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
    const { position, data, setDetail, searchText, navigate, newCourt, setNewCourt } = this.props;
    // const navermaps = window.naver.maps;

    const markerClicked = (elem) => {
        setDetail(elem)
        navigate(`/map/${searchText}/${elem.id}`)
        console.log(this.mapRef.getCenterPoint());
    }

    const rightClick = (coord) => {
        console.log('test', coord)
        setNewCourt({ lat: coord._lat, lng: coord._lng })
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
                onRightclick={pointerEvent => rightClick(pointerEvent.coord)}
                defaultZoom={12}
                naverRef={ref => { this.mapRef = ref }}
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
                {newCourt && (
                    <Marker
                        // icon={{
                        //     // src: '~/client/public/img/basketball.png'
                        //     // src: '../../../../public/img/basketball.png'
                        // }}
                        // animation={navermaps.Animation.BOUNCE}
                        position={newCourt}
                        onClick={() => {
                            alert('newCourt!')
                        }}
                    />
                )}
                
            </NaverMap>
        </RenderAfterNavermapsLoaded>
    )
  }
}

