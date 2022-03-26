# Interactive Form
## Techdegree Project 3

### General description
The "Interactive Form" gets user's data and checks form fields to make sure they contain the correct information. The form automatically updates in real-time if data and selections are valid/invalid and submit data according to user input.

### Form sections
The form is developed with four major sections:

#### 1. Information section
This section receives basic info and selections.

- Interactive fields:
    - "Job Role" select control
    - "Other Job Role" input control
    - "Design" select control
    - "Color" select control

- Main code sections (2 event listeners / 2 properties):

    - **"Change Event"** (*"Job Role"*):
        displays/hides "Other Job Role" text field depending on user selection

    - **"Change Event"** (*"Design"*):
        displays/hides color options, and selects first color option, based on design selection
        enables/disables "Color" select menu

    ---

    - **"Hidden Property"** (*"Other job role"*):
        hides "Other Job Role" text field when form first loads

    - **"Disabled Property"** (*"Color"*):
        disables "Color" select menu when form first loads

***

#### 2. Activity section
This section records activity selections.

- Interactive fields:
    - "Register for Activities" checkbox controls 

- Main code sections (1 event listener / 1 loop):

    - **"Change Event"** (*"Register for Activities"*):
        adds/subtracts to the total cost according to number of activities selected

    ---

    - **"For Loop"** (*"Register for Activities"*):
        shows focus state to users when checkboxes have received focus

***

#### 3. Payment section
This section receives credit card data.

- Interactive fields:
    - "I'm Going to Pay With" select control
    - "Payment Methods" div elements    
    - "Card Number" input control
    - "Zip Code" input control
    - "CVV" input control

- Main code sections (1 event listeners / 1 loop / 1 property):

    - **"Change Event"** (*"I'm Going to Pay With"*):
        displays/hides payment-method section according to payment-option selected

    ---

    - **"For Loop"** (*"Payment Methods"*):
        shows only "Credit Card" payment section when form first loads

    ---
    
    - **"Selected Property"** (*"I'm Going to Pay With"*):
        selects "Credit Card" as the default option when form first loads

***

#### 4. Validation section
This section validates required form fields/sections.

- Interactive fields:
    - "Name" input control     
    - "Email Address" input control
    - "Register for Activities" checkbox controls
    - "I'm Going to Pay With" select control   
    - "Card Number" input control
    - "Zip Code" input control
    - "CVV" input control

- Main code sections (3 functions / 4 helper functions / 7 event listeners):

    - **"Message Valid Function"** (*All Interactive Fields*):
        displays check-icons if required form fields are filled out correctly
    
    - **"Message Invalid Function"** (*All Interactive Fields*):
        displays error-icons and notifications if required form fields are empty
    
    - **"Message Condition Function"** (*All Interactive Fields*):
        displays error-icons and notifications if required form fields are filled out incorrectly
    
    ###### * Conditional error message feature helps users to change input data if entered incorrectly.

    ---

    - **"Helper Function"** (*"Name"*):
        validates "Name" text field according to user input
    
    - **"Helper Function"** (*"Email Address"*):
        validates "Email" text field according to user input
    
    - **"Helper Function"** (*"Register for Activities"*):
        validates "Activity" checkboxes according to user selection

    - **"Helper Function"** (*"I'm Going to Pay With"* / *"Card Number"* / *"Zip Code"* / *"CVV"*):
        validates "Credit Card" text fields according to user input and payment option selected

    ---

    - **"Keyup Event"** (*"Name"*):
        validates in real-time if user enters a valid/invalid name

    - **"Keyup Event"** (*"Email Address"*):
        validates in real-time if user enters a valid/invalid email address

    - **"Change Event"** (*"Register for Activities"*):
        validates in real-time if user selects/diselects activities
    
    - **"Keyup Event"** (*"Card Number"*):
        validates in real-time if user enters a valid/invalid credit card number (not real) between 13-16 digits
    
    - **"Keyup Event"** (*"Zip Code"*):
        validates in real-time if user enters a valid/invalid zip code (not real) of 5 digits
    
    - **"Keyup Event"** (*"CVV"*):
        validates in real-time if user enters a valid/invalid credit card code (not real) of 3 digits
    
    - **"Submit Event"** (*All Interactive Fields*):
        sends/prevents submission according if user input/selection data are valid/invalid

    ###### * Real-time error message feature helps users to change input data instantly.