import { useMemo, useState } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor, Descendant } from 'slate'
import Card from '@mui/material/Card'
import { Box } from '@mui/material'
import { BlockDataType } from '../global-components/GlobalTypes'

const Editor = ({
  blockData,
  handleDeleteBlock,
  updateBlockDataInDatabase
}: {
  blockData: BlockDataType
  handleDeleteBlock: (id: string) => void
  updateBlockDataInDatabase: (id: string, currentValue: Descendant[]) => void
}) => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState<Descendant[]>(blockData.value)
  const [timer, setTimer] = useState<
    string | number | NodeJS.Timeout | undefined
  >(undefined)

  const handleChange = (value: Descendant[]) => {
    clearTimeout(timer)
    const newTimer = window.setTimeout(() => {
      updateBlockDataInDatabase(blockData.id, value)
    }, 500)
    setTimer(newTimer)
    setValue(value)
  }

  return (
    <Box
      component="div"
      sx={{
        position: 'relative'
      }}
    >
      <Card
        sx={{
          width: 275,
          height: 100,
          padding: '10px 10px 20px 10px'
        }}
      >
        <Slate editor={editor} value={value} onChange={handleChange}>
          <Editable />
        </Slate>
      </Card>
      <Box
        sx={{
          right: '10px',
          top: '5px',
          position: 'absolute',
          cursor: 'pointer',
          color: 'red'
        }}
        onClick={() => handleDeleteBlock(blockData.id)}
      >
        X
      </Box>
    </Box>
  )
}

export default Editor
