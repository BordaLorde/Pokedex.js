export default function getTypeColor(type) {
  switch (type) {
    case "normal":
      return "grey";
    case "fire":
      return "orange";
    case "fighting":
      return "red";
    case "water":
      return "blue";
    case "flying":
      return "teal";
    case "grass":
      return "green";
    case "poison":
      return "purple";
    case "electric":
      return "yellow";
    case "ground":
      return "brown";
    case "psychic":
      return "pink";
    case "rock":
      return "brown";
    case "ice":
      return "teal";
    case "bug":
      return "olive";
    case "dragon":
      return "violet";
    case "ghost":
      return "purple";
    case "dark":
      return "black";
    case "steel":
      return "grey";
    case "fairy":
      return "pink";
    default:
  }
}
