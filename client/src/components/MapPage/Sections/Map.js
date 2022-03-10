import React, { useEffect } from 'react'
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps'
import { useNavigate } from 'react-router-dom'

function Map(props) {
  const navigate = useNavigate()

  const markerClicked = (elem) => {
    props.setDetail(elem)
    navigate(`/map/${props.searchText}/${elem.id}`)
  }
  useEffect(() => {
    console.log(props)
  }, [])
  
  const markerList = []

  const onClickListener = () => {
    alert('qwer')
  }

  function handleCenterChanged() {
    // this.setState({ center })
    const navermaps = window.naver.maps;
    this.setState({ center: new navermaps.LatLng(37.3595704, 127.105399) }) ;
  }

  function onClickButton() {
    const navermaps = window.naver.maps;
    this.setState(() => ({ center : new navermaps.LatLng(128.6521583, 34.9070498) }));
  }

  

  return (
    <div>
      <RenderAfterNavermapsLoaded
            ncpClientId={'uekcztg8vy'}
            >
            <NaverMap
                mapDivId={'maps-getting-started-uncontrolled'}
                // naverEventNames={['zoom_changed', 'center_changed']}
                style={{
                  width: '72vw',
                  height: 'calc(100vh - 65px)',
                }}
                defaultCenter={props.position}
                defaultZoom={12}
                // events='click'
                // onClick={onClickListener}
                // click={onClickListener}
                onClick={onClickListener}
                // center={{lat: 12, lng:12}}
                // onCenterChanged={handleCenterChanged}
                // onClickButton={onClickButton}

            >
                {props.data.map((elem, index) => {
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
    </div>
  )
}

export default Map