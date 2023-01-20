import { Button, Container } from '@mui/material'
import { Box } from '@mui/system'
import { onValue, ref, set } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import { auth, db } from '../firebase'
import { BlockDataType } from '../global-components/GlobalTypes'
import Editor from './Editor'
import Header from './header/Header'

const Dashboard = () => {
  const navigate = useNavigate()
  const [blocksData, setBlocksData] = useState<BlockDataType[]>([])

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        onValue(ref(db, `${auth.currentUser?.uid}`), snapshot => {
          setBlocksData([])
          const data = snapshot.val()
          if (data !== null) {
            Object.values(data).map(textBlock => {
              setBlocksData((prevData: any) => [...prevData, textBlock])
            })
          }
        })
      } else if (!user) {
        navigate('/')
      }
    })
  }, [])

  const writeToDatabase = () => {
    const id = uid()
    set(ref(db, `${auth.currentUser?.uid}/${id}`), {
      value: 'Enter text',
      id: id
    })
  }

  useEffect(() => {
    console.log(blocksData)
  }, [blocksData])
  return (
    <>
      <Header />
      <Container sx={{ marginTop: 15 }} maxWidth="lg">
        <Button onClick={writeToDatabase}>ADD</Button>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center'
          }}
        >
          {blocksData.map(block => (
            <Editor key={block.id} blockData={block} />
          ))}
        </Box>
      </Container>
    </>
  )
}

export default Dashboard
