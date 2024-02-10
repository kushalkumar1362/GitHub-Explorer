const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const searchbar = document.querySelector(".searchbar-container");
const btnsubmit = get("submit");
const input = get("input");
const profilecontainer = document.querySelector(".profile-container");
const API = "https://api.github.com/users/";
const noresults = get("no-results");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");


// Intially
let darkMode = false;

btnsubmit.addEventListener("click", function () {
    if (input.value.trim() !== "") {
        searchbar.style.border = "1px solid green";
        name_error.style.display = "none";
        getUserData(API + input.value);
    } else {
        searchbar.style.border = "1px solid red";
        name_error.style.display = "block";
        input.focus();
    }
});

input.addEventListener("input", () => {
    noresults.style.display = "none";
    profilecontainer.classList.remove("active");
    searchbar.classList.add("active");
    if (input.value.trim() !== "") {
        searchbar.style.border = "1px solid green";
        name_error.style.display = "none";
    }
});

function getUserData(gitUrl) {
    fetch(gitUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            updateProfile(data);
        })
        .catch((error) => {
            throw error;
        });
}

function updateProfile(data) {
    if (data.message !== "Not Found") {
        noresults.style.display = "none";

        avatar.src = `${data.avatar_url}`;
        userName.innerText = data.name === null ? data.login : data.name;
        user.innerText = `@${data.login}`;
        user.href = `${data.html_url}`;
        datesegments = data.created_at.split("T").shift().split("-");
        date.innerText = `Joinded ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active");
        bio.innerText = data.bio == null? "This Profile has no bio" : `${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        following.innerText = `${data.following}`;
    }
    else {
        noresults.style.display = "block";
    }
}

// Listner for mode button
btnmode.addEventListener("click", function () {
    if (darkMode == false) {
        darkModeProperties();
    } else {
        lightModeProperties();
    }
});

function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    root.setProperty("--lm-text-alt", "white");
    modetext.innerText = "LIGHT";
    modeicon.src = "./Assets/sun-icon.svg";
    darkMode = true;
    localStorage.setItem("dark-mode", true);
}

function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    root.setProperty("--lm-text-alt", "#2B3442");
    modetext.innerText = "DARK";
    modeicon.src = "./Assets/moon-icon.svg";
    darkMode = false;
    localStorage.setItem("dark-mode", false);
}

profilecontainer.classList.toggle("active");
searchbar.classList.toggle("active");
getUserData(API + "kushalkumar1362");
