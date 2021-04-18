"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;

    if (text == undefined || !locale)
      return res.json({ error: "Required field(s) missing" });

    if (text == "") return res.json({ error: "No text to translate" });

    let translation;

    if (locale === "american-to-british") {
      translation = translator.americanToBritish(text, { hightlight: true });
    } else if (locale === "british-to-american") {
      translation = translator.britishToAmerican(text, { hightlight: true });
    } else {
      return res.json({ error: "Invalid value for locale field" });
    }

    if (text === translation) {
      translation = "Everything looks good to me!";
    }

    res.json({ text, translation });
  });
};
