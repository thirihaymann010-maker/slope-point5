
const facts = [
    "Heavy rain can make the soil loose and cause landslides.",
    "Some landslides happen slowly, while others happen very suddenly.",
    "Cracks appearing in the ground can be a warning sign.",
    "Trees or poles leaning for no clear reason may mean the ground is moving.",
    "Sudden changes in the water flow of a stream can be a warning sign.",
    "Landslides can happen in towns as well as in the countryside.",
    "Cutting down too many trees can make slopes less stable.",
    "Plant roots can help hold soil together and reduce erosion.",
    "Water that cannot drain away properly can weaken the ground.",
    "Steep slopes can become more dangerous after days of heavy rain.",
    "Landslides can damage houses, roads, bridges, and power lines.",
    "A landslide can carry mud, soil, rocks, and trees downhill.",
    "A strange rumbling sound from a hillside could be a warning sign.",
    "Blocked drains can cause water to build up around a slope.",
    "Building houses on unstable slopes can put people at risk.",
    "Keeping drains clear helps rainwater flow away more easily.",
    "Cutting into a hillside to build a road can make the slope weaker.",
    "Checking weather warnings can help people prepare for heavy rain.",
    "Knowing where to go during an emergency can save time.",
    "If you notice warning signs, move to a safe place and tell local authorities.",
    "Never try to walk across a moving landslide.",
    "The risk can remain high even after the rain has stopped.",
    "Learning about landslides can help communities prepare before they happen.",
    "An emergency bag can include water, a flashlight, and a first-aid kit.",
    "Always pay attention to official weather and safety warnings."
];

let currentFact = 0;

const factText = document.getElementById("factText");
const factButton = document.getElementById("factButton");

if (factButton && factText) {
    factButton.addEventListener("click", function () {
        currentFact++;

        if (currentFact >= facts.length) {
            currentFact = 0;
        }

        factText.textContent = facts[currentFact];
    });
}

const accountForm = document.getElementById("accountForm");

if (accountForm) {
    accountForm.addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Account registration is not connected yet.");
    });
}

const landslideVisual = document.querySelector(".intro-visual");

if (landslideVisual) {
    const lines = landslideVisual.querySelectorAll("svg path");

    lines.forEach(function (line, index) {
        if (typeof line.getTotalLength === "function") {
            const length = line.getTotalLength();

            line.style.strokeDasharray = length;
            line.style.strokeDashoffset = length;
            line.style.transition = "stroke-dashoffset 1.5s ease";

            setTimeout(function () {
                line.style.strokeDashoffset = "0";
            }, index * 100);
        }
    });

    landslideVisual.style.animation = "floatPicture 4s ease-in-out infinite";
}

const missionCards = document.querySelectorAll(".aim-objective-card");

if ("IntersectionObserver" in window) {
    missionCards.forEach(function (card) {
        card.style.opacity = "0";
        card.style.transform = "translateY(25px)";
        card.style.transition = "opacity 0.8s ease, transform 0.5s ease";

        const cardObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                    cardObserver.unobserve(card);
                }
            });
        }, {
            threshold: 0.2
        });

        cardObserver.observe(card);

        card.addEventListener("mouseenter", function () {
            card.style.transform = "translateY(-6px)";
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "translateY(0)";
        });
    });
}

const memberCards = document.querySelectorAll(".member-card");

if ("IntersectionObserver" in window) {
    const memberObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const card = entry.target;

                card.style.opacity = "1";
                card.style.transform = "translateY(0) scale(1)";

                memberObserver.unobserve(card);
            }
        });
    }, {
        threshold: 0.2
    });

    memberCards.forEach(function (card, index) {
        card.style.opacity = "0";
        card.style.transform = "translateY(40px) scale(0.95)";
        card.style.transition =
            `opacity 0.7s ease ${index * 0.2}s, transform 0.7s ease ${index * 0.2}s`;

        memberObserver.observe(card);

        card.addEventListener("mouseenter", function () {
            card.style.transform = "translateY(-8px) scale(1.02)";
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "translateY(0) scale(1)";
        });
    });
}

const riskPanels = document.querySelectorAll(".risk-panel");

