const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const POST = require("../models/posts.js")
const USER = require('../models/model.js')


router.get("/allposts", requireLogin, (req, res) => {
    POST.find()
        .populate("postedBy", "_id name title")
        .populate("comments.postedBy", "_id name comment")
        .sort("-createdAt")
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
})

router.get("/myPosts", requireLogin, (req, res) => {
    POST.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")
        .then(myposts => {
            res.json(myposts)
        })
})

//for updating like option or count the like
router.put("/like", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy", "_id name Photo")
        .exec((err, result) => {  //we prefer to use exec as compare to any other callback function in findbyid  
            if (err) return res.status(422).json({ error: err })
            else res.json(result)
        })
})
router.put("/unlike", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy", "_id name Photo")
        .exec((err, result) => {  //we prefer to use exec as compare to any other callback function in findbyid  
            if (err) return res.status(422).json({ error: err })
            else res.json(result)
        })
})

router.post("/comment", requireLogin, (req, res) => {

    const { title, comment_ } = req.body;
    if (!title || !comment_) {
        return res.status(422).json({ error: 'Please provide a title and description' });
    }

    const comment = {
        comment: comment_, // we have req.body from frontent
        postedBy: req.user._id, // we have req.user from middle ware
    }
    const post = new POST({
        title: title,
        comments: comment,
        postedBy: req.user._id,
    });
    /*const comment = {
        comment: req.body.text, // we have req.body from frontent
        postedBy: req.user._id, // we have req.user from middle ware
    }*/
    post.save()
        .then(result => {
            res.json({ post: result });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        });
}); 

router.post('/history', requireLogin, async (req, res) => {
    const { history } = req.body; // extract the 'history' field from the request body
    const { _id } = req.user; // extract the authenticated user's ID

    try {
        console.log("data here createRoute.js")
        const user = await USER.findById(_id); // find the authenticated user
        console.log("data---"+user)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // update the user's 'history' field
        user.history.push(history);
        await user.save(); // save the updated user to the database
        return res.status(200).json("History save succesfully");
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.get('/gethistory', requireLogin, async (req, res) => {
    const email = req.user.email;
    try {
        const user = await USER.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user.history);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});





router.delete("/deletePost/:postId", requireLogin, (req, res) => {
    POST.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }

            if (post.postedBy._id.toString() == req.user._id.toString()) {

                post.remove()
                    .then(result => {
                        return res.json({ message: "Successfully deleted" })
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        })
})

router.post('/createPost', requireLogin, (req, res) => {
    const { body, pic } = req.body;
    console.log(pic);
    if (!body || !pic) {
        return res.status(422).send({ error: "Please Fill all require field" })
    }
    req.user
    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user
    })
    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => console.log(err))
})

router.get("/myfollowingpost", requireLogin, (req, res) => {
    POST.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", +"_id name")
        .populate("comments.postedBy", +"_id name")
        .then(post => res.json(post))
        .catch(err => { console.log(err) })
})

module.exports = router;