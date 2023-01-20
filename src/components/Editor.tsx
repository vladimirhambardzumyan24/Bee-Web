import Card from '@mui/material/Card'
import { Slate, Editable, withReact } from 'slate-react'
import { useMemo, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { BlockDataType } from '../global-components/GlobalTypes'

const Editor = ({ blockData }: { blockData: BlockDataType }) => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState<Descendant[]>([
    {
      children: [{ text: blockData.value }]
    }
  ])

  return (
    <Card sx={{ width: 275, height: 100, padding: '10px' }}>
      <Slate editor={editor} value={value} onChange={v => setValue(v)}>
        <Editable />
      </Slate>
    </Card>
  )
}

export default Editor
