function calcNotesStats(notes) {
  const isTask = category => category === 'Task';
  const isRandom = category => category === 'Random Though';
  const isIdea = category => category === 'Idea';

  const taskArchNotes = notes.filter(
    note => note.archived && isTask(note.category)
  ).length;
  const taskActiveNotes = notes.filter(
    note => !note.archived && isTask(note.category)
  ).length;
  const randomArchNotes = notes.filter(
    note => note.archived && isRandom(note.category)
  ).length;
  const randomActiveNotes = notes.filter(
    note => !note.archived && isRandom(note.category)
  ).length;
  const ideaArchNotes = notes.filter(
    note => note.archived && isIdea(note.category)
  ).length;
  const ideaActiveNotes = notes.filter(
    note => !note.archived && isIdea(note.category)
  ).length;

  return {
    taskArchNotes,
    taskActiveNotes,
    randomArchNotes,
    randomActiveNotes,
    ideaArchNotes,
    ideaActiveNotes,
  };
}

module.exports = calcNotesStats;
