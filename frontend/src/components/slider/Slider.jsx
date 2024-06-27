// src/components/Slider/Slider.js
import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import '../../styles/slider.scss'
import CardComponent from '../card/Card'

const cardsData = [
  {
    img: '../../../public/slider-Imgs/poblacion-total.png',
    title: 'Pobalción Total',
    subTitle: 'Marzo 2024',
    text: '52.215.503'
  },
  {
    img: '../../../public/slider-Imgs/pib.png',
    title: 'PIB',
    subTitle: 'Variación Trim, IV 2023',
    text: '0.3%'
  },
  {
    img: '../../../public/slider-Imgs/ipc.png',
    title: 'IPC',
    subTitle: 'Marzo 2024',
    text: '0,70%'
  },
  {
    img: '../../../public/slider-Imgs/ipp.png',
    title: 'IPP',
    subTitle: 'Variacion mensual marzo 2024',
    text: '0,12%'
  },
  {
    img: '../../../public/slider-Imgs/tasa-de-desocupacion.png',
    title: 'Tasa de desocupacion',
    subTitle: 'Total nacional febrero 2024',
    text: '11,7%'
  },
  {
    img: '../../../public/slider-Imgs/teamwork.png',
    title: 'Tasa de ocupacion',
    subTitle: 'Total nacional febrero de 2024',
    text: '56.4%'
  },
  {
    img: '../../../public/slider-Imgs/micronegocios.png',
    title: 'Total de micronegocios',
    subTitle: 'Cab. municipales II Trimestre 2023',
    text: '3,7 millones'
  },
  {
    img: '../../../public/slider-Imgs/internet.png',
    title: 'Conexion de internet',
    subTitle: 'Total nacional hogares 2022',
    text: '59.5%'
  },
  {
    img: '../../../public/slider-Imgs/esperanza-vida.png',
    title: 'Esperanza de vida al nacer',
    subTitle: 'Total nacional 2023',
    text: '77,23 años'
  },
  {
    img: '../../../public/slider-Imgs/pobreza-monetaria.png',
    title: 'Pobreza monetaria',
    subTitle: 'Total nacional 2022',
    text: '36,6%'
  }
  // Añade más objetos de card aquí si es necesario
]

export default function Slider () {
  // Divide las cards en grupos de 5
  const cardGroups = []
  for (let i = 0; i < cardsData.length; i += 5) {
    cardGroups.push(cardsData.slice(i, i + 5))
  }

  return (
    <div className='slider-wrapper'>
      <Carousel variant='dark' className='slider-container'>
        {cardGroups.map((group, index) => (
          <Carousel.Item key={index}>
            <div className='card-wrapper'>
              {group.map((card, idx) => (
                <CardComponent
                  key={idx}
                  img={card.img}
                  title={card.title}
                  subTitle={card.subTitle}
                  text={card.text}
                />
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}
