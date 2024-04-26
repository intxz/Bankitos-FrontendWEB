import React, { useRef, useState } from 'react';
import './SigIn.css';

function SignIn() {

    return (
        <div className='container'>
            <h2>Log In</h2>
            <form action="">
                <input type="email" id="email"  />
                <input type="password" id="password" />
                <button type="submit">Sign In</button>
            </form>
        </div> 
    );
}

export default SignIn;