riskPanels.forEach(function (panel) {
    panel.addEventListener("click", function () {
        riskPanels.forEach(function (item) {
            item.classList.remove("active");
        });

        panel.classList.add("active");
    });
});

const checklistItems = document.querySelectorAll(".risk-check-item input");
const progressNumber = document.getElementById("risk-progress-number");
const progressCircle = document.querySelector(".risk-progress-circle");
const checklistMessage = document.getElementById("risk-checklist-message");
const resetButton = document.getElementById("risk-reset-btn");

if (checklistItems.length > 0 && progressNumber && progressCircle && checklistMessage && resetButton) {

    function updateProgress() {
        let completed = 0;

        checklistItems.forEach(function (item) {
            if (item.checked) {
                completed++;
            }
        });

        let percentage = Math.round((completed / checklistItems.length) * 100);

        progressNumber.textContent = percentage + "%";

        progressCircle.style.background =
            `conic-gradient(#73816D ${percentage}%, #D8DCCB ${percentage}%)`;

        if (percentage === 100) {
            checklistMessage.textContent = "Great! You have completed every step.";
        } else if (percentage >= 50) {
            checklistMessage.textContent = "Good progress! Keep preparing.";
        } else if (percentage > 0) {
            checklistMessage.textContent = "You have started your preparation.";
        } else {
            checklistMessage.textContent = "Start checking your preparation steps.";
        }
    }

    checklistItems.forEach(function (item) {
        item.addEventListener("change", updateProgress);
    });

    resetButton.addEventListener("click", function () {
        checklistItems.forEach(function (item) {
            item.checked = false;
        });

        updateProgress();
    });

    updateProgress();
}

const filterButtons = document.querySelectorAll(".filter-btn");
const sourceCards = document.querySelectorAll(".source-card");
const noResults = document.querySelector(".no-results");

if (filterButtons.length > 0 && sourceCards.length > 0) {

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const selected = button.getAttribute("data-filter");
            let found = 0;

            sourceCards.forEach(function (card) {
                const categories = card.getAttribute("data-category") || "";

                if (selected === "all" || categories.includes(selected)) {
                    card.classList.remove("hide");
                    found++;
                } else {
                    card.classList.add("hide");
                }
            });

            if (noResults) {
                noResults.style.display = found === 0 ? "block" : "none";
            }
        });
    });
}

const registerForm = document.getElementById("registerForm");
const registerModal = document.getElementById("registerModal");

const correctAnswers = ["a", "b", "c", "b", "a", "c", "a", "b", "c", "a"];

const startBtn = document.getElementById("startBtn");
const checkBtn = document.getElementById("checkBtn");
const result = document.getElementById("result");
const quizForm = document.getElementById("quizForm");

let pendingScoreCheck = false;

const accountStorage = "slopePointAccounts";
const loginStorage = "slopePointLoggedIn";
const cookieStorage = "slopePointAccounts";

let loginForm;
let registerMessage;
let loginMessage;
let loginLink;
let signupLink;
let signupSwitch;
let modalTitle;
let modalDescription;

function getCookieAccounts() {
    try {
        const cookie = document.cookie
            .split("; ")
            .find(function (item) {
                return item.startsWith(cookieStorage + "=");
            });

        if (!cookie) {
            return [];
        }

        const value = cookie.substring(cookieStorage.length + 1);
        const accounts = JSON.parse(decodeURIComponent(value));

        return Array.isArray(accounts) ? accounts : [];

    } catch (error) {
        return [];
    }
}

function getAccounts() {
    let localAccounts = [];
    let cookieAccounts = [];

    try {
        localAccounts = JSON.parse(
            localStorage.getItem(accountStorage) || "[]"
        );

        if (!Array.isArray(localAccounts)) {
            localAccounts = [];
        }
    } catch (error) {
        localAccounts = [];
    }

    cookieAccounts = getCookieAccounts();

    const accounts = [...localAccounts];

    cookieAccounts.forEach(function (cookieAccount) {
        const exists = accounts.some(function (account) {
            return (
                account &&
                account.email &&
                cookieAccount.email &&
                account.email.trim().toLowerCase() ===
                cookieAccount.email.trim().toLowerCase()
            );
        });

        if (!exists) {
            accounts.push(cookieAccount);
        }
    });

    return accounts.filter(function (account) {
        return (
            account &&
            typeof account.email === "string" &&
            typeof account.password === "string" &&
            typeof account.salt === "string"
        );
    });
}

