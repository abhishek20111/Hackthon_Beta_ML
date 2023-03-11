import React, { useEffect, useState } from 'react'

export default function History() {

  const [History, setHistory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/gethistory', {
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>{console.log(History)}
      <h1 className='text-white text-4xl'>History</h1>
      <ul>
        {History.map((item, index) => {
          const [request1, response] = item.split("----------");
          return (
            <div>
              
            <li className='m-2 text-white text-2xl' key={index}>
              {`${request1} `}
            </li>
            <li className='m-2 text-white text-2xl' key={index}>{`${response}`}</li>
            </div>
          );
        })}
      </ul>
    </div>
  )
}
