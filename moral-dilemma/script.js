// Data: 8 Diverse moral dilemmas and their choices
const questions = [
    {
        dilemma:
            "A runaway trolley is heading toward five workers. You can pull a lever to divert it onto another track, but there is one worker on that track. What do you do?",
        choices: [
            {
                text: "Pull the lever (Sacrifice 1 to save 5)",
                trait: "utilitarian",
            },
            {
                text: "Do nothing (Refuse to actively cause a death)",
                trait: "deontological",
            },
            {
                text: "Throw yourself on the tracks to stop it",
                trait: "virtue",
            },
        ],
    },
    {
        dilemma:
            "You find a wallet containing $5,000 in cash. The ID inside belongs to a notoriously corrupt billionaire. You are currently struggling to pay for your family's basic needs. What do you do?",
        choices: [
            {
                text: "Return the wallet untouched. Stealing is always wrong.",
                trait: "deontological",
            },
            { text: "Keep the cash to feed your family.", trait: "care" },
            {
                text: "Keep the cash and donate it to a local orphanage.",
                trait: "utilitarian",
            },
        ],
    },
    {
        dilemma:
            "Your best friend is wearing a terrible outfit to a crucial job interview and asks if they look good. There is no time for them to change. What do you do?",
        choices: [
            {
                text: "Lie and say they look great to boost their confidence.",
                trait: "care",
            },
            {
                text: "Tell the truth kindly but firmly. Honesty matters most.",
                trait: "virtue",
            },
            {
                text: "Calculate if the bad outfit will actually cost them the job before answering.",
                trait: "utilitarian",
            },
        ],
    },
    {
        dilemma:
            "You have the skills to hack into a massive, unethical corporation and redirect millions of their dollars to a charity that will cure a rare disease. Do you do it?",
        choices: [
            {
                text: "Yes, the cure will save thousands of lives.",
                trait: "utilitarian",
            },
            {
                text: "No, theft is a violation of fundamental rights, regardless of the target.",
                trait: "deontological",
            },
            {
                text: "No, but I will use my skills to legally expose their unethical practices instead.",
                trait: "virtue",
            },
        ],
    },
    {
        dilemma:
            "Your closest friend dies suddenly. Just before passing, they made you swear to destroy their secret diary without reading it. The police tell you the diary might contain clues to catch a serial killer. What do you do?",
        choices: [
            {
                text: "Destroy it. An oath to a dying friend is unbreakable.",
                trait: "deontological",
            },
            {
                text: "Give it to the police to save future victims.",
                trait: "utilitarian",
            },
            {
                text: "Destroy it to protect your friend's grieving family from the shame of its contents.",
                trait: "care",
            },
        ],
    },
    {
        dilemma:
            "You are on a sinking lifeboat that is over capacity. Unless one person is thrown overboard, everyone will drown. What do you do?",
        choices: [
            {
                text: "Refuse to throw anyone overboard. Everyone has an equal right to life.",
                trait: "deontological",
            },
            {
                text: "Calculate who is the oldest or sickest and throw them overboard to save the rest.",
                trait: "utilitarian",
            },
            {
                text: "Volunteer to jump overboard yourself to save the others.",
                trait: "virtue",
            },
        ],
    },
    {
        dilemma:
            "A new AI doctor can diagnose illnesses with 100% accuracy, saving millions of lives, but it treats patients with cold, robotic indifference. Do you implement it?",
        choices: [
            {
                text: "Yes, saving lives is mathematically the highest priority.",
                trait: "utilitarian",
            },
            {
                text: "No, human compassion and bedside manner are essential to healing.",
                trait: "care",
            },
            {
                text: "Implement it only as a tool for human doctors to use, preserving the human touch.",
                trait: "virtue",
            },
        ],
    },
    {
        dilemma:
            "You find a time machine. You can go back in time and kill a ruthless dictator when they are just an innocent child. What do you do?",
        choices: [
            {
                text: "Kill the child. It will prevent a war and save millions.",
                trait: "utilitarian",
            },
            {
                text: "Leave the child alone. Murdering an innocent is inherently evil, regardless of the future.",
                trait: "deontological",
            },
            {
                text: "Kidnap the child and raise them with love to change their destiny.",
                trait: "care",
            },
        ],
    },
];

