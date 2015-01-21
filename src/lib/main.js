const {ContentPolicy} = require("./policy");
const {components} = require("chrome");
var {modelFor} = require("sdk/model/core");
var tabUtils = require("sdk/tabs/utils");
var tabs = require("sdk/tabs");

ContentPolicy({
	description: "Intercepts images with includes/verifyimage.php in path",
	shouldLoad: function(data) {
		try {
			if(data.image && data.location.path.substr(-24) == "includes/verifyimage.php") {
				if (data.context instanceof components.interfaces.nsIDOMNode) {
					var node = data.context.QueryInterface(components.interfaces.nsIDOMNode);
					if ("ownerDocument" in node && node.ownerDocument) {
						node = node.ownerDocument;
					}
					if ("defaultView" in node) {
						node = node.defaultView;
					}
					if (node) {
						var tab = modelFor(tabUtils.getTabForContentWindow(node));
						tab.once("load", function(wtab) { 
							wtab.attach({contentScriptFile: "./captcha.js"});
						});
					}
				}
			}
		} catch(e) {
			console.log("WHMCS-Captcha: " + e);
		}
		return true;
	}
});