const { Post, User, Comment, Media } = require('../models');

module.exports = {


    createPost: async (req, res) => {
        try {
            id=req.user.id
            const post = await Post.create(req.body);
            res.status(201).send(post);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
// user hs many post
// post has one user 

//     getPost: async (req, res) => {
//         try {
//             const post = await Post.findByPk(req.params.id, {
//                 include: [
//                   { model : Comment,
//                     include:{
//                     model:User
//                     }},
//                     { 
//                     model: User
//                     }
//                 ]
//             });

//             res.status(200).send(post);
// } catch (err) {
//             console.log(err);
//             res.status(500).send(err);
//     }
// },



    getPost: async (req, res) => {
        try {
            const post = await Post.findByPk(req.params.id, {
                include: [
                  { model : Comment,
                    include:{
                    model:User
                    }},
                    { 
                    model: User
                    }
                ]
            });

            res.status(200).send(post)

} catch (err) {
            console.log(err)
            res.status(500).send(err)
    }
},



getAllPosts: async (req, res) => {

    try {

        const posts = await Post.findAll();
        res.status(200).send(posts);

} catch (err) {
        console.log(err);
        res.status(500).send(err);
}
},


getPostsByUser: async (req, res) => {
  try {

      const posts = await Post.findAll({
          where: { UserId: req.params.userId },
          include: [User, Comment, Media] 
      });
  
          res.status(200).send(posts);
      } catch (err) {


      console.log(err);
      res.status(500).send(err);
  }
},


updatePost: async (req, res) => {

  try {
      const post =  await post.update(req.body);
          res.status(200).send(post); 
     
  } catch (err) {
      console.log(err);
      res.status(500).send(err);
  }
},


deletePost: async (req, res) => {

  try {

      const post = await post.destroy();
          res.status(204).send();
   
  } catch (err) {
      console.log(err);
      res.status(500).send(err);
  }
}




};
