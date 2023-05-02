const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DB = require("../models");
const mongoose = require("mongoose");
const { ACCOUNT_TYPE, FOLLOWER_STATUS, FOLLOW_TYPE: { MUTUAL_FOLLOWER, FOLLOWER, FOLLOWER_REQUEST, FOLLOWING, FOLLOWING_REQUEST } } = require("../json/enums.json");

module.exports = self = {
    hashPassword: async ({ password }) => {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    },

    generateToken: ({ data }) => {
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        return token;
    },
    decodeToken: ({ token }) => {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    },
    comparePassword: async ({ password, hash }) => {
        const isPasswordMatch = await bcrypt.compare(password, hash);
        return isPasswordMatch;
    },
    checkIfItemExists: async (data = {}, modelName) => {
        const item = await mongoose.model(modelName).findOne({ ...data, isDeleted: false, }).lean();
        console.log(item);
        if (!item) return false;
        return true;
    },
    // check if user is follow or not by checkUserId
    checkRelationStatus: async (userId, checkUserId) => {
        let folllower = await DB.follower.findOne({ user_id: userId, follower_id: checkUserId, isDeleted: false, });
        let following = await DB.follower.findOne({ user_id: checkUserId, follower_id: userId, isDeleted: false, });
        console.log(folllower, following, "folllower, following");
        console.log(userId, checkUserId, "userId, checkUserId");
        let followRelation = { visitorStatus: folllower ? folllower.status : null, selfStatus: following ? following.status : null };
        // let isFollow = await DB.follower.findOne({ user_id: userId, follower_id: checkUserId, isDeleted: false, });
        // console.log(isFollow, "isFollow", userId, checkUserId);
        // if (!isFollow) return { isFollow: false, isRequestFromUser: false, status: null };
        // if (isFollow.status == "accepted") followRelation = { isFollow: true, isRequestFromUser: false, status: isFollow.status };
        // else if (isFollow.status == "requested") followRelation = { isFollow: false, isRequestFromUser: true, status: isFollow.status };
        // else followRelation = { isFollow: false, isRequestFromUser: false, status: null };

        return followRelation;
    },
    generateRandomPassword: (length = 8) => {
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    },
    /* random user for suggestion */
    randomUser: async (userId, length = 5, suggestedFollowers = []) => {

        let users = await DB.user.find({}).select('name user_name profile account_type').lean()
        /* random users */
        let randomUsers = users.filter(user => user._id.toString() !== userId)
        for (let i = 0; i < length; i++) {
            let randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)]
            let checkFollower = await DB.follower.findOne({ user_id: userId, follower_id: randomUser._id })
            let checkFollowing = await DB.follower.findOne({ user_id: randomUser._id, follower_id: userId })
            if (checkFollower || checkFollowing) {
                randomUsers.splice(i, 1)
            }
            // if()
            // await self.checkUserFollowersAndFollowings(userId, randomUser)
            suggestedFollowers.push(randomUser)
        }
        return suggestedFollowers
    },

    // /* user follower and followings */
    // checkUserFollowersAndFollowings: async (userId, user) => {
    //     let followers = await DB.follower.find({ follower_id: userId }).select('user_id').lean()
    //     let followings = await DB.follower.find({ user_id: userId }).select('user_id').lean()
    //     let data = [...new Map([...followers, ...followings].map(item => [item["_id"], item])).values()]
    //     console.log(data, user);
    //     return data

    // }
};
