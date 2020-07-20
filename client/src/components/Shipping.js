import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../action/cartAction';
import CheckoutSteps from './CheckoutSteps';

const Shipping = (props) => {
    const [address, setAdress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const userInfo = useSelector(state => state.userInfo)
    const dispatch = useDispatch()

    useEffect(() => {
        if(userInfo){
            props.history.push("signin/redirect=shipping")
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShipping({address, city, postalCode, country}))
        props.history.push("payment")
    }

    return (
        <div>
            <CheckoutSteps step1 step2 ></CheckoutSteps>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li><h2>Shipping</h2></li>
                        <li>
                            <label htmlFor="address">
                                Address
                            </label>
                            <input type="text" name="address" id="address" onChange={(e) => setAdress(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="city">
                                City
                            </label>
                            <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="pcode">
                                Postal Code
                            </label>
                            <input type="text" name="pcode" id="pcode" onChange={(e) => setPostalCode(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="country">
                                Country
                            </label>
                            <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}></input>
                        </li>
                        <li>
                            <button type="submit" className="button primary">Continue</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}

export default Shipping