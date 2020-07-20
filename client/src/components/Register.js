import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../action/userAction';

const Register = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userSignIn)
    const { loading, userInfo, error } = userRegister
    const dispatch = useDispatch()
    const redirect = props.location.search?props.location.search.split("=")[1]:'/'

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register(name, email, password))
    }

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li><h2>Register</h2></li>
                    <li>{loading && <div>Loading...</div>}</li>
                    <li>{error && <div>Error...</div>}</li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="re-password">
                            Re-Password
                        </label>
                        <input type="password" name="re-password" id="re-password" onChange={(e) => setRePassword(e.target.value)}></input>
                    </li>
                    <li>
                        <button type="submit" className="button primary">Register</button>
                    </li>
                    <li>
                        Already have an account? <Link to={redirect === '/'?"/signin":"signin?redirect="+redirect} className="">Sign In</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default Register