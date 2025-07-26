// script.js

// Navigation functionality
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Update active nav link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// File upload functionality
const resumeUpload = document.getElementById('resume-upload');
const resumeFile = document.getElementById('resume-file');
const resumeInfo = document.getElementById('resume-info');
const resumeName = document.getElementById('resume-name');
const jdFile = document.getElementById('jd-file');
const jdText = document.getElementById('jd-text');
const analyzeBtn = document.getElementById('analyze-btn');

// Resume upload
resumeUpload.addEventListener('click', () => {
    resumeFile.click();
});

resumeUpload.addEventListener('dragover', (e) => {
    e.preventDefault();
    resumeUpload.classList.add('drag-over');
});

resumeUpload.addEventListener('dragleave', () => {
    resumeUpload.classList.remove('drag-over');
});

resumeUpload.addEventListener('drop', (e) => {
    e.preventDefault();
    resumeUpload.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleResumeFile(files[0]);
    }
});

resumeFile.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleResumeFile(e.target.files[0]);
    }
});

function handleResumeFile(file) {
    if (file.type === 'application/pdf') {
        resumeName.textContent = file.name;
        resumeInfo.style.display = 'flex';
        document.querySelector('#resume-upload > i').style.display = 'none';
        document.querySelector('#resume-upload > h3').style.display = 'none';
        document.querySelector('#resume-upload > p').style.display = 'none';
        checkAnalyzeButton();
    } else {
        alert('Please upload a PDF file');
    }
}

function removeFile(type) {
    if (type === 'resume') {
        resumeFile.value = '';
        resumeInfo.style.display = 'none';
        document.querySelector('#resume-upload > i').style.display = 'block';
        document.querySelector('#resume-upload > h3').style.display = 'block';
        document.querySelector('#resume-upload > p').style.display = 'block';
    }
    checkAnalyzeButton();
}

// JD file upload
jdFile.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            jdText.value = e.target.result;
            checkAnalyzeButton();
        };
        reader.readAsText(file);
    }
});

jdText.addEventListener('input', checkAnalyzeButton);

function checkAnalyzeButton() {
    const hasResume = resumeFile.files.length > 0;
    const hasJD = jdText.value.trim().length > 0;
    analyzeBtn.disabled = !(hasResume && hasJD);
}

// Analyze functionality
analyzeBtn.addEventListener('click', () => {
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    analyzeBtn.disabled = true;
    
    setTimeout(() => {
        showResults();
        analyzeBtn.innerHTML = '<i class="fas fa-chart-line"></i> Analyze Match';
        analyzeBtn.disabled = false;
    }, 3000);
});

