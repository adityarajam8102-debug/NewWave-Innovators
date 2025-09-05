// Educational Chatbot System
class EduChatbot {
    constructor() {
        this.isOpen = false;
        this.isMinimized = false;
        this.conversationHistory = [];
        this.currentUser = null;
        this.isTyping = false;
        this.scrollPosition = 0; // For mobile scroll handling
        
        // Comprehensive knowledge base with educational and general topics
        this.knowledgeBase = {
            // === EDUCATIONAL TOPICS ===
            
            // Artificial Intelligence
            'artificial intelligence': {
                keywords: ['ai', 'artificial intelligence', 'machine intelligence', 'smart systems'],
                response: "🤖 **Artificial Intelligence (AI)** is the simulation of human intelligence in machines. Key concepts include:\n\n• **Machine Learning**: Algorithms that learn from data\n• **Deep Learning**: Neural networks with multiple layers\n• **Natural Language Processing**: Understanding human language\n• **Computer Vision**: Processing visual information\n\n📚 Ready to dive deeper? Check out our AI course!"
            },
            
            // Programming
            'programming': {
                keywords: ['programming', 'coding', 'software development', 'code', 'programming languages'],
                response: "💻 **Programming** is the process of creating instructions for computers. Here's how to start:\n\n• **Choose a language**: Python (beginner-friendly), JavaScript, Java\n• **Practice basics**: Variables, loops, functions\n• **Build projects**: Start small, gradually increase complexity\n• **Use resources**: Online courses, coding challenges\n\n🚀 Want to start? Try our Programming Fundamentals course!"
            },
            
            // Machine Learning
            'machine learning': {
                keywords: ['machine learning', 'ml', 'algorithms', 'data training', 'supervised learning', 'unsupervised learning'],
                response: "🧠 **Machine Learning** enables computers to learn without explicit programming:\n\n• **Supervised Learning**: Learning with labeled data (classification, regression)\n• **Unsupervised Learning**: Finding patterns in unlabeled data (clustering)\n• **Reinforcement Learning**: Learning through rewards and penalties\n• **Deep Learning**: Neural networks for complex patterns\n\n📊 Popular tools: Python, TensorFlow, scikit-learn"
            },
            
            // Data Science
            'data science': {
                keywords: ['data science', 'data analysis', 'statistics', 'data visualization', 'big data'],
                response: "📊 **Data Science** combines statistics, programming, and domain expertise:\n\n• **Data Collection**: Gathering relevant information\n• **Data Cleaning**: Preparing data for analysis\n• **Exploratory Analysis**: Understanding data patterns\n• **Modeling**: Building predictive models\n• **Visualization**: Presenting insights clearly\n\n🔧 Tools: Python, R, SQL, Tableau, Excel"
            },
            
            // Web Development
            'web development': {
                keywords: ['web development', 'website', 'frontend', 'backend', 'html', 'css', 'javascript'],
                response: "🌐 **Web Development** creates websites and web applications:\n\n• **Frontend**: User interface (HTML, CSS, JavaScript)\n• **Backend**: Server-side logic (Python, Node.js, Java)\n• **Database**: Data storage (MySQL, MongoDB)\n• **Frameworks**: React, Angular, Django, Flask\n\n🎨 Start with HTML/CSS basics, then add JavaScript interactivity!"
            },
            
            // Study Tips
            'study tips': {
                keywords: ['study tips', 'learning methods', 'how to study', 'study techniques', 'learning strategies'],
                response: "📚 **Effective Study Strategies**:\n\n• **Active Learning**: Practice problems, teach others\n• **Spaced Repetition**: Review material at increasing intervals\n• **Pomodoro Technique**: 25-minute focused study sessions\n• **Break Complex Topics**: Divide into smaller, manageable parts\n• **Use Multiple Resources**: Books, videos, practice exercises\n\n💡 Remember: Consistency beats intensity!"
            },
            
            // UI/UX Design
            'ui ux design': {
                keywords: ['ui design', 'ux design', 'user interface', 'user experience', 'design'],
                response: "🎨 **UI/UX Design** focuses on user-centered design:\n\n• **User Research**: Understanding user needs and behaviors\n• **Wireframing**: Creating basic layout structures\n• **Prototyping**: Building interactive mockups\n• **Visual Design**: Colors, typography, imagery\n• **Usability Testing**: Validating design decisions\n\n🛠️ Tools: Figma, Sketch, Adobe XD, InVision"
            },
            
            // === GENERAL TOPICS ===
            
            // Technology
            'technology': {
                keywords: ['technology', 'tech', 'gadgets', 'smartphones', 'computers', 'internet', 'digital'],
                response: "💻 **Technology** shapes our modern world! Here's what's trending:\n\n• **Smartphones**: Latest iOS/Android features\n• **Cloud Computing**: AWS, Google Cloud, Azure\n• **Internet of Things (IoT)**: Connected smart devices\n• **5G Networks**: Faster internet and connectivity\n• **Virtual/Augmented Reality**: Immersive experiences\n\nWhat specific tech topic interests you most?"
            },
            
            // Health & Wellness
            'health': {
                keywords: ['health', 'fitness', 'exercise', 'wellness', 'nutrition', 'diet', 'mental health'],
                response: "🏥 **Health & Wellness** tips for a better life:\n\n• **Physical Activity**: 30 minutes daily exercise\n• **Balanced Diet**: Fruits, vegetables, whole grains\n• **Mental Health**: Meditation, stress management\n• **Sleep**: 7-9 hours of quality rest\n• **Hydration**: 8 glasses of water daily\n\n⚠️ *Always consult healthcare professionals for medical advice!*"
            },
            
            // Entertainment
            'entertainment': {
                keywords: ['movies', 'music', 'games', 'entertainment', 'netflix', 'spotify', 'gaming', 'books'],
                response: "🎬 **Entertainment** recommendations:\n\n• **Movies**: Check IMDb top ratings, latest releases\n• **Music**: Explore Spotify playlists, discover new artists\n• **Gaming**: Popular titles on Steam, mobile games\n• **Books**: Fiction, non-fiction, audiobooks\n• **Streaming**: Netflix, Amazon Prime, Disney+\n\nWhat type of entertainment are you in the mood for?"
            },
            
            // Weather
            'weather': {
                keywords: ['weather', 'temperature', 'rain', 'sunny', 'cloudy', 'forecast', 'climate'],
                response: "🌤️ **Weather Information**:\n\nI can't provide real-time weather data, but here are some tips:\n\n• **Check local weather apps**: Weather.com, AccuWeather\n• **Plan ahead**: Always check forecasts before going out\n• **Seasonal prep**: Dress appropriately for conditions\n• **Weather safety**: Stay informed about severe weather alerts\n\nFor current conditions, I recommend checking your local weather service!"
            },
            
            // Travel
            'travel': {
                keywords: ['travel', 'vacation', 'trip', 'flight', 'hotel', 'tourism', 'destination'],
                response: "✈️ **Travel Planning** made easier:\n\n• **Flight booking**: Compare prices on Kayak, Expedia\n• **Accommodations**: Hotels.com, Airbnb, Booking.com\n• **Travel docs**: Check passport/visa requirements\n• **Packing tips**: Roll clothes, carry-on essentials\n• **Local culture**: Research customs and etiquette\n\nWhere are you planning to go? I can offer more specific advice!"
            },
            
            // Food & Cooking
            'food': {
                keywords: ['food', 'cooking', 'recipe', 'restaurant', 'cuisine', 'meal', 'ingredients'],
                response: "🍳 **Food & Cooking** inspiration:\n\n• **Recipe sources**: AllRecipes, Food Network, YouTube\n• **Meal planning**: Prep ingredients in advance\n• **Cooking basics**: Start with simple dishes\n• **Kitchen tools**: Good knife, cutting board, pans\n• **Food safety**: Proper storage and cooking temperatures\n\nWhat type of cuisine or cooking skill would you like to explore?"
            },
            
            // Shopping
            'shopping': {
                keywords: ['shopping', 'buy', 'purchase', 'store', 'online shopping', 'deals', 'discount'],
                response: "🛒 **Smart Shopping** tips:\n\n• **Compare prices**: Use price comparison websites\n• **Read reviews**: Check ratings before buying\n• **Look for deals**: Coupons, sales, cashback offers\n• **Online safety**: Shop from trusted websites\n• **Return policy**: Know the return/exchange terms\n\nWhat are you looking to buy? I can suggest shopping strategies!"
            },
            
            // Relationships
            'relationships': {
                keywords: ['relationships', 'dating', 'friendship', 'family', 'love', 'social'],
                response: "❤️ **Relationships** guidance:\n\n• **Communication**: Listen actively, express clearly\n• **Trust**: Build it through consistency and honesty\n• **Respect**: Value differences and boundaries\n• **Quality time**: Spend meaningful time together\n• **Support**: Be there during good and tough times\n\nHealthy relationships require effort from everyone involved. What aspect would you like to discuss?"
            },
            
            // Money & Finance
            'finance': {
                keywords: ['money', 'finance', 'budget', 'saving', 'investment', 'bank', 'loan', 'credit'],
                response: "💰 **Personal Finance** basics:\n\n• **Budgeting**: Track income and expenses\n• **Emergency fund**: Save 3-6 months of expenses\n• **Debt management**: Pay high-interest debt first\n• **Investing**: Start with index funds, diversify\n• **Credit score**: Pay bills on time, keep utilization low\n\n⚠️ *Consider consulting financial advisors for personalized advice!*"
            },
            
            // Sports
            'sports': {
                keywords: ['sports', 'football', 'basketball', 'soccer', 'tennis', 'baseball', 'cricket', 'olympics'],
                response: "⚽ **Sports** discussion:\n\n• **Popular sports**: Football, basketball, soccer, tennis\n• **Benefits**: Physical fitness, teamwork, discipline\n• **Following sports**: ESPN, sports news websites\n• **Playing sports**: Join local leagues or clubs\n• **Olympic sports**: Amazing displays of human achievement\n\nWhich sport interests you most? I can share more specific information!"
            },
            
            // Science
            'science': {
                keywords: ['science', 'physics', 'chemistry', 'biology', 'astronomy', 'research', 'discovery'],
                response: "🔬 **Science** is fascinating! Here are key areas:\n\n• **Physics**: Study of matter, energy, and their interactions\n• **Chemistry**: Composition and properties of substances\n• **Biology**: Living organisms and life processes\n• **Astronomy**: Stars, planets, and the universe\n• **Research**: Scientific method and discoveries\n\nWhat scientific field sparks your curiosity?"
            },
            
            // History
            'history': {
                keywords: ['history', 'historical', 'past', 'ancient', 'civilization', 'culture', 'heritage'],
                response: "📜 **History** helps us understand the present:\n\n• **Ancient civilizations**: Egypt, Greece, Rome, China\n• **World events**: Wars, revolutions, discoveries\n• **Cultural heritage**: Art, literature, traditions\n• **Historical figures**: Leaders, inventors, artists\n• **Learn from the past**: Patterns and lessons\n\nWhich historical period or topic interests you most?"
            }
        };
        
        // Course-specific responses
        this.courseResponses = {
            'programming-basics': "Here are some programming fundamentals:\n• Variables store data\n• Functions perform specific tasks\n• Loops repeat actions\n• Conditionals make decisions\n\nWhich concept would you like me to explain in detail?",
            
            'ai-concepts': "Key AI concepts to understand:\n• Algorithms: Step-by-step problem-solving procedures\n• Neural Networks: Brain-inspired computing systems\n• Training Data: Information used to teach AI systems\n• Prediction: AI's ability to forecast outcomes\n\nWhat specific AI topic interests you most?",
            
            'web-basics': "Web development fundamentals:\n• HTML: Structure of web pages\n• CSS: Styling and layout\n• JavaScript: Interactive functionality\n• Responsive Design: Works on all devices\n\nWould you like code examples for any of these?"
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadConversationHistory();
        this.getCurrentUser();
        this.showWelcomeMessage();
    }
    
    getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }
    
