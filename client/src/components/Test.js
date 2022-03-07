// import React, { useEffect } from 'react'
// import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps'
// import { useNavigate } from 'react-router-dom'
// function test() {

//     const onClickListener = (data) => {
//         console.log(data)
//       }

//     return (
//         <div>
//           <RenderAfterNavermapsLoaded
//                 ncpClientId={'uekcztg8vy'}
//                 >
//                 <NaverMap
//                     mapDivId={'maps-getting-started-uncontrolled'}
//                     // naverEventNames={['zoom_changed', 'center_changed']}
//                     style={{
//                       width: '500px',
//                       height: '500px',
//                     }}
//                     defaultCenter={{lng: 127.00102743015, lat: 37.5420468867691}}
//                     defaultZoom={12}
//                     onClick={() => onClickListener(NaverMap)}
//                 >
//                 </NaverMap>
//             </RenderAfterNavermapsLoaded>
//         </div>
//       )
// }

// export default test

// import React from 'react'

// function test() {
//   const iframePart = () => {
//     return {
//       __html: '<iframe src="./map.html" width="500px" height="300px"></iframe>',
//     }
//   }
//   return (
//     <div
//       dangerouslySetInnerHTML={iframePart()}
//     ></div>
//   )
// }

// export default test