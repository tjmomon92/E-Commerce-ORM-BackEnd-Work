const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll(
        {
         include: [{ model: Product }],
        }
      );
    res.status(200).json(categories);
    console.log(categories);
  }
  catch { (err) => {
      console.log(err)
      res.status(500);
    }
  }
});

// Get one category by id
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product }]});
    res.status(200).json(category);
  }
  catch { (err) => {
    console.log(err)
    res.status(500);
    }
  }
});

// Create new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  }
  catch { (err) => {
    console.log(err)
    res.status(500);
    }
  }
});

// Update category by id
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(
      {
      category_name: req.body.category_name
      },
      {
        where: { 
          id: req.params.id
        }
      }
    );
    res.status(200).json(updatedCategory);
  }
  catch { (err) => {
    console.log(err)
    res.status(500);
    }
  }
});

// Delete category by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json(deletedCategory);
  }
  catch { (err) => {
    console.log(err)
    res.status(500);
    }
  }
});

module.exports = router;
