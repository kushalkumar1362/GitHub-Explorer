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
const user_location = get("location");
const page = get("page");
const company = get("company");
const twitter = get("twitter");
const userOverview = document.querySelector("[user-overview]");
const userRepos = document.querySelector("[user-repos]");
const userProject = document.querySelector("[user-project]");
const userPackage = document.querySelector("[user-package]");
const userStar = document.querySelector("[user-star]");

const userOverviewData = document.querySelector("[user-overview-data]");
const userReposData = document.querySelector("[user-repos-data]");

// Intially
let darkMode = false;
let currentTab = userOverview;

currentTab.classList.add("current-tab");
userOverviewData.classList.add("active");

function switchTab(clickedTab) {
    if (clickedTab !== currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if (!userOverviewData.classList.contains("active")) {
            userReposData.classList.remove("active");
            userOverviewData.classList.add("active");
        } else if (!userReposData.classList.contains("active")) {
            userOverviewData.classList.remove("active");
            userReposData.classList.add("active");
        }
    }
}

userOverview.addEventListener("click", () => {
    switchTab(userOverview);
});

userRepos.addEventListener("click", () => {
    switchTab(userRepos);
});

// userProject.addEventListener("click", () => {
//     switchTab(userProject);
// });

// userPackage.addEventListener("click", () => {
//     switchTab(userPackage);
// });

// userStar.addEventListener("click", () => {
//     switchTab(userStar);
// });

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

input.addEventListener(
    "keydown",
    function (e) {
        if (e.key == "Enter") {
            if (input.value !== "") {
                getUserData(API + input.value);
            }
        }
    },
    false
);

input.addEventListener("input", () => {
    noresults.style.display = "none";
    profilecontainer.classList.remove("active");
    searchbar.classList.add("active");
    if (input.value.trim() !== "") {
        searchbar.style.border = "1px solid green";
        name_error.style.display = "none";
    }
});

async function getUserData(gitUrl) {
    try {
        const response = await fetch(gitUrl);
        const data = await response.json();
        updateProfile(data);

        // Clear existing repositories before fetching and displaying new ones
        const reposContainer = document.querySelector(".userRepos");
        reposContainer.innerHTML = "";

        getRepos(data.login);
    } catch (error) {
        throw error;
    }
}

const getRepos = async (username) => {
    const reposContainer = document.querySelector(".userRepos");
    const response = await fetch(API + username + "/repos");
    const data = await response.json();

    // Shuffle the array of repositories
    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
    }

    // Get the first 6 repositories
    const randomRepos = data.slice(0, 6);
    randomRepos.forEach((item) => {
        console.log(item);
        const singleElement = document.createElement("div");
        singleElement.classList.add("repo-card");
        const html = `
        <a href=${item.html_url} class="repo-title" target="_blank">${item.name}</a>
        <div class="popularity">
            <p class="technology-used">${item.language}</p>
            <p class="stars"><i class="fa-regular fa-star"></i>${item.watchers_count}</p>
        </div>
        <p class="pill">Public</p>
        `;
        singleElement.innerHTML = html;
        reposContainer.appendChild(singleElement);
    });
};

function toggleMenu() {
    var menu = document.querySelector(".features");
    menu.classList.toggle("active");
}

document.addEventListener('DOMContentLoaded', function () {
    var featureTabs = document.querySelectorAll('.features ul li');
    featureTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var menu = document.querySelector('.features');
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        });
    });
});

function updateProfile(data) {
    if (data.message !== "Not Found") {
        noresults.style.display = "none";

        avatar.src = `${data.avatar_url}`;
        userName.innerText = data.name === null ? data.login : data.name;
        user.innerText = `@${data.login}`;
        user.href = `${data.html_url}`;
        datesegments = data.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${datesegments[2]} ${
            months[datesegments[1] - 1]
        } ${datesegments[0]}`;
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active");
        bio.innerText =
            data.bio == null ? "This Profile has no bio" : `${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        following.innerText = `${data.following}`;
        user_location.innerText = checkNull(data.location, user_location)
            ? data.location
            : "Not Available";
        page.innerText = checkNull(data.blog, page)
            ? data.blog
            : "Not Available";
        page.href = checkNull(data.blog, page) ? data.blog : "#";
        twitter.innerText = checkNull(data.twitter_username, twitter)
            ? data.twitter_username
            : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter)
            ? `https://twitter.com/${data.twitter_username}`
            : "#";
        company.innerText = checkNull(data.company, company)
            ? data.company
            : "Not Available";
    } else {
        noresults.style.display = "block";
    }
}

function checkNull(param1, param2) {
    if (param1 === "" || param1 === null) {
        param2.style.opacity = 0.5;
        param2.previousElementSibling.style.opacity = 0.5;
        return false;
    } else {
        return true;
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

const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

// Check if there is a value for "dark-mode" in the user's localStorage
if (localStorage.getItem("dark-mode") === null) {
    // If there is no value for "dark-mode" in localStorage, check the device preference
    if (prefersDarkMode) {
        // If the device preference is for dark mode, apply dark mode properties
        darkModeProperties();
    } else {
        // If the device preference is not for dark mode, apply light mode properties
        lightModeProperties();
    }
} else {
    // If there is a value for "dark-mode" in localStorage, use that value instead of device preference
    if (localStorage.getItem("dark-mode") === "true") {
        // If the value is "true", apply dark mode properties
        darkModeProperties();
    } else {
        // If the value is not "true", apply light mode properties
        lightModeProperties();
    }
}

function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    root.setProperty("--lm-text-alt", "white");
    modetext.innerText = "LIGHT";
    modeicon.src = "./Assets/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    root.setProperty("--lm-tab", "#2b3442");
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
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    root.setProperty("--lm-tab", "rgba(219, 226, 239, 0.5)");

    darkMode = false;
    localStorage.setItem("dark-mode", false);
}

profilecontainer.classList.toggle("active");
searchbar.classList.toggle("active");
getUserData(API + "kushalkumar1362");
