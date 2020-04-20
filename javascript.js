/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

/* image preview */
function initHome() {


    const inpFile = document.getElementById("inpfile");
    const previewContainer = document.getElementById("imagePreview");
    const previewImage = previewContainer.querySelector(".image-preview__image");
    const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");

    inpFile.addEventListener("change", function () {
        const file = this.files[0];

        if (file) {
            const reader = new FileReader();

            previewDefaultText.style.display = "none";
            previewImage.style.display = "block";

            reader.addEventListener("load", function () {
                console.log(this);
                previewImage.setAttribute("src", this.result);
            });

            reader.readAsDataURL(file);
        } else {
            previewDefaultText.style.display = null;
            previewImage.style.display = null;
            previewImage.setAttribute("src", "");
        }
    });

    $('#summernote').summernote({
        placeholder: 'Write your main content here...',
        tabsize: 1,
        height: 150,
    });

}

function makeCategories() {

    var categoryArray = ["CAA", "Corona Virus", "India", "Business",
        "Politics", "Sports", "Technology", "Startups",
        "Entertains", "International", "Automobile"];

    var categoryContainer = document.getElementById("category-container");

    var categoryHTML = ``;

    categoryArray.forEach(category => {
        categoryHTML += `
        <div class="col-md-2">
            <div class="form-check-inline">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="category" value="${category.toLowerCase()}">${category}
                </label>
            </div>

        </div>`;
    });

    categoryContainer.innerHTML = categoryHTML;
}

