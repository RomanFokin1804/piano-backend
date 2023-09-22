function generateRandomNotes(length, maxDifference) {
  const notes = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ];
  const result = [];

  // Генеруємо першу ноту випадковим чином
  result.push({
    note: notes[Math.floor(Math.random() * notes.length)],
    time: -1,
    status: 'unresolved',
  });

  // Генеруємо інші ноти
  for (let i = 1; i < length; i++) {
    const currentIndex = notes.indexOf(result[i - 1]);
    const minIndex = Math.max(0, currentIndex - maxDifference);
    const maxIndex = Math.min(notes.length - 1, currentIndex + maxDifference);
    const nextIndex =
      Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
    result.push({ note: notes[nextIndex], time: -1, status: 'unresolved' });
  }

  return result;
}

console.log(generateRandomNotes(5, 10));
