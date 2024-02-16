const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const searchbar = document.querySelector(".searchbar-container");
const btnsubmit = get("submit");
const input = get("input");
const keypart4 = "7P1Ko";
const profilecontainer = document.querySelector(".profile-container");
const API = "https://api.github.com/users/";
const noresults = get("no-results");
const loader = get("loader");
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
const keypart2 = "H6vD2SY";
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const company = get("company");
const twitter = get("twitter");
const userOverview = document.querySelector("[user-overview]");
const userRepos = document.querySelector("[user-repos]");
const userStar = document.querySelector("[user-star]");
const keypart1 = "ghp_8N";
const userOverviewData = document.querySelector("[user-overview-data]");
const userReposData = document.querySelector("[user-repos-data]");
const reposPagination = document.querySelector(".userRepospagination");
const userStarData = document.querySelector("[user-star-data]");
const starPagination = document.querySelector(".starPagination");
const userRepoHeading = get("user-repo-heading");
const userStarRepoHeading = get("user-star-repo-heading");
const suggestionsContainer = document.querySelector(".suggestions");
const reposContainer = document.querySelector(".userRepos");


// Intially
let darkMode = false;
let currentTab = userOverview;
let publicReposCount = 0;
let starReposCount = 0;
let currUsername = "kushalkumar1362";
let currRepoPage = 1;
currentTab.classList.add("current-tab");
userOverviewData.classList.add("active");
reposPagination.style.display = "none";
starPagination.style.display = "none";
const keypart5 = "qzdsIe";
// Function to switch between tabs
function switchTab(clickedTab) {
    // Check if the clicked tab is different from the current tab
    if (clickedTab !== currentTab) {
        // Remove 'current-tab' class from the current tab
        currentTab.classList.remove("current-tab");
        // Set the clicked tab as the current tab
        currentTab = clickedTab;
        // Add 'current-tab' class to the clicked tab
        currentTab.classList.add("current-tab");

        // Hide pagination controls initially
        reposPagination.style.display = "none";
        starPagination.style.display = "none";
        userRepoHeading.style.display = "none";
        userStarRepoHeading.style.display = "none";

        input.value = "";
        // Show data according to the selected tab
        if (currentTab === userOverview) {
            userReposData.classList.remove("active");
            userStarData.classList.remove("active");
            userOverviewData.classList.add("active");
            updatePlaceholder("Enter a GitHub username...");
        } else if (currentTab === userRepos) {
            userOverviewData.classList.remove("active");
            userStarData.classList.remove("active");
            userReposData.classList.add("active");
            reposPagination.style.display = "flex";
            userRepoHeading.style.display = "flex";
            updatePlaceholder("Find repositories...");
            clearSuggestions();
        } else if (currentTab === userStar) {
            userOverviewData.classList.remove("active");
            userReposData.classList.remove("active");
            userStarData.classList.add("active");
            starPagination.style.display = "flex";
            userStarRepoHeading.style.display = "flex";
            clearSuggestions();
        }
    }
}
const keypart6 = "7Rai3";
// Event listeners for tab clicks
userOverview.addEventListener("click", () => {
    switchTab(userOverview);
});

userRepos.addEventListener("click", () => {
    switchTab(userRepos);
});

userStar.addEventListener("click", () => {
    switchTab(userStar);
});

const keypart3 = "2YPAXe";
// Event listener for search button click
btnsubmit.addEventListener("click", function () {
    // Check if input is not empty
    if (input.value.trim() !== "") {
        // Call function to fetch user data based on the active tab
        if (currentTab === userOverview) {
            currUsername = "";
            currUsername = input.value;
            console.log(currUsername);
            clearSuggestions();
            getUserData(API + input.value); // Fetch user data for overview tab
        } else if (currentTab === userRepos) {
            searchUserRepos(input.value); // Search user repositories for repositories tab
        } else if (currentTab === userStar) {
            // Implement functionality for the star tab later
        }
    } else {
        // If input is empty, show error message
        if (currentTab === userOverview) {
            searchbar.style.border = "1px solid red";
            name_error.style.display = "block";
        }
        input.focus();
    }
});

