import React from 'react'

const Profile = ({username, email, passwordLink}) => (
  <div>
    <img src={`https://api.adorable.io/avatars/285/${email}.png`} alt="Profile"/>
    <h2>{username}</h2>
    <p>{email}</p>
    <a href={passwordLink || '#'}>Change password</a>
  </div>
)

export default Profile