function showResults() {
    const resultsContainer = document.getElementById('results-container');
    const scoreProgress = document.getElementById('score-progress');
    const matchScore = document.getElementById('match-score');
    const suggestionsList = document.getElementById('suggestions-list');
    
    // Show results
    resultsContainer.style.display = 'grid';
    
    // Animate score
    const score = 85;
    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (score / 100) * circumference;
    
    setTimeout(() => {
        scoreProgress.style.strokeDashoffset = offset;
    }, 500);
    
    // Animate score number
    let currentScore = 0;
    const scoreInterval = setInterval(() => {
        currentScore++;
        matchScore.textContent = currentScore;
        if (currentScore >= score) {
            clearInterval(scoreInterval);
        }
    }, 30);
    
    // Show suggestions
    const suggestions = [
        {
            title: "Add Technical Skills",
            description: "Include specific programming languages and tools mentioned in the job description."
        },
        {
            title: "Quantify Achievements",
            description: "Add numbers and metrics to demonstrate the impact of your work."
        },
        {
            title: "Include Keywords",
            description: "Use more industry-specific terms from the job posting."
        },
        {
            title: "Expand Experience Section",
            description: "Provide more details about relevant projects and responsibilities."
        }
    ];
    
    suggestionsList.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item">
            <h4>${suggestion.title}</h4>
            <p>${suggestion.description}</p>
        </div>
    `).join('');
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

// Interview Prep functionality
function switchTab(tabName) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Flashcard functionality
let currentCardIndex = 0;
const flashcards = [
    {
        question: "Tell me about a time when you faced a challenging situation at work and how you handled it.",
        category: "Behavioral",
        answer: {
            title: "STAR Method Approach:",
            points: [
                "Situation: Describe the context",
                "Task: Explain your responsibility", 
                "Action: Detail what you did",
                "Result: Share the outcome"
            ],
            tip: "Choose a real example that shows problem-solving and positive results."
        }
    },
    {
        question: "Where do you see yourself in 5 years?",
        category: "Career Goals",
        answer: {
            title: "Structure your answer:",
            points: [
                "Show ambition but be realistic",
                "Align with company growth opportunities",
                "Mention skill development goals",
                "Express commitment to the field"
            ],
            tip: "Avoid mentioning other companies or completely different careers."
        }
    },
    {
        question: "What is your greatest weakness?",
        category: "Self-Assessment",
        answer: {
            title: "Framework to follow:",
            points: [
                "Choose a real weakness (not a strength in disguise)",
                "Explain what you're doing to improve",
                "Show self-awareness and growth mindset",
                "Keep it professional and relevant"
            ],
            tip: "Avoid clichés like 'I'm a perfectionist' - be authentic."
        }
    }
];

function updateFlashcard() {
    const card = flashcards[currentCardIndex];
    const flashcard = document.getElementById('flashcard');
    
    // Reset flip state
    flashcard.classList.remove('flipped');
    
    // Update content
    document.querySelectorAll('.card-number').forEach(el => {
        el.textContent = `${currentCardIndex + 1} / ${flashcards.length}`;
    });
    
    document.querySelector('.card-category').textContent = card.category;
    document.querySelector('.card-question h3').textContent = card.question;
    
    const answerContent = document.querySelector('.card-answer');
    answerContent.innerHTML = `
        <h4>${card.answer.title}</h4>
        <ul>
            ${card.answer.points.map(point => `<li><strong>${point.split(':')[0]}:</strong> ${point.split(':')[1] || point}</li>`).join('')}
        </ul>
        <p><strong>Tip:</strong> ${card.answer.tip}</p>
    `;
}

function flipCard() {
    document.getElementById('flashcard').classList.toggle('flipped');
}

function nextCard() {
    if (currentCardIndex < flashcards.length - 1) {
        currentCardIndex++;
        updateFlashcard();
    }
}

function previousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        updateFlashcard();
    }
}

// Mock Interview functionality
let currentQuestionIndex = 0;
const interviewQuestions = [
    "Tell me about yourself and why you're interested in this position.",
    "What are your greatest strengths and how do they apply to this role?",
    "Describe a challenging project you worked on and how you overcame obstacles.",
    "How do you handle stress and pressure in the workplace?",
    "What questions do you have for us about the company or role?"
];

function updateInterviewQuestion() {
    const question = interviewQuestions[currentQuestionIndex];
    document.getElementById('interview-question').textContent = question;
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = interviewQuestions.length;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / interviewQuestions.length) * 100;
    document.getElementById('interview-progress').style.width = progress + '%';
    
    // Update button states
    document.getElementById('prev-question-btn').disabled = currentQuestionIndex === 0;
    document.getElementById('next-question-btn').disabled = currentQuestionIndex === interviewQuestions.length - 1;
    
    // Clear previous answer
    document.getElementById('user-answer').value = '';
    updateWordCount();
}

function nextQuestion() {
    if (currentQuestionIndex < interviewQuestions.length - 1) {
        currentQuestionIndex++;
        updateInterviewQuestion();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateInterviewQuestion();
    }
}

function submitAnswer() {
    const answer = document.getElementById('user-answer').value.trim();
    if (answer) {
        // Simulate processing
        const submitBtn = document.querySelector('.submit-answer-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Move to next question automatically
            if (currentQuestionIndex < interviewQuestions.length - 1) {
                nextQuestion();
            } else {
                alert('Interview completed! Thank you for your responses.');
            }
        }, 2000);
    } else {
        alert('Please provide an answer before submitting.');
    }
}

// Word count functionality
document.getElementById('user-answer').addEventListener('input', updateWordCount);

function updateWordCount() {
    const text = document.getElementById('user-answer').value.trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    document.getElementById('word-count').textContent = wordCount;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateFlashcard();
    updateInterviewQuestion();
});
