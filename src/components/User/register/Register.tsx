import React, { useState } from "react";
import axios from "axios";
import { User } from "../../models/user";
import "./Register.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000";
// const apiUrl='//147.83.7.158:3000';
//const apiUrl='//api.bankitos.duckdns.org';

interface FormErrors {
  [key: string]: string;
}

function SignUp() {
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailV, setEmailV] = useState("");
  const [password, setPassword] = useState("");
  const [passwordV, setPasswordV] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birth_date, setDate] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const [validFields, setValidFields] = useState({
    first_name: true,
    last_name: true,
    email: true,
    emailV: true,
    password: true,
    passwordV: true,
    phone_number: true,
    gender: true,
    birth_date: true,
  });

  const validateField = (fieldName: string, value: string) => {
    let errorMessage = "";
    let isValid = true;

    switch (fieldName) {
      case "first_name":
        isValid = value.trim() !== "";
        break;
      case "last_name":
        isValid = value.trim() !== "";
        break;
      case "email":
        isValid = value.trim() !== "";
        if (isValid) {
          errorMessage = isValidEmail(value) ? "" : "Invalid email";
        }
        break;
      case "emailV":
        isValid = value.trim() !== "";
        errorMessage = value !== email ? "Emails do not match" : "";
        break;
      case "password":
        isValid = value.trim() !== "";
        break;
      case "passwordV":
        isValid = value.trim() !== "";
        errorMessage = value !== password ? "Passwords do not match" : "";
        break;
      case "phone_number":
        isValid = value.trim() !== "";
        break;
      case "gender":
        errorMessage = value.trim() === "" ? "Select an option" : "";
        break;
      case "date":
        isValid = value.trim() !== "";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));

    setValidFields((prevValidFields) => ({
      ...prevValidFields,
      [fieldName]: isValid,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      validateField("first_name", first_name);
      validateField("last_name", last_name);
      validateField("email", email);
      validateField("emailV", emailV);
      validateField("password", password);
      validateField("passwordV", passwordV);
      validateField("phone_number", phone_number);
      validateField("gender", gender);
      validateField("date", birth_date);

      const isFormValid = Object.values(errors).every((error) => error === "");
      const passwordStrength = validatePassword(password);
      const isPasswordStrong = passwordStrength === 4;

      if (isFormValid && isPasswordStrong) {
        const user: User = {
          first_name,
          last_name,
          email,
          password,
          phone_number,
          gender,
          birth_date,
        };
        const response = await axios.post(apiUrl + "/users", user);
        console.log(response.data);
        setError("fino");
        setFirstName("");
        setLastName("");
        setPassword("");
        setEmail("");
        setPhoneNumber("");
        setGender("");
        navigate("/xd");
        console.log("fino");
      } else {
        setError("Please fill in all required fields correctly");
      }
    } catch (error) {
      setError("Failed to submit the form");
    }
  };

  const onlyNum = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      charCode === 13 ||
      charCode === 8 ||
      charCode === 9 ||
      charCode === 46 ||
      (charCode >= 37 && charCode <= 40)
    ) {
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
    const validEmailDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "estudiantat.upc.edu",
      "upc.edu",
    ];

    const domain = email.split("@")[1];
    return validEmailDomains.includes(domain);
  };

  function validatePassword(password: string): number {
    let validations = 0;

    if (password.length >= 8) {
      validations++;
    }

    const numDigits = password.replace(/[^0-9]/g, "").length;
    if (numDigits >= 2) {
      validations++;
    }

    const numUppercase = password.replace(/[^A-Z]/g, "").length;
    if (numUppercase >= 2) {
      validations++;
    }

    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      validations++;
    }

    return validations;
  }

  const passwordBorderColor = (() => {
    const validations = validatePassword(password);
    let color = "";
    if (validations === 4) {
      color = "green";
    } else if (validations >= 2) {
      color = "orange";
    } else if (validations >= 1) {
      color = "red";
    }
    return color;
  })();

  const passwordValidations = validatePassword(password);

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="next">
          <input
            type="text"
            id="first-name"
            placeholder={
              validFields["first_name"] ? "First Name" : "You forgot me :'("
            }
            value={first_name}
            onChange={(e) => {
              setFirstName(e.target.value);
              validateField("first_name", e.target.value);
            }}
            className={
              !validFields["first_name"]
                ? "red-placeholder shake-animation"
                : ""
            }
            style={{
              border: validFields["first_name"]
                ? "1px solid black"
                : "2px solid red",
              background: validFields["first_name"]
                ? "transparent"
                : "rgba(255,0,0,0.1)",
            }}
          />
          <input
            type="text"
            id="last-name"
            placeholder={
              validFields["last_name"] ? "Last Name" : "You forgot me :'("
            }
            value={last_name}
            onChange={(e) => {
              setLastName(e.target.value);
              validateField("last_name", e.target.value);
            }}
            className={
              !validFields["last_name"] ? "red-placeholder shake-animation" : ""
            }
            style={{
              border: validFields["last_name"]
                ? "1px solid black"
                : "2px solid red",
              background: validFields["last_name"]
                ? "transparent"
                : "rgba(255,0,0,0.1)",
            }}
          />
        </div>
        <div className="next">
          <input
            type="text"
            id="email"
            placeholder={validFields["email"] ? "Email" : "You forgot me :'("}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField("email", e.target.value);
            }}
            className={
              !validFields["email"] ? "red-placeholder shake-animation" : ""
            }
            style={{
              border: validFields["email"]
                ? "1px solid black"
                : "2px solid red",
              background: validFields["email"]
                ? "transparent"
                : "rgba(255,0,0,0.1)",
            }}
          />
          <input
            type="text"
            id="emailV"
            placeholder={
              validFields["emailV"] ? "Verify Email" : "You forgot me :'("
            }
            value={emailV}
            onChange={(e) => {
              setEmailV(e.target.value);
              validateField("emailV", e.target.value);
            }}
            className={
              !validFields["emailV"] ? "red-placeholder shake-animation" : ""
            }
            style={{
              border: validFields["emailV"]
                ? "1px solid black"
                : "2px solid red",
              background: validFields["emailV"]
                ? "transparent"
                : "rgba(255,0,0,0.1)",
            }}
          />
        </div>
        <div className="next">
          <input
            type="text"
            id="password"
            placeholder={
              validFields["password"] ? "Password" : "You forgot me :'("
            }
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateField("password", e.target.value);
            }}
            className={
              !validFields["password"] ? "red-placeholder shake-animation" : ""
            }
            style={{
              border: validFields["password"]
                ? passwordBorderColor
                  ? "2px solid " + passwordBorderColor
                  : "2px solid black"
                : "2px solid red",
              background: validFields["password"]
                ? "transparent"
                : "rgba(255,0,0,0.1)",
            }}
          />
          <input
            type="text"
            id="passwordV"
            placeholder={
              validFields["passwordV"] ? "Password" : "You forgot me :'("
            }
            value={passwordV}
            onChange={(e) => {
              setPasswordV(e.target.value);
              validateField("passwordV", e.target.value);
            }}
            className={
              !validFields["passwordV"] ? "red-placeholder shake-animation" : ""
            }
            style={{
              border: validFields["passwordV"]
                ? "1px solid black"
                : "2px solid red",
              background: validFields["passwordV"]
                ? "transparent"
                : "rgba(255,0,0,0.1)",
            }}
          />
        </div>
        <input
          type="text"
          id="phone-number"
          placeholder={
            validFields["phone_number"] ? "Phone number" : "You forgot me :'("
          }
          value={phone_number}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            validateField("phone_number", e.target.value);
          }}
          className={
            !validFields["phone_number"]
              ? "red-placeholder shake-animation"
              : ""
          }
          style={{
            border: validFields["phone_number"]
              ? "1px solid black"
              : "2px solid red",
            background: validFields["phone_number"]
              ? "transparent"
              : "rgba(255,0,0,0.1)",
          }}
          onKeyPress={onlyNum}
        />
        <select value={gender} onChange={handleGenderChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="bankito">Bankito</option>
          <option value="other">Other</option>
        </select>
        <input
          type="date"
          id="date"
          placeholder={
            !validFields["birth_date"] ? "red-placeholder shake-animation" : ""
          }
          value={birth_date}
          onChange={(e) => {
            setDate(e.target.value);
            validateField("date", e.target.value);
          }}
          className={
            !validFields["birth_date"] ? "red-placeholder shake-animation" : ""
          }
          style={{
            border: validFields["birth_date"]
              ? "1px solid black"
              : "2px solid red",
            background: validFields["birth_date"]
              ? "transparent"
              : "rgba(255,0,0,0.1)",
          }}
        />
        <button type="submit">Sign Up</button>
      </form>
      {errors["email"] && <span className="error">{errors["email"]}</span>}
      {errors["passwordV"] && (
        <span className="error">{errors["passwordV"]}</span>
      )}
      {errors["emailV"] && <span className="error">{errors["emailV"]}</span>}
    </div>
  );
}

export default SignUp;
