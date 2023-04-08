const User = require("../model/User");

exports.register = async (req, res, next) => {
    const {username, password} = req.body;

    if (password.length < 0) {
        return res.status(400).json({
            message: "Password less than 6 characters"
        })
    }

    try {
        await User.create({
            username,
            password,
        }).then(user => res.status(200).json({
            message: "User successfully created",
            user,
        }))
    } catch (err) {
        res.status(401).json({
            message: "User not successful created",
            error: error.message,
        })
    }
}

exports.login = async (req, res, next) => {
    const {username, password} = req.body;

    //check if username and password is provided
    if (!username || !password) {
        return res.status(400).json({
            message: "Username or Password not present"
        })
    }

    try {
        const user = await User.findOne({username, password});
        if (!user) {
            res.status(401).json({
                message: "Login not successful",
                error: "User not found"
            })
        } else {
            res.status(200).json({
                message: "Login successful",
                user,
            })
        }

    } catch (e) {
        res.status(400).json({
            message: "An error occurred",
            e: error.message,
        })
    }
}

exports.update = async (req,res,next) => {
    const {role, id} = req.body;

    //First - Verifying if role and id is present
    if(role && id) {

        if(role === "admin") {
            try {
                res.status(400).json({ message: "Role is Admin" })
            }catch (error) {
                res.status(400).json({message: "An error occurred", error: error.message   })
            }

        } else {
            res.status(400).json({
                message: "Role is not admin"
            })
        }

        if(user.role !== "admin") {
            user.role = role;
            user.save((err) => {
                //MongoDB error checker
                if(err) {
                    res
                        .status("400")
                        .json({ message: "An error occurred", error: err.message})
                    process.exit(1);
                }
                res.status("201").json({ message: "Update successfull", user});
            });
        } else {
            res.status(400).json({ message: "User is already  an Admin"})
        }

    } else {
        res.status(400).json({
            message: "Role or Id not present"
        })
    }
}

exports.deleteUser = async (req,res, next) => {
    const { id } = req.body;
    try {
        await User.findByIdAndDelete(id).then(
            user => {
                res.status(201).json({ message: "User successfully deleted", user})
            }
        )
    } catch (error) {
        res.status(400).json({
            message: "An error occurred", error: error.message
        })
    }
}