import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Descendant } from 'slate'
import { Button, Container, Grid, Typography } from '@mui/material'
import { onValue, ref, remove, set, update } from 'firebase/database'
import { BlockDataType } from '../global-components/GlobalTypes'
import TextConstants from '../constants/TextConstants'
import { auth, db } from '../firebase'
import Editor from './Editor'
import Header from './header/Header'
import sortBlocksByText from '../helpers/sortBlocksByText'
import { RootState } from '../store/store'

const Dashboard = () => {
  const navigate = useNavigate()
  const [blocksData, setBlocksData] = useState<BlockDataType[]>([])
  const userData = useSelector(
    (state: RootState) => state.authenticationState.userData
  )
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        onValue(ref(db, `${auth.currentUser?.uid}`), snapshot => {
          setBlocksData([])
          const data = snapshot.val()
          if (data !== null) {
            Object.values(data).map(textBlock => {
              setBlocksData((prevData: any) => [textBlock, ...prevData])
            })
          }
        })
      } else if (!user) {
        navigate('/')
      }
    })
  }, [])

  const writeToDatabase = () => {
    const id = new Date().getTime()
    set(ref(db, `${auth.currentUser?.uid}/${id}`), {
      value: [
        {
          children: [{ text: '' }]
        }
      ],
      id: id
    })
  }

  const handleDeleteBlock = (id: string) => {
    remove(ref(db, `${auth.currentUser?.uid}/${id}`))
  }

  const updateBlockDataInDatabase = (
    id: string,
    currentValue: Descendant[]
  ) => {
    update(ref(db, `${auth.currentUser?.uid}/${id}`), {
      value: currentValue,
      id: id
    })
  }

  const sortBlocks = () => {
    setBlocksData([...sortBlocksByText(blocksData)])
  }

  return (
    <>
      <Header />
      <Typography component="div" sx={{ padding: '10px' }}>
        {userData?.email}
      </Typography>
      <Container sx={{ marginTop: 15 }} maxWidth="lg">
        <Button onClick={writeToDatabase}>{TextConstants.BUTTONS.ADD}</Button>
        <Button onClick={sortBlocks}>{TextConstants.BUTTONS.SORT}</Button>
        <Grid marginTop="10px" container spacing={2}>
          {blocksData.map(block => (
            <Grid key={block.id} item sm={4} xs={12} md={3}>
              <Editor
                blockData={block}
                handleDeleteBlock={handleDeleteBlock}
                updateBlockDataInDatabase={updateBlockDataInDatabase}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Dashboard
