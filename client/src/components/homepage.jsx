import React, { useEffect, useState } from 'react'
import {logindata} from "./Login"
import "./ShowTask.css"
import { useNavigate } from "react-router-dom"
export const Homepage = () => {

    const [user, setUser] = useState({})
    
    const fetchData = async () => {
    try {
    
    let data = await fetch(`http://localhost:5000/user`,{
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': ` ${localStorage.getItem("token")}`
    },
         body: JSON.stringify(data)
    })
    let res= data.JSON()
    console.log(res)
          // .then((response) => response.json())
          // .then((data) => 
          // console.log(data)
          // );
  }

 catch (error) {
  console.log("error",error)
}
}

    useEffect(() => {
    console.log()
      fetchData();
     
    },[])
    
const navigate = useNavigate()
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        console.log('loggedInUser',loggedInUser);
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
      }, []);
//
      const handlelogout =  async ()=>{
        setUser(null)
        localStorage.clear()
        navigate("/login", { replace: true })
        
      }
    
    console.log(user,"asdfghytr")
console.log("shubham")
    return (
        <div>
       {user.email}
       <h1>{user.name}</h1>
       <button onClick={()=>{handlelogout()}}> logout </button>
        </div>
    )
}



