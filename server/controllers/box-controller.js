const { User } = require("../models");
const user = new User();

const boxController = {
    async getAllBoxes(req, res) {
        try {
            const boxData = await User.getUser(req.oidc.user.sub).getAllBoxes();
            if (boxData.length < 1) {
                console.log("You haven't started any boxes yet.");
                res.status(404).json({message: "You haven't started any boxes yet."});
                return;
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getBox(req, res) {
        try {
            const boxData = await Box.findOne({
               _id: req.params.id, 
            });
            if(!boxData) {
                console.log("No box with that id");
                res.status(404).json({ message: "No box with that id" });
                return
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async newBox(req, res) {
        try {
          const user = await User.findOne({ _id: req.body.userId });
          if (!user) {
            console.log("No user found with that id");
            return res.status(404).json({ message: "No user found with that id" });
          }
          
          const boxData = await Box.create(req.body);
          const userData = await User.updateOne(
            { _id: req.body.userId },
            { $push: { boxes: boxData } }
          );
          res.json(userData);
        } catch (error) {
          console.log(error);
          res.status(500).json(error);
        }
      },
}

module.exports = boxController;
