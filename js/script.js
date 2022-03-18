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
    const activities_total = document.querySelector("#activities-cost");
    let activities_cost = 0;

    //** -- PAYMENT SECTION VARIABLES -- **//
    const payment = document.querySelector("#payment");
    const payment_options = document.querySelectorAll("#payment option");
    const payment_methods = document.querySelectorAll(".payment-methods div[id]");

    //** -- VALIDATION SECTION VARIABLES -- **//
    const form = document.querySelector("form");
    // const fieldsets = document.querySelectorAll("fieldset");
    const email = document.querySelector("#email");
    const cc_data = document.querySelectorAll("#credit-card input");

    ///*** -- INFO SECTION -- ***///
    // "Name" section
    name.focus();

    // "Job Role" section
    job.addEventListener("change", e => {
        let job_option = e.target.value;

        (job_option === "other") ? job_other.hidden = false : job_other.hidden = true;
    })

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
    })

    color.disabled = true;

    ///*** -- ACTIVITY SECTION -- ***///
    // "Register for Activities" section
    activities.addEventListener("change", e => {
        let activity = e.target;
        let activity_cost = +activity.dataset.cost;
        let activity_date = activity.dataset.dayAndTime;
        
        (activity.checked) ? activities_cost += activity_cost : activities_cost -= activity_cost;
        
        activities_total.textContent = `Total: $${activities_cost}`;
    })

    ///*** -- PAYMENT SECTION -- ***///
    // "Payment Info" section
    payment.addEventListener("change", e => {
        let payment_option = e.target.value;

        // for (let i = 0; fieldsets.length; i++) {
        //     if (payment_option === payment_methods[i].id) {

        //     }
        // }
        
        for (let i = 0; i < payment_methods.length; i++) {
            for (let j = 0; j < cc_data.length; j++) {
                if (payment_option === payment_methods[i].id) {
                    payment_methods[i].hidden = false;
                } else {
                    payment_methods[i].hidden = true;
                }

                if (payment_methods[0].hidden === true) {
                    cc_data[j].disabled = true;
                } else {
                    cc_data[j].disabled = false;
                }
            }
        }
    })

    for (let i = 0; i < payment_methods.length; i++) {
        (payment_methods[i] === payment_methods[0]) ? payment_methods[i].hidden = false : payment_methods[i].hidden = true;
    }

    payment_options[1].selected = true;

    ///*** -- VALIDATION SECTION -- ***///
    // "Form Validation" section
    form.addEventListener("submit", e => {

        const nameValidation = () => {
            let name_is_valid = /^[a-zA-Z]+ ?[a-zA-Z]+$/i.test(name.value);            

            return name_is_valid;
        }
        const emailValidation = () => {
            let email_is_valid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);

            return email_is_valid;
        }
        const activityValidation = () => {
            let activity_is_valid = activities_cost > 0;

            return activity_is_valid;
        }
        const creditCardValidation = () => {
            let cc_is_valid = /^\d{13,16}$/.test(cc_data[0].value);
            let zip_is_valid = /^\d{5}$/.test(cc_data[1].value);
            let cvv_is_valid = /^\d{3}$/.test(cc_data[2].value);

            return cc_is_valid && zip_is_valid && cvv_is_valid;
        }

        if (!nameValidation()) {
            e.preventDefault();
        }
        if (!emailValidation()) {
            e.preventDefault();
        }
        if (!activityValidation()) {
            e.preventDefault();
        }
        if (!creditCardValidation() /*&& !payment_methods[0].hidden*/) {
            e.preventDefault();
            
            // if (!payment_methods[1].hidden) {
            //     form.action = "https://www.paypal.com/us/welcome/signup/#/mobile_conf";
            //     console.log(form.action);
            // }
            // if (!payment_methods[2].hidden) {
            //     form.action = "https://bitcoin.org/en/buy";
            //     console.log(form.action);
            // }
        }
    })
})