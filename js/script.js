// The "Name" field
function focusNameField() {
    document.getElementById("name").focus();
}
focusNameField();

// The "Job Role" section
function selectOtherJob() {
    const select = document.querySelector("#title");
    const input = document.querySelector("#other-job-role");

    input.style.display = "none"

    select.addEventListener("change", (e) => {
        if (e.target.value === "other") {
            input.style.display = "block"
        } else {
            input.style.display = "none"
        }
    });
}
selectOtherJob();