// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from "node-fetch";

export default (req, res) => {
  fetch("http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=1")
    .then(response => response.json())
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => res.status(400).json(error));
};
