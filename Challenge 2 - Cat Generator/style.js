function generateCat() {
    let image = document.createElement('img');
    let div = document.getElementById("flex-cat-generator");
    image.src = "https://api.thecatapi.com/api/images/get?format=src&type=gif&size=small";
    image.setAttribute("id", "generateCat");
    div.appendChild(image);
}

function reset() {
    document.getElementById("generateCat").remove();
}