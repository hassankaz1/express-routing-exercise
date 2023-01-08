const Item = require('./itemHelper');
const express = require('express');

const router = express.Router();


// return all items
router.get('', (req, res, next) => {
  try {
    return res.json({ items: Item.getAll() });
  } catch(err){
    return next(err)
  }
});

// create new Item with POST request
router.post('', (req, res, next) => {
  try {
    let newItem = Item.createItem(req.body.name, req.body.price);
    return res.json({item: newItem});
  } catch (err) {
    return next(err)
  }
});

// get Item from current DB
router.get('/:name', (req, res, next) => {
  try {
    let foundItem = Item.find(req.params.name);

    return res.json({item:foundItem});
  } catch(err){
    return next(err)
  }
});


// modify an item from DB
router.patch('/:name', (req, res, next) => {
  try {
    console.log(req.params.name)
    console.log(req.body)

    let foundItem = Item.patchItem(req.params.name, req.body);

    return res.json({ updated: foundItem });
  } catch (err) {
    return next(err)
  }
});

// delete an item from DB
router.delete('/:name', (req, res, next) => {
  try {
    Item.remove(req.params.name);
    return res.json({message:'Deleted'});
  } catch (err) {
    return next(err)
  }
});

module.exports = router;
