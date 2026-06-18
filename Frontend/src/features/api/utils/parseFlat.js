// utils/parseFlat.js

// Flat array ["key", val, "key", val, ...] → array of objects
export function parseFlatArray(arr, keys) {
  const result = [];
  const chunkSize = keys.length;

  for (let i = 0; i < arr.length; i += chunkSize * 2) {
    const obj = {};
    keys.forEach((key, ki) => {
      // skip the key string, take value after it
      obj[key] = arr[i + ki * 2 + 1];
    });
    result.push(obj);
  }
  return result;
}

// Skills flat array parser
export function parseSkills(arr) {
  return parseFlatArray(arr, ['skill', 'intensity']);
}

// Questions flat array parser
export function parseQuestions(arr) {
  return parseFlatArray(arr, ['question', 'intention', 'idealAnswer']);
}

// Prep plan flat array parser
export function parsePrepPlan(arr) {
  return parseFlatArray(arr, ['day', 'focus', 'tasks']);
}