function saveAccounts(accounts, email) {
    const accountData = JSON.stringify(accounts);
    let localSaved = false;
    let cookieSaved = false;

    try {
        localStorage.setItem(accountStorage, accountData);

        const checkLocal = JSON.parse(
            localStorage.getItem(accountStorage) || "[]"
        );

        localSaved = Array.isArray(checkLocal) &&
            checkLocal.some(function (account) {
                return account.email.trim().toLowerCase() === email;
            });
    } catch (error) {
        localSaved = false;
    }

    try {
        document.cookie =
            cookieStorage + "=" + encodeURIComponent(accountData) +
            "; max-age=31536000; path=/; SameSite=Lax";

        cookieSaved = getCookieAccounts().some(function (account) {
            return account.email.trim().toLowerCase() === email;
        });
    } catch (error) {
        cookieSaved = false;
    }

    return localSaved || cookieSaved;
}

async function hashPassword(password, salt) {
    const text = salt + password;

    if (window.crypto && crypto.subtle) {
        const data = new TextEncoder().encode(text);
        const hash = await crypto.subtle.digest("SHA-256", data);

        return Array.from(new Uint8Array(hash))
            .map(function (byte) {
                return byte.toString(16).padStart(2, "0");
            })
            .join("");
    }

    let hash = 2166136261;

    for (let i = 0; i < text.length; i++) {
        hash ^= text.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }

    return (hash >>> 0).toString(16);
}

function isLoggedIn() {
    return sessionStorage.getItem(loginStorage) !== null;
}

function logoutUser() {
    sessionStorage.removeItem(loginStorage);
}

if (registerForm && registerModal) {

    registerMessage = document.getElementById("registerMessage");
    modalTitle = document.getElementById("registerModalLabel");
    modalDescription = registerModal.querySelector(".register-description");

    registerForm.insertAdjacentHTML("afterend", `
        <p class="account-switch" id="signupSwitch">
            Already have an account?
            <button type="button" id="loginLink">Log in</button>
        </p>

        <form id="loginForm" style="display: none;">
            <label for="loginEmail" class="form-label">Email Address</label>
            <input type="email"
                   class="form-control register-input mb-3"
                   id="loginEmail"
                   placeholder="Enter your email"
                   required>

            <label for="loginPassword" class="form-label">Password</label>
            <input type="password"
                   class="form-control register-input mb-3"
                   id="loginPassword"
                   placeholder="Enter your password"
                   required>

            <p id="loginMessage" class="register-message"></p>

            <button type="submit" class="btn register-submit w-100">
                Log In
            </button>

            <p class="account-switch">
                Don't have an account?
                <button type="button" id="signupLink">Sign up</button>
            </p>
        </form>
    `);

    loginForm = document.getElementById("loginForm");
    loginMessage = document.getElementById("loginMessage");
    loginLink = document.getElementById("loginLink");
    signupLink = document.getElementById("signupLink");
    signupSwitch = document.getElementById("signupSwitch");
}

function showSignup() {
    if (!registerForm) return;

    registerForm.style.display = "block";

    if (loginForm) {
        loginForm.style.display = "none";
        loginForm.reset();
    }

    if (signupSwitch) {
        signupSwitch.style.display = "block";
    }

    if (modalTitle) {
        modalTitle.textContent = "Create an Account";
    }

    if (modalDescription) {
        modalDescription.textContent =
            "Sign up to check your score and see your quiz results.";
    }

    registerForm.reset();

    if (registerMessage) {
        registerMessage.textContent = "";
    }

    if (loginMessage) {
        loginMessage.textContent = "";
    }
}

function showLogin() {
    if (!registerForm || !loginForm) return;

    registerForm.style.display = "none";
    loginForm.style.display = "block";

    if (signupSwitch) {
        signupSwitch.style.display = "none";
    }

    if (modalTitle) {
        modalTitle.textContent = "Welcome Back";
    }

    if (modalDescription) {
        modalDescription.textContent =
            "Log in to your SlopePoint account.";
    }

    registerForm.reset();
    loginForm.reset();

    if (registerMessage) {
        registerMessage.textContent = "";
    }

    if (loginMessage) {
        loginMessage.textContent = "";
    }
}

