import frappe

@frappe.whitelist()
def switch_theme(theme):
	print(f"Switching Theme {theme}")
	if theme in ["Dark", "Light", "Automatic", "Material"]:
		frappe.db.set_value("User", frappe.session.user, "desk_theme", theme)