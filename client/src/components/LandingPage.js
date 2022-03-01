import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div>
        LandingPage
        <br/>
        <Link to='/register'>register</Link>
        <br/>
        <Link to='/login'>login</Link>
        <br/>
        <Link to='/map'>map</Link>
        <br/>
        <Link to='/profile'>profile</Link>
    </div>
  )
}

export default LandingPage