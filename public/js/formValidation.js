document.getElementById("form").onsubmit = () =>  {
    clearErrors();

    let isValid = true;

    let fname = document.getElementById("fname").value.trim();
    let lname = document.getElementById("lname").value.trim();   
    let URL = document.getElementById("lnk-in").value.trim();
    let email = document.getElementById("email").value.trim();
    let meeting = document.getElementById("meeting").value;

    if(!fname) {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }
    if(!lname) {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }
    if(URL.substring(0, 24) !== "https://linkedin.com/in/") {
        if (URL.length !== 0) {
            document.getElementById("err-url").style.display = "block";
            isValid = false;
        }
    }
    if(!email.includes("@") && !email.includes(".")) {
        if (email.length !== 0) {
            document.getElementById("err-email").style.display = "block";
            isValid = false;
        }
    }

    if(meeting === "none") {
        document.getElementById("err-meeting").style.display = "block";
        isValid = false;
    }

    return isValid;
}

document.getElementById("meeting").onchange = () => {
    let meetingOther = document.getElementById("other-meeting-group")
    if(meeting.value == "other") {
        meetingOther.style.display = "flex";
    } else {
        meetingOther.style.display = "none";
    }
}

document.getElementById("mailing").onclick = () => {
    let radioGroup = document.getElementById("mailing-format");
    if(radioGroup.style.display === "flex") {
        radioGroup.style.display = "none";
    } else {
        radioGroup.style.display = "flex";
    }
}

function clearErrors() {
    let errors = document.getElementsByClassName("error");
    for(let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}