import fetch from "node-fetch";

export default (req, res) => {
  fetch(
    "https://www.google.com/async/finance_wholepage_price_updates?ei=4vs3YNCoEPeT0PEPotK6oAY&yv=3&async=mids:%2Fm%2F07zltbw%7C%2Fg%2F1ym82y1nc%7C,currencies:,_fmt:jspb"
  )
    .then(response => response.text())
    .then(text => {
      // google thinks they're funny putting 4 junk characters in their response
      let t = JSON.parse(text.substring(4));
      res
        .status(200)
        .json({
          GME: t.PriceUpdate[0][0][0][17][4],
          AMC: t.PriceUpdate[0][1][0][17][4]
        });
    })
    .catch(error => res.status(400).json(error));
};
