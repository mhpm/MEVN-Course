const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
})

//Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})


//Delete Posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(201).send();
})



async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://michelle:abc123@ds227373.mlab.com:27373/vue_express',{
        useNewUrlParser: true
    })

    return client.db('vue_express').collection('posts')
}

module.exports = router;