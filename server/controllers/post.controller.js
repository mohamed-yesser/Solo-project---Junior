const { Post, User, Comment, Media } = require('../models');

module.exports = {


    createPost: async (req, res) => {
        try {

            // id=req.user.id

            const post = await Post.create(req.body);
            const addPostMedia=await Media.create({PostId:post.id,link:req.body.image,type:"image"})
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
        const posts = await Post.findAll({
            where: { UserId: req.params.id },
            include: [
                {
                    model: User, 
                    attributes: ['id', 'name'] 
                },
                {
                    model: Comment, 
                    include: [
                        {
                            model: User, 
                            attributes: ['id', 'name'] 
                        }
                    ],
                    attributes: ['id', 'content', 'createdAt']
                }
            ]
        });

        res.status(200).send(posts);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
},





getOthersPost: async (req, res) => {
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

        const posts = await Post.findAll({
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
    const id = req.params.id

  try {
      const post =  await post.update(req.body ,{
        where: { id: id }
    });
          res.status(200).send(post); 
     
  } catch (err) {
      console.log(err);
      res.status(500).send(err);
  }
},


deletePost: async (req, res) => {

const id = req.params.id

  try {

    const post = await Post.destroy({
        where: { id: id }
    });
          res.status(204).send();
   
  } catch (err) {
      console.log(err);
      res.status(500).send(err);
  }
}




};
