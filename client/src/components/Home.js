import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../action/productAction';

const Home = () => {
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts())
    }, [])

    return (
      loading ? <div>Loading...</div>:
      error ? <div>Error</div> :
        <div className="content">
            <ul className="products">
              {products.map(product => (
                <li key={product._id}>
                  <div class="product">
                    <img class="product-image" src={product.image} alt="product" />
                    <div class="product-name">
                        <Link to={'/product/' + product._id}>{product.name}</Link>
                    </div>
                    <div class="product-brand">{product.brand}</div>
                    <div class="product-price">{product.price}$</div>
                    <div class="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
                  </div>
                </li>
              ))}

            </ul>
        </div>
    )
}
 
export default Home;