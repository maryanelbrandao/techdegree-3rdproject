/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/


/*to put the focus in the first field*/
document.getElementById("name").focus();

/*Include a text field when the "Other" option is selected from "Job Role" drop down menu*/ 
var title = document.getElementById("title");
var otherTitle = document.getElementById("other-title");

otherTitle.style.display = "none";

title.addEventListener("change", function(event){
    if(event.target.value === "other"){
        otherTitle.style.display = "inline-block";
    } else{
        otherTitle.style.display = "none"; 
    }
});

/*The color menu will start with option "Please select a T-shirt theme" until one theme in 
the Design menu be selected*/ 
document.getElementById("design").childNodes[1].style.display = "none";

const titleOption = document.createElement("option");
const titleOptionText = document.createTextNode(
	"Please select a T-shirt theme"
);

titleOption.appendChild(titleOptionText);
document.getElementById("color").prepend(titleOption);
document.getElementById("color").value = "Please select a T-shirt theme";

document.getElementById("color").childNodes[0].style.display = "none";

document.querySelectorAll('[value="cornflowerblue"]')[0].style.display = "none";
document.querySelectorAll('[value="darkslategrey"]')[0].style.display = "none";
document.querySelectorAll('[value="gold"]')[0].style.display = "none";
document.querySelectorAll('[value="tomato"]')[0].style.display = "none";
document.querySelectorAll('[value="steelblue"]')[0].style.display = "none";
document.querySelectorAll('[value="dimgrey"]')[0].style.display = "none";

document.getElementById("design").addEventListener("change", function () {
  var currentDesign = document.getElementById("design").value;
  if (currentDesign === "js puns") {
	document.querySelectorAll('[value="cornflowerblue"]')[0].style.display = "";
	document.querySelectorAll('[value="darkslategrey"]')[0].style.display = "";
	document.querySelectorAll('[value="gold"]')[0].style.display = "";

	document.querySelectorAll('[value="tomato"]')[0].style.display = "none";
	document.querySelectorAll('[value="steelblue"]')[0].style.display = "none";
	document.querySelectorAll('[value="dimgrey"]')[0].style.display = "none";

	document.getElementById("color").value = "cornflowerblue";
  }else {
	document.querySelectorAll('[value="tomato"]')[0].style.display = "";
	document.querySelectorAll('[value="steelblue"]')[0].style.display = "";
	document.querySelectorAll('[value="dimgrey"]')[0].style.display = "";

	document.querySelectorAll('[value="cornflowerblue"]')[0].style.display = "none";
	document.querySelectorAll('[value="darkslategrey"]')[0].style.display = "none";
	document.querySelectorAll('[value="gold"]')[0].style.display = "none";

	document.getElementById("color").value = "tomato";
  }
});

/*Events in the same day and time are disabled when one event is selected. The cost of each
event is displayed in the end of the list.*/
const totalElement = document.createElement("p");
const totalElementText = document.createTextNode("---");
totalElement.appendChild(totalElementText);
totalElement.id = "total-element";
const activities = document.getElementsByClassName("activities")[0];
activities.appendChild(totalElement);
var totalActivities = 0;

activities.addEventListener("change", function(event){
    const eventDayandTime = event.target.getAttribute("data-day-and-time");
    const eventName = event.target.getAttribute("name");
    const checkboxes = document.querySelectorAll('.activities input[type="checkbox"]');

    for(var checkboxIndex in checkboxes){
        const checkbox = checkboxes[checkboxIndex];
        if(typeof checkbox === "object"){
            if(checkbox.getAttribute("data-day-and-time") === eventDayandTime && checkbox !== event.target){
                if(event.target.checked){
                    checkbox.disabled = true;
                }else{
                    checkbox.disabled = false;
                }
            }
        }
    }

    const activityCost = parseInt(event.target.getAttribute("data-cost"));
    if(event.target.checked){
        totalActivities += activityCost;
    }else{
        totalActivities -= activityCost;
    }
    totalElement.textContent = "Total: $" + totalActivities;
});

/*The credit card option is displayed by default.
The payment options are displayed or hidden following the the option that the user select.  */
document.getElementById("paypal").style.display = "none";
document.getElementById("bitcoin").style.display = "none";
const paymentOption = document.getElementById("payment");
paymentOption.childNodes[1].style.display = "none";

