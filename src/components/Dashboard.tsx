import { Container } from '@mui/material'
import { Box } from '@mui/system'
import CardItem from './CardItem'
import Header from './header/Header'

const Dashboard = () => {
  return (
    <>
      <Header />
      <Container sx={{ marginTop: 15 }} maxWidth="lg">
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center'
          }}
        >
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
        </Box>
      </Container>
    </>
  )
}

export default Dashboard
