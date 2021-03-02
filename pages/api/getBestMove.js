import fetch from "node-fetch";

export default (req, res) => {
  fetch(`http://chess-api.herokuapp.com/next_best/${req.body.moves}`)
    .then(response => response.json())
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => res.status(400).json(error));
};
