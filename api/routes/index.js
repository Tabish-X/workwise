const router = require("express").Router();
const {WEBSITE_URL} = require("../constant/constant")

router.get("/", (req, res) => {
  res.status(200).render("index", {
    title: "welcome to Workwise api",
    website: WEBSITE_URL
  });
});

router.all("*", (req, res) => {
  res.status(404).render("notfound", {
    website:WEBSITE_URL
  });
});


module.exports = router