document.addEventListener("DOMContentLoaded", function () {

    const tracks = document.querySelectorAll(".testimonial-track");

    tracks.forEach(track => {

        // Duplicate cards for seamless loop
        track.innerHTML += track.innerHTML;

    });

});