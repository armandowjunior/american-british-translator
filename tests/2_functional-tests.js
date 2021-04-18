const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", () => {
  suite("POST request to /api/translate", () => {
    test("Translation with text and locale fields", function (done) {
      const text = "Mangoes are my favorite fruit.";
      chai
        .request(server)
        .post("/api/translate")
        .set("content-type", "application/json")
        .send({ text, locale: "american-to-british" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.text, text);
          assert.equal(
            res.body.translation,
            'Mangoes are my <span class="highlight">favourite</span> fruit.'
          );
          done();
        });
    });

    test("Translation with text and invalid locale field", function (done) {
      const text = "Mangoes are my favorite fruit.";
      chai
        .request(server)
        .post("/api/translate")
        .set("content-type", "application/json")
        .send({ text, locale: "portuguese-to-english" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid value for locale field");
          done();
        });
    });

    test("Translation with missing text field", function (done) {
      chai
        .request(server)
        .post("/api/translate")
        .set("content-type", "application/json")
        .send({ locale: "american-to-british" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });

    test("Translation with text and locale fields", function (done) {
      const text = "Mangoes are my favorite fruit.";
      chai
        .request(server)
        .post("/api/translate")
        .set("content-type", "application/json")
        .send({ text })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });

    test("Translation with empty text", function (done) {
      const text = "";
      chai
        .request(server)
        .post("/api/translate")
        .set("content-type", "application/json")
        .send({ text, locale: "american-to-british" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "No text to translate");
          done();
        });
    });

    test("Translation with text that needs no translation", function (done) {
      const text = "Mangoes are my favourite fruit.";
      chai
        .request(server)
        .post("/api/translate")
        .set("content-type", "application/json")
        .send({ text, locale: "american-to-british" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.text, text);
          assert.equal(res.body.translation, "Everything looks good to me!");
          done();
        });
    });
  });
});