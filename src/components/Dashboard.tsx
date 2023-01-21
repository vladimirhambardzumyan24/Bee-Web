import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Descendant } from 'slate'
import { uid } from 'uid'
import { Button, Container } from '@mui/material'
import { Box } from '@mui/system'
import { onValue, ref, remove, set, update } from 'firebase/database'
import { BlockDataType } from '../global-components/GlobalTypes'
import TextConstants from '../constants/TextConstants'
import { auth, db } from '../firebase'
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
    const id = uid()
    set(ref(db, `${auth.currentUser?.uid}/${id}`), {
      value: [
        {
          children: [{ text: TextConstants.BLOCK_DEFAULT_VALUE }]
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

  return (
    <>
      <Header />
      <Container sx={{ marginTop: 15 }} maxWidth="lg">
        <Button onClick={writeToDatabase}>{TextConstants.BUTTONS.ADD}</Button>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            marginTop: '10px'
          }}
        >
          {blocksData.map(block => (
            <Editor
              key={block.id}
              blockData={block}
              handleDeleteBlock={handleDeleteBlock}
              updateBlockDataInDatabase={updateBlockDataInDatabase}
            />
          ))}
        </Box>
      </Container>
    </>
  )
}

export default Dashboard
