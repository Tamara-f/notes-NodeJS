const notesRep = require('../repositories/repositoryNotes');
const { HttpCode } = require('../helpers/constants');

const getAll = async (req, res) => {
  try {
    const notes = await notesRep.getAllNotes();
    if (!notes) {
      return res.status(HttpCode.NOT_FOUND).json({ err: 'note not found' });
    } else {
      return res.status(HttpCode.OK).json(notes);
    }
  } catch (e) {
    return res.status(HttpCode.BAD_REQUEST).json({
      err: HttpCode.BAD_REQUEST,
      message: e.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await notesRep.getNoteById(id);
    if (!note) {
      return res.status(HttpCode.NOT_FOUND).json({ err: 'note not found' });
    } else {
      return res.status(HttpCode.OK).json(note);
    }
  } catch (e) {
    return res.status(HttpCode.BAD_REQUEST).json({
      err: HttpCode.BAD_REQUEST,
      message: e.message,
    });
  }
};

const create = async (req, res) => {
  try {
    await notesRep.addNote(req.body);
    return res
      .status(HttpCode.CREATED)
      .json({ message: 'note was successfully added' });
  } catch (e) {
    return res.status(HttpCode.BAD_REQUEST).json({
      err: HttpCode.BAD_REQUEST,
      message: e.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    await notesRep.editNote(req.body, id);
    return res.status(HttpCode.OK).json('note updated');
  } catch (e) {
    return res.status(HttpCode.BAD_REQUEST).json({
      err: HttpCode.BAD_REQUEST,
      message: e.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await notesRep.removeNote(id);
    return res.status(HttpCode.OK).json('note deleted');
  } catch (e) {
    return res.status(HttpCode.BAD_REQUEST).json({
      err: HttpCode.BAD_REQUEST,
      message: e.message,
    });
  }
};

const stats = async (req, res) => {
  try {
    const statsNotes = await notesRep.getStats();
    return res.status(HttpCode.OK).json(statsNotes);
  } catch (e) {
    return res.status(HttpCode.BAD_REQUEST).json({
      err: HttpCode.BAD_REQUEST,
      message: e.message,
    });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  stats,
};
