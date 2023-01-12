import React, { useState } from 'react'
import { Container } from '@mui/system';
import { TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"


export const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const registerData = async (e) => {
    try {
      let res = await fetch("https://backweb.onrender.com/register", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })

      let data = await res.json()
      console.log(data)
      if (res.status == 200) {
        alert("Account created successfully please check mail for login")
        // navigate("/login", { replace: true })
      }
      else {
        alert("Please Enter Correct Details")
      }

    } catch (error) {
      console.log(error)
    }
  }

  const regData = (e) => {
    e.preventDefault()
  }

  return (
    <div style={{ backgroundColor: "rgb(200,246,255)", height: "100vh", position: "absolute", width: "100%" }}>
      <h2>Sign Up</h2>
      <Container maxWidth="sm" sx={{ bgcolor: 'info.main', height: '550px', mt: "50px" }} >
        <form onSubmit={regData}>
          <TextField id="outlined-basic" type="text" label="name" variant="outlined" required sx={{ mt: '10px' }} onChange={(e) => setName(e.target.value)} /> <br />
          <TextField id="outlined-basic" value={email} type="email" label="email" variant="outlined" required sx={{ mt: '10px' }} onChange={(e) => setEmail(e.target.value)} /><br />
          <TextField id="outlined-basic" type="password" label="password" variant="outlined" required sx={{ mt: '10px' }} onChange={(e) => setPassword(e.target.value)} /><br />
          <Button sx={{ mt: '30px' }} variant="contained" onClick={registerData}>Register</Button><br /><br />
          <Typography><Link to="/login">Existing user? Login Now</Link></Typography>
        </form>
        <p>{message}</p>

      </Container>
    </div>
  )
}