// Event listener for input keydown (Enter)
input.addEventListener("keydown", (e) => {
    // Check if Enter key is pressed and input is not empty
    if (e.key === "Enter" && input.value !== "") {
        // Call function to handle search based on the active tab
        if (currentTab === userOverview) {
            currUsername = "";
            currUsername = input.value;
            console.log(currUsername);
            clearSuggestions();
            getUserData(API + input.value); // Fetch user data for overview tab
        } else if (currentTab === userRepos) {
            searchUserRepos(input.value); // Search user repositories for repositories tab
        } else if (currentTab === userStar) {
            // Implement functionality for the star tab if needed
        }
    }
});

const keypart7 = "NrZmy";
const API_KEY =
    keypart1 + keypart2 + keypart3 + keypart4 + keypart5 + keypart6 + keypart7;

input.addEventListener("input", () => {
    noresults.style.display = "none";
    profilecontainer.classList.remove("active");
    searchbar.classList.add("active");
    const searchTerm = input.value.trim();
    if (searchTerm !== "") {
        searchbar.style.border = "1px solid green";
        name_error.style.display = "none";
    }
});

function updatePlaceholder(placeholder) {
    input.placeholder = placeholder;
}

function searchUserRepos(searchTerm) {
    // Get the list of repository cards
    const repoCards = document.querySelectorAll(".repo-card");

    // Loop through each repository card to check if it matches the search term
    repoCards.forEach((repoCard) => {
        // Get the repository title from the card
        const repoTitle = repoCard
            .querySelector(".repo-title")
            .innerText.toLowerCase();

        // Check if the repository title contains the search term
        if (repoTitle.includes(searchTerm.toLowerCase())) {
            // If it matches, show the repository card
            repoCard.style.display = "block";
        } else {
            // If it doesn't match, hide the repository card
            repoCard.style.display = "none";
        }
    });
}

async function showRepoSuggestion(username, searchTerm) {
    console.log("Search term:", searchTerm);
    try {
        loader.style.display = "flex";
        const response = await fetch(
            `${API}${username}/repos?q=${searchTerm}`,
            {
                headers: {
                    Authorization: `token ${API_KEY}`,
                },
            }
        );
        loader.style.display = "none";
        console.log("Fetch response:", response); // Debug: Log the fetch response
        const data = await response.json();

        if (response.ok) {
            reposContainer.innerHTML = ""; // Clear previous repo cards

            // Filter repositories based on whether their names start with the search term
            const filteredRepos = data.filter((repo) =>
                repo.name.toLowerCase().startsWith(searchTerm.toLowerCase())
            );

            if (filteredRepos.length === 0) {
                reposContainer.innerHTML =
                    "<p>No repositories found matching the input value.</p>";
            } else {
                // Display filtered repo cards
                filteredRepos.forEach((repo) => {
                    const repoCard = document.createElement("div");
                    repoCard.classList.add("repo-card");

                    // Create repo card content
                    const html = `
                        <a href=${repo.html_url} class="repo-title" target="_blank">${repo.name}</a>
                        <div class="popularity">
                            <p class="technology-used">${repo.language}</p>
                            <p class="stars"><i class="fa-regular fa-star"></i>${repo.watchers_count}</p>
                        </div>
                        <p class="pill">Public</p>
                    `;
                    repoCard.innerHTML = html;

                    // Append repo card to repos container
                    reposContainer.appendChild(repoCard);
                });
            }

            // Hide pagination controls
            const reposPagination = document.querySelector(
                ".userRepospagination"
            );
            reposPagination.innerHTML = "";
        } else {
            // Handle error if fetch fails
            console.error("Failed to fetch repository suggestions");
        }
    } catch (error) {
        console.error("Error fetching repository suggestions:", error);
    }
}

let clearSuggestionsTimeout; // Variable to store timeout ID

