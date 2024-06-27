// /* eslint-disable multiline-ternary */
// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import CardComponent from '../../components/card/Card.jsx'// Importa un componente de loader si es necesario
// import { API_URL } from '../../api/config.js'// Importa tus estilos CSS/SCSS según corresponda

// export default function ProductList () {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true) // Estado para manejar la carga de datos

//   useEffect(() => {
//     fetchProducts() // Llama a la función para obtener los productos al cargar el componente
//   }, [])

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/api/products/cards`) // Ajusta la ruta según tu API
//       setProducts(response.data) // Actualiza el estado con los datos de los productos
//       setLoading(false) // Marca la carga como completada
//     } catch (error) {
//       console.error('Error fetching products:', error)
//       setLoading(false) // Marca la carga como completada aunque haya error
//     }
//   }

//   return (
//     <div className='product-list'>
//       {loading ? (
//         <p>Cargando productos...</p>
//       ) : (
//         products.map((product) => (
//           <CardComponent
//             key={product._id} // Asegúrate de tener un campo único como `_id` para cada producto
//             img={product.img}
//             title={product.name} // Título del producto
//             subTitle={product.description} // Subtítulo o descripción corta del producto
//             text={`$ ${product.price}`}
//           />
//         ))
//       )}
//     </div>
//   )
// }
