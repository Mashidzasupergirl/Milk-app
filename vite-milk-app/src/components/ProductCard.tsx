import React from 'react'
import oneProduct from '../interfaces/one-product'

const ProductCard = (data: oneProduct) => {
  return (
    <div className='product-card' >
        <img src="./public/milk.png" alt="Milk pic" width="200" height="200"></img>
        <p>{data.name}</p>
        <p>{data.type}</p>
        {/* <p>storage {data.storage}</p>
        <p>id {data.id}</p> */}
    </div>
    
  )
}

export default ProductCard

