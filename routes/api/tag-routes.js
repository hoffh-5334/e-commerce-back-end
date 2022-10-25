const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');



router.get('/', (req, res) => {
    
    Tag.findAll({
        attributes: ['id', 'tag_name'],
        include: [
            {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
            }
        ]
    })
        .then(tagData => res.json(tagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    
    Tag.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'tag_name'],
        include: [
            {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
            }
        ]
    })
        .then(tagData => {
            if (!tagData) {
                res.status(404).json({ message: 'No tag found with this id' });
                return;
            }
            res.json(tagData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    // create a new tag
    Tag.create({
        tag_name: req.body.tag_name
    })
        .then(tagData => res.json(tagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    
    Tag.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(tagData => {
            if (!tagData[0]) {
                res.status(404).json({ message: 'No tag found with this id' });
                return;
            }
            res.json(tagData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    
    Tag.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(tagData => {
            if (!tagData) {
                res.status(404).json({ message: 'No tag found with this id' });
                return;
            }
            res.json(tagData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