if (loginLink) {
    loginLink.addEventListener("click", showLogin);
}

if (signupLink) {
    signupLink.addEventListener("click", showSignup);
}

document.querySelectorAll(".sign-up").forEach(function (button) {

    button.addEventListener("click", function (event) {
        event.preventDefault();

        if (isLoggedIn()) {
            alert("You're already logged in!");
            return;
        }

        showSignup();

        if (registerModal && typeof bootstrap !== "undefined") {
            bootstrap.Modal.getOrCreateInstance(registerModal).show();
        }
    });

});

const signInButton = document.getElementById("signInButton");

if (signInButton) {
    signInButton.addEventListener("click", function () {

        showLogin();

        if (registerModal && typeof bootstrap !== "undefined") {
            bootstrap.Modal.getOrCreateInstance(registerModal).show();
        }

    });
}

function animateQuizQuestions() {
    if (!quizForm) return;

    const questions = quizForm.querySelectorAll(".question-card");

    questions.forEach(function (question, index) {
        question.style.opacity = "0";
        question.style.transform = "translateY(15px)";
        question.style.transition = "opacity 0.5s ease, transform 0.5s ease";

        setTimeout(function () {
            question.style.opacity = "1";
            question.style.transform = "translateY(0)";
        }, index * 100);
    });
}

function showAnswerFeedback() {
    if (!quizForm) return;

    for (let i = 1; i <= correctAnswers.length; i++) {
        const answers = quizForm.querySelectorAll(`input[name="q${i}"]`);
        const selectedAnswer = quizForm.querySelector(`input[name="q${i}"]:checked`);

        answers.forEach(function (answer) {
            const label = answer.closest("label");

            if (!label) return;

            label.classList.remove("correct-answer", "wrong-answer");

            if (answer.value === correctAnswers[i - 1]) {
                label.classList.add("correct-answer");
            }

            if (
                selectedAnswer === answer &&
                answer.value !== correctAnswers[i - 1]
            ) {
                label.classList.add("wrong-answer");
            }
        });
    }
}

function clearAnswerFeedback() {
    if (!quizForm) return;

    const answerLabels = quizForm.querySelectorAll(".answer-option");

    answerLabels.forEach(function (label) {
        label.classList.remove("correct-answer", "wrong-answer");
    });
}

function checkQuizScore() {
    if (!quizForm || !result) return;

    let score = 0;
    let unanswered = 0;

    for (let i = 1; i <= correctAnswers.length; i++) {
        const answer = quizForm.querySelector(`input[name="q${i}"]:checked`);

        if (!answer) {
            unanswered++;
        } else if (answer.value === correctAnswers[i - 1]) {
            score++;
        }
    }

    showAnswerFeedback();

    if (unanswered > 0) {
        result.innerHTML = `
            <h3>Please answer all 10 questions.</h3>
            <p>You still have ${unanswered} unanswered question(s).</p>
        `;

        result.style.display = "block";
        result.style.opacity = "1";
        result.style.transform = "translateY(0)";
        return;
    }

    let message = "";

    if (score === 10) {
        message = "Excellent! You have a strong understanding of landslide preparedness.";
    } else if (score >= 7) {
        message = "Good job! You know many important landslide safety steps.";
    } else if (score >= 4) {
        message = "Good effort! Keep learning about landslide safety.";
    } else {
        message = "Keep practising and learning about landslide safety!";
    }

    result.innerHTML = `
        <h3>Your Score: ${score} / 10</h3>
        <p>${message}</p>
    `;

    result.style.display = "block";
    result.style.opacity = "0";
    result.style.transform = "translateY(15px)";
    result.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    setTimeout(function () {
        result.style.opacity = "1";
        result.style.transform = "translateY(0)";
    }, 50);

    startBtn.disabled = false;
    startBtn.textContent = "Start Quiz";
    checkBtn.disabled = true;

    pendingScoreCheck = false;
}

