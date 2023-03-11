import React, { useState } from 'react'

export default function Home() {
  const [spamData, setSpamData] = useState("");
  const [responseData, setresponseData] = useState([])

  const makeAction = (e) => {
    //put you model and api here
    e.preventDefault();
    const historyItem = '94590345904958----------False';
    saveHistory(historyItem);
  }

  const saveHistory = (historyItem) => {
    fetch("http://localhost:8080/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        history: historyItem,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>{console.log(responseData)}
      <input type="text" name='spamData' placeholder='Enter no or any queery' value={spamData} onChange={(e) => { setSpamData(e.target.value) }} />
      {/* <button onClick={(e)=>{makeAction(e)}} className=" m-3 p-3 bg-white">Serach</button> */}
      <button onClick={(e) => { makeAction(e) }} className=" m-3 p-3 bg-white">Serach</button>
    </>
  )
}
