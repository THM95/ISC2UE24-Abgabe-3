"use strict";

/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
    // Select all 6 links (<a>) in the thumbnail section.
    const thumbnailLinks = document.querySelectorAll('.thumbnail-section a');

    // Select a random entry out of these 6.
    const randomIndex = getRandomInt(0, thumbnailLinks.length);
    const randomLink = thumbnailLinks[randomIndex];

    // Implement switchFullImage() below.
    switchFullImage(randomLink.href, randomLink.getAttribute('alt'));

    // Set a background color to the card-body of your random image.
    const cardBody = randomLink.nextElementSibling;
    cardBody.classList.add('bg-dark', 'text-white');
}

/**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */
function prepareLinks() {
    // Select all the 6 links (<a>) in the thumbnail section.
    const thumbnailLinks = document.querySelectorAll('.thumbnail-section a');

    // Set an event listener for the click event on every <a> element.
    thumbnailLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Remove the .bg-dark and .text-white classes from the current card.
            document.querySelectorAll('.card-body').forEach(cardBody => {
                cardBody.classList.remove('bg-dark', 'text-white');
            });

            // Add both classes again to the card where the click happened.
            const cardBody = this.nextElementSibling;
            cardBody.classList.add('bg-dark', 'text-white');

            // Call switchFullImage() with the URL clicked link and the alt attribute of the thumbnail.
            switchFullImage(this.href, this.getAttribute('alt'));

            // Implement and then call loadNotes() with the key for the current image.
            loadNotes(this.href);

            // Prevent the default action for the link.
            event.preventDefault();
        });
    });
}

/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {
    const notesField = document.getElementById('notes');

    // Add a blur listener.
    notesField.addEventListener('blur', function() {
        const key = getImageKeyFromUrl(document.querySelector('.full-image').getAttribute('src'));

        // When the notes field loses focus, store the notes for the current image in the local storage.
        if (this.value.trim() !== '') {
            localStorage.setItem(key, this.value.trim());
        } else {
            // If the notes field is empty, remove the local storage entry.
            localStorage.removeItem(key);
        }
    });
}

/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */
function switchFullImage(imageUrl, imageDescription) {
    const fullImage = document.querySelector('.full-image');
    fullImage.setAttribute('src', imageUrl);
    fullImage.setAttribute('alt', imageDescription);

    const figCaption = document.querySelector('figcaption');
    figCaption.textContent = imageDescription;
}

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
    const notesField = document.getElementById('notes');
    const notes = localStorage.getItem(key);
    notesField.value = notes ? notes : "Enter your notes here!";
}

/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Extracts the key from the image URL.
 * @param {string} imageUrl The URL of the image.
 * @returns {string} The key extracted from the image URL.
 */
function getImageKeyFromUrl(imageUrl) {
    // Assuming the image URL is unique and can be used as a key.
    return imageUrl;
}

// Gets the whole thing started.
showRandomImageAtStart();
prepareLinks();
storeNotes();
