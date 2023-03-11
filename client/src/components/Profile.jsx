import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  // Toast functions
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)


  //Initilize all useState as input
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  //console.log(title+"      "+description)// checking porpuse


  const postData = () => {
    // e.preventDefault();//prevent default behaviour

    // Sending data to server
    fetch("http://localhost:8080/comment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        title: title,
        comment_: description 
      })
    }).then(res => res.json())
      .then(data => {
        console.log("coming here frontent");
        if (data.error) {
          console.log("error in profile"+data.error);
          notifyA(data.error)
        } else {
          console.log("come su-------"+JSON.stringify(data));
          notifyB("Successfully Posted")
          navigate('/')
        }
      }).catch(err => console.log(err))
  }

  //send the data of user in backend
  // console.log(user.name);
  // useEffect(()=>{
  //   // Sending data to server
  //   console.log(user.name);
  //   fetch("http://localhost:8080/signin", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       email: user.email,
  //       name: user.name
  //     })
  //   }).then(res => res.json())

  //     .then(data => {
  //         console.log("coming here frontent in profile.jsx");
  //       if (data.error) {
  //         notifyA(data.error)
  //       } else {
  //         notifyB("Signin Succesfully" )
  //         console.log("token " + data.token);
  //   localStorage.setItem("jwt", data.token)
  //   localStorage.setItem("user",JSON.stringify(data.user))
  // }
  //       console.log(data)
  //     })
  // },[])

  useEffect(()=>{
    console.log("user- name "+user.name)
    const sname = user.name
    const semail = user.email
    axios.post('http://localhost:8080/signin', {
      email: semail,
      name: sname
    })
    .then((response) => {
      // console.log(response.data)
      // console.log(response.data.token)
      localStorage.setItem("jwt", response.data.token)
      localStorage.setItem("user",JSON.stringify(response.data.user))
      notifyB("Your profile" )
    }, (error) => {
      console.log(error)
      notifyA(error)
    });
  },[])

  if (isLoading) {
    return <div  className="text-4xl text-white" >Loading ...</div>;
  }



  return (
    isAuthenticated ?
      <div>
        <img src={user.picture} className="text-white" alt={user.name} />
        <h2 className="text-4xl text-white">{user.name}</h2>
        <p className="text-3xl m-3 text-white">{user.email}</p>

        <h1 className="text-white">Enter your post</h1>
        <div className="flex flex-col gap-x-2" >
          <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="m-3" placeholder="Enter title" />
          <textarea name={description} onChange={(e) => setDescription(e.target.value)} id="" cols="30" className="m-2" rows="10" placeholder="Enter Details"></textarea>
          <button onClick={() => postData()} className="w-[6%] bg-white">Share</button>
        </div>
      </div>
      : <>
        <p className="text-white text-4xl">Login First</p>
      </>
  );
};
 
export default Profile;