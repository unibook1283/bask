import React from 'react'
import Auth from '../hoc/auth'

function ProfilePage() {
  return (
    <div>ProfilePage</div>
  )
}

export default Auth(ProfilePage, true)