const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const User = require("../models/user");


// ADMIN ROUTE
router.get(
    "/all-users",
    auth,
    role("admin"),

    async (req, res) => {

        const users = await User.find();

        res.json(users);
    }
);


// STUDENT PROFILE
router.get(
    "/profile",
    auth,

    async (req, res) => {

        const user = await User.findById(req.user.id);

        res.json(user);
    }
);


// UPDATE OWN PROFILE
router.put(
    "/profile",
    auth,

    async (req, res) => {

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            req.body,
            { new: true }
        );

        res.json(updatedUser);
    }
);


// DELETE USER - ADMIN ONLY
router.delete(
    "/:id",
    auth,
    role("admin"),

    async (req, res) => {

        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: "User Deleted"
        });
    }
);

module.exports = router;