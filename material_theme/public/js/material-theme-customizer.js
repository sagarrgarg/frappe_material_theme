frappe.provide("material.theme");

$(document).on("toolbar_setup", function () {
	const root = document.documentElement;
	let theme_mode = root.getAttribute("data-theme-mode");
	console.log(theme_mode);
	if (theme_mode !== "material")
	{
		return;
	}
	var themeColor = localStorage.getItem("ItrostackThemeColor");
	if(themeColor)
		applyMaterialTheme(themeColor);
	render_clear_demo_action();

});

function render_clear_demo_action() {
	let demo_action = $(
		`<a class="dropdown-item" onclick="return material.theme.clear_demo()">
			${__("Change Theme Color")}
		</a>`
	);

	demo_action.appendTo($("#toolbar-user"));
	// initThemeCustomizer();
}

function applyMaterialTheme(SelectedColor)
{
	var r = document.querySelector(':root');
	const theme = themeFromSourceColor(argbFromHex(SelectedColor), [
		{
		  name: "custom-1",
		  value: argbFromHex(SelectedColor),
		  blend: true,
		},
	  ]);
	  
	// Check if the user has dark mode turned on
	const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

	// Apply the theme to the body by updating custom properties for material tokens
	applyTheme(theme, {target: document.body});
	
	const color = hexFromArgb(theme.schemes.light.primary);
	localStorage.setItem("ItrostackThemeColor", color);
	
	//Setting the primary color for frappe.
	r.style.setProperty('--primary', color);
}

material.theme.clear_demo = function () {
	var themeColor = localStorage.getItem("ItrostackThemeColor");
	if(!themeColor)
		themeColor = "#3C6090";
	// new dialog
	var d = new frappe.ui.Dialog({
		title: "Select Color",
		fields: [
			{
				label: __("Theme color"),
				fieldname: "Color",
				fieldtype: "Color",
				default: themeColor,
			},
		],
	});



	d.set_primary_action(__("Set Color"), function () {
		applyMaterialTheme(d.get_value('Color'));
		d.hide();
	});

	d.show();
}