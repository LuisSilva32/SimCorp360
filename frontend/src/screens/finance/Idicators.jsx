import React from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import Slider from '../../components/slider/Slider'
import '../../styles/indicators.scss'

export default function Indicators () {
  return (
    <>
      <div className='container-top'>
        <Slider />
      </div>
      <div className='title-container'>
        <h2 className='title'>INDICADORES ECONOMICOS</h2>
      </div>
      <Container className='container-buttom'>
        <Row>
          <Col>
            <Card className='card-indicator'>
              <Card.Body className='d-flex flex-column align-items-center'>
                <Card.Title>Dólar TRM</Card.Title>
                <Card.Subtitle>$ 4.307,02</Card.Subtitle>
                <Card.Text className='mb-2 text-muted'>
                  Junio 06
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className='card-indicator'>
              <Card.Body className='d-flex flex-column align-items-center'>
                <Card.Title>UVR</Card.Title>
                <Card.Subtitle>$ 346,63</Card.Subtitle>
                <Card.Text className='mb-2 text-muted'>
                  Junio 06
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className='card-indicator'>
              <Card.Body className='d-flex flex-column align-items-center'>
                <Card.Title>DTF (EA)</Card.Title>
                <Card.Subtitle>12,78 %</Card.Subtitle>
                <Card.Text className='mb-2 text-muted'>
                  Junio 06
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className='card-indicator'>
              <Card.Body className='d-flex flex-column align-items-center'>
                <Card.Title>Deseempleo</Card.Title>
                <Card.Subtitle>10,7 %</Card.Subtitle>
                <Card.Text className='mb-2 text-muted'>
                  Abril 2023
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card className='card-indicator'>
              <Card.Body className='d-flex flex-column align-items-center'>
                <Card.Title>IPC</Card.Title>
                <Card.Subtitle>0,78 %</Card.Subtitle>
                <Card.Text className='mb-2 text-muted'>
                  Abril 2023
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card className='card-indicator'>
              <Card.Body className='d-flex flex-column align-items-center'>
                <Card.Title>Variación PIB</Card.Title>
                <Card.Subtitle>3,0 %</Card.Subtitle>
                <Card.Text className='mb-2 text-muted'>
                  1er. Trimestre 2023
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className='card-indicator'>
              <Card.Body className='d-flex flex-column align-items-center'>
                <Card.Title>Salario mínimo</Card.Title>
                <Card.Subtitle>$ 1.160.000</Card.Subtitle>
                <Card.Text className='mb-2 text-muted'>
                  203
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card className='card-indicator'>
              <Card.Body className='d-flex flex-column align-items-center'>
                <Card.Title>Café</Card.Title>
                <Card.Subtitle>US $ 2,22</Card.Subtitle>
                <Card.Text className='mb-2 text-muted'>
                  2023
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card className='card-indicator'>
              <Card.Body className='d-flex flex-column align-items-center'>
                <Card.Title>Petróleo WTI</Card.Title>
                <Card.Subtitle>US $ 71,79</Card.Subtitle>
                <Card.Text className='mb-2 text-muted'>
                  Junio 06
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
