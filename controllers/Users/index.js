import express from "express";
import userModel from "../../models/users/Users.js";

const router = express.Router();

//post data
router.post("/addUsers", async (req, res) => {
  try {
    let userData = req.body;
    await userModel.create(userData);
    res.status(200).json({ msg: "User added sucessfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get all data

router.get("/getUsers", async (req, res) => {
  try {
    let allusers = await userModel.find({});
    res.status(200).json(allusers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get specific user by email

router.get("/getuserbyemail/:email", async (req, res) => {
  try {
    let email = req.params.email;
    let user = await userModel.findOne({ email });
    if (!user) {
      res.status(401).json({ msg: "Invalid Email" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get by id

router.get("/getuserbyId/:id",async(req,res)=>{
  try {
    let { id }=req.params;
    let user=await userModel.findById(id);
    if(!user){
      res.status(401).json({msg:"Invalid Email"})
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
})



//update Users by email

router.put("/update/:email", async (req, res) => {
  try {
    let userEmail = req.params.email;
    let updatedEmail = req.body;
    let getuseData = await userModel.findOneAndUpdate(
      { email: userEmail },
      { $set: updatedEmail },
      { new: true }
    );
    if (!getuseData) {
      return res.status(401).json({ msg: "Invalid Email" });
    }
    res.status(200).json(getuseData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }

});

//update by Id

router.put("/updatebyId/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let update = req.body;
 
    const updatedUser = await userModel.findByIdAndUpdate(id, update, { new: true });

    if (!updatedUser) {
      res.status(401).json({ msg: "ID not Found!" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete by id

router.delete("/deletebyId/:id",async(req,res)=>{
  try {
    let {id}=req.params
  await userModel.findByIdAndDelete(id);
  if(!id){
    res.status(401).json({ msg: "ID not Found!" });
  }
  res.status(200).json({msg:"User is deleted successfully"});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
})

//delete specific user by email

router.delete("/deleteUser/:email", async (req, res) => {
  try {
    let email = req.params.email;
    await userModel.deleteOne({ email });
    res.status(200).json({ msg: "User Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete all Users

router.delete("/deleteAll", async (req, res) => {
  try {
    await userModel.deleteMany({});
    res.status(200).json({ msg: "All Users Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
