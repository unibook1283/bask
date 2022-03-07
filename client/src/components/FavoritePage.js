import React, { useState, useEffect } from 'react'
import Auth from '../hoc/auth'
import { useDispatch } from 'react-redux'
import { getFavorites, deleteFavorite } from '../_actions/favorite_action'
import styled from 'styled-components'
import { List, ListItem, ListItemText, ListItemButton, Divider, Chip, IconButton, Link } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
`

const FavoriteList = styled.div`
  display: flex;
  justify-content: center;
`

const FavoriteElement = styled.div`
  display: flex;
`

const Nothing = styled.div`
  display: flex;
  justify-content: center;
`


function ProfilePage() {
  const dispatch = useDispatch()

  const [favorites, setFavorites] = useState([])
  const [ownerCnt, setOwnerCnt] = useState(0)

  const getFav = async () => {
    // console.log('getFav')  // 이거 켜보면 계속 나옴. useEffect 때문인가. favorites값이 바뀌고 있다는건가.
    try {
      // setFavorites(await dispatch(getFavorites()))
      const data = await dispatch(getFavorites())
      setOwnerCnt(data.payload.ownerCnt)
      setFavorites(data.payload.favorites)
    } catch (e) {
      alert('Error')
    }
  }
  useEffect(() => {
    getFav()
  }, [favorites])

  const selectHandler = () => {
    alert('준비중')
  }

  const deleteHandler = async (elem) => {
    try {
      const deleted = await dispatch(deleteFavorite(elem))
      console.log(deleted.payload)
      setFavorites(favorites.filter(favorite => favorite !== deleted.payload))
      alert('삭제')
    } catch (e) {
      alert('Error')
    }
  }
  
  return (
    <div>
      <ImageWrap>
        <img src="img/tan-kuen-yuen-cXXuAUCTihQ-unsplash.jpg" width="1000px" height="400px" />
      </ImageWrap>
      {(favorites.length === 0) && 
        <Nothing>
          <Link href='/map'>새로운 농구장 추가하러 가기</Link>
        </Nothing>
      }
      <FavoriteList>
        <List sx={{width: 900}}>
          {favorites && favorites.map((elem, index) => {  // favorites가 있을 때만 map 실행.
            return (                                      // 이거 안하면 Uncaught TypeError: Cannot read properties of undefined (reading 'map') 이런 에러가 나오네.
              <div key={index}>
                <FavoriteElement>
                  <ListItem>
                    <ListItemButton onClick={selectHandler}>
                      <ListItemText primary={elem.place_name} secondary={elem.road_address_name}/>
                      <Chip icon={<PeopleIcon />} label={ownerCnt[index]} />
                      
                    </ListItemButton>
                    <IconButton onClick={() => deleteHandler(elem)} sx={{ml: 1}}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                </FavoriteElement>
                <Divider />
              </div>
              
            )
          })}
        </List>
      </FavoriteList>
    </div>
  )
}

export default Auth(ProfilePage, true)