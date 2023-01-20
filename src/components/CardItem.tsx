import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const CardItem = () => {
  return (
    <Card sx={{ width: 275 }}>
      <CardContent>
        <Typography variant="body2">
          well meaning and kasd as d as d as d as sd asd sa asdf as da sd a sd s
          d sad asd as f as fd sa as d as dindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default CardItem
