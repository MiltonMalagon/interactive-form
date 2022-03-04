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
    const activitiesCost = document.querySelector("#activities-cost");
    const txtTotal = activitiesCost.textContent;
    const regex = /\d+/;
    let total = 0;

    activities.addEventListener("change", e => {
        let cost = +e.target.getAttribute("data-cost");

        if (e.target.checked) {
            total += cost;
        } else {
            total -= cost;
        }
        activitiesCost.textContent = `${txtTotal.replace(regex, total)}`;
    });
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
    }

    for (let i = 2; i < paymentBoxes.length; i++) {
        let attribute = paymentBoxes[i].getAttribute("id");
        
        if (attribute !== "credit-card") {
            paymentBoxes[i].hidden = true;
        } else {
            paymentBoxes[i].hidden = false;
        }
    }

    // paymentMenu.addEventListener("change", e => {
        
    // });
}
selectPayment();