function add_two_vectors(x1, y1, x2, y2)
{
  return { x: x1 + x2, y: y1 + y2 };
}

function subtract_two_vectors(x1, y1, x2, y2)
{
  return { x: x1 - x2, y: y1 - y2 };
}

module.exports = {add_two_vectors, subtract_two_vectors}