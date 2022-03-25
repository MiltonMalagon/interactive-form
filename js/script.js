// "Document" listener runs script when initial HTML document is loaded.
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
    const card_value = document.querySelector("#cvv");

    ///*** -- INFO SECTION -- ***///
    // "Name" section
    name.focus();

    // "Job Role" section

    /**
     *  "Job" listener displays/hides "Other job role" text field depending of user selection.
     * @listens Event change when user selects a job option.
    **/
    job.addEventListener("change", e => {
        let job_option = e.target.value;

        (job_option === "other") ? job_other.hidden = false : job_other.hidden = true;
    });

    job_other.hidden = true;

    // "T-Shirt Info" section
    /**
     *  "Design" listener displays/hides only color options associated with T-Shirt design selection.
     * @listens Event change when user selects a t-shirt theme.
    **/
    design.addEventListener("change", e => {
        let theme_option = e.target.value;

        for (let i = 0; i < color_options.length; i++) {
            let color_option = color_options[i];
            let color_data = color_option.dataset.theme;

            (theme_option === color_data) ? color_option.hidden = false : color_option.hidden = true;
        }

        color.disabled = false;
        color_options[0].selected = true;
    });

    // Color property disables "Color" select menu when form first loads.
    color.disabled = true;

    ///*** -- ACTIVITY SECTION -- ***///
    // "Register for Activities" section
    /**
     *  "Activities" listener adds/subtracts to the total cost according to number of activities selected.
     * @listens Event change when user selects an activity checkbox.
    **/
    activities.addEventListener("change", e => {
        let activity = e.target;
        let activity_cost = +activity.dataset.cost;
        let activity_date = activity.dataset.dayAndTime;

        // "Conflicting Activities" section
        // Loop prevents users for selecting activities with the same day and time.
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
     *  "Payment" listener displays/hides payment section according to payment option selected.
     * @listens Event change when user selects a payment type.
    **/
    payment.addEventListener("change", e => {
        let payment_option = e.target.value;

        for (let i = 0; i < payment_methods.length; i++) { 
            (payment_option === payment_methods[i].id) ? payment_methods[i].hidden = false : payment_methods[i].hidden = true;
        }
    });

    // Loop shows only "Credit Card" payment section when form first loads.
    for (let i = 0; i < payment_methods.length; i++) {
        (payment_options[1].value === payment_methods[i].id) ? payment_methods[i].hidden = false : payment_methods[i].hidden = true;
    }

    // Payment property makes "Credit Card" as default selected option when form first loads.
    payment_options[1].selected = true;

    ///*** -- VALIDATION SECTION -- ***///
    // "Accessibility" section
    /**
     *  Displays check-icons if required form fields are filled out correctly.
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
     *  Displays error icons and notifications if required form fields are empty.
     * @param {element} element - HTML element used as reference for its parent/last child elements and error messages.
    **/
    function messageInvalid(element) {
        const parent_element = element.parentElement;
        const last_child_element = parent_element.lastElementChild;        

        parent_element.classList.add("not-valid");
        parent_element.classList.remove("valid");
        last_child_element.style.display = "block";

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
     *  Displays error icons and notifications if required form fields are filled out incorrectly.
     * @param {element} element - HTML element use as reference for its parent/last child elements and informative messages.
    **/
    function messageCondition(element) {
        const parent_element = element.parentElement;
        const last_child_element = parent_element.lastElementChild;

        parent_element.classList.add("not-valid");
        parent_element.classList.remove("valid");
        last_child_element.style.display = "block";

        switch (element.id) {
            case "name":
                last_child_element.textContent = `Please provide a valid 'First Last' name`;
                break;
            case "email":
                last_child_element.textContent = `A valid 'email@email.com' may work`;
                break;
            case "cc-num":
                last_child_element.textContent = `Please enter only 13 - 16 numbers`;
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
     *  Validate all user input/selection data and call function based on field input/selection.
    **/
    const nameValidation = () => {
        let name_is_valid = /^[a-zA-Z]+\s[a-zA-Z]+$/i.test(name.value);

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
    const emailValidation = () => {
        let email_is_valid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);

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
    const creditCardValidation = () => {
        if (payment_options[1].selected && payment_methods[0].hidden === false) {
            let cc_is_valid = /^\d{13,16}$/.test(card_number.value);
            let zip_is_valid = /^\d{5}$/.test(zip_code.value);
            let cvv_is_valid = /^\d{3}$/.test(card_value.value);

            if (cc_is_valid && card_number.value) {
                messageValid(card_number);
            }
    
            if (!cc_is_valid && !card_number.value) {
                messageInvalid(card_number);
            }
    
            if (!cc_is_valid && card_number.value) {
                messageCondition(card_number);
            }

            if (zip_is_valid && zip_code.value) {
                messageValid(zip_code);
            }
    
            if (!zip_is_valid && !zip_code.value) {
                messageInvalid(zip_code);
            }
    
            if (!zip_is_valid && zip_code.value) {
                messageCondition(zip_code);
            }
            
            if (cvv_is_valid && card_value.value) {
                messageValid(card_value);
            }
    
            if (!cvv_is_valid && !card_value.value) {
                messageInvalid(card_value);
            }
    
            if (!cvv_is_valid && card_value.value) {
                messageCondition(card_value);
            }

            return cc_is_valid && zip_is_valid && cvv_is_valid;
        }
    }

    // "Real-Time Error Message" section
    /**
     *  Listeners validate in real-time if user input/selection is valid or invalid.
     * @listens Event keyup when user type in data.
     * @listens Event change when user select/diselect activities.
    **/
    name.addEventListener("keyup", nameValidation);
    email.addEventListener("keyup", emailValidation);
    activities.addEventListener("change", activityValidation);
    card_number.addEventListener("keyup", creditCardValidation);
    zip_code.addEventListener("keyup", creditCardValidation);
    card_value.addEventListener("keyup", creditCardValidation);

    // "Form Validation" section
    /**
     *  "Form" listener sends/prevents submission according to user input/selection data.
     * @listens Event submit when user press "Register" button.
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
        if (!creditCardValidation()) {
            e.preventDefault();
        }
    });
});