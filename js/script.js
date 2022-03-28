/**
 * "Document" listener runs script once the initial HTML document is loaded.
 * @listens Event "DOMContentLoaded" when HTML completely loads.
**/
document.addEventListener("DOMContentLoaded", () => {
    //** -- INFO SECTION VARIABLES -- **//
    const name = document.querySelector("#name");
    const job = document.querySelector("#title");
    const job_other = document.querySelector("#other-job-role");
    const design = document.querySelector("#design");
    const color = document.querySelector("#color");
    const color_options = document.querySelectorAll("#color option");

    //** -- ACTIVITY SECTION VARIABLES -- **//
    const activities = document.querySelector("#activities");
    const checkboxes = document.querySelectorAll("#activities input[type=checkbox]");
    const activities_total = document.querySelector("#activities-cost");
    let activities_cost = 0;

    //** -- PAYMENT SECTION VARIABLES -- **//
    const payment = document.querySelector("#payment");
    const payment_options = document.querySelectorAll("#payment option");
    const payment_methods = document.querySelectorAll(".payment-methods div[id]");

    //** -- VALIDATION SECTION VARIABLES -- **//
    const form = document.querySelector("form");
    const email = document.querySelector("#email");
    const card_number = document.querySelector("#cc-num");
    const zip_code = document.querySelector("#zip");
    const card_code = document.querySelector("#cvv");

    ///*** -- INFO SECTION -- ***///
    // "Name" section
    name.focus();

    // "Job Role" section
    /**
     * "Job" listener displays/hides "Other job role" text field depending on user selection.
     * @listens Event "change" when user selects a job option.
    **/
    job.addEventListener("change", e => {
        let job_option = e.target.value;

        (job_option === "other") ? job_other.hidden = false : job_other.hidden = true;
    });

    // Property hides "Other Job" text field when form first loads.
    job_other.hidden = true;

    // "T-Shirt Info" section
    /**
     * "Design" listener displays/hides color options, and selects first color option, based on T-Shirt design selection.
     * "Design" listener enables/disables "Color" select menu.
     * @listens Event "change" when user selects a t-shirt theme.
    **/
    design.addEventListener("change", e => {
        let theme_option = e.target.value;

        for (let i = 0; i < color_options.length; i++) {
            let color_option = color_options[i];
            let previous_color_option = color_option.previousElementSibling;
            let color_data = color_option.dataset.theme;

            (theme_option === color_data) ? color_option.hidden = false : color_option.hidden = true;
            (!color_option.hidden && previous_color_option.hidden) ? color_option.selected = true : color_option.selected = false;
        }
    
        color.disabled = false;
    });

    // Property disables "Color" select menu when form first loads.
    color.disabled = true;

    ///*** -- ACTIVITY SECTION -- ***///
    // "Register for Activities" section
    /**
     * "Activities" listener adds/subtracts to the total cost according to number of activities selected.
     * @listens Event "change" when user selects an activity checkbox.
    **/
    activities.addEventListener("change", e => {
        let activity = e.target;
        let activity_cost = +activity.dataset.cost;
        let activity_date = activity.dataset.dayAndTime;

        // "Conflicting Activities" section
        // Loop prevents users from selecting activities with the same day and time.
        for (let i = 0; i < checkboxes.length; i++) {
            let checkbox = checkboxes[i];
            let checkbox_date = checkbox.dataset.dayAndTime;
            let label = checkbox.parentElement;

            if (checkbox_date === activity_date && checkbox !== activity) {
                if (activity.checked) {
                    checkbox.disabled = true;
                    label.setAttribute("class", "disabled");
                } else {
                    checkbox.disabled = false;
                    label.removeAttribute("class");
                }
            }
        }
        
        (activity.checked) ? activities_cost += activity_cost : activities_cost -= activity_cost;
        
        activities_total.textContent = `Total: $${activities_cost}`;
    });

    // "Accessibility" section
    // Loop shows focus state to users when checkboxes have received focus.
    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes[i];

        /**
         * "listenEvent" function listens to and applies classes based on the type of event.
        **/
        function listenEvent() {
            return e => {
                const event_type = e.type;
                const label = e.target.parentElement;

                if (event_type === "focus") {
                    label.setAttribute("class", "focus");
                }

                if (event_type === "blur") {
                    label.removeAttribute("class");
                }
            }

        }

        checkbox.addEventListener("focus", listenEvent());
        checkbox.addEventListener("blur", listenEvent());
    }

    ///*** -- PAYMENT SECTION -- ***///
    // "Payment Info" section
    /**
     * "Payment" listener displays/hides payment-method section according to payment-option selected.
     * @listens Event "change" when user selects a payment type.
    **/
    payment.addEventListener("change", e => {
        let payment_option = e.target.value;

        for (let i = 0; i < payment_methods.length; i++) {
            let payment_method = payment_methods[i];

            (payment_option === payment_method.id) ? payment_method.hidden = false : payment_method.hidden = true;
        }
    });

    // Loop selects "Credit Card" option and shows "Credit Card" payment section as default when form first loads.
    for (let i = 0; i < payment_options.length; i++) {
        let payment_option = payment_options[i];
        let previous_payment_option = payment_option.previousElementSibling;

        if (!payment_option.hidden && previous_payment_option.hidden) {
            payment_option.selected = true;
        }

        for (let j = 0; j < payment_methods.length; j++) {
            let payment_method = payment_methods[j];
            let previous_payment_method = payment_method.previousElementSibling;

            (payment_method.id && !previous_payment_method.id) ? payment_method.hidden = false : payment_method.hidden = true;
        } 
    }

    ///*** -- VALIDATION SECTION -- ***///
    // "Accessibility" section
    /**
     * "messageValid" function displays check-icons if required form fields are filled out correctly.
     * @param {element} element - HTML element used as reference for its parent/last child elements.
    **/
    function messageValid(element) {
        const parent_element = element.parentElement;
        const last_child_element = parent_element.lastElementChild;

        parent_element.classList.add("valid");
        parent_element.classList.remove("not-valid");
        last_child_element.style.display = "none";
    }

    /**
     * "messageInvalid" function displays error-icons and notifications if required form fields are empty.
     * @param {element} element - HTML element used as reference for its parent/last child elements and error messages.
    **/
    function messageInvalid(element) {
        const parent_element = element.parentElement;
        const last_child_element = parent_element.lastElementChild;        

        parent_element.classList.add("not-valid");
        parent_element.classList.remove("valid");
        last_child_element.style.display = "block";

        // Statement displays error-messages for each required form field.
        switch (element.id) {
            case "name":
                last_child_element.textContent = `Name field cannot be blank`;
                break;
            case "email":
                last_child_element.textContent = `Email address must be formatted correctly`;
                break;
            case "activities-cost":
                last_child_element.textContent = `Choose at least one activity`;
                break;
            case "cc-num":
                last_child_element.textContent = `Credit card number must be between 13 - 16 digits`;
                break;
            case "zip":
                last_child_element.textContent = `Zip Code must be 5 digits`;
                break;
            case "cvv":
                last_child_element.textContent = `CVV must be 3 digits`;
                break;
        }
    }
    
    // "Conditional Error Message" section
    /**
     * "messageCondition" function displays error-icons and notifications if required form fields are filled out incorrectly.
     * @param {element} element - HTML element use as reference for its parent/last child elements and informative messages.
    **/
    function messageCondition(element) {
        const parent_element = element.parentElement;
        const last_child_element = parent_element.lastElementChild;

        parent_element.classList.add("not-valid");
        parent_element.classList.remove("valid");
        last_child_element.style.display = "block";

        // Statement displays notification messages for each required form field.
        switch (element.id) {
            case "name":
                last_child_element.textContent = `Please provide 'First' or 'First Last' name`;
                break;
            case "email":
                last_child_element.textContent = `A valid 'email@email.com' may work`;
                break;
            case "cc-num":
                last_child_element.textContent = `Please enter 13 - 16 numbers`;
                break;
            case "zip":
                last_child_element.textContent = `Please enter 5 numbers`;
                break;
            case "cvv":
                last_child_element.textContent = `Enter only 3 numbers`;
                break;
        }
    }
    
    // Helper functions
    /**
     * "nameValidation" function validates "Name" text field according to user input.
     * @returns {boolean} - Boolean value based on name validation.
    **/
    const nameValidation = () => {
        let name_is_valid = /^[a-zA-Z]+ ?[a-zA-Z]+$/i.test(name.value.trim());

        if (name_is_valid && name.value) {
            messageValid(name);
        }

        if (!name_is_valid && !name.value) {
            messageInvalid(name);
        }

        if (!name_is_valid && name.value) {
            messageCondition(name);
        }

        return name_is_valid;
    }

    /**
     * "emailValidation" function validates "Email" text field according to user input.
     * @returns {boolean} - Boolean value based on email validation.
    **/
    const emailValidation = () => {
        let email_is_valid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value.trim());

        if (email_is_valid && email.value) {
            messageValid(email);
        }

        if (!email_is_valid && !email.value) {
            messageInvalid(email);
        }

        if (!email_is_valid && email.value) {
            messageCondition(email);
        }

        return email_is_valid;
    }

    /**
     * "activityValidation" function validates the number of activities according to user selection.
     * @returns {boolean} - Boolean value based on activities validation.
    **/
    const activityValidation = () => {
        let activity_is_valid = activities_cost > 0;

        if (activity_is_valid) {
            messageValid(activities_total);
        }

        if (!activity_is_valid) {
            messageInvalid(activities_total);
        }

        return activity_is_valid;
    }

    /**
     * "cardNumberValidation" function validates "Credit Number" text field according to user input.
     * @returns {boolean} - Boolean value based on credit card number validation.
    **/
    const cardNumberValidation = () => {
        if (payment_options[1].selected && !payment_methods[0].hidden) {
            let cc_is_valid = /^\d{13,16}$/.test(card_number.value.trim());

            // Credit card number conditionals
            if (cc_is_valid && card_number.value) {
                messageValid(card_number);
            }
    
            if (!cc_is_valid && !card_number.value) {
                messageInvalid(card_number);
            }
    
            if (!cc_is_valid && card_number.value) {
                messageCondition(card_number);
            }

            return cc_is_valid;
        }
    }

    /**
     * "zipCodeValidation" function validates "Zip Code" text field according to user input.
     * @returns {boolean} - Boolean value based on zip code validation.
    **/
    const zipCodeValidation = () => {
        if (payment_options[1].selected && !payment_methods[0].hidden) {
            let zip_is_valid = /^\d{5}$/.test(zip_code.value.trim());

            // Zip code conditionals
            if (zip_is_valid && zip_code.value) {
                messageValid(zip_code);
            }
    
            if (!zip_is_valid && !zip_code.value) {
                messageInvalid(zip_code);
            }
    
            if (!zip_is_valid && zip_code.value) {
                messageCondition(zip_code);
            }

            return zip_is_valid;
        }
    }

    /**
     * "zipCodeValidation" function validates "CVV" text field according to user input.
     * @returns {boolean} - Boolean value based on credit card security code validation.
    **/
     const cardCodeValidation = () => {
        if (payment_options[1].selected && !payment_methods[0].hidden) {
            let cvv_is_valid = /^\d{3}$/.test(card_code.value.trim());

            // Credit card code conditionals
            if (cvv_is_valid && card_code.value) {
                messageValid(card_code);
            }
    
            if (!cvv_is_valid && !card_code.value) {
                messageInvalid(card_code);
            }
    
            if (!cvv_is_valid && card_code.value) {
                messageCondition(card_code);
            }

            return cvv_is_valid;
        }
    }
    
    // "Real-Time Error Message" section
    /**
     * Listeners validate in real-time if user input/selection is valid/invalid.
     * @listens Event "keyup" when user types in data.
     * @listens Event "change" when user selects/diselects activities.
    **/
    name.addEventListener("keyup", nameValidation);
    email.addEventListener("keyup", emailValidation);
    activities.addEventListener("change", activityValidation);
    card_number.addEventListener("keyup", cardNumberValidation);
    zip_code.addEventListener("keyup", zipCodeValidation);
    card_code.addEventListener("keyup", cardCodeValidation);

    // "Form Validation" section
    /**
     * "Form" listener sends/prevents submission if user input/selection data is valid/invalid.
     * @listens Event "submit" when user clicks "Register" button.
    **/
    form.addEventListener("submit", e => {
        if (!nameValidation()) {
            e.preventDefault();
        }
        if (!emailValidation()) {
            e.preventDefault();
        }
        if (!activityValidation()) {
            e.preventDefault();
        }
        if (!cardNumberValidation()) {
            e.preventDefault();
        }
        if (!zipCodeValidation()) {
            e.preventDefault();
        }
        if (!cardCodeValidation()) {
            e.preventDefault();
        }
    });
});