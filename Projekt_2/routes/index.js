var express = require('express');
var router = express.Router();

var announcementsService = require("../services/announcementsService");

/* GET home page. */
router.get('/', announcementsService.getAnnouncements);

module.exports = router;
