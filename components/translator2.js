const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

// First Method of Trying to Translate, separating word by word and then checking if each of them is going to be translated;

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

class Translator {
  americanToBritish(text) {
    const wordsWith2Spaces = text.match(/[\w]+[\s][\w]+[\s][\w]+/g);

    console.log(wordsWith2Spaces);

    const words = text.split(" ");

    const translatedWords = words.map((word) => {
      let checkWord = word.toLowerCase();
      if (americanToBritishSpelling.hasOwnProperty(checkWord)) {
        return (
          '<span class="highlight">' +
          americanToBritishSpelling[checkWord] +
          "</span>"
        );
      } else if (americanToBritishTitles.hasOwnProperty(checkWord)) {
        return (
          '<span class="highlight">' +
          toTitleCase(americanToBritishTitles[checkWord]) +
          "</span>"
        );
      } else if (americanOnly.hasOwnProperty(checkWord)) {
        return '<span class="highlight">' + americanOnly[checkWord] + "</span>";
      }
      return word.replace(
        /(\d{1,2}):(\d{2})/,
        '<span class="highlight">$1.$2</span>'
      );
    });

    return translatedWords.join(" ");
  }

  britishToAmerican(text) {
    const words = text.split(" ");

    const translatedWords = words.map((word) => {
      let checkWord = word.toLowerCase();
      const translatedWord =
        getKeyByValue(americanToBritishSpelling, checkWord) ||
        getKeyByValue(americanToBritishTitles, checkWord);
      if (translatedWord) {
        return '<span class="highlight">' + translatedWord + "</span>";
      } else if (britishOnly.hasOwnProperty(checkWord)) {
        return '<span class="highlight">' + britishOnly[checkWord] + "</span>";
      }
      return word.replace(
        /(\d{1,2})\.(\d{2})/,
        '<span class="highlight">$1:$2</span>'
      );
    });

    return translatedWords.join(" ");
  }
}

module.exports = Translator;
