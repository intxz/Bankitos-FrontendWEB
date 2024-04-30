import React, { useRef, useState } from 'react';
import axios from "axios";
import { User } from '../USER/user'

function SignUp() {

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailV, setEmailV] = useState('');
    const [password, setPassword] = useState('');
    const [passwordV, setPasswordV] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const response = await axios.post('', {

          });
          console.log(response.data); 
          setError('fino');
        } catch (error) {
          setError('Invalid username or password');
        }
      };

    return (
        <div className='container'>
           <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" />
                <button type="submit">Sign In</button>
            </form>
            {error && <p>{error}</p>}
        </div> 
    );
}

export default SignUp;