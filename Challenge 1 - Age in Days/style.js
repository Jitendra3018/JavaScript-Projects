function ageInDays() {
    let birthYear = prompt("Enter the year you were born: ");
    let d = new Date();
    let ageInDays = (d.getFullYear() - birthYear) * 365;
    let h1 = document.createElement("h1");
    let textAnswer = document.createTextNode("You are " + ageInDays + " days old")
    h1.setAttribute("id", "ageInDays");
    h1.appendChild(textAnswer);
    document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
    document.getElementById("ageInDays").remove();
}