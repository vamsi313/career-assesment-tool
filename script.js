// Global Variables
let currentAssessment = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let assessmentData = {};

// Assessment Questions Database
const assessmentQuestions = {
    personality: [
        {
            question: "When working on a project, I prefer to:",
            options: [
                { text: "Work independently and set my own pace", score: { introvert: 3, extrovert: 1 } },
                { text: "Collaborate with a team and brainstorm ideas", score: { introvert: 1, extrovert: 3 } },
                { text: "Lead the team and coordinate tasks", score: { introvert: 1, extrovert: 4, leader: 3 } },
                { text: "Support others and help where needed", score: { introvert: 2, extrovert: 2, supportive: 3 } }
            ]
        },
        {
            question: "In problem-solving situations, I tend to:",
            options: [
                { text: "Analyze data and facts thoroughly before deciding", score: { analytical: 4, intuitive: 1 } },
                { text: "Trust my instincts and go with my gut feeling", score: { analytical: 1, intuitive: 4 } },
                { text: "Seek input from others before making decisions", score: { collaborative: 3, independent: 1 } },
                { text: "Try multiple approaches until something works", score: { experimental: 3, systematic: 1 } }
            ]
        },
        {
            question: "My ideal work environment would be:",
            options: [
                { text: "A quiet office where I can focus deeply", score: { introvert: 3, structured: 2 } },
                { text: "An open workspace with lots of interaction", score: { extrovert: 3, collaborative: 2 } },
                { text: "A dynamic environment with frequent changes", score: { adaptable: 3, routine: 1 } },
                { text: "A structured setting with clear procedures", score: { structured: 3, adaptable: 1 } }
            ]
        },
        {
            question: "When learning new skills, I prefer:",
            options: [
                { text: "Hands-on practice and experimentation", score: { kinesthetic: 3, theoretical: 1 } },
                { text: "Reading detailed guides and documentation", score: { theoretical: 3, kinesthetic: 1 } },
                { text: "Watching demonstrations and tutorials", score: { visual: 3, auditory: 1 } },
                { text: "Discussing with experts and asking questions", score: { auditory: 3, visual: 1 } }
            ]
        },
        {
            question: "In group discussions, I usually:",
            options: [
                { text: "Listen carefully and contribute thoughtful insights", score: { introvert: 3, analytical: 2 } },
                { text: "Share ideas enthusiastically and energize others", score: { extrovert: 4, leader: 2 } },
                { text: "Ask probing questions to understand better", score: { analytical: 3, curious: 3 } },
                { text: "Help mediate different viewpoints", score: { supportive: 3, diplomatic: 3 } }
            ]
        }
    ],
    skills: [
        {
            question: "Rate your programming and coding abilities:",
            options: [
                { text: "Expert - I can develop complex applications", score: { technical: 5, programming: 5 } },
                { text: "Advanced - I'm comfortable with multiple languages", score: { technical: 4, programming: 4 } },
                { text: "Intermediate - I can write functional code", score: { technical: 3, programming: 3 } },
                { text: "Beginner - I understand basic concepts", score: { technical: 2, programming: 2 } },
                { text: "No experience - I'm new to programming", score: { technical: 1, programming: 1 } }
            ]
        },
        {
            question: "How would you rate your data analysis skills:",
            options: [
                { text: "Expert - I can perform complex statistical analysis", score: { analytical: 5, data: 5 } },
                { text: "Advanced - I'm comfortable with data tools and visualization", score: { analytical: 4, data: 4 } },
                { text: "Intermediate - I can work with spreadsheets and basic analysis", score: { analytical: 3, data: 3 } },
                { text: "Beginner - I understand basic data concepts", score: { analytical: 2, data: 2 } },
                { text: "No experience - Data analysis is new to me", score: { analytical: 1, data: 1 } }
            ]
        },
        {
            question: "Your communication and presentation skills:",
            options: [
                { text: "Excellent - I can present to large audiences confidently", score: { communication: 5, leadership: 3 } },
                { text: "Good - I'm comfortable presenting to small groups", score: { communication: 4, leadership: 2 } },
                { text: "Average - I can communicate ideas clearly in writing", score: { communication: 3, writing: 3 } },
                { text: "Developing - I'm working on improving my communication", score: { communication: 2 } },
                { text: "Needs improvement - I prefer written communication", score: { communication: 1, writing: 2 } }
            ]
        },
        {
            question: "How experienced are you with project management:",
            options: [
                { text: "Expert - I can manage complex projects with multiple teams", score: { management: 5, leadership: 4 } },
                { text: "Advanced - I've successfully led several projects", score: { management: 4, leadership: 3 } },
                { text: "Intermediate - I can manage small projects independently", score: { management: 3, leadership: 2 } },
                { text: "Beginner - I understand project management basics", score: { management: 2, leadership: 1 } },
                { text: "No experience - I haven't managed projects before", score: { management: 1 } }
            ]
        },
        {
            question: "Your creative and design abilities:",
            options: [
                { text: "Excellent - I create original designs and innovative solutions", score: { creative: 5, design: 5 } },
                { text: "Good - I can create appealing designs with tools", score: { creative: 4, design: 4 } },
                { text: "Average - I have some creative ideas and basic design skills", score: { creative: 3, design: 3 } },
                { text: "Developing - I'm learning design principles and tools", score: { creative: 2, design: 2 } },
                { text: "Limited - I prefer working with existing designs", score: { creative: 1, design: 1 } }
            ]
        }
    ],
    interest: [
        {
            question: "Which type of work activities interest you most:",
            options: [
                { text: "Building and creating new products or solutions", score: { builder: 4, creator: 3 } },
                { text: "Analyzing complex problems and finding solutions", score: { analyst: 4, investigator: 3 } },
                { text: "Working with people and helping them succeed", score: { helper: 4, social: 3 } },
                { text: "Leading teams and driving organizational change", score: { leader: 4, entrepreneur: 3 } }
            ]
        },
        {
            question: "In your free time, you're most likely to:",
            options: [
                { text: "Work on personal projects or learn new technologies", score: { technical: 3, learner: 3 } },
                { text: "Read about industry trends and innovations", score: { researcher: 3, strategic: 3 } },
                { text: "Volunteer for causes you care about", score: { social: 4, helper: 3 } },
                { text: "Network with professionals in your field", score: { networker: 3, social: 2 } }
            ]
        },
        {
            question: "What motivates you most in your career:",
            options: [
                { text: "Creating innovative solutions that make a difference", score: { innovator: 4, impact: 3 } },
                { text: "Achieving financial success and career advancement", score: { achiever: 4, ambitious: 3 } },
                { text: "Having work-life balance and job security", score: { balanced: 4, security: 3 } },
                { text: "Continuous learning and skill development", score: { learner: 4, growth: 3 } }
            ]
        },
        {
            question: "Which work environment appeals to you most:",
            options: [
                { text: "Fast-paced startup with lots of growth opportunities", score: { entrepreneur: 4, adaptable: 3 } },
                { text: "Established corporation with structured career paths", score: { corporate: 4, structured: 3 } },
                { text: "Research institution focused on discovery and innovation", score: { researcher: 4, academic: 3 } },
                { text: "Non-profit organization making social impact", score: { social: 4, mission_driven: 3 } }
            ]
        },
        {
            question: "Your ideal role would involve:",
            options: [
                { text: "Designing and developing technical solutions", score: { technical: 4, builder: 3 } },
                { text: "Managing teams and business operations", score: { manager: 4, leader: 3 } },
                { text: "Researching and analyzing market trends", score: { analyst: 4, strategic: 3 } },
                { text: "Consulting and advising clients on solutions", score: { consultant: 4, advisor: 3 } }
            ]
        }
    ]
};