if (quizForm && startBtn && checkBtn && result) {

    startBtn.addEventListener("click", function () {
        quizForm.reset();

        clearAnswerFeedback();

        result.style.display = "none";
        result.innerHTML = "";

        startBtn.textContent = "Quiz Started!";
        startBtn.style.backgroundColor = "#3F5946";
        startBtn.style.color = "#FFFFFF";
        startBtn.style.borderColor = "#3F5946";
        startBtn.style.transform = "scale(0.97)";
        startBtn.style.transition = "all 0.3s ease";
        startBtn.disabled = true;

        checkBtn.disabled = false;

        animateQuizQuestions();
    });

    checkBtn.addEventListener("click", function () {

        if (!isLoggedIn()) {
            pendingScoreCheck = true;

            showSignup();

            if (registerModal && typeof bootstrap !== "undefined") {
                bootstrap.Modal.getOrCreateInstance(registerModal).show();
            }

            return;
        }

        checkQuizScore();
    });
}

if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("studentName").value.trim();
        const email = document.getElementById("studentEmail").value.trim().toLowerCase();
        const password = document.getElementById("studentPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            registerMessage.textContent = "Passwords do not match.";
            return;
        }

        const accounts = getAccounts();

        const existingAccount = accounts.find(function (account) {
            return account.email.trim().toLowerCase() === email;
        });

        if (existingAccount) {
            registerMessage.textContent =
                "An account with this email already exists. Please log in.";
            return;
        }

        const salt = Math.random().toString(36).substring(2) +
            Date.now().toString(36);

        const passwordHash = await hashPassword(password, salt);

        const newAccount = {
            name: name,
            email: email,
            salt: salt,
            password: passwordHash
        };

        accounts.push(newAccount);

        try {
            const saved = saveAccounts(accounts, email);

            if (!saved) {
                registerMessage.textContent =
                    "Your account could not be saved. Please try again.";
                return;
            }
        } catch (error) {
            registerMessage.textContent =
                "Unable to save your account. Please try again.";
            return;
        }

        sessionStorage.setItem(loginStorage, email);

        registerMessage.textContent = "";

        registerForm.reset();

        if (registerModal && typeof bootstrap !== "undefined") {
            bootstrap.Modal.getOrCreateInstance(registerModal).hide();
        }

        if (pendingScoreCheck && quizForm) {
            checkQuizScore();
        }
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        const accounts = getAccounts();

        const existingAccount = accounts.find(function (account) {
            return account.email.trim().toLowerCase() === email;
        });

        if (!existingAccount) {
            loginMessage.textContent =
                "Account doesn't exist. Please sign up first.";
            return;
        }

        const passwordHash = await hashPassword(
            password,
            existingAccount.salt
        );

        if (passwordHash !== existingAccount.password) {
            loginMessage.textContent =
                "Incorrect password. Please try again.";
            return;
        }

        sessionStorage.setItem(loginStorage, email);

        loginMessage.textContent = "";

        loginForm.reset();

        if (registerModal && typeof bootstrap !== "undefined") {
            bootstrap.Modal.getOrCreateInstance(registerModal).hide();
        }

        if (pendingScoreCheck && quizForm) {
            checkQuizScore();
        }
    });
}

/* SAFETY TIPS PAGE */

(function () {

    const stageButtons = document.querySelectorAll(".safety-stage-button");
    const stagePanels = document.querySelectorAll(".safety-stage-panel");

    if (stageButtons.length > 0 && stagePanels.length > 0) {

        document.body.classList.add("safety-js-ready");

        stageButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const selectedStage = button.dataset.safetyStage;

                stageButtons.forEach(function (item) {
                    item.classList.remove("active");
                });

                stagePanels.forEach(function (panel) {
                    panel.classList.remove("is-current");
                });

                button.classList.add("active");

                const selectedPanel = document.querySelector(
                    '[data-safety-panel="' + selectedStage + '"]'
                );

                if (selectedPanel) {
                    selectedPanel.classList.add("is-current");
                }

            });

        });

    }

})();

/* FAQ PAGE */

