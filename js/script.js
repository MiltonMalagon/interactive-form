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
    jobMenu.addEventListener("change", (e) => {
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
    const colorOptions = document.querySelectorAll("option[data-theme]");

    colorMenu.disabled = true;
    
    designMenu.addEventListener("change", (e) => {
        colorMenu.disabled = false;

        let value = e.target.value;
        
        if (value === "js puns") {
            for (let i = 0; i < colorOptions.length; i++) {
                let dataset = colorOptions[i].dataset.theme;
                
                if (dataset !== value) {
                    colorOptions[i].style.display = "none";
                } else {
                    colorOptions[i].style.display = "block";
                }
            }
        }
        if (value === "heart js") {
            for (let i = 0; i < colorOptions.length; i++) {
                let dataset = colorOptions[i].dataset.theme;
                
                if (dataset !== value) {
                    colorOptions[i].style.display = "none";
                } else {
                    colorOptions[i].style.display = "block";
                }
            }
        }
    });
}
selectTShirtColor();