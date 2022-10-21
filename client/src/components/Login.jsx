import React, { useEffect, useState } from 'react'
import { Container } from '@mui/system';
import { TextField, Button } from '@mui/material';
import { useNavigate } from "react-router-dom"
import { ShowTasks } from './homepage';

const loginData = async (e,email,password) => {

  try {
    // console.log(email,password)
    let res = await fetch(`http://localhost:5000/login`, {
     
      // Adding method type
      method: "POST",
       
      // Adding body or contents to send
      body: JSON.stringify({
          email,
          password
      }),
      // Adding headers to the request
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })
    
    let data = await res.json()
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", JSON.stringify(data.token));
    // console.log("data line 29",data)
    console.log(data)
    // ShowTasks(data)
    if (res.status === 200) {
      // window. location. reload() 
      window.location.href='/homepage';
      console.log("object");
    }

  } catch (error) {
    console.log(error)
  }
}

const regData = (e) => {
  e.preventDefault()
}

export const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  // const [user, setUser] = useState();
  const navigate = useNavigate()

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser.user);
  //   }
  // }, []);


  return (
    <div style={{ backgroundColor: "rgb(200,246,255)", height: "100vh", position: "absolute", width: "100%" }}>
      <Container sx={{ bgcolor: 'info.main', border: '1px solid', height: '550px', mt: "20px" }}>
        <h2>Sign In</h2>
        <form onSubmit={regData}>

          <TextField id="outlined-basic" value={email} type="email" label="email" variant="outlined" required sx={{ mt: '10px' }} onChange={(e) => setEmail(e.currentTarget.value)} /><br />
          <TextField id="outlined-basic" value={password} type="password" label="password" variant="outlined" required sx={{ mt: '10px' }} onChange={(e) => setPassword(e.currentTarget.value)} /><br />
          <Button sx={{ mt: '30px' }} variant="contained" onClick={(e)=>loginData(e,email,password)}>Log In</Button>
        </form>
        <p>{message}</p>

      </Container>
    </div>
  )
}
