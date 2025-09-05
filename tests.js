// Tests/Quiz Management System
class TestsManager {
    constructor() {
        this.tests = this.loadTests();
        this.results = this.loadResults();
        this.currentTest = null;
        this.currentQuestionIndex = 0;
        this.startTime = null;
        this.answers = {};
        this.timeRemaining = 0;
        this.timerInterval = null;
    }

    // Load tests from localStorage
    loadTests() {
        try {
            const stored = localStorage.getItem('courseTests');
            return stored ? JSON.parse(stored) : this.getDefaultTests();
        } catch (error) {
            console.error('Error loading tests:', error);
            return this.getDefaultTests();
        }
    }

    // Load results from localStorage
    loadResults() {
        try {
            const stored = localStorage.getItem('testResults');
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error('Error loading results:', error);
            return {};
        }
    }

    // Save tests to localStorage
    saveTests() {
        try {
            localStorage.setItem('courseTests', JSON.stringify(this.tests));
        } catch (error) {
            console.error('Error saving tests:', error);
        }
    }

    // Save results to localStorage
    saveResults() {
        try {
            localStorage.setItem('testResults', JSON.stringify(this.results));
        } catch (error) {
            console.error('Error saving results:', error);
        }
    }

    // Get default sample tests
    getDefaultTests() {
        return {
            'programming': [
                {
                    id: 1,
                    title: 'Programming Basics Quiz',
                    description: 'Test your understanding of basic programming concepts',
                    duration: 10, // minutes
                    difficulty: 'beginner',
                    questions: [
                        {
                            id: 1,
                            type: 'multiple-choice',
                            question: 'What is a variable in programming?',
                            options: [
                                'A container for storing data values',
                                'A type of loop',
                                'A function parameter',
                                'A programming language'
                            ],
                            correct: 0,
                            explanation: 'A variable is a container that stores data values that can be changed during program execution.'
                        },
                        {
                            id: 2,
                            type: 'multiple-choice',
                            question: 'Which of the following is NOT a primitive data type in most programming languages?',
                            options: ['Integer', 'String', 'Boolean', 'Array'],
                            correct: 3,
                            explanation: 'Array is a composite data type, not a primitive type. Primitive types include integer, string, boolean, etc.'
                        },
                        {
                            id: 3,
                            type: 'true-false',
                            question: 'A function can return multiple values directly in most programming languages.',
                            correct: false,
                            explanation: 'Most programming languages allow a function to return only one value directly, though some modern languages support multiple return values.'
                        },
                        {
                            id: 4,
                            type: 'multiple-choice',
                            question: 'What is the purpose of a loop in programming?',
                            options: [
                                'To store data',
                                'To repeat a block of code',
                                'To make decisions',
                                'To define functions'
                            ],
                            correct: 1,
                            explanation: 'Loops are used to repeat a block of code multiple times, making programs more efficient and concise.'
                        },
                        {
                            id: 5,
                            type: 'multiple-choice',
                            question: 'What does "debugging" mean in programming?',
                            options: [
                                'Writing new code',
                                'Finding and fixing errors in code',
                                'Deleting old code',
                                'Running a program'
                            ],
                            correct: 1,
                            explanation: 'Debugging is the process of finding and fixing bugs (errors) in computer programs.'
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Object-Oriented Programming',
                    description: 'Advanced concepts in OOP',
                    duration: 15,
                    difficulty: 'intermediate',
                    questions: [
                        {
                            id: 1,
                            type: 'multiple-choice',
                            question: 'What is encapsulation in OOP?',
                            options: [
                                'Hiding implementation details',
                                'Creating multiple objects',
                                'Inheriting from parent class',
                                'Overriding methods'
                            ],
                            correct: 0,
                            explanation: 'Encapsulation is the bundling of data and methods that work on that data within one unit, hiding the internal details.'
                        },
                        {
                            id: 2,
                            type: 'true-false',
                            question: 'Inheritance allows a class to inherit properties and methods from another class.',
                            correct: true,
                            explanation: 'Inheritance is a key OOP concept that allows a class to inherit attributes and methods from another class.'
                        }
                    ]
                }
            ],
            'ai': [
                {
                    id: 1,
                    title: 'Machine Learning Fundamentals',
                    description: 'Basic concepts in machine learning',
                    duration: 12,
                    difficulty: 'intermediate',
                    questions: [
                        {
                            id: 1,
                            type: 'multiple-choice',
                            question: 'What is supervised learning?',
                            options: [
                                'Learning without labeled data',
                                'Learning with labeled training data',
                                'Learning through trial and error',
                                'Learning by clustering data'
                            ],
                            correct: 1,
                            explanation: 'Supervised learning uses labeled training data to learn a mapping between inputs and outputs.'
                        },
                        {
                            id: 2,
                            type: 'multiple-choice',
                            question: 'Which algorithm is commonly used for classification?',
                            options: ['K-means', 'Decision Tree', 'PCA', 'DBSCAN'],
                            correct: 1,
                            explanation: 'Decision Trees are commonly used for both classification and regression tasks.'
                        }
                    ]
                }
            ],
            'data-science': [
                {
                    id: 1,
                    title: 'Data Analysis Basics',
                    description: 'Fundamental concepts in data analysis',
                    duration: 8,
                    difficulty: 'beginner',
                    questions: [
                        {
                            id: 1,
                            type: 'multiple-choice',
                            question: 'What is the first step in data analysis?',
                            options: [
                                'Data modeling',
                                'Data collection',
                                'Data visualization',
                                'Data cleaning'
                            ],
                            correct: 1,
                            explanation: 'Data collection is typically the first step, as you need data before you can analyze it.'
                        }
                    ]
                }
            ]
        };
    }

    // Get tests for a specific course
    getCourseTests(courseId) {
        return this.tests[courseId] || [];
    }

    // Get test by ID
    getTest(courseId, testId) {
        const courseTests = this.getCourseTests(courseId);
        return courseTests.find(test => test.id === testId);
    }

    // Start a test
    startTest(courseId, testId) {
        const test = this.getTest(courseId, testId);
        if (!test) return null;

        this.currentTest = { ...test, courseId };
        this.currentQuestionIndex = 0;
        this.startTime = new Date();
        this.answers = {};
        this.timeRemaining = test.duration * 60; // Convert to seconds

        return this.currentTest;
    }

    // Submit answer for current question
    submitAnswer(questionId, answer) {
        if (!this.currentTest) return false;

        this.answers[questionId] = {
            answer: answer,
            timestamp: new Date()
        };

        return true;
    }

    // Go to next question
    nextQuestion() {
        if (!this.currentTest || this.currentQuestionIndex >= this.currentTest.questions.length - 1) {
            return false;
        }
        this.currentQuestionIndex++;
        return true;
    }

    // Go to previous question
    previousQuestion() {
        if (!this.currentTest || this.currentQuestionIndex <= 0) {
            return false;
        }
        this.currentQuestionIndex--;
        return true;
    }

    // Complete the test and calculate score
    completeTest() {
        if (!this.currentTest) return null;

        const endTime = new Date();
        const timeTaken = Math.floor((endTime - this.startTime) / 1000); // seconds

        let correctAnswers = 0;
        const questionResults = this.currentTest.questions.map(question => {
            const userAnswer = this.answers[question.id];
            const isCorrect = this.checkAnswer(question, userAnswer?.answer);
            
            if (isCorrect) correctAnswers++;

            return {
                questionId: question.id,
                question: question.question,
                userAnswer: userAnswer?.answer,
                correctAnswer: question.correct,
                isCorrect: isCorrect,
                explanation: question.explanation
            };
        });

        const score = Math.round((correctAnswers / this.currentTest.questions.length) * 100);
        const passed = score >= 70; // 70% passing grade

        const result = {
            testId: this.currentTest.id,
            courseId: this.currentTest.courseId,
            title: this.currentTest.title,
            completedAt: endTime.toISOString(),
            timeTaken: timeTaken,
            score: score,
            correctAnswers: correctAnswers,
            totalQuestions: this.currentTest.questions.length,
            passed: passed,
            questionResults: questionResults
        };

        this.saveResult(result);
        this.currentTest = null;
        
        return result;
    }

    // Check if an answer is correct
    checkAnswer(question, userAnswer) {
        if (question.type === 'multiple-choice') {
            return userAnswer === question.correct;
        } else if (question.type === 'true-false') {
            return userAnswer === question.correct;
        }
        return false;
    }

    // Save test result
    saveResult(result) {
        if (!this.results[result.courseId]) {
            this.results[result.courseId] = [];
        }
        
        this.results[result.courseId].push(result);
        this.saveResults();
    }

    // Get test results for a course
    getCourseResults(courseId) {
        return this.results[courseId] || [];
    }

    // Get statistics
    getStats(courseId) {
        const results = this.getCourseResults(courseId);
        const tests = this.getCourseTests(courseId);

        if (results.length === 0) {
            return {
                totalTests: tests.length,
                completedTests: 0,
                averageScore: 0,
                bestScore: 0,
                totalTimeTaken: 0
            };
        }

        const totalScore = results.reduce((sum, result) => sum + result.score, 0);
        const totalTime = results.reduce((sum, result) => sum + result.timeTaken, 0);

        return {
            totalTests: tests.length,
            completedTests: results.length,
            averageScore: Math.round(totalScore / results.length),
            bestScore: Math.max(...results.map(r => r.score)),
            totalTimeTaken: totalTime
        };
    }
}

// Initialize global tests manager
window.testsManager = new TestsManager();

// Tests UI Functions
function openTestModal(courseId, courseName) {
    const modal = createTestModal(courseId, courseName);
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    renderTestsList(courseId);
    updateTestsStats(courseId);
}

function createTestModal(courseId, courseName) {
    const modal = document.createElement('div');
    modal.className = 'tests-modal modal';
    modal.id = `testsModal${courseId}`;
    
    modal.innerHTML = `
        <div class="modal-content tests-modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-clipboard-check"></i> Tests & Quizzes - ${courseName}</h3>
                <span class="close" onclick="closeTestModal('${courseId}')">&times;</span>
            </div>
            <div class="tests-container">
                <div class="tests-sidebar">
                    <div class="tests-stats" id="testsStats${courseId}">
                        <div class="stat-item">
                            <span class="stat-number" id="totalTests${courseId}">0</span>
                            <span class="stat-label">Available Tests</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number" id="completedTests${courseId}">0</span>
                            <span class="stat-label">Completed</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number" id="averageScore${courseId}">0%</span>
                            <span class="stat-label">Average Score</span>
                        </div>
                    </div>
                    
                    <div class="tests-navigation">
                        <button class="nav-btn active" onclick="showTestsView('${courseId}', 'available')" id="availableBtn${courseId}">
                            Available Tests
                        </button>
                        <button class="nav-btn" onclick="showTestsView('${courseId}', 'results')" id="resultsBtn${courseId}">
                            My Results
                        </button>
                    </div>
                </div>
                
                <div class="tests-main">
                    <div class="tests-view" id="testsView${courseId}">
                        <!-- Tests list will be rendered here -->
                    </div>
                    
                    <div class="test-taking" id="testTaking${courseId}" style="display: none;">
                        <!-- Test taking interface -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

function renderTestsList(courseId) {
    const testsView = document.getElementById(`testsView${courseId}`);
    const tests = window.testsManager.getCourseTests(courseId);
    const results = window.testsManager.getCourseResults(courseId);
    
    if (tests.length === 0) {
        testsView.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list fa-3x"></i>
                <h4>No tests available</h4>
                <p>Tests and quizzes will appear here when they become available.</p>
            </div>
        `;
        return;
    }
    
    testsView.innerHTML = tests.map(test => {
        const testResult = results.find(r => r.testId === test.id);
        const hasAttempted = !!testResult;
        
        return `
            <div class="test-item ${hasAttempted ? 'attempted' : ''}" data-test-id="${test.id}">
                <div class="test-header">
                    <h4 class="test-title">${escapeHtml(test.title)}</h4>
                    <div class="test-badges">
                        <span class="difficulty-badge ${test.difficulty}">${test.difficulty}</span>
                        <span class="duration-badge">${test.duration} min</span>
                        ${hasAttempted ? `<span class="score-badge ${testResult.passed ? 'passed' : 'failed'}">${testResult.score}%</span>` : ''}
                    </div>
                </div>
                
                <p class="test-description">${escapeHtml(test.description)}</p>
                
                <div class="test-info">
                    <div class="test-details">
                        <span><i class="fas fa-question-circle"></i> ${test.questions.length} questions</span>
                        <span><i class="fas fa-clock"></i> ${test.duration} minutes</span>
                        ${hasAttempted ? `<span><i class="fas fa-calendar"></i> Last attempt: ${formatDate(testResult.completedAt)}</span>` : ''}
                    </div>
                </div>
                
                <div class="test-actions">
                    <button class="btn btn-primary" onclick="startTestAttempt('${courseId}', ${test.id})">
                        ${hasAttempted ? 'Retake Test' : 'Start Test'}
                    </button>
                    ${hasAttempted ? `
                        <button class="btn btn-secondary" onclick="viewTestResults('${courseId}', ${test.id})">
                            View Results
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function renderResultsList(courseId) {
    const testsView = document.getElementById(`testsView${courseId}`);
    const results = window.testsManager.getCourseResults(courseId);
    
    if (results.length === 0) {
        testsView.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-chart-bar fa-3x"></i>
                <h4>No test results yet</h4>
                <p>Complete some tests to see your results and progress here.</p>
            </div>
        `;
        return;
    }
    
    // Sort results by completion date (newest first)
    const sortedResults = results.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
    
    testsView.innerHTML = `
        <div class="results-header">
            <h4>Test Results History</h4>
        </div>
        ${sortedResults.map(result => `
            <div class="result-item ${result.passed ? 'passed' : 'failed'}">
                <div class="result-header">
                    <h5>${escapeHtml(result.title)}</h5>
                    <div class="result-score ${result.passed ? 'passed' : 'failed'}">
                        ${result.score}%
                    </div>
                </div>
                
                <div class="result-details">
                    <span><i class="fas fa-check-circle"></i> ${result.correctAnswers}/${result.totalQuestions} correct</span>
                    <span><i class="fas fa-clock"></i> ${formatTime(result.timeTaken)}</span>
                    <span><i class="fas fa-calendar"></i> ${formatDate(result.completedAt)}</span>
                    <span class="result-status ${result.passed ? 'passed' : 'failed'}">
                        ${result.passed ? 'PASSED' : 'FAILED'}
                    </span>
                </div>
                
                <button class="btn btn-sm btn-secondary" onclick="showDetailedResults('${courseId}', ${result.testId}, '${result.completedAt}')">
                    View Detailed Results
                </button>
            </div>
        `).join('')}
    `;
}

function showTestsView(courseId, view) {
    // Update navigation
    document.getElementById(`availableBtn${courseId}`).classList.remove('active');
    document.getElementById(`resultsBtn${courseId}`).classList.remove('active');
    document.getElementById(`${view}Btn${courseId}`).classList.add('active');
    
    // Render appropriate view
    if (view === 'available') {
        renderTestsList(courseId);
    } else if (view === 'results') {
        renderResultsList(courseId);
    }
}

function updateTestsStats(courseId) {
    const stats = window.testsManager.getStats(courseId);
    
    const totalElement = document.getElementById(`totalTests${courseId}`);
    const completedElement = document.getElementById(`completedTests${courseId}`);
    const averageElement = document.getElementById(`averageScore${courseId}`);
    
    if (totalElement) totalElement.textContent = stats.totalTests;
    if (completedElement) completedElement.textContent = stats.completedTests;
    if (averageElement) averageElement.textContent = stats.averageScore + '%';
}

function startTestAttempt(courseId, testId) {
    if (!confirm('Are you ready to start this test? Make sure you have enough time to complete it.')) {
        return;
    }
    
    const test = window.testsManager.startTest(courseId, testId);
    if (!test) {
        alert('Error starting test. Please try again.');
        return;
    }
    
    showTestInterface(courseId);
}

function showTestInterface(courseId) {
    const testsView = document.getElementById(`testsView${courseId}`);
    const testTaking = document.getElementById(`testTaking${courseId}`);
    
    testsView.style.display = 'none';
    testTaking.style.display = 'block';
    
    renderTestQuestion(courseId);
    startTimer(courseId);
}

function renderTestQuestion(courseId) {
    const testTaking = document.getElementById(`testTaking${courseId}`);
    const test = window.testsManager.currentTest;
    const questionIndex = window.testsManager.currentQuestionIndex;
    const question = test.questions[questionIndex];
    
    testTaking.innerHTML = `
        <div class="test-header">
            <div class="test-progress">
                <span>Question ${questionIndex + 1} of ${test.questions.length}</span>
                <div class="progress-bar">
                    <div class="progress" style="width: ${((questionIndex + 1) / test.questions.length) * 100}%"></div>
                </div>
            </div>
            <div class="test-timer" id="timer${courseId}">
                ${Math.floor(window.testsManager.timeRemaining / 60)}:${(window.testsManager.timeRemaining % 60).toString().padStart(2, '0')}
            </div>
        </div>
        
        <div class="test-content">
            <div class="question-container">
                <h4 class="question-text">${escapeHtml(question.question)}</h4>
                
                <div class="answers-container">
                    ${renderQuestionOptions(question, courseId)}
                </div>
            </div>
            
            <div class="test-navigation">
                <button class="btn btn-secondary" onclick="previousTestQuestion('${courseId}')" 
                        ${questionIndex === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-left"></i> Previous
                </button>
                
                <div class="question-indicators">
                    ${test.questions.map((q, index) => `
                        <button class="question-indicator ${index === questionIndex ? 'active' : ''} 
                                ${window.testsManager.answers[q.id] ? 'answered' : ''}" 
                                onclick="goToQuestion('${courseId}', ${index})">
                            ${index + 1}
                        </button>
                    `).join('')}
                </div>
                
                ${questionIndex === test.questions.length - 1 ? `
                    <button class="btn btn-success" onclick="completeTest('${courseId}')">
                        <i class="fas fa-check"></i> Complete Test
                    </button>
                ` : `
                    <button class="btn btn-primary" onclick="nextTestQuestion('${courseId}')">
                        Next <i class="fas fa-arrow-right"></i>
                    </button>
                `}
            </div>
        </div>
    `;
}

function renderQuestionOptions(question, courseId) {
    if (question.type === 'multiple-choice') {
        return question.options.map((option, index) => `
            <label class="answer-option">
                <input type="radio" name="question${question.id}" value="${index}" 
                       onchange="selectAnswer('${courseId}', ${question.id}, ${index})"
                       ${window.testsManager.answers[question.id]?.answer === index ? 'checked' : ''}>
                <span class="option-text">${escapeHtml(option)}</span>
            </label>
        `).join('');
    } else if (question.type === 'true-false') {
        return `
            <label class="answer-option">
                <input type="radio" name="question${question.id}" value="true" 
                       onchange="selectAnswer('${courseId}', ${question.id}, true)"
                       ${window.testsManager.answers[question.id]?.answer === true ? 'checked' : ''}>
                <span class="option-text">True</span>
            </label>
            <label class="answer-option">
                <input type="radio" name="question${question.id}" value="false" 
                       onchange="selectAnswer('${courseId}', ${question.id}, false)"
                       ${window.testsManager.answers[question.id]?.answer === false ? 'checked' : ''}>
                <span class="option-text">False</span>
            </label>
        `;
    }
}

function selectAnswer(courseId, questionId, answer) {
    window.testsManager.submitAnswer(questionId, answer);
    updateQuestionIndicators(courseId);
}

function updateQuestionIndicators(courseId) {
    const test = window.testsManager.currentTest;
    const indicators = document.querySelectorAll('.question-indicator');
    
    indicators.forEach((indicator, index) => {
        const question = test.questions[index];
        if (window.testsManager.answers[question.id]) {
            indicator.classList.add('answered');
        } else {
            indicator.classList.remove('answered');
        }
    });
}

function nextTestQuestion(courseId) {
    if (window.testsManager.nextQuestion()) {
        renderTestQuestion(courseId);
    }
}

function previousTestQuestion(courseId) {
    if (window.testsManager.previousQuestion()) {
        renderTestQuestion(courseId);
    }
}

function goToQuestion(courseId, questionIndex) {
    window.testsManager.currentQuestionIndex = questionIndex;
    renderTestQuestion(courseId);
}

function startTimer(courseId) {
    if (window.testsManager.timerInterval) {
        clearInterval(window.testsManager.timerInterval);
    }
    
    window.testsManager.timerInterval = setInterval(() => {
        window.testsManager.timeRemaining--;
        
        const timer = document.getElementById(`timer${courseId}`);
        if (timer) {
            const minutes = Math.floor(window.testsManager.timeRemaining / 60);
            const seconds = window.testsManager.timeRemaining % 60;
            timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            // Warning when 2 minutes remaining
            if (window.testsManager.timeRemaining <= 120) {
                timer.style.color = '#f44336';
            }
        }
        
        // Auto-submit when time runs out
        if (window.testsManager.timeRemaining <= 0) {
            clearInterval(window.testsManager.timerInterval);
            alert('Time\'s up! The test will be automatically submitted.');
            completeTest(courseId);
        }
    }, 1000);
}

function completeTest(courseId) {
    if (window.testsManager.timerInterval) {
        clearInterval(window.testsManager.timerInterval);
    }
    
    const unansweredQuestions = window.testsManager.currentTest.questions.filter(
        q => !window.testsManager.answers[q.id]
    );
    
    if (unansweredQuestions.length > 0) {
        if (!confirm(`You have ${unansweredQuestions.length} unanswered question(s). Submit anyway?`)) {
            return;
        }
    }
    
    const result = window.testsManager.completeTest();
    showTestResults(courseId, result);
}

function showTestResults(courseId, result) {
    const testTaking = document.getElementById(`testTaking${courseId}`);
    
    testTaking.innerHTML = `
        <div class="test-results">
            <div class="results-header ${result.passed ? 'passed' : 'failed'}">
                <div class="results-icon">
                    <i class="fas ${result.passed ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                </div>
                <h3>${result.passed ? 'Congratulations!' : 'Keep Learning!'}</h3>
                <div class="score-display">
                    <span class="score">${result.score}%</span>
                    <span class="status ${result.passed ? 'passed' : 'failed'}">
                        ${result.passed ? 'PASSED' : 'FAILED'}
                    </span>
                </div>
            </div>
            
            <div class="results-summary">
                <div class="summary-item">
                    <span class="label">Correct Answers:</span>
                    <span class="value">${result.correctAnswers} / ${result.totalQuestions}</span>
                </div>
                <div class="summary-item">
                    <span class="label">Time Taken:</span>
                    <span class="value">${formatTime(result.timeTaken)}</span>
                </div>
                <div class="summary-item">
                    <span class="label">Passing Score:</span>
                    <span class="value">70%</span>
                </div>
            </div>
            
            <div class="question-review">
                <h4>Question Review</h4>
                ${result.questionResults.map((qr, index) => `
                    <div class="review-item ${qr.isCorrect ? 'correct' : 'incorrect'}">
                        <div class="review-header">
                            <span class="question-number">Q${index + 1}</span>
                            <span class="result-icon">
                                <i class="fas ${qr.isCorrect ? 'fa-check' : 'fa-times'}"></i>
                            </span>
                        </div>
                        <div class="review-content">
                            <p class="question">${escapeHtml(qr.question)}</p>
                            ${qr.userAnswer !== undefined ? `
                                <p class="user-answer">Your answer: <span class="${qr.isCorrect ? 'correct' : 'incorrect'}">${formatAnswer(qr.userAnswer, window.testsManager.getTest(courseId, result.testId).questions[index])}</span></p>
                            ` : '<p class="no-answer">No answer provided</p>'}
                            ${!qr.isCorrect ? `
                                <p class="correct-answer">Correct answer: <span class="correct">${formatAnswer(qr.correctAnswer, window.testsManager.getTest(courseId, result.testId).questions[index])}</span></p>
                            ` : ''}
                            <p class="explanation">${escapeHtml(qr.explanation)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="results-actions">
                <button class="btn btn-primary" onclick="closeTestResults('${courseId}')">
                    Back to Tests
                </button>
                <button class="btn btn-secondary" onclick="retakeTest('${courseId}', ${result.testId})">
                    Retake Test
                </button>
            </div>
        </div>
    `;
}

function formatAnswer(answer, question) {
    if (question.type === 'multiple-choice') {
        return question.options[answer] || 'No answer';
    } else if (question.type === 'true-false') {
        return answer ? 'True' : 'False';
    }
    return answer;
}

function closeTestResults(courseId) {
    const testsView = document.getElementById(`testsView${courseId}`);
    const testTaking = document.getElementById(`testTaking${courseId}`);
    
    testTaking.style.display = 'none';
    testsView.style.display = 'block';
    
    renderTestsList(courseId);
    updateTestsStats(courseId);
}

function retakeTest(courseId, testId) {
    startTestAttempt(courseId, testId);
}

function closeTestModal(courseId) {
    const modal = document.getElementById(`testsModal${courseId}`);
    if (modal) {
        modal.remove();
    }
    
    // Clear any running timer
    if (window.testsManager.timerInterval) {
        clearInterval(window.testsManager.timerInterval);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
}

// Override the original test button click handler
function handleTestClick(event) {
    const courseId = event.target.getAttribute('data-course-id');
    const courseName = event.target.getAttribute('data-course-name') || 'Course';
    
    openTestModal(courseId, courseName);
}

// Export for global use
window.testsModule = {
    openTestModal,
    closeTestModal,
    TestsManager
};
