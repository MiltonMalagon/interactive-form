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
    job.addEventListener("change", e => {
        let job_option = e.target.value;

        (job_option === "other") ? job_other.hidden = false : job_other.hidden = true;
    });

    job_other.hidden = true;

    // "T-Shirt Info" section
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

    color.disabled = true;

    ///*** -- ACTIVITY SECTION -- ***///
    // "Register for Activities" section
    activities.addEventListener("change", e => {
        let activity = e.target;
        let activity_cost = +activity.dataset.cost;
        let activity_date = activity.dataset.dayAndTime;

        // "Conflicting Activities" section
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
    payment.addEventListener("change", e => {
        let payment_option = e.target.value;

        for (let i = 0; i < payment_methods.length; i++) { 
            (payment_option === payment_methods[i].id) ? payment_methods[i].hidden = false : payment_methods[i].hidden = true;
        }
    });

    for (let i = 0; i < payment_methods.length; i++) {
        (payment_options[1].value === payment_methods[i].id) ? payment_methods[i].hidden = false : payment_methods[i].hidden = true;
    }

    payment_options[1].selected = true;

    ///*** -- VALIDATION SECTION -- ***///
    // "Accessibility" section
    function messageValid(element) {
        let parent_element = element.parentElement;
        let last_child_element = parent_element.lastElementChild;

        parent_element.classList.add("valid");
        parent_element.classList.remove("not-valid");
        last_child_element.style.display = "none";
    }

    function messageInvalid(element) {
        let parent_element = element.parentElement;
        let last_child_element = parent_element.lastElementChild;

        parent_element.classList.add("not-valid");
        parent_element.classList.remove("valid");
        last_child_element.style.display = "block";
    }

    // Helper functions
    const nameValidation = () => {
        let name_is_valid = /^[a-zA-Z]+ ?[a-zA-Z]+$/i.test(name.value);
        
        (name_is_valid) ? messageValid(name) : messageInvalid(name);

        return name_is_valid;
    }
    const emailValidation = () => {
        let email_is_valid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);

        (email_is_valid) ? messageValid(email) : messageInvalid(email);

        return email_is_valid;
    }
    const activityValidation = () => {
        let activity_is_valid = activities_cost > 0;

        (activity_is_valid) ? messageValid(activities_total) : messageInvalid(activities_total);

        return activity_is_valid;
    }
    const creditCardValidation = () => {
        if (payment_options[1].selected && payment_methods[0].hidden === false) {
            let cc_is_valid = /^\d{13,16}$/.test(card_number.value);
            let zip_is_valid = /^\d{5}$/.test(zip_code.value);
            let cvv_is_valid = /^\d{3}$/.test(card_value.value);

            (cc_is_valid) ? messageValid(card_number) : messageInvalid(card_number);
            (zip_is_valid) ? messageValid(zip_code) : messageInvalid(zip_code);
            (cvv_is_valid) ? messageValid(card_value) : messageInvalid(card_value);  

            return cc_is_valid && zip_is_valid && cvv_is_valid;
        }
    }

    // "Real-Time Error Message" section
    name.addEventListener("keyup", nameValidation);
    email.addEventListener("keyup", emailValidation);
    activities.addEventListener("change", activityValidation);
    card_number.addEventListener("keyup", creditCardValidation);
    zip_code.addEventListener("keyup", creditCardValidation);
    card_value.addEventListener("keyup", creditCardValidation);

    // "Form Validation" section
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