// Career Database
const careerDatabase = [
    {
        title: "Software Engineer",
        category: "technology",
        description: "Design, develop, and maintain software applications and systems.",
        tags: ["Programming", "Problem Solving", "Technology"],
        salary: "₹6-25 LPA",
        requirements: { technical: 4, programming: 4, analytical: 3 },
        suitableFor: ["B.Tech", "M.Tech", "BCA", "MCA"]
    },
    {
        title: "Data Scientist",
        category: "technology",
        description: "Analyze complex data to derive insights and build predictive models.",
        tags: ["Data Analysis", "Machine Learning", "Statistics"],
        salary: "₹8-30 LPA",
        requirements: { analytical: 5, data: 4, programming: 3 },
        suitableFor: ["B.Tech", "M.Tech", "MBA", "M.Sc"]
    },
    {
        title: "Product Manager",
        category: "business",
        description: "Lead product development and strategy from conception to launch.",
        tags: ["Strategy", "Leadership", "Communication"],
        salary: "₹12-40 LPA",
        requirements: { management: 4, leadership: 4, communication: 4 },
        suitableFor: ["MBA", "B.Tech", "BBA"]
    },
    {
        title: "Management Consultant",
        category: "business",
        description: "Help organizations solve complex business problems and improve efficiency.",
        tags: ["Strategy", "Problem Solving", "Business Analysis"],
        salary: "₹15-50 LPA",
        requirements: { analytical: 5, communication: 4, strategic: 4 },
        suitableFor: ["MBA", "BBA", "B.Tech"]
    },
    {
        title: "UX/UI Designer",
        category: "technology",
        description: "Create user-friendly and visually appealing digital interfaces.",
        tags: ["Design", "User Research", "Creativity"],
        salary: "₹4-20 LPA",
        requirements: { creative: 4, design: 5, empathy: 3 },
        suitableFor: ["B.Des", "B.Tech", "BFA"]
    },
    {
        title: "Financial Analyst",
        category: "business",
        description: "Analyze financial data and market trends to guide investment decisions.",
        tags: ["Finance", "Analysis", "Mathematics"],
        salary: "₹5-18 LPA",
        requirements: { analytical: 4, data: 3, detail_oriented: 4 },
        suitableFor: ["MBA", "BBA", "B.Com", "CA"]
    },
    {
        title: "Research Scientist",
        category: "research",
        description: "Conduct scientific research and experiments to advance knowledge.",
        tags: ["Research", "Analysis", "Innovation"],
        salary: "₹6-25 LPA",
        requirements: { researcher: 5, analytical: 4, curious: 5 },
        suitableFor: ["M.Tech", "M.Sc", "PhD"]
    },
    {
        title: "DevOps Engineer",
        category: "technology",
        description: "Streamline software development and deployment processes.",
        tags: ["Automation", "Cloud", "System Administration"],
        salary: "₹7-28 LPA",
        requirements: { technical: 4, systematic: 4, problem_solving: 4 },
        suitableFor: ["B.Tech", "M.Tech", "MCA"]
    },
    {
        title: "Digital Marketing Manager",
        category: "business",
        description: "Develop and execute digital marketing strategies across various channels.",
        tags: ["Marketing", "Analytics", "Creativity"],
        salary: "₹4-15 LPA",
        requirements: { creative: 3, analytical: 3, communication: 4 },
        suitableFor: ["MBA", "BBA", "B.Com"]
    },
    {
        title: "Cybersecurity Specialist",
        category: "technology",
        description: "Protect organizations from cyber threats and security breaches.",
        tags: ["Security", "Risk Assessment", "Technology"],
        salary: "₹8-35 LPA",
        requirements: { technical: 4, analytical: 4, detail_oriented: 5 },
        suitableFor: ["B.Tech", "M.Tech", "Cybersecurity Certification"]
    },
    {
        title: "Business Analyst",
        category: "business",
        description: "Bridge business needs with technical solutions through analysis and documentation.",
        tags: ["Analysis", "Documentation", "Problem Solving"],
        salary: "₹5-20 LPA",
        requirements: { analytical: 4, communication: 4, systematic: 3 },
        suitableFor: ["MBA", "BBA", "B.Tech"]
    },
    {
        title: "AI/ML Engineer",
        category: "technology",
        description: "Develop artificial intelligence and machine learning solutions.",
        tags: ["Machine Learning", "AI", "Programming"],
        salary: "₹10-45 LPA",
        requirements: { technical: 5, programming: 5, mathematical: 4 },
        suitableFor: ["B.Tech", "M.Tech", "M.Sc"]
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const assessmentModal = document.getElementById('assessmentModal');
const resultsModal = document.getElementById('resultsModal');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    populateCareersGrid();
    setupEventListeners();
});

