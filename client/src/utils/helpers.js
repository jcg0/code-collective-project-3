export function generatePlaceholderName(name) {
  let splitUsername = name.split(" "),
    firstLetter = splitUsername[0]?.[0] ?? "",
    secondletter = splitUsername[1]?.[0] ?? "";
  return `${firstLetter}${secondletter}`;
}

//split name and return the first letter of the first name and last name

export function generateRandomColor() {
  let randomColor = Math.floor(Math.random() * 360);
  return randomColor;
}
// generate a randome color
