const db = require('../config/connection');
const { User, Post } = require('../models');
const userSeeds = require('./userSeeds.json'); 
const postSeeds = require('./postSeeds.json'); 

// this set of code can be used in conjuction with a seed.json to seed a database

db.once('open', async () => {
  try {
    // Clean database
    await User.deleteMany({});
    await Post.deleteMany({});

    // Bulk create users
    await User.insertMany(userSeeds); 

    // Assign posts to users using postAuthor and username as the connecting value
    for (let i = 0; i < postSeeds.length; i++) {
      const { _id, postAuthor } = await Post.create(postSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: postAuthor },
        {
          $addToSet: {
            posts: _id,
          },
        },
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('All seeded!!');
  process.exit(0);
});