function initializeApp() {
    // Mobile menu toggle
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').style.display = 'none';
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

function setupEventListeners() {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Admin panel toggle
    const adminLink = document.querySelector('.admin-link');
    adminLink?.addEventListener('click', (e) => {
        e.preventDefault();
        toggleAdminPanel();
    });
}

function startAssessment() {
    scrollToSection('assessments');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function openAssessment(type) {
    currentAssessment = type;
    currentQuestionIndex = 0;
    userAnswers = [];
    
    const modal = document.getElementById('assessmentModal');
    const title = document.getElementById('modalTitle');
    
    const titles = {
        personality: 'Personality Assessment',
        skills: 'Skills Evaluation',
        interest: 'Interest Profiler',
        comprehensive: 'Comprehensive Career Assessment'
    };
    
    title.textContent = titles[type];
    
    if (type === 'comprehensive') {
        // Combine all question types
        assessmentData = {
            questions: [
                ...assessmentQuestions.personality,
                ...assessmentQuestions.skills,
                ...assessmentQuestions.interest
            ],
            type: 'comprehensive'
        };
    } else {
        assessmentData = {
            questions: assessmentQuestions[type] || [],
            type: type
        };
    }
    
    document.getElementById('totalQuestions').textContent = assessmentData.questions.length;
    loadQuestion();
    modal.style.display = 'block';
}

function loadQuestion() {
    const question = assessmentData.questions[currentQuestionIndex];
    if (!question) return;
    
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / assessmentData.questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').textContent = 
        currentQuestionIndex === assessmentData.questions.length - 1 ? 'Finish' : 'Next';
}

function selectOption(optionIndex) {
    // Remove previous selection
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Mark current selection
    document.querySelectorAll('.option-btn')[optionIndex].classList.add('selected');
    
    // Store answer
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Enable next button
    document.getElementById('nextBtn').disabled = false;
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
        
        // Restore previous answer if exists
        if (userAnswers[currentQuestionIndex] !== undefined) {
            const optionBtns = document.querySelectorAll('.option-btn');
            optionBtns[userAnswers[currentQuestionIndex]].classList.add('selected');
            document.getElementById('nextBtn').disabled = false;
        }
    }
}

function nextQuestion() {
    if (userAnswers[currentQuestionIndex] === undefined) {
        alert('Please select an answer before proceeding.');
        return;
    }
    
    if (currentQuestionIndex < assessmentData.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        // Assessment complete
        finishAssessment();
    }
}

function finishAssessment() {
    assessmentModal.style.display = 'none';
    calculateResults();
    showResults();
}

function calculateResults() {
    const results = {
        personality: {},
        skills: {},
        interests: {},
        recommendations: []
    };
    
    // Calculate scores based on answers
    assessmentData.questions.forEach((question, qIndex) => {
        const answerIndex = userAnswers[qIndex];
        if (answerIndex !== undefined) {
            const selectedOption = question.options[answerIndex];
            
            // Add scores from this answer
            for (const [trait, score] of Object.entries(selectedOption.score)) {
                if (!results.personality[trait]) results.personality[trait] = 0;
                results.personality[trait] += score;
            }
        }
    });
    
    // Generate career recommendations
    results.recommendations = generateCareerRecommendations(results.personality);
    
    return results;
}

function generateCareerRecommendations(userProfile) {
    const recommendations = [];
    
    careerDatabase.forEach(career => {
        let matchScore = 0;
        let totalRequirements = 0;
        
        // Calculate match score based on requirements
        for (const [skill, requiredLevel] of Object.entries(career.requirements)) {
            totalRequirements += requiredLevel;
            const userLevel = userProfile[skill] || 0;
            
            // Calculate percentage match for this skill
            const skillMatch = Math.min(userLevel / requiredLevel, 1) * requiredLevel;
            matchScore += skillMatch;
        }
        
        // Calculate percentage match
        const matchPercentage = Math.round((matchScore / totalRequirements) * 100);
        
        if (matchPercentage > 30) { // Only show careers with >30% match
            recommendations.push({
                ...career,
                matchPercentage
            });
        }
    });
    
    // Sort by match percentage
    return recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 8);
}

