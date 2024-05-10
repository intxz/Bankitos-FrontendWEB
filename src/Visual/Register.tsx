import React, { useState } from 'react';
import axios from "axios";
import { User } from '../USER/user'
import './Register.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const apiUrl = 'http://localhost:3000';
// const apiUrl='//147.83.7.158:3000';

interface FormErrors {
  [key: string]: string;
}

function SignUp() {

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailV, setEmailV] = useState('');
  const [password, setPassword] = useState('');
  const [passwordV, setPasswordV] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (fieldName: string, value: string) => {
    let errorMessage = '';

    switch (fieldName) {
      case 'first_name':
        errorMessage = value.trim() === '' ? 'First name is required' : '';
        break;
      case 'last_name':
        errorMessage = value.trim() === '' ? 'Last name is required' : '';
        break;
      case 'email':
        errorMessage = value.trim() === '' ? 'Email is required' : !isValidEmail(value) ? 'Invalid email format' : '';
        break;
      case 'emailV':
        errorMessage = value !== email ? 'Emails do not match' : '';
        break;
      case 'password':
        errorMessage = value.trim() === '' ? 'Password is required' : value.length < 6 ? 'Password must be at least 6 characters' : '';
        break;
      case 'passwordV':
        errorMessage = value !== password ? 'Passwords do not match' : '';
        break;
      case 'phone_number':
        errorMessage = value.trim() === '' ? 'Phone number is required' : '';
        break;
      case 'gender':
        errorMessage = value.trim() === '' ? 'Select an option' : '';
        break;
      case 'date':
        errorMessage = value.trim() === '' ? 'Select your birth date' : '';
        break;
      default:
        break;
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: errorMessage
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateField('first_name', first_name);
    validateField('last_name', last_name);
    validateField('email', email);
    validateField('emailV', emailV);
    validateField('password', password);
    validateField('passwordV', passwordV);
    validateField('phone_number', phone_number);
    validateField('gender', gender);
    validateField('date',date);

    const isFormValid = Object.values(errors).every(error => error === '');

    if (isFormValid) {
      const user: User = {
        first_name,
        last_name,
        email,
        password,
        phone_number,
        gender,
        date
      };
      axios.post("http://localhost:3000/users", user)
        .then(result => {
            console.log(result);
            setFirstName('');
            setLastName('');
            setPassword('');
            setEmail('');
            setPhoneNumber('');
            setGender('');
            console.log('fino');
        })
        .catch(err => console.log(err));
    }
  };

  const onlyNum = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode === 13 || charCode === 8 || charCode === 9 || charCode === 46 || (charCode >= 37 && charCode <= 40)) {
      return;
    }

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className='container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className='next'>
          <input type="text" id="first-name" placeholder="First Name" value={first_name} onChange={(e) => { setFirstName(e.target.value); validateField('first_name', e.target.value) }} />
          {errors['first_name'] && <span className="error">{errors['first_name']}</span>}
          <input type="text" id="last-name" placeholder="Last Name" value={last_name} onChange={(e) => { setLastName(e.target.value); validateField('last_name', e.target.value) }} />
          {errors['last_name'] && <span className="error">{errors['last_name']}</span>}
        </div>
        <div className='next'>
          <input type="text" id="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); validateField('email', e.target.value) }} />
          {errors['email'] && <span className="error">{errors['email']}</span>}
          <input type="text" id="emailV" placeholder="Verify Email" value={emailV} onChange={(e) => { setEmailV(e.target.value); validateField('emailV', e.target.value) }} />
          {errors['emailV'] && <span className="error">{errors['emailV']}</span>}
        </div>
        <div className='next'>
          <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); validateField('password', e.target.value) }} />
          {errors['password'] && <span className="error">{errors['password']}</span>}
          <input type="password" id="passwordV" placeholder="Verify Password" value={passwordV} onChange={(e) => { setPasswordV(e.target.value); validateField('passwordV', e.target.value) }} />
          {errors['passwordV'] && <span className="error">{errors['passwordV']}</span>}
        </div>
        <input type="text" id="phone-number" placeholder="Phone Number" value={phone_number} onChange={(e) => { setPhoneNumber(e.target.value); }} onKeyPress={onlyNum} />
        <select value={gender} onChange={handleGenderChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="bankito">Bankito</option>
          <option value="other">Other</option>
        </select>
        <input type="date" id="date" placeholder="Date (YYYY-MM-DD)" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
