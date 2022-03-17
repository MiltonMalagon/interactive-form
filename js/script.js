// The "Name" field
function focusNameField() {
    document.querySelector("#name").focus();
}
focusNameField();

// The "Job Role" section
function showOtherJob() {
    const jobSelector = document.querySelector("#title");
    const jobOther = document.querySelector("#other-job-role");

    jobOther.hidden = true;
    
    jobSelector.addEventListener("change", e => {
        let optionValue = e.target.value;

        (optionValue === "other") ? jobOther.hidden = false : jobOther.hidden = true;
    });
}
showOtherJob();

// The "T-Shirt Info" section
function enableTShirtColor() {
    const designSelector = document.querySelector("#design");
    const colorSelector = document.querySelector("#color");
    const colorOptions = document.querySelectorAll("#color option[data-theme]");

    colorSelector.disabled = true;
    
    designSelector.addEventListener("change", e => {
        let optionTheme = e.target.value;

        colorSelector.firstElementChild.selected = true;
        colorSelector.disabled = false;

        if (optionTheme === "js puns" || optionTheme === "heart js") {
            for (let i = 0; colorOptions.length; i++) {
                let colorOption = colorOptions[i];
                let dataTheme = colorOption.dataset.theme;
    
                (optionTheme === dataTheme) ? colorOption.hidden = false : colorOption.hidden = true;
            }
        }
    });
}
enableTShirtColor();

// "Register for Activities" section
function sumActivitiesCost() {
    const activities = document.querySelector("#activities");
    const activitiesCost = document.querySelector("#activities-cost");
    const checkboxes = document.querySelectorAll("input[data-cost]");
    let total = 0;

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
    });
}
sumActivitiesCost();

// "Payment Info" section
function selectPayment() {
    const paymentSelector = document.querySelector("#payment");
    const paymentOptions = document.querySelectorAll("#payment option");
    const paymentMethods = document.querySelectorAll(".payment-methods div[id]");

    for (let i = 0; i < paymentOptions.length; i++) {
        let paymentOption = paymentOptions[i];
        let optionValue = paymentOption.value;

        (optionValue === "credit-card") ? paymentOption.selected = true : paymentOption.selected = false;

        for (let j = 0; j < paymentMethods.length; j++ ) {
            let paymentMethod = paymentMethods[j];
            let methodId = paymentMethod.id;
            
            (methodId === "credit-card") ? paymentMethod.hidden = false : paymentMethod.hidden = true;
        }
    }

    paymentSelector.addEventListener("change", e => {
        let optionValue = e.target.value;

        for (let i = 0; paymentMethods.length; i++) {
            let paymentMethod = paymentMethods[i];
            let methodId = paymentMethod.id;

            (optionValue === methodId) ? paymentMethod.hidden = false : paymentMethod.hidden = true;
        }
    });
}
selectPayment();

// "Form Validation" section
function formValidation() {
    const form = document.querySelector("form");
    
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");

    const activities = document.querySelector("#activities");
    const activitiesCost = document.querySelector("#activities-cost");
    let activitiesSelected = 0;

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

    activities.addEventListener('change', e => {
        (e.target.checked) ? activitiesSelected++ : activitiesSelected--;
    });

    // Validation helper functions
    const nameValidation = () => {
        let nameValue = name.value;
        const nameIsValid = /^[a-zA-Z]+\s[a-zA-Z]+$/i.test(nameValue);

        validationPass(nameIsValid, name);

        return nameIsValid;
    }
    
    const emailValidation = () => {
        let emailValue = email.value;
        const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);

        validationPass(emailIsValid, email);

        return emailIsValid;
    }

    const activitiesValidation = () => {
        let activityIsValid = activitiesSelected > 0;

        validationPass(activityIsValid, activitiesCost);

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