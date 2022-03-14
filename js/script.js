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
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
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
            let label = e.target.parentNode;

            label.className = "focus";
        });

        checkbox.addEventListener("blur", e => {
            let label = e.target.parentNode;
            
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

    // Helper functions
    const nameValidation = () => {
        let nameValue = document.querySelector("#name").value;
        const nameIsValid = /^[a-zA-Z]+\s[a-zA-Z]+$/i.test(nameValue);

        return nameIsValid;
    }
    const emailValidation = () => {
        let emailValue = document.querySelector("#email").value;
        const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);

        return emailIsValid;
    }
    const activitiesValidation = () => {
        let activityValue = document.querySelector("#activities-cost").textContent;
        const activityIsValid = /\d{3}/.test(activityValue);

        return activityIsValid;
    }
    const creditCardValidation = () => {
        const paymentOptions = document.querySelectorAll("#payment option");
        let cardValue = document.querySelector("#cc-num").value;
        let zipValue = document.querySelector("#zip").value;
        let cvvValue = document.querySelector("#cvv").value;  
        
        for (let i = 0; i < paymentOptions.length; i++) {
            let creditCard = document.querySelector("#credit-card");

            if (paymentOptions[i].selected && paymentOptions[i].value === "credit-card" && creditCard.hidden === false) {
                const cardIsValid = /^\d{13,16}$/.test(cardValue);
                const zipIsValid = /^\d{5}$/.test(zipValue);
                const cvvIsValid = /^\d{3}$/.test(cvvValue);

                return (cardIsValid && zipIsValid && cvvIsValid);
            }
        }
    }

    form.addEventListener("submit", e => {
        (nameValidation() && emailValidation() && activitiesValidation() && creditCardValidation()) ? console.log("Your data is valid!") : e.preventDefault();
    });
}
formValidation();