document.addEventListener("DOMContentLoaded", function () {
    let progress = document.getElementById("progress");
    let song = document.getElementById("song");
    let ctrlIcon = document.getElementById("ctrlIcon");
    let currentTimeDisplay = document.getElementById("currentTime");
    let totalTimeDisplay = document.getElementById("totalTime");

    console.log("Script Loaded!");

    song.onloadedmetadata = function () {
        progress.max = song.duration;
        progress.value = song.currentTime;
        totalTimeDisplay.innerText = formatTime(song.duration); // Show total duration
    };

    function playPause() {
        if (ctrlIcon.classList.contains("fa-pause")) {
            song.pause();
            ctrlIcon.classList.remove("fa-pause");
            ctrlIcon.classList.add("fa-play");
        } else {
            song.play();
            ctrlIcon.classList.remove("fa-play");
            ctrlIcon.classList.add("fa-pause");
        }
    }

    // ✅ Set Interval to Update Progress Bar & Time
    setInterval(() => {
        progress.value = song.currentTime;
        currentTimeDisplay.innerText = formatTime(song.currentTime); // Update current time
    }, 500); // Update every 0.5 seconds

    progress.onchange = function () {
        song.currentTime = progress.value;
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    };

    // ✅ Function to Format Time (minutes:seconds)
    function formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }

    window.playPause = playPause; // Make function accessible in HTML
});
