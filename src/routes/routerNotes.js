const express = require('express');
const router = express.Router();
const {
  getAll,
  getById,
  create,
  update,
  remove,
  stats,
} = require('../services/serviceNotes');

const {
  validateAddNote,
  validateUpdateNote,
} = require('../validation/validateNote');

router
  .get('/', getAll)
  .get('/stats', stats)
  .get('/:id', getById)
  .post('/', validateAddNote, create)
  .patch('/:id', validateUpdateNote, update)
  .delete('/:id', remove);

module.exports = router;
