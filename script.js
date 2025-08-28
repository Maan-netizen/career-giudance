// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element References ---
    // Authentication containers and forms
    const authContainer = document.getElementById('auth-container');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const appContainer = document.getElementById('app-container');

    // Authentication inputs and buttons
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    const signupEmail = document.getElementById('signup-email');
    const signupPassword = document.getElementById('signup-password');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');

    // App section containers
    const careerSelection = document.getElementById('career-selection');
    const locationSelection = document.getElementById('location-selection');
    const collegeList = document.getElementById('college-list');
    const aptitudeTest = document.getElementById('aptitude-test');
    const testResult = document.getElementById('test-result');

    // App section buttons and interactive elements
    const careerSubmit = document.getElementById('career-submit');
    const locationIndia = document.getElementById('location-india');
    const locationAbroad = document.getElementById('location-abroad');
    const collegesUl = document.getElementById('colleges');
    const startTestBtn = document.getElementById('start-test');
    const questionContainer = document.getElementById('question-container');
    const submitTestBtn = document.getElementById('submit-test');
    const scoreSpan = document.getElementById('score');

    // --- Mock Data ---
    // In a real application, this data would be fetched from your Firestore database.
    const mockColleges = {
        engineering: {
            india: ["IIT Bombay", "IIT Delhi", "BITS Pilani"],
            abroad: ["MIT", "Stanford University", "Caltech"]
        },
        management: {
            india: ["IIM Ahmedabad", "IIM Bangalore", "XLRI Jamshedpur"],
            abroad: ["Harvard Business School", "Wharton School", "London Business School"]
        }
    };

    const mockQuestions = [
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4"
        },
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: "Mars"
        }
    ];

    // --- State Management ---
    let currentUser = null;
    let selectedCareer = '';
    let selectedLocation = '';


    // --- Authentication Logic ---

    // Function to handle user login
    loginBtn.addEventListener('click', () => {
        const email = loginEmail.value;
        const password = loginPassword.value;
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log("Logged in successfully:", userCredential.user);
            })
            .catch(error => {
                console.error("Login Error:", error);
                alert(error.message);
            });
    });

    // Function to handle user signup
    signupBtn.addEventListener('click', () => {
        const email = signupEmail.value;
        const password = signupPassword.value;
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log("Signed up successfully:", userCredential.user);
            })
            .catch(error => {
                console.error("Signup Error:", error);
                alert(error.message);
            });
    });

    // Listen for authentication state changes
    auth.onAuthStateChanged(user => {
        if (user) {
            currentUser = user;
            authContainer.style.display = 'none';
            appContainer.style.display = 'block';
            careerSelection.style.display = 'block'; // Start at career selection
        } else {
            currentUser = null;
            authContainer.style.display = 'block';
            appContainer.style.display = 'none';
        }
    });

    // Toggle between login and signup forms
    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });


    // --- Application Flow Logic ---

    // 1. Career Selection
    careerSubmit.addEventListener('click', () => {
        selectedCareer = document.getElementById('career-options').value;
        careerSelection.style.display = 'none';
        locationSelection.style.display = 'block';
    });

    // 2. Location Selection
    locationIndia.addEventListener('click', () => handleLocationSelect('india'));
    locationAbroad.addEventListener('click', () => handleLocationSelect('abroad'));

    function handleLocationSelect(location) {
        selectedLocation = location;
        locationSelection.style.display = 'none';
        displayColleges();
        collegeList.style.display = 'block';
    }

    // 3. Display College List
    function displayColleges() {
        collegesUl.innerHTML = ''; // Clear previous list
        const colleges = mockColleges[selectedCareer][selectedLocation];
        colleges.forEach(college => {
            const li = document.createElement('li');
            li.textContent = college;
            collegesUl.appendChild(li);
        });
    }

    // 4. Start Aptitude Test
    startTestBtn.addEventListener('click', () => {
        collegeList.style.display = 'none';
        loadQuestions();
        aptitudeTest.style.display = 'block';
    });

    // 5. Load Aptitude Test Questions
    function loadQuestions() {
        questionContainer.innerHTML = '';
        mockQuestions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
            
            const optionsDiv = document.createElement('div');
            optionsDiv.classList.add('options');

            q.options.forEach(option => {
                const label = document.createElement('label');
                label.innerHTML = `<input type="radio" name="question${index}" value="${option}"> ${option}`;
                optionsDiv.appendChild(label);
            });
            questionDiv.appendChild(optionsDiv);
            questionContainer.appendChild(questionDiv);
        });
    }

    // 6. Submit Test and Calculate Score
    submitTestBtn.addEventListener('click', () => {
        let score = 0;
        mockQuestions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption && selectedOption.value === q.answer) {
                score++;
            }
        });

        aptitudeTest.style.display = 'none';
        scoreSpan.textContent = `${score} out of ${mockQuestions.length}`;
        testResult.style.display = 'block';
    });

});

