const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User_Schema2')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config()



router.post('/signup', async (req, res) => {
  const { name, userName, email, password } = req.body;
  if (!name || !userName || !email || !password) {
    return res.status(400).send({ error: "Please Fill all data" })
  }

  const data = await User.findOne({ $or: [{ email: email }, { userName: userName }] });
  if (data) {
    return res.status(422).json({ error: "user already exist" })
  }
  const pass = await bcrypt.hash(password, 12);

  const user = User({
    name,
    userName,
    email,
    password: pass
  })
  try {
    await user.save();
    res.status(201).json({ message: "save data" });
  } catch (error) {

    res.status(409).json({ message: error.message });
  }
})

// router.post('/signin', async (req, res) => {
//     console.log("it get signal in route.js");
//     const { email, name } = req.body;
//     if (!email || !name) {
//         return res.status(422).json({ error: "Login Again" })
//     }
//     const data = await User.findOne({ email: email });
//     if (data) {
//         console.log("data ----"+data)
//         User.findOne({ email: email }).then((saveUser) => {
//             if (!saveUser) {
//                 return res.status(422).json({ error: "Invalid User" })
//             }
//                 try {
//                     // return res.status(200).json({message: "Signed In Successfully"})
//                     const token = jwt.sign({ _id: saveUser.id }, process.env.jwt_secret_key);
//                     const { _id, name, email } = saveUser

//                     res.json({ token, user: { _id, name, email } });
//                     console.log({ token, user: { _id, name, email } });
//                 } catch(e){
//                     return res.status(422).json({ error: `Invalid Credentials ${e}` })
//                 }

//         }).catch(err => console.log("error2 " + err))
//     } 
//     else {
//         const user = User({
//             email,
//             name
//         })
//         try { 
//             await user.save();
//             res.status(201).json({ message: "save data" });
//         } catch (error) {
//             res.status(409).json({ message: error.message });
//         }
//     }

// })
router.post('/signin', async (req, res) => {
  console.log("it get signal in route.js");
  const { email, name } = req.body;
  const userEmail = email;
  const username = name;
  if (!email || !name) {
    return res.status(422).json({ error: "Login Again" })
  }
  try {
    const data = await User.findOne({ email: email });
    console.log("new data------------"+data);
    if (data=== null ) {
      const user = User({email:userEmail,name: username});
      const saveData = await user.save();
      console.log("data save")
      const token = jwt.sign({ _id: saveData.id }, process.env.jwt_secret_key);
      const { _id, name, email } = saveData;
      console.log({ token, user: { _id, name, email } });
      return res.json({token, user:{_id, name, email}});
       
    }
    else  
    {
      const token = jwt.sign({ _id: data.id }, process.env.jwt_secret_key);
      const { _id, name, email } = data;
      console.log({ token, user: { _id, name, email } });
      return res.json({token, user:{_id, name, email}});
    } 
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'server error' });
  }
})


module.exports = router;