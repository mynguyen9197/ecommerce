import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signin } from '../action/userAction';

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignIn = useSelector(state => state.userSignIn)
    const { loading, userInfo, error } = userSignIn
    const dispatch = useDispatch()
    const redirect = props.location.search?props.location.search.split("=")[1]:'/'

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(signin(email, password))
    }

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li><h2>Sign-In</h2></li>
                    <li>{loading && <div>Loading...</div>}</li>
                    <li>{error && <div>Error...</div>}</li>
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
                        <button type="submit" className="button primary">Sign In</button>
                    </li>
                    <li>
                        New to amazona?
                    </li>
                    <li>
                        <Link to={redirect === '/' ? "/register" : '/register?redirect=' + redirect} className="button secondary text-center">Create your amazona account</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default SignIn