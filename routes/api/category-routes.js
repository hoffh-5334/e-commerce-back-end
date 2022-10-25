const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {

  try {
    const catData = await Category.findAll({ include: Product });
    res.status(200).json(catData)
  } catch (err) {
    res.status(500).json(err)
  }
});

// find one CATEGORY by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id, {include: Product });
      // include: [{ model: Product, through: Category, as: 'product_id' }]
    if (!catData) {
      res.status(404).json({ message: 'No Category by this id!' });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new category
router.post('/', async (req, res) => {
  
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  
  try {
    const catData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }});

   
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!catData) {
      res.status(404).json({ message: 'There is no category associated with that ID.' });
      // return;
    }

   res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
