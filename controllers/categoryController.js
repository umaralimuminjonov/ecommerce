const Category = require("../models/categoryModel");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.createCategories = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findOne({ name });
    if (category)
      return res.status(400).json({ message: "Bunday kategoriya mavjud" });

    const newCategory = new Category({ name });

    await newCategory.save();
    res.json({ data: newCategory, message: "Kategoriya yaratildi" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateCategories = async (req, res) => {
  try {
    const update = req.body;
    const id = req.params.id;
    await Category.findByIdAndUpdate(id, update);
    const category = await Category.findById(id);

    res.json({ data: category, message: "Kategoriya yangilandi" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.deleteCategories = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);

    res.json({ message: "Kategoriya o'chirildi" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
