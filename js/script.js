// The "Name" field
function focusNameField() {
    document.querySelector("#name").focus();
}
focusNameField();

// The "Job Role" section
function selectOtherJob() {
    const jobMenu = document.querySelector("#title");
    const jobInput = document.querySelector("#other-job-role");

    jobInput.hidden = true;
    jobMenu.addEventListener("change", e => {
        (e.target.value === "other") ? jobInput.hidden = false : jobInput.hidden = true;
    });
}
selectOtherJob();

// The "T-Shirt Info" section
function selectTShirtColor() {
    const designMenu = document.querySelector("#design");
    const colorMenu = document.querySelector("#color");
    const colorOptions = colorMenu.querySelectorAll("option[data-theme]");

    colorMenu.disabled = true;
    
    designMenu.addEventListener("change", e => {
        let value = e.target.value;
        let firstOption = colorMenu.firstElementChild;

        colorMenu.disabled = false;
        
        if (value === "js puns" || value === "heart js") {
            firstOption.selected = true;

            for (let i = 0; i < colorOptions.length; i++) {
                let theme = colorOptions[i].getAttribute("data-theme");
                
                (theme !== value) ? colorOptions[i].hidden = true : colorOptions[i].hidden = false;
            }
        }
    });
}
selectTShirtColor();

// "Register for Activities" section
// I want to refactor this entire function (more concise and neat, especially vars)
function sumActivitiesCost() {
    const activities = document.querySelector("#activities");
    const activitiesCost = document.querySelector("#activities-cost");
    const checkboxes = document.querySelectorAll("input[data-cost]");
    let total = 0;
    // const txtTotal = activitiesCost.textContent;
    // const regex = /\d+/;
    // let total = 0;

    // Accessibility section
    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes[i];
        
        checkbox.addEventListener("focus", e => {
            let label = e.target.parentElement;

            label.setAttribute("class", "focus");
        });

        checkbox.addEventListener("blur", e => {
            let label = e.target.parentElement;
            
            label.removeAttribute("class");
        });
    }

    // Prevent users from registering for conflicting activities
    activities.addEventListener("change", e => {
        let clicked = e.target;
        let clickedCost = +clicked.getAttribute("data-cost");
        let clickedDate = clicked.getAttribute("data-day-and-time");        

        for (let i = 0; i < checkboxes.length; i++) {
            let checkbox = checkboxes[i];
            let label = checkbox.parentElement;
            let checkboxDate = checkbox.getAttribute("data-day-and-time");

            if (clickedDate === checkboxDate && clicked !== checkbox) {
                if (clicked.checked) {
                    checkbox.disabled = true;
                    label.setAttribute("class", "disabled");
                } else {
                    checkbox.disabled = false;
                    label.removeAttribute("class");
                }
            }
        }

        // Update "Total:" to reflect the sum of the cost of the user’s selected activities
        (clicked.checked) ? total += clickedCost : total -= clickedCost;
        
        activitiesCost.textContent = `Total: $${total}`;

        // activitiesCost.textContent = `${txtTotal.replace(regex, total)}`;
    });
}
sumActivitiesCost();

// "Payment Info" section
// I want to refactor this entire function (more concise and neat, especially vars)
function selectPayment() {
    const paymentMenu = document.querySelector("#payment"); // select element;
    const paymentOptions = document.querySelectorAll("#payment option"); // option elements
    const paymentField = document.querySelector(".payment-methods"); // fieldset element
    const paymentBoxes = paymentField.children;

    for (let i = 0; i < paymentOptions.length; i++) {
        let attribute = paymentOptions[i].getAttribute("value");

        (attribute === "credit-card") ? paymentOptions[i].selected = true : paymentOptions[i].selected = false;
        
        for (let j = 2; j < paymentBoxes.length; j++) {
            let attribute = paymentBoxes[j].getAttribute("id");
            
            (attribute !== "credit-card") ? paymentBoxes[j].hidden = true : paymentBoxes[j].hidden = false;
        }
    }

    paymentMenu.addEventListener("change", e => {
        let option = e.target.value;

        for (let i = 2; i < paymentBoxes.length; i++) {
            let attribute = paymentBoxes[i].getAttribute("id");

            (option === attribute) ? paymentBoxes[i].hidden = false : paymentBoxes[i].hidden = true;
        }
    });
}
selectPayment();

// "Form Validation" section
function formValidation() {
    const form = document.querySelector("form");
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    // const activities = document.querySelector("#activities");
    const total = document.querySelector("#activities-cost");
    const paymentOptions = document.querySelectorAll("#payment option");

    const card = document.querySelector("#cc-num");
    const zip = document.querySelector("#zip");
    const cvv = document.querySelector("#cvv");

    // Accessibility helper functions
    function validationPass(validation, element) {
        let parent = element.parentElement;
        let child = parent.lastElementChild;

        if (validation) {
            parent.classList.add("valid");
            parent.classList.remove("not-valid");
            child.classList.add("hint");
        } else {
            parent.classList.add("not-valid");
            parent.classList.remove("valid");
            child.classList.remove("hint");
        }
    }

    // function validationFail(element) {
    //     const parent = element.parentElement;
    //     const child = parent.lastElementChild;

        // parent.classList.add("not-valid");
        // parent.classList.remove("valid");
        // child.classList.remove("hint");
    // }

    // Validation helper functions
    const nameValidation = () => {
        let nameValue = name.value;
        const nameIsValid = /^[a-zA-Z]+\s[a-zA-Z]+$/i.test(nameValue);

        validationPass(nameIsValid, name);

        // (nameIsValid) ? validationPass(name) : validationFail(name);

        return nameIsValid;
    }
    const emailValidation = () => {
        let emailValue = email.value;
        const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);

        validationPass(emailIsValid, email);

        // (emailIsValid) ? validationPass(email) : validationFail(email);

        return emailIsValid;
    }
    const activitiesValidation = () => {
        // Try to figure out an alternative to listen for at least one activity checked.
        let activityValue = total.textContent;
        const activityIsValid = /\$\d{3}/.test(activityValue);
        
        validationPass(activityIsValid, total);

        // (activityIsValid) ? validationPass(total) : validationFail(total);

        return activityIsValid;
    }
    const creditCardValidation = () => {
        let cardValue = card.value;
        let zipValue = zip.value;
        let cvvValue = cvv.value;
        
        for (let i = 0; i < paymentOptions.length; i++) {
            let creditCard = document.querySelector("#credit-card");

            // Review and try a more dynamic conditional
            if (paymentOptions[i].selected && paymentOptions[i].value === "credit-card" && creditCard.hidden === false) {
                const cardIsValid = /^\d{13,16}$/.test(cardValue);
                const zipIsValid = /^\d{5}$/.test(zipValue);
                const cvvIsValid = /^\d{3}$/.test(cvvValue);

                validationPass(cardIsValid, card);
                validationPass(zipIsValid, zip);
                validationPass(cvvIsValid, cvv);

                // (cardIsValid) ? validationPass(card) : validationFail(card);
                // (zipIsValid) ? validationPass(zip) : validationFail(zip);
                // (cvvIsValid) ? validationPass(cvv) : validationFail(cvv);

                return cardIsValid && zipIsValid && cvvIsValid;
            }
        }
    }

    form.addEventListener("submit", e => {
        if (!nameValidation()) {
            e.preventDefault();
        }
        if (!emailValidation()) {
            e.preventDefault();
        }
        if (!activitiesValidation()) {
            e.preventDefault();
        }
        if (!creditCardValidation()) {
            e.preventDefault();
        }
    });
}
formValidation();