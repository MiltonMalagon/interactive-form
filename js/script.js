// The "Name" field
function focusNameField() {
    document.getElementById("name").focus();
}
focusNameField();

// The "Job Role" section
function selectOtherJob() {
    const jobMenu = document.querySelector("#title");
    const jobInput = document.querySelector("#other-job-role");

    jobInput.style.display = "none";
    jobMenu.addEventListener("change", e => {
        if (e.target.value === "other") {
            jobInput.style.display = "block"
        } else {
            jobInput.style.display = "none"
        }
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
                
                if (theme !== value) {
                    colorOptions[i].hidden = true;
                } else {
                    colorOptions[i].hidden = false;
                }
            }
        }
    });
}
selectTShirtColor();

// "Register for Activities" section
function sumActivitiesCost() {
    const activities = document.querySelector("#activities");
    const checkboxes = activities.querySelectorAll("input[type=checkbox]");
    const activitiesCost = document.querySelector("#activities-cost");
    const txtTotal = activitiesCost.textContent;
    const regex = /\d+/;
    let total = 0;

    activities.addEventListener("change", e => {
        let cost = +e.target.getAttribute("data-cost");

        (e.target.checked) ? total += cost : total -= cost;
        activitiesCost.textContent = `${txtTotal.replace(regex, total)}`;
    });

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
}
sumActivitiesCost();

// "Payment Info" section
function selectPayment() {
    const paymentMenu = document.querySelector("#payment"); // select element;
    const paymentOptions = document.querySelectorAll("#payment option"); // option elements
    const paymentField = document.querySelector(".payment-methods"); // fieldset element
    const paymentBoxes = paymentField.children;

    for (let i = 0; i < paymentOptions.length; i++) {
        let attribute = paymentOptions[i].getAttribute("value");

        if (attribute === "credit-card") {
            paymentOptions[i].selected = true;
        } else {
            paymentOptions[i].selected = false;
        }
        
        for (let j = 2; j < paymentBoxes.length; j++) {
            let attribute = paymentBoxes[j].getAttribute("id");
            
            if (attribute !== "credit-card") {
                paymentBoxes[j].hidden = true;
            } else {
                paymentBoxes[j].hidden = false;
            }
        }
    }

    paymentMenu.addEventListener("change", e => {
        let option = e.target.value;

        for (let i = 2; i < paymentBoxes.length; i++) {
            let attribute = paymentBoxes[i].getAttribute("id");

            if (option === attribute) {
                paymentBoxes[i].hidden = false;
            } else {
                paymentBoxes[i].hidden = true;
            }
        }
    });
}
selectPayment();

// "Form Validation" section
function formValidation() {
    const form = document.querySelector("form");
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const total = document.querySelector("#activities-cost");
    const paymentOptions = document.querySelectorAll("#payment option");

    const card = document.querySelector("#cc-num");
    const zip = document.querySelector("#zip");
    const cvv = document.querySelector("#cvv");

    function validationPass(element) {
        const parent = element.parentElement;
        const child = parent.lastElementChild;

        parent.classList.add("valid");
        parent.classList.remove("not-valid");
        child.classList.add("hint");
    }

    function validationFail(element) {
        const parent = element.parentElement;
        const child = parent.lastElementChild;

        parent.classList.add("not-valid");
        parent.classList.remove("valid");
        child.classList.remove("hint");
    }

    // Helper functions
    const nameValidation = () => {
        let nameValue = name.value;
        const nameIsValid = /^[a-zA-Z]+\s[a-zA-Z]+$/i.test(nameValue);

        (nameIsValid) ? validationPass(name) : validationFail(name);

        return nameIsValid;
    }
    const emailValidation = () => {
        let emailValue = email.value;
        const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);

        (emailIsValid) ? validationPass(email) : validationFail(email);

        return emailIsValid;
    }
    const activitiesValidation = () => {

        // Try to figure out an alternative to listen for at least one activity checked.
        let activityValue = total.textContent;
        const activityIsValid = /\d{3}/.test(activityValue);

        (activityIsValid) ? validationPass(total) : validationFail(total);

        return activityIsValid;
    }
    const creditCardValidation = () => {
        let cardValue = card.value;
        let zipValue = zip.value;
        let cvvValue = cvv.value;
        
        for (let i = 0; i < paymentOptions.length; i++) {
            let creditCard = document.querySelector("#credit-card");

            if (paymentOptions[i].selected && paymentOptions[i].value === "credit-card" && creditCard.hidden === false) {
                const cardIsValid = /^\d{13,16}$/.test(cardValue);
                const zipIsValid = /^\d{5}$/.test(zipValue);
                const cvvIsValid = /^\d{3}$/.test(cvvValue);

                (cardIsValid) ? validationPass(card) : validationFail(card);
                (zipIsValid) ? validationPass(zip) : validationFail(zip);
                (cvvIsValid) ? validationPass(cvv) : validationFail(cvv);

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