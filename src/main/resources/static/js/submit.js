function disableButton(buttonId) {
    document.getElementById(buttonId).disabled = true;
}

function submitOnlyOnce(buttonId) {
    if (!document.getElementById(buttonId).hasAttribute("data-form-already-submitted")) {
        document.getElementById(buttonId).setAttribute("data-form-already-submitted", "true");
        // It is possible to gray-out the button (change color) here, if desired.
        // Submit form
        return true;
    } else {
        // Form was already submitted. Disable submission
        return false;
    }
}