function showResults() {
    const results = calculateResults();
    const modal = document.getElementById('resultsModal');
    
    // Display personality results
    displayPersonalityResults(results.personality);
    
    // Display career recommendations
    displayCareerRecommendations(results.recommendations);
    
    // Display skills breakdown
    displaySkillsBreakdown(results.personality);
    
    modal.style.display = 'block';
}

function displayPersonalityResults(personality) {
    const container = document.getElementById('personalityChart');
    container.innerHTML = '';
    
    // Get top personality traits
    const topTraits = Object.entries(personality)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 6);
    
    topTraits.forEach(([trait, score]) => {
        const traitDiv = document.createElement('div');
        traitDiv.className = 'personality-trait';
        
        traitDiv.innerHTML = `
            <span class="trait-name">${capitalizeFirst(trait.replace('_', ' '))}</span>
            <span class="trait-score">${score}</span>
        `;
        
        container.appendChild(traitDiv);
    });
}

function displayCareerRecommendations(recommendations) {
    const container = document.getElementById('careerRecommendations');
    container.innerHTML = '';
    
    recommendations.forEach(career => {
        const careerDiv = document.createElement('div');
        careerDiv.className = 'career-recommendation';
        
        careerDiv.innerHTML = `
            <h5>${career.title}</h5>
            <p>${career.description}</p>
            <div class="career-tags">
                ${career.tags.map(tag => `<span class="career-tag">${tag}</span>`).join('')}
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                <span class="career-salary">${career.salary}</span>
                <span class="match-percentage">${career.matchPercentage}% Match</span>
            </div>
        `;
        
        container.appendChild(careerDiv);
    });
}

