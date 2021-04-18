const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

// Second method of translation: Check the "dictionaries and then check the text string to see if any word can be replaced."

function reverseDictionary(json) {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

const britishToAmericanSpelling = reverseDictionary(americanToBritishSpelling);
const britishToAmericanTitles = reverseDictionary(americanToBritishTitles);

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

class Translator {
  americanToBritish(text, obj = { hightlight: false }) {
    let hightlightStart = "";
    let highlightEnd = "";
    if (obj.hightlight === true) {
      hightlightStart = '<span class="highlight">';
      highlightEnd = "</span>";
    }
    for (let word in americanOnly) {
      let regex = new RegExp("\\b" + word + "\\b", "gi");
      text = text.replace(
        regex,
        hightlightStart + americanOnly[word] + highlightEnd
      );
    }

    for (let word in americanToBritishSpelling) {
      let regex = new RegExp("\\b" + word + "\\b", "gi");
      text = text.replace(
        regex,
        hightlightStart + americanToBritishSpelling[word] + highlightEnd
      );
    }

    for (let word in americanToBritishTitles) {
      let lastLetter = word.length - 1;
      let regex = new RegExp(
        "\\b" + word.substring(0, lastLetter) + "\\b\\.",
        "gi"
      );
      text = text.replace(
        regex,
        hightlightStart +
          toTitleCase(americanToBritishTitles[word]) +
          highlightEnd
      );
    }

    return text.replace(
      /(\d{1,2}):(\d{2})/,
      hightlightStart + "$1.$2" + highlightEnd
    );
  }

  britishToAmerican(text, obj = { hightlight: false }) {
    let hightlightStart = "";
    let highlightEnd = "";
    if (obj.hightlight === true) {
      hightlightStart = '<span class="highlight">';
      highlightEnd = "</span>";
    }
    for (let word in britishOnly) {
      let regex = new RegExp("\\b" + word + "\\b", "gi");
      text = text.replace(
        regex,
        hightlightStart + britishOnly[word] + highlightEnd
      );
    }

    for (let word in britishToAmericanSpelling) {
      let regex = new RegExp("\\b" + word + "\\b", "gi");
      text = text.replace(
        regex,
        hightlightStart + britishToAmericanSpelling[word] + highlightEnd
      );
    }

    for (let word in britishToAmericanTitles) {
      let regex = new RegExp("\\b" + word + "\\b", "gi");
      text = text.replace(
        regex,
        hightlightStart +
          toTitleCase(britishToAmericanTitles[word]) +
          highlightEnd
      );
    }

    return text.replace(
      /(\d{1,2}).(\d{2})/,
      hightlightStart + "$1:$2" + highlightEnd
    );
  }
}

module.exports = Translator;
