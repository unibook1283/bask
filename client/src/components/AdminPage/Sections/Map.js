import React from 'react'
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps'
import { useNavigate } from 'react-router-dom'

export default class Map extends React.Component {

  render() {
    const { onMapCourt } = this.props;

    const markerClicked = () => {

    }

    return (
        <RenderAfterNavermapsLoaded
            ncpClientId={'uekcztg8vy'}
        >
            <NaverMap 
                id="maps-access-instance"
                style={{
                    width: '55vw',
                    height: 'calc(100vh - 65px)',
                }}
                // defaultCenter={position}
                defaultZoom={12}
                naverRef={ref => { this.mapRef = ref }}
            >
                
            {onMapCourt && <Marker 
                key={onMapCourt._id}
                position={{ lat: onMapCourt.x, lng: onMapCourt.y }}
                onClick={() => markerClicked(onMapCourt)}
            />}
            </NaverMap>
        </RenderAfterNavermapsLoaded>
    )
  }
}