// State variables for our 4 distinct personality traits
let currentQuestionIndex = 0;
let scores = {
    utilitarian: 0,
    deontological: 0,
    virtue: 0,
    care: 0,
};

// DOM Elements
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const questionText = document.getElementById("question-text");
const choicesBox = document.getElementById("choices-box");
const currentQNum = document.getElementById("current-q-num");
const totalQNum = document.getElementById("total-q-num");
const resultTitle = document.getElementById("result-title");
const resultDesc = document.getElementById("result-desc");
const restartBtn = document.getElementById("restart-btn");

// Initialize the quiz
function initQuiz() {
    totalQNum.textContent = questions.length;
    renderQuestion();
}

// Display the current question and choices
function renderQuestion() {
    choicesBox.innerHTML = ""; // Clear previous buttons
    currentQNum.textContent = currentQuestionIndex + 1; // Update progress

    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.dilemma;

    // Create a button for each choice dynamically
    currentQuestion.choices.forEach((choice) => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.classList.add("btn");
        button.addEventListener("click", () => handleChoice(choice.trait));
        choicesBox.appendChild(button);
    });
}

// Process the user's choice
function handleChoice(trait) {
    scores[trait]++; // Increment the specific philosophy score

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

// Calculate the dominant trait and display the final personality profile
function showResults() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    // Find the trait with the highest score
    let highestTrait = "";
    let maxScore = -1;

    for (const [trait, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            highestTrait = trait;
        }
    }

    // Assign outcomes based on the winning trait
    if (highestTrait === "utilitarian") {
        resultTitle.textContent = "The Pragmatic Maximizer";
        resultDesc.textContent =
            "You view the world through the lens of Utilitarianism. To you, the ends justify the means. You look at the big picture and prioritize the greater good, aiming to maximize positive outcomes for the largest number of people. You are highly analytical, logical, and willing to make tough, uncomfortable choices if it means a better mathematical outcome.";
    } else if (highestTrait === "deontological") {
        resultTitle.textContent = "The Principled Idealist";
        resultDesc.textContent =
            "You align with Deontological ethics. You possess a strict internal moral code based on duty, rules, and fundamental human rights. You believe that certain actions (like lying or stealing) are inherently wrong, regardless of the consequences. You are highly reliable, fiercely principled, and refuse to compromise your core values.";
    } else if (highestTrait === "virtue") {
        resultTitle.textContent = "The Paragon of Character";
        resultDesc.textContent =
            "Your choices align with Virtue Ethics. Rather than just focusing on rules or outcomes, you focus on the kind of person you are being. You prioritize personal integrity, bravery, and striving for moral excellence. You believe in acting honorably and being a role model, often choosing the path that requires the most personal courage.";
    } else if (highestTrait === "care") {
        resultTitle.textContent = "The Empathic Guardian";
        resultDesc.textContent =
            "Your worldview is driven by the Ethics of Care. Above all else, you value interpersonal relationships, empathy, and compassion. You prioritize minimizing emotional pain and protecting the vulnerable. Rather than relying on cold logic or rigid rules, you evaluate dilemmas based on how they impact the people you love and the community around you.";
    } else {
        // Fallback for an exact tie across all boards
        resultTitle.textContent = "The Complex Thinker";
        resultDesc.textContent =
            "You don't fit into a single philosophical box. You dynamically shift your moral framework depending on the context—sometimes prioritizing rules, sometimes the greater good, and sometimes pure empathy. You see the deep nuances in every situation.";
    }
}

// Reset the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    scores = { utilitarian: 0, deontological: 0, virtue: 0, care: 0 };
    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    renderQuestion();
}

// Event Listeners
restartBtn.addEventListener("click", restartQuiz);

// Start the app
initQuiz();
