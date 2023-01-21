import { BlockDataType } from '../global-components/GlobalTypes'

const sortBlocksByText = (blocksData: BlockDataType[]) => {
  const sortedData = blocksData.sort((a, b) => {
    const nameA = a.value[0].children[0].text.toUpperCase()
    const nameB = b.value[0].children[0].text.toUpperCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }

    return 0
  })
  return sortedData
}

export default sortBlocksByText