paymentOption.value = "credit card";
paymentOption.addEventListener("change", function(event){
    const paymentType = paymentOption.value;
    if(paymentType === "credit card"){
        document.getElementById("credit-card").style.display = "";
        document.getElementById("paypal").style.display = "none";
        document.getElementById("bitcoin").style.display = "none";
    }else if(paymentType === "paypal"){
        document.getElementById("credit-card").style.display = "none";
        document.getElementById("paypal").style.display = "";
        document.getElementById("bitcoin").style.display = "none";
    }else if(paymentType === "bitcoin"){
        document.getElementById("credit-card").style.display = "none";
        document.getElementById("paypal").style.display = "none";
        document.getElementById("bitcoin").style.display = "";
        
    }

});

/*Validations of errors if the user try to submit the form without fill any 
mandatory information*/
 const form = document.querySelector("form");
 form.addEventListener("submit", function(event){
    if(isFormValid()){
        for(var i = 0; i < form.elements.length; i++){
            var element = form.elements[i];
            console.log(element.name, element.value);
        }
    }else{
        event.preventDefault();
    }

 });

function isFormValid() {
	var valid = true;
	valid = isNameValid() && valid;
	valid = isEmailValid() && valid;
	valid = isActivityValid() && valid;
	valid = isPaymentOptionValid() && valid;
	if (document.getElementById("payment").value === "credit card") {
	 valid = isCreditCardValid() && valid;
	}
    
    return valid;
}
/*This function will ensure the name field is not empty before submit the form */
function isNameValid() {
    const nameField = document.getElementById("name");
    var name = nameField.value;
	var trimmedName = name.trim();
    const valid = trimmedName !== "";
	if (valid){
	 nameField.style.borderColor = "";
	}else{
	 nameField.style.borderColor = "red";
	}
    
    return valid;
}

/* This function will validate if the email is following the format(email@email.com)*/
function isEmailValid() {
	const emailField = document.getElementById("mail");
	const valid = emailField.value !== "" && /[\w\d]+@[\w\d]+\.[\w\d]+/.test(emailField.value);
	if (valid){
	 emailField.style.borderColor = "";
	}else{
	 emailField.style.borderColor = "red";
	}
    
    return valid;
}

/* This function will ensure that one actvity(event) must be checked before submit the form*/
function isActivityValid() {
	const activityFieldTitle = document.querySelector(".activities legend");
	const valid =document.querySelectorAll('.activities input[type="checkbox"]:checked').length !== 0;
	if (valid){
	 activityFieldTitle.style.color = "";
	}else{
	 activityFieldTitle.style.color = "red";
	}
    
    return valid;
}

/*This function will ensure that one payment option be selected*/
function isPaymentOptionValid() {
	const paymentOptionLabel = document.querySelector('[for="payment"]');
	const valid = paymentOption.value !== "select method";
	if (valid){
	 paymentOptionLabel.style.color = "";
	}else{
	 paymentOptionLabel.style.color = "red";
    }
    
	return valid;
}

/*This function will validate if the user inform the correct informations about the card*/
function isCreditCardValid() {
	var valid = true;
	valid = isCCNumberValid() && valid;
	valid = isZipCodeValid() && valid;
	valid = isCVVValid() && valid;
	return valid;
}

function isCCNumberValid() {
	const label = document.querySelector('[for="cc-num"]');
	const value = document.getElementById("cc-num").value;
	var valid = false;
	var parsedNumber = parseInt(value);
	if (value.length >= 13 && value.length <= 16 && parsedNumber == value) {
	 valid = true;
	}
	if (valid) {
	 label.style.color = "";
	}else{
	 label.style.color = "red";
	}
    
    return valid;
}

function isZipCodeValid() {
	const label = document.querySelector('[for="zip"]');
	const value = document.getElementById("zip").value;
	var valid = false;
	var parsedNumber = parseInt(value);
	if (value.length == 5 && parsedNumber == value) {
	 valid = true;
	}
	if (valid) {
	 label.style.color = "";
	}else{
	 label.style.color = "red";
	}
    
    return valid;
}

function isCVVValid() {
	const label = document.querySelector('[for="cvv"]');
	const value = document.getElementById("cvv").value;
    var valid = false;
	var parsedNumber = parseInt(value);
	if (value.length == 3 && parsedNumber == value) {
	 valid = true;
	}
	if (valid) {
	 label.style.color = "";
	}else{
	 label.style.color = "red";
	}
	return valid;
}