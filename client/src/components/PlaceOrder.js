import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../action/cartAction';
import { Link } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';

const PlaceOrder = (props) => {
    const productId = props.match.params.id
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1
    const cart = useSelector(state => state.cart)
    const { cartItems, shipping, payment } = cart

    if(!shipping.address){
        props.history.push("/shipping")
    }else if(!payment.paymentMethod){
        props.history.push("/payment")
    }

    const itemsPrice = cartItems.reduce((a,c) => a+c.price*c.qty, 0)
    const shippingPrice = itemsPrice > 100 ? 0 : 10
    const taxPrice = 0.15 * itemsPrice
    const totalPrice = itemsPrice + taxPrice + shippingPrice

    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [])

    const placeOrderHandler = () => {
        props.history.push("/signin?redirect=shipping")
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="placeorder">
                <div className="placeorder-info">
                    <h3>
                        Shipping
                    </h3>
                    <div>
                        {shipping.address}, {shipping.city},
                        {shipping.postalcode}, {shipping.country}
                    </div>
                    <h3>
                        Payment
                    </h3>
                    <div>
                        Payment Method: {cart.payment.paymentMethod}
                    </div>
                    <div>
                        <ul className="cart-list-container">
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
                                                Qty: {item.qty}
                                            </div>
                                        </div>
                                        <div className="cart-price">{item.price}$</div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div className="placeorder-action">
                    <ul>
                        <li>
                            <button className="button full-width primary" onClick={placeOrderHandler}>Place Order</button>
                        </li>
                        <li>
                            <h3>Order Summary</h3>
                        </li>
                        <li>
                            <div>Items</div>
                            <div>${itemsPrice}</div>
                        </li>
                        <li>
                            <div>Shipping</div>
                            <div>${shippingPrice}</div>
                        </li>
                        <li>
                            <div>Tax</div>
                            <div>${taxPrice}</div>
                        </li>
                        <li>
                            <div>Order Total</div>
                            <div>${totalPrice}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder