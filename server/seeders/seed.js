const db = require("../config/connection");
const { User, Post, Profile } = require("../models");
const userSeeds = require("./userSeeds.json");
const postSeeds = require("./postSeeds.json");
const profileSeeds = require("./profileSeeds.json");

// this set of code can be used in conjunction with a seed.json to seed a database

db.once("open", async () => {
  try {
    // Clean database
    await User.deleteMany({});
    await Post.deleteMany({});
    await Profile.deleteMany({});

    // Bulk create users
    await User.create(userSeeds);

    // Assign posts to users using postAuthor and username as the connecting value
    for (let i = 0; i < postSeeds.length; i++) {
      const { _id, postAuthor } = await Post.create(postSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: postAuthor },
        {
          $addToSet: {
            posts: _id,
          },
        }
      );
    }

    for (let i = 0; i < profileSeeds.length; i++) {
      const { _id, user } = await Profile.create(profileSeeds[i]);
      const createdUser = await User.findOneAndUpdate(
        { username: user },
        {
          $addToSet: {
            profile: { _id },
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("All seeded!!");
  process.exit(0);
});