function displaySkillsBreakdown(personality) {
    const container = document.getElementById('skillsChart');
    container.innerHTML = '';
    
    // Define key skills to display
    const keySkills = ['technical', 'analytical', 'communication', 'leadership', 'creative', 'management'];
    
    keySkills.forEach(skill => {
        const score = personality[skill] || 0;
        const maxScore = 20; // Approximate maximum score
        const percentage = Math.min((score / maxScore) * 100, 100);
        
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-bar';
        
        skillDiv.innerHTML = `
            <span class="skill-name">${capitalizeFirst(skill)}</span>
            <div class="skill-progress">
                <div class="skill-fill" style="width: ${percentage}%"></div>
            </div>
            <span class="skill-score">${score}</span>
        `;
        
        container.appendChild(skillDiv);
    });
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Career Explorer Functions
function populateCareersGrid() {
    const grid = document.getElementById('careersGrid');
    if (!grid) return;
    
    displayCareers(careerDatabase);
}

function displayCareers(careers) {
    const grid = document.getElementById('careersGrid');
    grid.innerHTML = '';
    
    careers.forEach(career => {
        const careerCard = document.createElement('div');
        careerCard.className = 'career-card';
        careerCard.setAttribute('data-category', career.category);
        
        careerCard.innerHTML = `
            <h3>${career.title}</h3>
            <p>${career.description}</p>
            <div class="career-tags">
                ${career.tags.map(tag => `<span class="career-tag">${tag}</span>`).join('')}
            </div>
            <div class="career-salary">${career.salary}</div>
            <div style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;">
                Suitable for: ${career.suitableFor.join(', ')}
            </div>
        `;
        
        careerCard.addEventListener('click', () => showCareerDetails(career));
        grid.appendChild(careerCard);
    });
}

function filterCareers(category) {
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter careers
    const filteredCareers = category === 'all' 
        ? careerDatabase 
        : careerDatabase.filter(career => career.category === category);
    
    displayCareers(filteredCareers);
}

function showCareerDetails(career) {
    // Create detailed career modal (simplified for this example)
    alert(`Career: ${career.title}\n\nDescription: ${career.description}\n\nSalary Range: ${career.salary}\n\nKey Skills: ${career.tags.join(', ')}\n\nSuitable for: ${career.suitableFor.join(', ')}`);
}

// Admin Panel Functions
function toggleAdminPanel() {
    const adminPanel = document.getElementById('admin');
    const isVisible = adminPanel.style.display !== 'none';
    
    if (isVisible) {
        adminPanel.style.display = 'none';
        scrollToSection('home');
    } else {
        adminPanel.style.display = 'block';
        scrollToSection('admin');
        loadAdminData();
    }
}

function showAdminSection(sectionName) {
    // Hide all admin sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionName);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

function loadAdminData() {
    // Load questions for management
    loadQuestionsForAdmin();
    
    // Update analytics (simulate real data)
    updateAnalytics();
}

function loadQuestionsForAdmin() {
    const container = document.getElementById('questionsList');
    if (!container) return;
    
    container.innerHTML = '<h4>Sample Assessment Questions</h4>';
    
    // Show first few questions from each category
    Object.entries(assessmentQuestions).forEach(([category, questions]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <h5 style="margin: 1rem 0; color: #667eea; text-transform: capitalize;">${category} Questions</h5>
        `;
        
        questions.slice(0, 2).forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.style.cssText = 'background: #f8f9fa; padding: 1rem; margin: 0.5rem 0; border-radius: 8px; border-left: 4px solid #667eea;';
            questionDiv.innerHTML = `
                <strong>Q${index + 1}:</strong> ${question.question}
                <div style="margin-top: 0.5rem; font-size: 0.9rem;">
                    <em>${question.options.length} options available</em>
                </div>
            `;
            categoryDiv.appendChild(questionDiv);
        });
        
        container.appendChild(categoryDiv);
    });
}

function updateAnalytics() {
    // Simulate analytics data
    const analytics = {
        totalAssessments: 1247 + Math.floor(Math.random() * 100),
        activeUsers: 892 + Math.floor(Math.random() * 50),
        completionRate: 87 + Math.floor(Math.random() * 10)
    };
    
    document.getElementById('totalAssessments').textContent = analytics.totalAssessments.toLocaleString();
    document.getElementById('activeUsers').textContent = analytics.activeUsers.toLocaleString();
    document.getElementById('completionRate').textContent = analytics.completionRate + '%';
}

function addNewQuestion() {
    const questionText = prompt('Enter the new question:');
    if (questionText) {
        alert('Question added successfully! (This is a demo - in a real app, this would save to database)');
        loadQuestionsForAdmin();
    }
}

function updateAssessments() {
    alert('Assessments updated successfully! (This is a demo - in a real app, this would update the database)');
}

function addCareer() {
    const careerTitle = prompt('Enter the career title:');
    if (careerTitle) {
        alert('Career added successfully! (This is a demo - in a real app, this would save to database)');
    }
}

function exportData() {
    // Simulate data export
    const data = {
        careers: careerDatabase.length,
        questions: Object.values(assessmentQuestions).flat().length,
        timestamp: new Date().toISOString()
    };
    
    alert(`Data export initiated!\n\nCareers: ${data.careers}\nQuestions: ${data.questions}\nTimestamp: ${data.timestamp}\n\n(This is a demo - in a real app, this would download a file)`);
}

// Results Functions
function downloadResults() {
    // Simulate PDF download
    alert('Results downloaded as PDF! (This is a demo - in a real app, this would generate and download a PDF report)');
}

function exploreRecommendations() {
    resultsModal.style.display = 'none';
    scrollToSection('careers');
}

// Utility Functions
function animateOnScroll() {
    const elements = document.querySelectorAll('.assessment-card, .career-card, .resource-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations after DOM load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(animateOnScroll, 500);
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add floating animation to hero cards
    const floatingCards = document.querySelectorAll('.floating-cards .card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Add hover effects to career cards
    const careerCards = document.querySelectorAll('.career-card');
    careerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

// Keyboard navigation for modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals
        document.querySelectorAll('.modal').forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
    
    // Navigate through assessment questions with arrow keys
    if (assessmentModal.style.display === 'block') {
        if (e.key === 'ArrowLeft' && !document.getElementById('prevBtn').disabled) {
            previousQuestion();
        } else if (e.key === 'ArrowRight' && !document.getElementById('nextBtn').disabled) {
            nextQuestion();
        }
    }
});

// Add progress save functionality (using memory storage)
let assessmentProgress = {};

function saveProgress() {
    if (currentAssessment) {
        assessmentProgress[currentAssessment] = {
            currentQuestionIndex,
            userAnswers: [...userAnswers],
            timestamp: Date.now()
        };
    }
}

function loadProgress(assessmentType) {
    const saved = assessmentProgress[assessmentType];
    if (saved && (Date.now() - saved.timestamp) < 24 * 60 * 60 * 1000) { // 24 hours
        if (confirm('You have a saved assessment in progress. Would you like to continue where you left off?')) {
            currentQuestionIndex = saved.currentQuestionIndex;
            userAnswers = [...saved.userAnswers];
            return true;
        }
    }
    return false;
}

// Enhanced career matching algorithm
function calculateCareerMatch(userProfile, careerRequirements) {
    let totalScore = 0;
    let maxPossibleScore = 0;
    
    // Core skills matching
    for (const [skill, requiredLevel] of Object.entries(careerRequirements)) {
        const userLevel = userProfile[skill] || 0;
        maxPossibleScore += requiredLevel * requiredLevel; // Weight by importance
        
        if (userLevel >= requiredLevel) {
            totalScore += requiredLevel * requiredLevel;
        } else {
            // Partial credit for partial match
            totalScore += (userLevel / requiredLevel) * requiredLevel * requiredLevel;
        }
    }
    
    return Math.round((totalScore / maxPossibleScore) * 100);
}

// Add form validation and user feedback
function validateAssessmentData() {
    const incompleteSections = [];
    
    if (userAnswers.length < assessmentData.questions.length) {
        incompleteSections.push('Some questions are not answered');
    }
    
    if (incompleteSections.length > 0) {
        alert('Please complete the following:\n' + incompleteSections.join('\n'));
        return false;
    }
    
    return true;
}

// Performance optimization - lazy loading for career cards
function lazyLoadCareerCards() {
    const cardContainer = document.getElementById('careersGrid');
    if (!cardContainer) return;
    
    // Load careers in batches
    const batchSize = 6;
    let loadedCount = 0;
    
    function loadBatch() {
        const batch = careerDatabase.slice(loadedCount, loadedCount + batchSize);
        batch.forEach(career => {
            // Create and append career card
            const careerCard = createCareerCard(career);
            cardContainer.appendChild(careerCard);
        });
        
        loadedCount += batch.length;
        
        if (loadedCount < careerDatabase.length) {
            // Load more when user scrolls near bottom
            setTimeout(() => {
                if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
                    loadBatch();
                }
            }, 100);
        }
    }
    
    loadBatch();
}

function createCareerCard(career) {
    const card = document.createElement('div');
    card.className = 'career-card';
    card.setAttribute('data-category', career.category);
    
    card.innerHTML = `
        <h3>${career.title}</h3>
        <p>${career.description}</p>
        <div class="career-tags">
            ${career.tags.map(tag => `<span class="career-tag">${tag}</span>`).join('')}
        </div>
        <div class="career-salary">${career.salary}</div>
        <div style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;">
            Suitable for: ${career.suitableFor.join(', ')}
        </div>
    `;
    
    card.addEventListener('click', () => showCareerDetails(career));
    return card;
}

// Add search functionality
function addSearchFeature() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search careers...';
    searchInput.style.cssText = `
        padding: 12px 20px;
        border: 2px solid #e0e0e0;
        border-radius: 25px;
        font-size: 16px;
        width: 300px;
        margin: 20px auto;
        display: block;
        transition: all 0.3s ease;
    `;
    
    searchInput.addEventListener('focus', function() {
        this.style.borderColor = '#667eea';
        this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.style.borderColor = '#e0e0e0';
        this.style.boxShadow = 'none';
    });
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCareers = careerDatabase.filter(career => 
            career.title.toLowerCase().includes(searchTerm) ||
            career.description.toLowerCase().includes(searchTerm) ||
            career.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        displayCareers(filteredCareers);
    });
    
    // Insert search input before the filter tabs
    const filterTabs = document.querySelector('.filter-tabs');
    if (filterTabs) {
        filterTabs.parentNode.insertBefore(searchInput, filterTabs);
    }
}

// Initialize search feature
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addSearchFeature, 1000);
});