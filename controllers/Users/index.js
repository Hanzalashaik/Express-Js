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

export default router;
