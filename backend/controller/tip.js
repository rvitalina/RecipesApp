const { where } = require("sequelize");
const { CookTips } = require("../sequelize/models/models");

const getTips = async (req, res) => {
  // const tips = await Tips.findAll();
  const tips = await CookTips.findAll({
    attributes: ['id', 'title', 'content', 'userId']
  });
  return res.json(tips);
};

const getTip = async (req, res) => {
//   const tipId = req.params.id; 

  try {
    const tip = await CookTips.findByPk(req.params.id); 

    if (!tip) {
      return res.status(404).json({ message: "Tip not found" });
    }

    return res.json(tip);
  } catch (error) {
    console.error("Error fetching tip:", error);
    return res.status(500).json({ message: "Failed to fetch tip" });
  }
};

const addTip = async (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return res.json({ message: "Required fields cannot be empty" });
  }

  try {
    const newTip = await CookTips.create({ title, content, userId });

    return res.json(newTip);
  } catch (error) {
    console.error("Error creating tip:", error);
    return res.status(500).json({ message: "Failed to create tip" });
  }
};

// const editTip = async (req, res) => {
//   try {
//     Tips.update(req.body, { where: { userId: req.params.userId } });
//     return res.json(req.body);
//   } catch (error) {
//     console.error("Error editing tip:", error);
//     return res.status(500).json({ message: "Failed to edit tip" });
//   }
// };

const deleteTip = async (req, res) => {
  const { id } = req.params; 

  if (!id) {
    return res.status(400).json({ message: "Tip ID is required" });
  }

  try {
    const deletedCount = await CookTips.destroy({
      where: { id }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Tip not found" });
    }

    res.json({ status: "ok", message: "Tip deleted successfully" });
  } catch (err) {
    console.error("Error deleting tip:", err);
    return res.status(500).json({ message: "Error deleting tip" });
  }
};

module.exports = {
  getTips,
  getTip,
  addTip,
  deleteTip
};
