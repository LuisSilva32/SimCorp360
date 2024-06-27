import { Card } from 'react-bootstrap'
import '../../styles/card.scss'

export default function CardComponent ({ img, title, subTitle, text }) {
  return (
    <Card className='custom-card'>
      <div className='container-card-img'>
        <Card.Img variant='top' className='img' src={img} />
      </div>
      <Card.Body>
        <Card.Title className='card-title'>{title}</Card.Title>
        <Card.Subtitle className='card-subtitle'>{subTitle}</Card.Subtitle>
        <Card.Text className='card-text'>{text}</Card.Text>
      </Card.Body>
    </Card>
  )
}
