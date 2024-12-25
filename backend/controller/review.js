const { where } = require("sequelize");
const { Reviews } = require("../sequelize/models/models");

const getReviews = async (req, res) => {
  const reviews = await Reviews.findAll({
    attributes: ['userId', 'rate', 'content']
  });
  return res.json(reviews);
};

const getReview = async (req, res) => {
  const reviewId = req.params.userId; // Получаем идентификатор отзыва из параметра userId

  try {
    const review = await Reviews.findByPk(reviewId); // Используем reviewId для поиска отзыва

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    return res.status(500).json({ message: "Failed to fetch review" });
  }
};

const addReview = async (req, res) => {
  const { userId, rate, content } = req.body;

  if (!rate || !content) {
    return res.json({ message: "Required fields cannot be empty" });
  }

  if (rate < 1 || rate > 5) {
    return res.json({ message: "Rate must be between 1 and 5" });
  }

  const existingReview = await Reviews.findOne({ where: { userId } });

  if (existingReview) {
    return res.status(409).json({ message: "Отзыв с таким userId уже существует" });
  }

  try {
    const newReview = await Reviews.create({
      userId,
      rate,
      content,
    });

    return res.json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    return res.status(500).json({ message: "Failed to create review" });
  }
};

const deleteReview = async (req, res) => {
  const { userId } = req.params; // Получаем значение параметра userId из req.params

  if (!userId) {
    return res.status(400).json({ message: "Review ID is required" });
  }

  try {
    const deletedCount = await Reviews.destroy({
      where: { userId },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ status: "ok", message: "Review deleted successfully" });
  } catch (err) {
    console.error("Error deleting review:", err);
    return res.status(500).json({ message: "Error deleting review" });
  }
};

module.exports = {
  getReviews,
  getReview,
  addReview,
  deleteReview
};
