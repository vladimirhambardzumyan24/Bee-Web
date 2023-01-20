import Card from '@mui/material/Card'
import { Slate, Editable, withReact } from 'slate-react'
import { useMemo, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { BlockDataType } from '../global-components/GlobalTypes'
import { Box } from '@mui/material'

const Editor = ({
  blockData,
  handleDeleteBlock
}: {
  blockData: BlockDataType
  handleDeleteBlock: (id: string) => void
}) => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState<Descendant[]>([
    {
      children: [{ text: blockData.value }]
    }
  ])

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
        <Slate editor={editor} value={value} onChange={v => setValue(v)}>
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
