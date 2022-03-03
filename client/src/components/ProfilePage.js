import React, { useState, useEffect } from 'react'
import Auth from '../hoc/auth'
import { useDispatch } from 'react-redux'
import { getFavorites } from '../_actions/favorite_action'
import styled from 'styled-components'
import { List, ListItem, ListItemText, Divider } from '@mui/material';

const FavoriteListWrap = styled.div`
  display: flex;
  justify-content: center;
`

const FavoriteList = styled.div`

`

const FavoriteElement = styled.div`
  display: flex;
  align-items: center;
  width: 900px;
  height: 70px;
  border-bottom: 1px solid grey;
`

const FavoriteTitle = styled.div`

`

const PlaceName = styled.div`
  
`

const RoadAddressName = styled.div`
  font-size: 12px;
  color: grey;
`

const MemberCount = styled.div`

`

function ProfilePage() {
  const dispatch = useDispatch()

  const [favorites, setFavorites] = useState([])

  const getFav = async () => {
    try {
      // setFavorites(await dispatch(getFavorites()))
      const data = await dispatch(getFavorites())
      setFavorites(data.payload)
    } catch (e) {
      alert('Error')
    }
  }
  useEffect(() => {
    getFav()
  }, [])

  const qwer = () => {
    
  }
  
  return (
    <div>
      ProfilePage

      <List sx={{width: 900}}>
        {favorites.map((elem, index) => {
          return (
            <div>
              <ListItem sx={{flexDirection: 'column'}}>
                <ListItemText primary={elem.place_name}/>
                <ListItemText sx={{fontSize: 34}} primary={elem.road_address_name}/>
              </ListItem>
              <Divider />
            </div>
            
          )
        })}
        
      </List>

      {/* <FavoriteListWrap>
        <FavoriteList>
          {favorites.map((elem, index) => {
            return (
              <FavoriteElement key={index} onClick={qwer}>
                <FavoriteTitle>
                  <PlaceName>
                    {elem.place_name}

                  </PlaceName>
                  <RoadAddressName>
                    {elem.road_address_name}
                  </RoadAddressName>

                </FavoriteTitle>
                <MemberCount>

                </MemberCount>
              </FavoriteElement>
            )
          })}
        </FavoriteList>
      </FavoriteListWrap> */}
    </div>
  )
}

export default Auth(ProfilePage, true)