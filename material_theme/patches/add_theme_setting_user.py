import frappe

def execute():
    """Add 'Material' options to desk_theme field in User DocType."""
    
    print(f"Running Patch")
    # Get the User DocType
    user_doctype = frappe.get_doc("DocType", "User")
    
    # New theme options to add
    new_options = ["Material"]
    
    # Find the desk_theme field
    for field in user_doctype.fields:
        if field.fieldname == "desk_theme":
            # Get current options
            current_options = field.options.split("\n") if field.options else []
            
            # Track if we need to update
            needs_update = False
            
            # Check each new option
            for option in new_options:
                if option not in current_options:
                    # Add the option
                    current_options.append(option)
                    needs_update = True
            
            # If we need to update, save the DocType
            if needs_update:
                # Update the field options
                field.options = "\n".join(current_options)
                
                # Save the DocType
                user_doctype.save()
                
                frappe.db.commit()
                print(f"Successfully added {new_options} to desk_theme options in User DocType")
            else:
                print(f"All options {new_options} already exist in desk_theme field")
            
            break