input.addEventListener("input", () => {
    const searchTerm = input.value.trim();
    if (currentTab === userOverview) {
        if (searchTerm === "") {
            // If input value is empty, clear suggestions container after a delay
            clearTimeout(clearSuggestionsTimeout); // Clear any previous timeout
            clearSuggestionsTimeout = setTimeout(clearSuggestions, 500); // Adjust the delay as needed (in milliseconds)
        } else {
            // If input value is not empty, show suggestions based on input value
            showSuggestions(searchTerm);
        }
    } else if (currentTab === userRepos) {
        if (searchTerm === "") {
            // If input value is empty, clear suggestions container after a delay
            clearTimeout(clearSuggestionsTimeout); // Clear any previous timeout
            clearSuggestionsTimeout = setTimeout(clearRepoSuggestions, 500); // Adjust the delay as needed (in milliseconds)
        } else {
            showRepoSuggestion(currUsername, searchTerm);
        }
    }
});

// Function to clear suggestions container
function clearRepoSuggestions() {
    reposContainer.innerHTML = "";
    suggestionsContainer.style.display = "none";
    getRepos(currUsername, currRepoPage);
}

function clearSuggestions() {
    suggestionsContainer.innerHTML = "";
    suggestionsContainer.style.display = "none";
}

// Function to fetch and display suggestions based on input value
async function showSuggestions(searchTerm) {
    try {
        const response = await fetch(
            `https://api.github.com/search/users?q=${searchTerm}`,
            {
                headers: {
                    Authorization: `token ${API_KEY}`,
                },
            }
        );
        const data = await response.json();

        if (response.ok) {
            suggestionsContainer.innerHTML = ""; // Clear previous suggestions

            // Filter suggestions based on the search term
            const filteredItems = data.items.filter((item) =>
                item.login.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Display filtered suggestions
            filteredItems.forEach((item) => {
                const suggestionElement = document.createElement("div");
                suggestionElement.classList.add("suggestion");

                // Create an image element for the avatar
                const avatarImg = document.createElement("img");
                avatarImg.src = item.avatar_url;
                avatarImg.alt = "Avatar";
                avatarImg.classList.add("avatar");
                suggestionElement.appendChild(avatarImg);

                // Create a span element for the username
                const usernameSpan = document.createElement("span");
                usernameSpan.textContent = item.login;
                suggestionElement.appendChild(usernameSpan);

                // Add click event listener
                suggestionElement.addEventListener("click", () => {
                    input.value = item.login; // Set input value to selected suggestion
                    currUsername = "";
                    currUsername = input.value;
                    console.log(currUsername);
                    suggestionsContainer.innerHTML = ""; // Clear suggestions
                    getUserData(API + item.login); // Fetch user data for selected suggestion
                });

                suggestionsContainer.appendChild(suggestionElement);
            });

            // Show suggestions container
            suggestionsContainer.style.display = "block";
        } else {
            // Handle error if fetch fails
            console.error("Failed to fetch suggestions");
        }
    } catch (error) {
        console.error("Error fetching suggestions:", error);
    }
}

async function getUserData(gitUrl) {
    try {
        loader.style.display = "flex";
        const response = await fetch(gitUrl, {
            headers: {
                Authorization: `token ${API_KEY}`,
            },
        });
        const data = await response.json();

        if (response.ok) {
            // If user data is retrieved successfully
            updateProfile(data);

            // Fetch and display the total count of starred repositories
            starReposCount = 0;
            const starCount = await getStarCount(data.login);
            loader.style.display = "none";

            // Clear existing repositories before fetching and displaying new ones
            const reposContainer = document.querySelector(".userRepos");
            reposContainer.innerHTML = "";
            const reposPagination = document.querySelector(
                ".userRepospagination"
            );
            reposPagination.innerHTML = "";

            // Clear existing starred repositories before fetching and displaying new ones
            const starReposContainer = document.querySelector(".userStar");
            starReposContainer.innerHTML = "";
            const starPagination = document.querySelector(".starPagination");
            starPagination.innerHTML = "";

            getRepos(data.login);
            getStarRepos(data.login);
        } else {
            searchbar.style.border = "1px solid red";
            noresults.style.display = "block";
            loader.style.display = "none";
        }
    } catch (error) {
        throw error;
    }
}

const getRepos = async (username, page = 1, perPage = 6) => {
    const reposContainer = document.querySelector(".userRepos");

    // Clear existing repositories before fetching and displaying new ones
    reposContainer.innerHTML = "";

    // Add pagination controls
    reposPagination.innerHTML = "";

    if (publicReposCount === 0) {
        const noRepoMessage = document.createElement("p");
        noRepoMessage.textContent = "This user has no public repositories.";
        reposContainer.appendChild(noRepoMessage);
    } else {
        // Fetch repositories
        loader.style.display = "flex";
        const response = await fetch(
            `${API}${username}/repos?page=${page}&per_page=${perPage}`
        );
        const data = await response.json();
        loader.style.display = "none";

        // Display repositories
        data.forEach((item) => {
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

        // Add pagination controls (previous, next, page info)
        // Previous Page Button
        if (page > 1) {
            const prevButton = document.createElement("button");
            prevButton.textContent = "Previous";
            prevButton.addEventListener("click", () => {
                currRepoPage = page - 1;
                reposContainer.innerHTML = ""; // Clear previous repos
                getRepos(username, page - 1, perPage);
            });
            reposPagination.appendChild(prevButton);
        }

        // Next Page Button
        if (data.length === perPage) {
            const nextButton = document.createElement("button");
            nextButton.textContent = "Next";
            nextButton.classList.add("pagination-button"); // Add this line to add a class to the button
            nextButton.addEventListener("click", async () => {
                loader.style.display = "flex";
                const nextPageData = await fetch(
                    `${API}${username}/repos?page=${
                        page + 1
                    }&per_page=${perPage}`
                );
                if (nextPageData.ok) {
                    reposContainer.innerHTML = ""; // Clear previous repos
                    currRepoPage = page + 1;
                    getRepos(username, page + 1, perPage);
                    loader.style.display = "none";
                }
            });
            reposPagination.appendChild(nextButton);
        }

        const totalPages = Math.ceil(publicReposCount / perPage);
        // Display current page / total pages
        const pageInfo = document.createElement("p");
        pageInfo.textContent = `Page ${page} / ${totalPages}`;
        reposPagination.appendChild(pageInfo);
    }
};

async function getStarCount(username) {
    let page = 1;
    let perPage = 100; // Fetch 100 repositories per page, adjust if necessary

    while (true) {
        const response = await fetch(
            `${API}${username}/starred?page=${page}&per_page=${perPage}`
        );
        const data = await response.json();
        const pageCount = data.length;
        if (pageCount === 0) {
            // No more pages, break the loop
            break;
        }
        starReposCount += pageCount;
        page++;
    }
}
const getStarRepos = async (username, page = 1, perPage = 6) => {
    const starReposContainer = document.querySelector(".userStar");

    loader.style.display = "flex";
    const response = await fetch(
        `${API}${username}/starred?page=${page}&per_page=${perPage}`
    );
    const data = await response.json();
    loader.style.display = "none";

    if (starReposCount === 0) {
        const noStarredRepoMessage = document.createElement("p");
        noStarredRepoMessage.textContent =
            "This user has no starred repositories.";
        starReposContainer.appendChild(noStarredRepoMessage);
    } else {
        data.forEach((item) => {
            const singleElement = document.createElement("div");
            singleElement.classList.add("repo-card");
            const html = `
                <a href=${item.owner.html_url} class="repo-title" target="_blank">@${item.owner.login} /</a>
                <a href=${item.html_url} class="repo-title" target="_blank">${item.name}</a>
                <div class="popularity">
                    <p class="technology-used">${item.language}</p>
                    <p class="stars"><i class="fa-regular fa-star"></i>${item.watchers_count}</p>
                </div>
            `;
            singleElement.innerHTML = html;
            starReposContainer.appendChild(singleElement);
        });
    }

    // Add pagination controls
    starPagination.innerHTML = "";

    if (starReposCount > 0) {
        // Previous Page Button
        if (page > 1) {
            const prevButton = document.createElement("button");
            prevButton.textContent = "Previous";
            prevButton.addEventListener("click", () => {
                starReposContainer.innerHTML = ""; // Clear previous repos
                getStarRepos(username, page - 1, perPage);
            });
            starPagination.appendChild(prevButton);
        }

        // Next Page Button
        if (data.length === perPage) {
            const nextButton = document.createElement("button");
            nextButton.textContent = "Next";
            nextButton.classList.add("pagination-button"); // Add this line to add a class to the button
            nextButton.addEventListener("click", async () => {
                loader.style.display = "flex";
                const nextPageData = await fetch(
                    `${API}${username}/starred?page=${
                        page + 1
                    }&per_page=${perPage}`
                );

                if (nextPageData.ok) {
                    starReposContainer.innerHTML = ""; // Clear previous repos
                    getStarRepos(username, page + 1, perPage);
                    loader.style.display = "none";
                }
            });
            starPagination.appendChild(nextButton);
        }

        const totalPages = Math.ceil(starReposCount / perPage);
        // Display current page / total pages
        const pageInfo = document.createElement("p");

        pageInfo.textContent = `Page ${page} / ${totalPages}`;
        starPagination.appendChild(pageInfo);
    }
};

function toggleMenu() {
    var menu = document.querySelector(".features");
    menu.classList.toggle("active");

    var hamburgerIcon = document.getElementById("hamburger");
    hamburgerIcon.classList.toggle("cross");
}

// Function to close the menu if the viewport width is greater than 768px
function closeMenuIfLargeViewport() {
    var viewportWidth = window.innerWidth;
    var menu = document.querySelector(".features");
    var hamburgerIcon = document.getElementById("hamburger");

    if (viewportWidth > 768 && menu.classList.contains("active")) {
        menu.classList.remove("active");
        hamburgerIcon.classList.remove("cross");
    }
}

// Event listener for window resize
window.addEventListener("resize", function () {
    closeMenuIfLargeViewport();
});

document.addEventListener("DOMContentLoaded", function () {
    var featureTabs = document.querySelectorAll(".features ul li");
    featureTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            var menu = document.querySelector(".features");
            toggleMenu();
            if (menu.classList.contains("active")) {
                menu.classList.remove("active");
                var hamburgerIcon = document.getElementById("hamburger");
                hamburgerIcon.classList.remove("cross");
            }
        });
    });
});

