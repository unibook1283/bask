import React, { useEffect } from 'react'

export default function (SpecificComponent) {
    function AuthenticationCheck() {
        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}

// export default function (SpecificComponent) {
    
//     return SpecificComponent
// }