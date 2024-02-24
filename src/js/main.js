
@import "./modules/test.js"


const glyphr = {
	init() {
		// fast references
		this.content = window.find("content");

		// init all sub-objects
		Object.keys(this)
			.filter(i => typeof this[i].init === "function")
			.map(i => this[i].init(this));

		// DEV-ONLY-START
		Test.init(this);
		// DEV-ONLY-END
	},
	dispatch(event) {
		let Self = glyphr,
			name,
			pEl,
			el;
		switch (event.type) {
			// system events
			case "window.init":
				break;
			// custom events
			case "open-help":
				karaqu.shell("fs -u '~/help/index.md'");
				break;
			default:
				if (event.el) {
					pEl = event.el.data("area") ? event.el : event.el.parents("div[data-area]");
					name = pEl.data("area");
					if (pEl.length && Self[name].dispatch) {
						return Self[name].dispatch(event);
					}
				}
		}
	},
	head: @import "areas/head.js",
	overview: @import "areas/overview.js",
	design: @import "areas/design.js",
	kearning: @import "areas/kearning.js",
	preview: @import "areas/preview.js",
	sidebar: @import "areas/sidebar.js",
	foot: @import "areas/foot.js",
};

window.exports = glyphr;