    setupEventListeners() {
        // Toggle chatbot - with error handling
        const toggleBtn = document.getElementById('chatbot-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                console.log('Chatbot toggle clicked'); // Debug log
                this.toggleChatbot();
            });
            console.log('Chatbot toggle event listener added'); // Debug log
        } else {
            console.error('Chatbot toggle button not found!');
        }
        
        // Close chatbot
        const closeBtn = document.getElementById('chatbot-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeChatbot();
            });
        }
        
        // Minimize chatbot
        const minimizeBtn = document.getElementById('chatbot-minimize');
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                this.minimizeChatbot();
            });
        }
        
        // Send message
        const sendBtn = document.getElementById('chatbot-send');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }
        
        // Enter key to send
        const inputField = document.getElementById('chatbot-input');
        if (inputField) {
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
            
            // Input suggestions
            inputField.addEventListener('input', (e) => {
                this.showSuggestions(e.target.value);
            });
        }
        
        // Quick question buttons
        const quickBtns = document.querySelectorAll('.quick-question-btn');
        if (quickBtns.length > 0) {
            quickBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const question = btn.getAttribute('data-question');
                    this.sendQuickQuestion(question);
                });
            });
            console.log(`Added event listeners to ${quickBtns.length} quick question buttons`);
        } else {
            console.warn('No quick question buttons found');
        }
    }
    
    toggleChatbot() {
        console.log('Toggle chatbot called, current state:', this.isOpen);
        
        const chatbotWindow = document.getElementById('chatbot-window');
        const notification = document.getElementById('chatbot-notification');
        
        if (!chatbotWindow) {
            console.error('Chatbot window not found!');
            return;
        }
        
        if (this.isOpen) {
            console.log('Closing chatbot...');
            this.closeChatbot();
        } else {
            console.log('Opening chatbot...');
            this.openChatbot();
            // Hide notification
            if (notification) {
                notification.style.display = 'none';
            }
        }
    }
    
    openChatbot() {
        console.log('Opening chatbot window...');
        const chatbotWindow = document.getElementById('chatbot-window');
        const toggle = document.getElementById('chatbot-toggle');
        
        if (!chatbotWindow) {
            console.error('Cannot open chatbot: window element not found');
            return;
        }
        
        if (!toggle) {
            console.error('Cannot open chatbot: toggle button not found');
            return;
        }
        
        chatbotWindow.classList.add('open');
        toggle.classList.add('active');
        this.isOpen = true;
        this.isMinimized = false;
        
        // Prevent body scroll on mobile
        if (window.innerWidth <= 768) {
            document.body.classList.add('chatbot-open');
            // Store current scroll position more safely
            this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop || 0;
            document.body.style.top = `-${this.scrollPosition}px`;
        }
        
        console.log('Chatbot window opened, classes added');
        
        // Focus input (delay for mobile)
        setTimeout(() => {
            const input = document.getElementById('chatbot-input');
            if (input && window.innerWidth > 480) {
                input.focus();
            }
        }, 300);
        
        this.scrollToBottom();
    }
    
    closeChatbot() {
        const chatbotWindow = document.getElementById('chatbot-window');
        const toggle = document.getElementById('chatbot-toggle');
        
        chatbotWindow.classList.remove('open', 'minimized');
        toggle.classList.remove('active');
        this.isOpen = false;
        this.isMinimized = false;
        
        // Restore body scroll on mobile
        if (window.innerWidth <= 768) {
            document.body.classList.remove('chatbot-open');
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            // Restore scroll position safely
            if (typeof this.scrollPosition === 'number' && this.scrollPosition >= 0) {
                setTimeout(() => {
                    window.scrollTo({
                        top: this.scrollPosition,
                        behavior: 'auto' // Use 'auto' to prevent smooth scrolling conflicts
                    });
                }, 50);
            }
        }
    }
    
    minimizeChatbot() {
        const chatbotWindow = document.getElementById('chatbot-window');
        
        if (this.isMinimized) {
            chatbotWindow.classList.remove('minimized');
            this.isMinimized = false;
        } else {
            chatbotWindow.classList.add('minimized');
            this.isMinimized = true;
        }
    }
    
    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (message === '') return;
        
        // Add user message
        this.addMessage('user', message);
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate bot response
        setTimeout(() => {
            this.generateResponse(message);
        }, 1000 + Math.random() * 1000); // Random delay for realism
    }
    
    sendQuickQuestion(question) {
        this.addMessage('user', question);
        this.showTypingIndicator();
        
        // Hide quick questions after first use
        document.getElementById('quick-questions').style.display = 'none';
        
        setTimeout(() => {
            this.generateResponse(question);
        }, 800);
    }
    
    addMessage(sender, content, timestamp = new Date()) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageElement = document.createElement('div');
        
        messageElement.className = `chatbot-message ${sender}-message`;
        
        if (sender === 'bot') {
            messageElement.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="message-bubble">
                        ${this.formatMessage(content)}
                    </div>
                    <span class="message-time">${this.formatTime(timestamp)}</span>
                </div>
            `;
        } else {
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="message-bubble">
                        ${this.escapeHtml(content)}
                    </div>
                    <span class="message-time">${this.formatTime(timestamp)}</span>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
        
        // Save to conversation history
        this.conversationHistory.push({
            sender,
            content,
            timestamp
        });
        
        this.saveConversationHistory();
    }
    
    showTypingIndicator() {
        const typingElement = document.getElementById('chatbot-typing');
        typingElement.style.display = 'block';
        this.isTyping = true;
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingElement = document.getElementById('chatbot-typing');
        typingElement.style.display = 'none';
        this.isTyping = false;
    }
    
    generateResponse(userMessage) {
        const response = this.getAIResponse(userMessage);
        
        this.hideTypingIndicator();
        this.addMessage('bot', response);
        
        // Show follow-up suggestions
        this.showFollowUpSuggestions(userMessage, response);
    }
    
    getAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Greeting responses
        if (this.matchesPattern(lowerMessage, ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
            const userName = this.currentUser ? this.currentUser.firstName : 'there';
            const greetings = [
                `Hello ${userName}! 👋 I'm here to help you with your studies and any other questions you might have!`,
                `Hi ${userName}! 😊 Great to see you! What's on your mind today?`,
                `Hey ${userName}! 🌟 Ready to chat? I can help with studies, general questions, or just have a conversation!`,
                `Good to see you ${userName}! 💫 What would you like to talk about?`
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        // Thank you responses
        if (this.matchesPattern(lowerMessage, ['thank you', 'thanks', 'appreciate'])) {
            const thankResponses = [
                "You're welcome! 😊 I'm always here to help with whatever you need!",
                "Happy to help! 🌟 Feel free to ask me anything else!",
                "My pleasure! 💫 That's what I'm here for!",
                "Glad I could assist! 😄 What else can I help you with?"
            ];
            return thankResponses[Math.floor(Math.random() * thankResponses.length)];
        }
        
        // Casual conversation starters
        if (this.matchesPattern(lowerMessage, ['how are you', 'how are you doing', 'what\'s up', 'how\'s it going'])) {
            return "I'm doing great, thanks for asking! 😊 I'm here and ready to help with whatever you need. How are you doing today? Anything interesting happening in your life?";
        }
        
        // Personal questions about the bot
        if (this.matchesPattern(lowerMessage, ['who are you', 'what are you', 'tell me about yourself', 'about you'])) {
            return "I'm EduBot! 🤖 I'm your friendly AI assistant designed to help with:\n\n• 📚 Educational topics and learning\n• 💡 General knowledge and advice\n• 🗨️ Casual conversations\n• 🔧 Problem-solving and guidance\n\nI'm here 24/7 and love helping people learn and grow! What would you like to know or discuss?";
        }
        
        // Compliments and positive responses
        if (this.matchesPattern(lowerMessage, ['you\'re awesome', 'you\'re great', 'good job', 'well done', 'amazing'])) {
            return "Aww, thank you so much! 🥰 That really means a lot to me! I'm just happy I can be helpful. You're pretty awesome yourself! 🌟";
        }
        
        // Jokes and humor
        if (this.matchesPattern(lowerMessage, ['tell me a joke', 'joke', 'make me laugh', 'funny', 'humor'])) {
            const jokes = [
                "Why do programmers prefer dark mode? Because light attracts bugs! 🐛💻",
                "Why did the student eat his homework? Because the teacher told him it was a piece of cake! 🍰📚",
                "What did the AI say to the human? 'You're learning fast... but I'm still processing faster!' 🤖⚡",
                "Why don't scientists trust atoms? Because they make up everything! ⚛️😄",
                "How do you organize a space party? You planet! 🌍🚀"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)] + "\n\nHope that brought a smile to your face! 😊 Want another one?";
        }
        
        // Motivational responses
        if (this.matchesPattern(lowerMessage, ['motivate me', 'inspiration', 'feeling down', 'sad', 'discouraged', 'motivation'])) {
            const motivational = [
                "🌟 **You've got this!** Every expert was once a beginner. Keep pushing forward!",
                "💪 **Believe in yourself!** The only impossible journey is the one you never begin.",
                "🚀 **Keep going!** Success is not final, failure is not fatal: it is the courage to continue that counts.",
                "🌈 **Stay positive!** Every challenge is an opportunity to grow stronger and wiser.",
                "⭐ **You're amazing!** Remember, progress is progress, no matter how small."
            ];
            return motivational[Math.floor(Math.random() * motivational.length)] + "\n\nWhat's on your mind? I'm here to support you! 💙";
        }
        
        // Time-related questions
        if (this.matchesPattern(lowerMessage, ['what time is it', 'current time', 'time now'])) {
            const now = new Date();
            return `🕐 The current time is ${now.toLocaleTimeString()}. \n\nIs there something specific you need help with time management or scheduling?`;
        }
        
        // Date-related questions
        if (this.matchesPattern(lowerMessage, ['what date is it', 'today\'s date', 'current date'])) {
            const now = new Date();
            return `📅 Today is ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.\n\nAny plans for today? Need help organizing your schedule?`;
        }
        
        // Age and personal questions
        if (this.matchesPattern(lowerMessage, ['how old are you', 'your age', 'when were you born'])) {
            return "I'm a timeless AI! 🤖✨ I don't age in human years, but I'm constantly learning and improving. I was created to help students like you, and every conversation makes me better at it! How old are you? Are you a student?";
        }
        
        // Course enrollment questions
        if (this.matchesPattern(lowerMessage, ['how to enroll', 'enroll in course', 'sign up for course'])) {
            return "📝 **To enroll in a course:**\n\n1. Browse available courses in the Courses section\n2. Click 'Enroll Now' on your desired course\n3. Log in if you haven't already\n4. You'll be redirected to the course content\n5. Access notes and tests after enrollment\n\nNeed help with a specific course?";
        }
        
        // Progress tracking questions
        if (this.matchesPattern(lowerMessage, ['track progress', 'my progress', 'learning progress'])) {
            return "📊 **Track Your Learning Progress:**\n\n• Check the Analytics section on the homepage\n• View your study time and completion rates\n• Monitor achievements and streaks\n• Review course-specific progress bars\n\nYour consistent effort is key to success! 🎯";
        }
        
        // Technical issues
        if (this.matchesPattern(lowerMessage, ['not working', 'error', 'bug', 'problem', 'issue'])) {
            return "🔧 **Having technical issues?** Here's how I can help:\n\n• Try refreshing the page\n• Clear your browser cache\n• Check your internet connection\n• Ensure you're logged in properly\n\nIf the problem persists, please describe the specific error you're encountering, and I'll provide more targeted assistance.";
        }
        
        // Study schedule
        if (this.matchesPattern(lowerMessage, ['study schedule', 'time management', 'when to study'])) {
            return "⏰ **Creating an Effective Study Schedule:**\n\n• **Morning**: Best for complex concepts (peak focus)\n• **Afternoon**: Good for practice and review\n• **Evening**: Ideal for light reading and planning\n• **Consistency**: Same time daily builds habits\n• **Breaks**: 10-minute breaks every 25-50 minutes\n\nWhat subject are you trying to schedule time for?";
        }
        
        // Check knowledge base for domain-specific responses
        for (const [topic, data] of Object.entries(this.knowledgeBase)) {
            if (this.matchesKeywords(lowerMessage, data.keywords)) {
                return data.response;
            }
        }
        
        // Specific programming questions
        if (this.matchesPattern(lowerMessage, ['python', 'javascript', 'java', 'c++', 'programming language'])) {
            return this.getLanguageSpecificResponse(lowerMessage);
        }
        
        // Math and statistics help
        if (this.matchesPattern(lowerMessage, ['mathematics', 'math', 'statistics', 'calculus', 'algebra'])) {
            return "📐 **Mathematics & Statistics Help:**\n\n• **Algebra**: Solving equations and inequalities\n• **Calculus**: Derivatives, integrals, limits\n• **Statistics**: Mean, median, mode, standard deviation\n• **Probability**: Events, distributions, Bayes' theorem\n\nWhat specific math topic do you need help with? I can provide examples and step-by-step solutions!";
        }
        
        // Career guidance
        if (this.matchesPattern(lowerMessage, ['career', 'job', 'future', 'what should i do', 'career path'])) {
            return "🚀 **Career Guidance in Tech:**\n\n• **Software Developer**: Build applications and systems\n• **Data Scientist**: Analyze data for insights\n• **AI Engineer**: Develop intelligent systems\n• **UX Designer**: Create user-friendly interfaces\n• **DevOps Engineer**: Manage development operations\n\nWhat field interests you most? I can suggest relevant courses and skills to develop!";
        }
        
        // Default response with suggestions
        return this.getDefaultResponse(lowerMessage);
    }
    
    getLanguageSpecificResponse(message) {
        if (message.includes('python')) {
            return "🐍 **Python Programming:**\n\n• **Beginner-friendly**: Easy syntax and readability\n• **Versatile**: Web dev, data science, AI, automation\n• **Key concepts**: Variables, functions, loops, OOP\n• **Popular libraries**: NumPy, Pandas, TensorFlow\n\n```python\n# Simple Python example\nname = 'Student'\nprint(f'Hello, {name}!')\n```\n\nWant to start with Python basics or explore specific applications?";
        } else if (message.includes('javascript')) {
            return "⚡ **JavaScript Programming:**\n\n• **Web development**: Frontend and backend (Node.js)\n• **Interactive**: Makes websites dynamic\n• **Key concepts**: DOM manipulation, async programming\n• **Frameworks**: React, Vue, Angular\n\n```javascript\n// Simple JavaScript example\nconst greeting = (name) => {\n    return `Hello, ${name}!`;\n};\nconsole.log(greeting('Student'));\n```\n\nInterested in frontend or backend JavaScript development?";
        } else {
            return "💻 **Programming Languages:**\n\nEach language has its strengths:\n• **Python**: Data science, AI, automation\n• **JavaScript**: Web development\n• **Java**: Enterprise applications\n• **C++**: System programming, games\n\nWhich language aligns with your goals? I can help you choose!";
        }
    }
    
    getDefaultResponse(message) {
        // Try to provide contextual responses based on keywords in the message
        const lowerMessage = message.toLowerCase();
        
        // If message contains question words, provide encouraging response
        if (this.matchesPattern(lowerMessage, ['how', 'what', 'why', 'when', 'where', 'which', 'who'])) {
            const questionResponses = [
                "That's a great question! 🤔 While I might not have the exact answer you're looking for, I can try to help in other ways.",
                "Interesting question! 💡 Let me see how I can assist you with this.",
                "I love curious minds! 🎆 Even if I don't know everything, I'm happy to explore this topic with you."
            ];
            const randomResponse = questionResponses[Math.floor(Math.random() * questionResponses.length)];
            
            return `${randomResponse}\n\n🚀 **Here's what I can definitely help with:**\n• 📚 Educational topics (AI, Programming, Data Science)\n• 💡 General knowledge and advice\n• 🔧 Technology and science questions\n• 🎯 Study tips and learning strategies\n• 🗨️ Casual conversation and motivation\n• 🌟 Entertainment and lifestyle topics\n\nTry rephrasing your question or ask about any of these topics!`;
        }
        
        // If message seems like a statement or opinion
        if (this.matchesPattern(lowerMessage, ['i think', 'i believe', 'i feel', 'my opinion', 'i like', 'i don\'t like'])) {
            return "I appreciate you sharing your thoughts! 💭 Everyone's perspective is valuable. \n\nIs there something specific you'd like to discuss or explore further? I'm here to listen and help however I can! 🌟";
        }
        
        // If message contains numbers or calculations
        if (/\d/.test(message)) {
            return "I notice your message contains numbers! 🔢 Are you working on:\n\n• 🧮 Math problems or calculations?\n• 📊 Data analysis or statistics?\n• 💰 Financial planning or budgeting?\n• 🔭 Science or engineering problems?\n\nLet me know what specific help you need!";
        }
        
        // If message is very short (1-2 words)
        if (message.trim().split(' ').length <= 2) {
            return "I see you wrote '${message}'! 😊 Could you tell me a bit more about what you're looking for? \n\nI'm here to help with learning, general questions, or just have a friendly chat! What's on your mind? 💫";
        }
        
        // Intelligent fallback responses
        const intelligentFallbacks = [
            "That's an interesting topic! 🤔 While I might not have all the details, I'd love to try helping you think through it.",
            "I'm always learning new things! 🌱 Even if I don't know everything about this topic, maybe I can offer a different perspective.",
            "You know what? That's something I'd like to know more about too! 💡 Let's explore this together.",
            "Great question! 🎆 I might not be an expert on this specific topic, but I'm happy to discuss it with you."
        ];
        
        const randomFallback = intelligentFallbacks[Math.floor(Math.random() * intelligentFallbacks.length)];
        
        return `${randomFallback}\n\n🚀 **Meanwhile, I'm definitely great at:**\n• 📚 Educational topics and learning\n• 💻 Programming and technology\n• 🔬 Science and research\n• 🎨 Creative and lifestyle topics\n• 💡 Problem-solving and advice\n• 😄 Fun conversations and motivation\n\nWhat would you like to chat about? Or feel free to rephrase your question!`;
    }
    
    matchesPattern(message, patterns) {
        return patterns.some(pattern => message.includes(pattern));
    }
    
    matchesKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword.toLowerCase()));
    }
    
    formatMessage(content) {
        // Convert markdown-style formatting
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
        content = content.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        content = content.replace(/`(.*?)`/g, '<code>$1</code>');
        content = content.replace(/\n/g, '<br>');
        
        return content;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    formatTime(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diffMs = now - time;
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        
        return time.toLocaleDateString();
    }
    
    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;
        
        // Use requestAnimationFrame for smoother scrolling
        requestAnimationFrame(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Additional scroll for mobile devices
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }, 150);
            }
        });
    }
    
    showSuggestions(input) {
        const suggestionsContainer = document.getElementById('chatbot-suggestions');
        
        if (input.length < 2) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        const suggestions = this.getSuggestions(input.toLowerCase());
        
        if (suggestions.length > 0) {
            suggestionsContainer.innerHTML = suggestions.map(suggestion => 
                `<button class="suggestion-btn" onclick="chatbot.selectSuggestion('${suggestion}')">${suggestion}</button>`
            ).join('');
            suggestionsContainer.style.display = 'block';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    }
    
    getSuggestions(input) {
        const commonQuestions = [
            'What is artificial intelligence?',
            'How do I start programming?',
            'Tell me a joke',
            'How are you doing?',
            'What is machine learning?',
            'Help me with technology',
            'Study tips for beginners',
            'What should I cook for dinner?',
            'How to manage my finances?',
            'Tell me about sports',
            'What programming language should I learn?',
            'How to stay motivated?',
            'What is the weather like?',
            'Travel planning tips',
            'Health and fitness advice',
            'Entertainment recommendations',
            'How to track my learning progress?',
            'What is data science?',
            'Help with relationships',
            'Shopping advice'
        ];
        
        return commonQuestions.filter(question => 
            question.toLowerCase().includes(input)
        ).slice(0, 3);
    }
    
    selectSuggestion(suggestion) {
        document.getElementById('chatbot-input').value = suggestion;
        document.getElementById('chatbot-suggestions').style.display = 'none';
    }
    
    showFollowUpSuggestions(userMessage, botResponse) {
        // Add contextual follow-up buttons based on the topic discussed
        const messagesContainer = document.getElementById('chatbot-messages');
        const lastMessage = messagesContainer.lastElementChild;
        
        let followUps = [];
        
        if (userMessage.toLowerCase().includes('ai') || userMessage.toLowerCase().includes('artificial intelligence')) {
            followUps = [
                'Show me AI courses',
                'Machine learning basics',
                'AI career paths'
            ];
        } else if (userMessage.toLowerCase().includes('programming') || userMessage.toLowerCase().includes('coding')) {
            followUps = [
                'Best programming language to start',
                'Programming practice exercises',
                'Show programming courses'
            ];
        }
        
        if (followUps.length > 0) {
            const followUpElement = document.createElement('div');
            followUpElement.className = 'follow-up-suggestions';
            followUpElement.innerHTML = `
                <div class="follow-up-title">Quick follow-ups:</div>
                ${followUps.map(followUp => 
                    `<button class="follow-up-btn" onclick="chatbot.sendQuickQuestion('${followUp}')">${followUp}</button>`
                ).join('')}
            `;
            
            lastMessage.appendChild(followUpElement);
        }
    }
    
    showWelcomeMessage() {
        // Show notification badge to attract attention
        setTimeout(() => {
            const notification = document.getElementById('chatbot-notification');
            notification.style.display = 'block';
        }, 3000);
    }
    
    loadConversationHistory() {
        const saved = localStorage.getItem('chatbot_history');
        if (saved) {
            this.conversationHistory = JSON.parse(saved);
            
            // Restore recent messages (last 10)
            const recentMessages = this.conversationHistory.slice(-5);
            if (recentMessages.length > 1) { // Only if there are user messages
                const messagesContainer = document.getElementById('chatbot-messages');
                // Clear welcome message
                messagesContainer.innerHTML = '';
                
                recentMessages.forEach(msg => {
                    this.addMessageToDOM(msg.sender, msg.content, new Date(msg.timestamp));
                });
            }
        }
    }
    
    addMessageToDOM(sender, content, timestamp) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageElement = document.createElement('div');
        
        messageElement.className = `chatbot-message ${sender}-message`;
        
        if (sender === 'bot') {
            messageElement.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="message-bubble">
                        ${this.formatMessage(content)}
                    </div>
                    <span class="message-time">${this.formatTime(timestamp)}</span>
                </div>
            `;
        } else {
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="message-bubble">
                        ${this.escapeHtml(content)}
                    </div>
                    <span class="message-time">${this.formatTime(timestamp)}</span>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageElement);
    }
    
    saveConversationHistory() {
        // Keep only last 50 messages to prevent localStorage bloat
        if (this.conversationHistory.length > 50) {
            this.conversationHistory = this.conversationHistory.slice(-50);
        }
        
        localStorage.setItem('chatbot_history', JSON.stringify(this.conversationHistory));
    }
    
    // Method to clear conversation history
    clearHistory() {
        this.conversationHistory = [];
        localStorage.removeItem('chatbot_history');
        
        // Clear DOM messages
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.innerHTML = `
            <div class="chatbot-message bot-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="message-bubble">
                        <p>👋 Hi there! I'm EduBot, your AI learning assistant. I'm here to help you with:</p>
                        <ul>
                            <li>📚 Course-related questions</li>
                            <li>🧠 Concept explanations</li>
                            <li>💡 Study tips and guidance</li>
                            <li>🔧 Technical doubts</li>
                        </ul>
                        <p>What would you like to learn about today?</p>
                    </div>
                    <span class="message-time">Just now</span>
                </div>
            </div>
        `;
        
        // Show quick questions again
        document.getElementById('quick-questions').style.display = 'flex';
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing chatbot...');
    
    // Wait a bit more to ensure all elements are ready
    setTimeout(() => {
        try {
            window.chatbot = new EduChatbot();
            console.log('Chatbot initialized successfully!');
        } catch (error) {
            console.error('Error initializing chatbot:', error);
            
            // Fallback: try again after a longer delay
            setTimeout(() => {
                try {
                    window.chatbot = new EduChatbot();
                    console.log('Chatbot initialized successfully on second attempt!');
                } catch (fallbackError) {
                    console.error('Failed to initialize chatbot on second attempt:', fallbackError);
                }
            }, 2000);
        }
    }, 500);
});

// Also try to initialize when window loads as a fallback
window.addEventListener('load', function() {
    if (!window.chatbot) {
        console.log('Window loaded, attempting chatbot initialization...');
        setTimeout(() => {
            try {
                window.chatbot = new EduChatbot();
                console.log('Chatbot initialized on window load!');
            } catch (error) {
                console.error('Error initializing chatbot on window load:', error);
            }
        }, 1000);
    }
});

// Manual initialization function
window.initChatbot = function() {
    if (window.chatbot) {
        console.log('Chatbot already initialized');
        return window.chatbot;
    }
    
    try {
        window.chatbot = new EduChatbot();
        console.log('Manual chatbot initialization successful!');
        return window.chatbot;
    } catch (error) {
        console.error('Manual chatbot initialization failed:', error);
        return null;
    }
};

// Export for global access
window.EduChatbot = EduChatbot;
