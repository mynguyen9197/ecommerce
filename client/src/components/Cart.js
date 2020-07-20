import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../action/cartAction';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const productId = props.match.params.id
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1
    const { cartItems } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [])

    const handleRemoveFromCart = (itemId) => {
        dispatch((removeFromCart(itemId)))
    }

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping")
    }

    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3>
                            Shopping Cart
                        </h3>
                        <div>
                            Price
                        </div>
                    </li>
                    {
                        cartItems.length === 0 ?
                        <div>
                            Cart is empty
                        </div>
                        :
                        cartItems.map(item => 
                            <li>
                                <div className="cart-image">
                                    <img src={item.image} alt="product" />
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/product/" +productId}>{item.name}</Link>
                                    </div>
                                    <div>
                                        Qty:
                                        <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map(x => 
                                                <option key={x+1} value={x+1}>{x+1}</option>
                                            )}
                                        </select>
                                        <button className="remove" onClick={() => handleRemoveFromCart(item.product)}>Delete</button>
                                    </div>
                                </div>
                                <div className="cart-price">{item.price}$</div>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    Subtotal ({cartItems.reduce((a,c) => a+c.qty, 0)}) items
                    : $ {cartItems.reduce((a,c) => a+ (c.qty * c.price), 0)}
                </h3>
                <button className="button  primary full-width" onClick={checkoutHandler} disabled={cartItems.length===0}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}

export default Cart