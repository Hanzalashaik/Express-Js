import express from "express";
import userModel from "../../models/users/Users.js";

const router = express.Router();

//post data

router.post("/addusers", async (req, res) => {
  try {
    let userData = req.body;
    await userModel.create(userData);
    res.status(200).json({ msg: "User Added Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get data

router.get("/getUsers", async (req, res) => {
  try {
    let allusers = await userModel.find({});
    res.status(200).json(allusers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//put data

router.put("/update/:email", async (req, res) => {
  try {
    let UserEmail = req.params.email;
    let updateEmail = req.body;

    let getuserData = await userModel.findOneAndUpdate(
      { email: UserEmail },
      { $set: updateEmail },
      { new: true }
    );
    if (!getuserData) {
      return res.status(401).json({ msg: "Invalid Email" });
    }
    res.status(200).json(getuserData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get specific user by email

router.get("/getuserbyemail/:email", async (req, res) => {
  try {
    let email = req.params.email;

    let getUser = await userModel.findOne({ email: email }); //or we only write {email} if key and value is same

    if (!getUser) {
      res.status(401).json({ msg: "User not found" });
    }
    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

//Delete specific User

router.delete("/deleteUser/:email", async (req, res) => {
  try {
    let email = req.params.email;

    let findEmail = await userModel.deleteOne({ email });
    if (!findEmail) {
      res.status(401).json({ msg: "Email not found" });
    }
    res.status(200).json({ msg: "User Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internel server Error" });
  }
});

// Delete All Users

router.delete("/deleteAll", async (req, res) => {
  try {
    await userModel.deleteMany({});
    res.status(200).json({ msg: "All Users Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

export default router;