document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {
        const button = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        button.addEventListener("click", function () {
            const isOpen = item.classList.contains("open");

            faqItems.forEach(function (otherItem) {
                otherItem.classList.remove("open");
                otherItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
            });

            if (!isOpen) {
                item.classList.add("open");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });

    // FAQ entrance animations
    const animatedItems = document.querySelectorAll(".faq-item");

    if ("IntersectionObserver" in window) {
        const faqObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("faq-visible");
                    faqObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        animatedItems.forEach(function (item, index) {
            item.style.transitionDelay = (index * 0.06) + "s";
            faqObserver.observe(item);
        });
    } else {
        animatedItems.forEach(function (item) {
            item.classList.add("faq-visible");
        });
    }

    // Ask your own question
    const askQuestionForm = document.getElementById("askQuestionForm");

    if (!askQuestionForm) {
        return;
    }

    const userQuestion = document.getElementById("userQuestion");
    const questionMessage = document.getElementById("questionMessage");
    const accountModal = document.getElementById("registerModal");

    let pendingQuestion = false;

    function getSubmittedQuestions() {
        try {
            const questions = JSON.parse(
                localStorage.getItem("slopePointQuestions") || "[]"
            );

            return Array.isArray(questions) ? questions : [];

        } catch (error) {
            return [];
        }
    }

    function displaySubmittedQuestions() {
        const questions = getSubmittedQuestions();

        console.log("SlopePoint submitted questions:");
        console.table(questions);
    }

    displaySubmittedQuestions();

    function submitQuestion() {
        const text = userQuestion.value.trim();

        if (!text) {
            questionMessage.textContent = "Please type your question first.";
            return;
        }

        const email = sessionStorage.getItem("slopePointLoggedIn");

        if (!email || typeof getAccounts !== "function") {
            return;
        }

        const account = getAccounts().find(function (item) {
            return item.email.trim().toLowerCase() === email.trim().toLowerCase();
        });

        if (!account) {
            questionMessage.textContent = "Please log in again before submitting your question.";
            return;
        }

        const questions = getSubmittedQuestions();

        questions.unshift({
            text: text,
            name: account.name || "SlopePoint Visitor"
        });

        try {
            localStorage.setItem("slopePointQuestions", JSON.stringify(questions));

            displaySubmittedQuestions();

        } catch (error) {
            questionMessage.textContent = "Your question could not be saved. Please try again.";
            return;
        }

        userQuestion.value = "";
        questionMessage.textContent = "Your question has been submitted!";
    }

    askQuestionForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!userQuestion.value.trim()) {
            questionMessage.textContent = "Please type your question first.";
            return;
        }

        if (typeof isLoggedIn === "function" && isLoggedIn()) {
            submitQuestion();
            return;
        }

        pendingQuestion = true;
        questionMessage.textContent = "Please log in or create an account to submit your question.";

        if (typeof showSignup === "function") {
            showSignup();
        }

        if (accountModal && typeof bootstrap !== "undefined") {
            bootstrap.Modal.getOrCreateInstance(accountModal).show();
        }
    });

    if (accountModal) {
        accountModal.addEventListener("hidden.bs.modal", function () {
            if (pendingQuestion && typeof isLoggedIn === "function" && isLoggedIn()) {
                pendingQuestion = false;
                submitQuestion();
            } else if (pendingQuestion) {
                pendingQuestion = false;
            }
        });
    }

});

/* CONTACT US PAGE */

(function () {

    const contactForm = document.getElementById("contactForm");
    const contactFeedback = document.getElementById("contactFeedback");

    if (contactForm && contactFeedback) {

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            contactFeedback.textContent =
                "Thank you for your message! Your response has been recorded successfully.";

            contactFeedback.classList.add("show");

            contactForm.reset();
        });

    }

})();

const subjectSelect = document.getElementById("subjectSelect");
const subjectInput = document.getElementById("subject");

if (subjectSelect && subjectInput) {
    subjectSelect.addEventListener("change", function () {
        subjectInput.value = this.value;
    });
}


const privacyToggle = document.getElementById("privacyToggle");
const privacyInstructions = document.getElementById("privacyInstructions");

if (privacyToggle && privacyInstructions) {
    privacyToggle.addEventListener("click", function () {
        const isOpen = privacyToggle.getAttribute("aria-expanded") === "true";

        privacyToggle.setAttribute("aria-expanded", !isOpen);
        privacyToggle.classList.toggle("active");
        privacyInstructions.hidden = isOpen;
    });
}

