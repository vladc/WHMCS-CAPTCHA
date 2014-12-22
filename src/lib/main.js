var pageMod = require("sdk/page-mod");
pageMod.PageMod({
	include: ["http://www.whmcs.com/members/verifydomain.php", "https://www.whmcs.com/members/verifydomain.php"],
	contentScriptFile: "./captcha.js"
});