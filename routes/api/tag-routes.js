const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags
router.get('/', async (req, res) => {
    try {
        const tags = await Tag.findAll({
          include: [{ model: Product},]
        });
        console.log(tags);
        res.status(200).json(tags);
      }
      catch { (err) => {
        console.log(err)
        res.status(500);
        }
      }
});

// Get one tag by id
router.get('/:id', async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id, { include: [{ model: Product }]});
        res.status(200).json(tag);
      }
      catch { (err) => {
        console.log(err)
        res.status(500);
        }
      }
});

// Create new tag
router.post('/', async (req, res) => {
    try {
        const newTag = await Tag.create(req.body);
        res.status(200).json(newTag);
      }
      catch { (err) => {
        console.log(err)
        res.status(500);
        }
      }
});

// Update tag by id
router.put('/:id', async (req, res) => {
    try {
        const updatedTag = await Tag.update(
          {
          tag_name: req.body.tag_name
          },
          {
            where: { 
              id: req.params.id
            }
          }
        );
        res.status(200).json(updatedTag);
      }
      catch { (err) => {
        console.log(err)
        res.status(500);
        }
      }
});

// Delete tag by id
router.delete('/:id', async (req, res) => {
    try {
        const deletedTag = await Tag.destroy({
          where: {
            id: req.params.id,
          }
        })
        res.status(200).json(deletedTag);
      }
      catch { (err) => {
        console.log(err)
        res.status(500);
        }
      }
});

module.exports = router;
