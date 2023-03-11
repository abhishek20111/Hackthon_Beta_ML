import React, {useEffect, useState } from 'react'

export default function CommentCard() {
  const [value, setValue] = useState([]);
  const [data, setData] = useState([]);

// this section for fetch all data
  useEffect(() => {

    //Fetch all posts
    fetch("http://localhost:8080/allposts", {
      method:"get",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    }).then(res => res.json())
      .then(res => setValue(res))
      .catch(err => console.log(err))
  }, [])

 
  return (
    <>
      <div>
        {value.map((post)=>{
          const { title, comments } = post;
          return(
            <div>
              {console.log(post)}
              <li className='text-white text-3xl'>title - {title}</li>
              <br />
              {comments.map((innerview)=>{
                return (
                  <>
                  <li  className='text-white text-2xl'>comment - {innerview.comment}</li>
                  <li  className='text-white text-2xl'>Posted by - {innerview.postedBy.name}</li>
                  </>
                )
              })}

              
              <br />
              <br />
            </div>
              
          )
        })}
      </div>
    </>
  )
}