// Function to update profile information
function updateProfile(data) {
    // Check if user data is retrieved successfully
    if (data.message !== "Not Found") {
        noresults.style.display = "none";

        // Update profile information with user data
        avatar.src = `${data.avatar_url}`;
        userName.innerText = data.name === null ? data.login : data.name;
        user.innerText = `@${data.login}`;
        user.href = `${data.html_url}`;
        const datesegments = data.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${datesegments[2]} ${
            months[datesegments[1] - 1]
        } ${datesegments[0]}`;
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active");
        bio.innerText =
            data.bio == null ? "This Profile has no bio" : `${data.bio}`;
        publicReposCount = data.public_repos;
        repos.innerText = `${publicReposCount}`;
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
        // If user data is not found, show error message
        noresults.style.display = "block";
    }
}

// Function to check for null values
function checkNull(param1, param2) {
    if (param1 === "" || param1 === null) {
        // If value is null or empty, reduce opacity of the corresponding element
        param2.style.opacity = 0.5;
        if (param2.previousElementSibling) {
            param2.previousElementSibling.style.opacity = 0.5;
        }
        return false;
    } else {
        // Reset opacity if the value is not null or empty
        param2.style.opacity = 1;
        if (param2.previousElementSibling) {
            param2.previousElementSibling.style.opacity = 1;
        }
        return true;
    }
}

// Event listener for mode button click
btnmode.addEventListener("click", function () {
    // Check current mode and toggle between dark and light mode
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

// Function to handle dark mode properties
function darkModeProperties() {
    // Update CSS variables for dark mode
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

// Function to handle light mode properties
function lightModeProperties() {
    // Update CSS variables for light mode
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
getUserData(API + currUsername);
