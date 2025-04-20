// Global variables
let apiKey = ['AIzaSy', 'BiO5_lYq', 'TBfQY-i-9', 'tzM4ZbDNo', '7mSxc4k'].join('');
const YOUTUBE_API_KEY = ['AIzaSy', 'Bf7T7Z6v', '2qjYHMqm5', 'Db6yK0hhm', 'x6Nnh8k'].join('');
let processedContent = '';
let chatHistory = [];
let quizQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let quizSubmitted = false;
let userContext = {
    curriculum: '',
    grade: '',
    subject: ''
};

// DOM elements
const welcomeModal = document.getElementById('welcomeModal');
const welcomeNextBtn = document.getElementById('welcomeNextBtn');
const welcomePrevBtn = document.getElementById('welcomePrevBtn');
const skipAllBtn = document.getElementById('skipAllBtn');
const currentQuestionContainer = document.getElementById('currentQuestionContainer');
const darkModeToggle = document.getElementById('darkModeToggle');
const mainContent = document.getElementById('mainContent');
const documentUpload = document.getElementById('documentUpload');
const fileUploadBtn = document.getElementById('fileUploadBtn');
const imageUpload = document.getElementById('imageUpload');
const imageUploadBtn = document.getElementById('imageUploadBtn');
const audioUpload = document.getElementById('audioUpload');
const audioUploadBtn = document.getElementById('audioUploadBtn');
const processBtn = document.getElementById('processBtn');
const processingSection = document.getElementById('processingSection');
const processingStatus = document.getElementById('processingStatus');
const actionSection = document.getElementById('actionSection');
const generateNotes = document.getElementById('generateNotes');
const generateQuiz = document.getElementById('generateQuiz');
const chatAboutContent = document.getElementById('chatAboutContent');
const explainInDetail = document.getElementById('explainInDetail');
const notesSection = document.getElementById('notesSection');
const notesOutput = document.getElementById('notesOutput');
const copyNotes = document.getElementById('copyNotes');
const quizSection = document.getElementById('quizSection');
const questionLoadingBar = document.getElementById('questionLoadingBar');
const questionLoadingProgress = document.getElementById('questionLoadingProgress');
const currentQuestionElement = document.getElementById('currentQuestion');
const quizProgress = document.getElementById('quizProgress');
const quizPrevBtn = document.getElementById('quizPrevBtn');
const quizNextBtn = document.getElementById('quizNextBtn');
const submitQuizBtn = document.getElementById('submitQuiz');
const quizResults = document.getElementById('quizResults');
const quizScore = document.getElementById('quizScore');
const allQuestionsResults = document.getElementById('allQuestionsResults');
const retakeQuiz = document.getElementById('retakeQuiz');
const chatSection = document.getElementById('chatSection');
const chatHistoryElement = document.getElementById('chatHistory');
const chatMessage = document.getElementById('chatMessage');
const sendChat = document.getElementById('sendChat');
const uploadTypeRadios = document.querySelectorAll('input[name="uploadType"]');
const documentUploadSection = document.getElementById('documentUploadSection');
const youtubeUploadSection = document.getElementById('youtubeUploadSection');
const websiteUploadSection = document.getElementById('websiteUploadSection');
const youtubeUrl = document.getElementById('youtubeUrl');
const websiteUrl = document.getElementById('websiteUrl');
const imageUploadSection = document.getElementById('imageUploadSection');
const audioUploadSection = document.getElementById('audioUploadSection');
const textUploadSection = document.getElementById('textUploadSection');
const directTextInput = document.getElementById('directTextInput');
const mainUploadOptions = document.getElementById('mainUploadOptions');
const moreUploadOptions = document.getElementById('moreUploadOptions');
const moreOptionsBtn = document.getElementById('moreOptionsBtn');
const moreOptionsDropdown = document.getElementById('moreOptionsDropdown');
const showMoreOptions = document.getElementById('showMoreOptions');
const backToMainOptions = document.getElementById('backToMainOptions');
const explainSection = document.getElementById('explainSection');
const explainContent = document.getElementById('explainContent');
const explainChatHistory = document.getElementById('explainChatHistory');
const explainChatMessage = document.getElementById('explainChatMessage');
const sendExplainChat = document.getElementById('sendExplainChat');
const explainThisBtn = document.getElementById('explainThisBtn');
const apiKeyModal = document.getElementById('apiKeyModal');
const apiKeyInput = document.getElementById('apiKeyInput');
const submitApiKey = document.getElementById('submitApiKey');
const closeApiKeyModal = document.getElementById('closeApiKeyModal');
const changeApiKey = document.getElementById('changeApiKey');
const moreInfoLink = document.getElementById('moreInfoLink');
const infoModal = document.getElementById('infoModal');
const closeInfoModal = document.getElementById('closeInfoModal');

// Initialize PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js';

// Check for dark mode preference
function checkDarkModePreference() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedMode === 'dark' || (savedMode === null && prefersDark)) {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
}

// Initialize the app
function init() {
    checkDarkModePreference();
    
    // Show welcome modal first
    welcomeModal.classList.remove('hidden');
    
    // Set up event listeners for welcome modal
    setupWelcomeModal();
}

// Set up welcome modal interactions
function setupWelcomeModal() {
    let currentQuestionIndex = 0;
    
    // Display the first question
    displayWelcomeQuestion(currentQuestionIndex);
    
    // Next question button
    welcomeNextBtn.addEventListener('click', function() {
        // Save the current answer
        saveCurrentAnswer(currentQuestionIndex);
        
        // Move to next question or finish
        if (currentQuestionIndex < welcomeQuestions.length - 1) {
            currentQuestionIndex++;
            displayWelcomeQuestion(currentQuestionIndex);
            welcomePrevBtn.disabled = false;
            
            if (currentQuestionIndex === welcomeQuestions.length - 1) {
                this.textContent = 'Finish';
            }
        } else {
            // All questions answered, close modal
            welcomeModal.classList.add('hidden');
            mainContent.classList.remove('hidden');
        }
    });
    
    // Previous question button
    welcomePrevBtn.addEventListener('click', function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayWelcomeQuestion(currentQuestionIndex);
            
            if (currentQuestionIndex === 0) {
                this.disabled = true;
            }
            
            welcomeNextBtn.textContent = 'Next';
        }
    });
    
    // Skip all button
    skipAllBtn.addEventListener('click', function() {
        welcomeModal.classList.add('hidden');
        mainContent.classList.remove('hidden');
    });
}

// Welcome questions
const welcomeQuestions = [
    {
        id: 'curriculum',
        question: '1. What curriculum are you using?',
        options: [
            'CAIE Cambridge IGCSE',
            'IB',
            { value: 'other', label: 'Other', showInput: true }
        ]
    },
    {
        id: 'grade',
        question: '2. What grade are you in?',
        options: [
            'Secondary 1 (Grade 7)',
            'Secondary 2 (Grade 8)',
            'Secondary 3 (Grade 9)',
            'Secondary 4 (Grade 10)',
            'JC 1 (Grade 11)',
            'JC 2 (Grade 12)',
            { value: 'other', label: 'Other', showInput: true }
        ]
    },
    {
        id: 'subject',
        question: '3. What subject are you studying for?',
        options: [
            'Mathematics',
            'English/Literature',
            'Physics',
            'Biology',
            'Chemistry',		
            'Computer Sciences',
            'Economics',
            'Business',
            'Global Perspectives',
            'Religious Studies',
            'History',
            'Geography',
            'Sociology',
            { value: 'other', label: 'Other', showInput: true }
        ],
        dynamicOptions: true
    }
];

// Display a welcome question
function displayWelcomeQuestion(index) {
    const question = welcomeQuestions[index];
    let html = `
        <div class="welcome-question" id="${question.id}Question">
            <h3>${question.question}</h3>
            <div class="welcome-options" id="${question.id}Options">
    `;
    
    // Get options (handle dynamic options for subject based on grade)
    let options = question.options;
    if (question.dynamicOptions && userContext.grade) {
        const isGrade7or8 = userContext.grade.includes('Grade 7') || userContext.grade.includes('Grade 8');
        if (isGrade7or8) {
            options = [
                'Mathematics',
                'English',
                'Science',
                'Global Perspectives',
                'ICT',
                'Music',
                'History',
                'Geography',
                'Religious Studies',
                { value: 'other', label: 'Other', showInput: true }
            ];
        }
    }
    
    // Add options to HTML
    options.forEach((option, i) => {
        const optionValue = typeof option === 'object' ? option.value : option;
        const optionLabel = typeof option === 'object' ? option.label : option;
        const optionId = `${question.id}Option${i}`;
        
        html += `
            <div class="welcome-option">
                <input type="radio" id="${optionId}" name="${question.id}" value="${optionValue}">
                <label for="${optionId}">${optionLabel}</label>
            </div>
        `;
        
        if (typeof option === 'object' && option.showInput) {
            html += `
                <input type="text" id="${question.id}Custom" class="welcome-custom-input" placeholder="Please specify">
            `;
        }
    });
    
    html += `</div></div>`;
    currentQuestionContainer.innerHTML = html;
    
    options.forEach((option, i) => {
        const optionValue = typeof option === 'object' ? option.value : option;
        const optionId = `${question.id}Option${i}`;
        const radioBtn = document.getElementById(optionId);
        
        if (radioBtn) {
            if (userContext[question.id] === optionValue || 
                (optionValue === 'other' && userContext[question.id] && !options.includes(userContext[question.id]))) {
                radioBtn.checked = true;
                if (typeof option === 'object' && option.showInput) {
                    document.getElementById(`${question.id}Custom`).style.display = 'block';
                    if (userContext[question.id] && !options.includes(userContext[question.id])) {
                        document.getElementById(`${question.id}Custom`).value = userContext[question.id];
                    }
                }
            }
            
            radioBtn.addEventListener('change', function() {
                if (typeof option === 'object' && option.showInput) {
                    document.getElementById(`${question.id}Custom`).style.display = 
                        this.checked ? 'block' : 'none';
                }
            });
        }
    });
    
    if (index === 0) {
        welcomePrevBtn.disabled = true;
    } else {
        welcomePrevBtn.disabled = false;
    }
    
    if (index === welcomeQuestions.length - 1) {
        welcomeNextBtn.textContent = 'Finish';
    } else {
        welcomeNextBtn.textContent = 'Next';
    }
}

// Save the current answer
function saveCurrentAnswer(index) {
    const question = welcomeQuestions[index];
    const selectedOption = document.querySelector(`input[name="${question.id}"]:checked`);
    
    if (selectedOption) {
        if (selectedOption.value === 'other') {
            const customValue = document.getElementById(`${question.id}Custom`).value.trim();
            if (customValue) {
                userContext[question.id] = customValue;
            } else {
                userContext[question.id] = '';
            }
        } else {
            userContext[question.id] = selectedOption.value;
        }
    } else {
        userContext[question.id] = '';
    }
}

// Dark mode toggle
darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'light');
    }
});

// Change API key button
changeApiKey.addEventListener('click', function() {
    apiKeyModal.classList.remove('hidden');
});

// Close API key modal
closeApiKeyModal.addEventListener('click', function() {
    apiKeyModal.classList.add('hidden');
});

// API key submission
submitApiKey.addEventListener('click', function() {
    const newApiKey = apiKeyInput.value.trim();
    if (newApiKey) {
        apiKey = newApiKey;
        apiKeyModal.classList.add('hidden');
        showError('API key updated successfully!', false, 'errorContainer');
    } else {
        showError('Please enter a valid API key', false, 'modal-body');
    }
});

// More options dropdown
moreOptionsBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    moreOptionsDropdown.classList.toggle('show');
});

// Close dropdown when clicking elsewhere
document.addEventListener('click', function() {
    moreOptionsDropdown.classList.remove('show');
});

// Show more upload options
showMoreOptions.addEventListener('click', function() {
    mainUploadOptions.classList.add('hidden');
    moreUploadOptions.classList.remove('hidden');
    moreOptionsDropdown.classList.remove('show');
    
    documentUploadSection.classList.add('hidden');
    youtubeUploadSection.classList.add('hidden');
    websiteUploadSection.classList.add('hidden');
    imageUploadSection.classList.add('hidden');
    audioUploadSection.classList.add('hidden');
    textUploadSection.classList.add('hidden');
    
    document.getElementById('uploadTypeImage').checked = true;
    imageUploadSection.classList.remove('hidden');
});

// Back to main options
backToMainOptions.addEventListener('click', function() {
    mainUploadOptions.classList.remove('hidden');
    moreUploadOptions.classList.add('hidden');
    
    documentUploadSection.classList.add('hidden');
    youtubeUploadSection.classList.add('hidden');
    websiteUploadSection.classList.add('hidden');
    imageUploadSection.classList.add('hidden');
    audioUploadSection.classList.add('hidden');
    textUploadSection.classList.add('hidden');
    
    document.getElementById('uploadTypeDocument').checked = true;
    documentUploadSection.classList.remove('hidden');
});

// Upload type selection (main options)
document.getElementById('uploadTypeDocument').addEventListener('change', function() {
    documentUploadSection.classList.remove('hidden');
    youtubeUploadSection.classList.add('hidden');
    websiteUploadSection.classList.add('hidden');
});

document.getElementById('uploadTypeYoutube').addEventListener('change', function() {
    documentUploadSection.classList.add('hidden');
    youtubeUploadSection.classList.remove('hidden');
    websiteUploadSection.classList.add('hidden');
});

document.getElementById('uploadTypeWebsite').addEventListener('change', function() {
    documentUploadSection.classList.add('hidden');
    youtubeUploadSection.classList.add('hidden');
    websiteUploadSection.classList.remove('hidden');
});

// Upload type selection (more options)
document.getElementById('uploadTypeImage').addEventListener('change', function() {
    imageUploadSection.classList.remove('hidden');
    audioUploadSection.classList.add('hidden');
    textUploadSection.classList.add('hidden');
});

document.getElementById('uploadTypeAudio').addEventListener('change', function() {
    imageUploadSection.classList.add('hidden');
    audioUploadSection.classList.remove('hidden');
    textUploadSection.classList.add('hidden');
});

document.getElementById('uploadTypeText').addEventListener('change', function() {
    imageUploadSection.classList.add('hidden');
    audioUploadSection.classList.add('hidden');
    textUploadSection.classList.remove('hidden');
});

// File upload button click handlers
fileUploadBtn.addEventListener('click', function() {
    documentUpload.click();
});

imageUploadBtn.addEventListener('click', function() {
    imageUpload.click();
});

audioUploadBtn.addEventListener('click', function() {
    audioUpload.click();
});

// Show selected file names
documentUpload.addEventListener('change', function() {
    if (this.files.length > 0) {
        fileUploadBtn.innerHTML = `<i class="fas fa-file"></i> ${this.files[0].name}`;
    }
});

imageUpload.addEventListener('change', function() {
    if (this.files.length > 0) {
        imageUploadBtn.innerHTML = `<i class="fas fa-image"></i> ${this.files[0].name}`;
    }
});

audioUpload.addEventListener('change', function() {
    if (this.files.length > 0) {
        audioUploadBtn.innerHTML = `<i class="fas fa-microphone"></i> ${this.files[0].name}`;
    }
});

// Process content button
processBtn.addEventListener('click', async function() {
    notesSection.classList.add('hidden');
    quizSection.classList.add('hidden');
    quizResults.classList.add('hidden');
    chatSection.classList.add('hidden');
    explainSection.classList.add('hidden');
    chatHistory = [];
    
    // Clear previous quiz data
    quizQuestions = [];
    currentQuestionIndex = 0;
    userAnswers = [];
    quizSubmitted = false;
    
    const selectedUploadType = document.querySelector('input[name="uploadType"]:checked').value;
    
    // Show/hide explain in detail button based on upload type
    if (selectedUploadType === 'document' || selectedUploadType === 'text') {
        explainInDetail.classList.remove('hidden');
    } else {
        explainInDetail.classList.add('hidden');
    }
    
    processingSection.classList.remove('hidden');
    document.getElementById('errorContainer').innerHTML = '';
    updateProgress(0, 'Starting...');
    
    try {
        let content = '';
        
        if (selectedUploadType === 'youtube') {
            const url = youtubeUrl.value.trim();
            if (!url) throw new Error('Please enter a YouTube URL');
            content = await processYouTubeVideo(url);
        } 
        else if (selectedUploadType === 'document') {
            const file = documentUpload.files[0];
            if (!file) throw new Error('Please select a file');
            content = await processDocument(file);
        }
        else if (selectedUploadType === 'website') {
            const url = websiteUrl.value.trim();
            if (!url) throw new Error('Please enter a website URL');
            content = await processWebsite(url);
        }
        else if (selectedUploadType === 'image') {
            const file = imageUpload.files[0];
            if (!file) throw new Error('Please select an image');
            content = await processImage(file);
        }
        else if (selectedUploadType === 'audio') {
            const file = audioUpload.files[0];
            if (!file) throw new Error('Please select an audio file');
            content = await processAudio(file);
        }
        else if (selectedUploadType === 'text') {
            content = directTextInput.value.trim();
            if (!content) throw new Error('Please enter some text');
            updateProgress(100, 'Text ready!');
        }
        
        processedContent = content;
        updateProgress(100, 'Done!');
        
        setTimeout(() => {
            processingSection.classList.add('hidden');
            actionSection.classList.remove('hidden');
        }, 1000);
    } catch (error) {
        updateProgress(0, 'Failed');
        showError(`
            <strong>Processing Error</strong><br>
            ${error.message}<br>
            <small>Try a different file or video.</small>
        `);
        
        setTimeout(() => {
            processingSection.classList.add('hidden');
        }, 3000);
    }
});

// Process YouTube video
async function processYouTubeVideo(url) {
    updateProgress(10, 'Validating YouTube URL...');
    const videoId = extractYouTubeId(url);
    if (!videoId) throw new Error('Invalid YouTube URL format');

    const transcript = await getYouTubeTranscript(videoId);
    
    if (transcript) {
        updateProgress(80, 'Processing transcript...');
        return `YouTube Video Transcript:\n\n${transcript}`;
    }

    updateProgress(40, 'Fetching video details...');
    const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );
    
    const detailsData = await detailsResponse.json();
    if (!detailsData.items?.length) throw new Error('Video not found');
    
    const snippet = detailsData.items[0].snippet;
    updateProgress(70, 'Using video metadata...');
    
    return `YouTube Video: ${snippet.title}\n\nDescription:\n${snippet.description || "No description available"}`;
}

// Process website content
async function processWebsite(url) {
    updateProgress(10, 'Fetching website content...');
    
    try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch website content');
        }
        
        const data = await response.json();
        
        if (!data.contents) {
            throw new Error('No content received from website');
        }
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        const elementsToRemove = doc.querySelectorAll('script, style, nav, footer, iframe, img');
        elementsToRemove.forEach(el => el.remove());
        
        let textContent = doc.body.textContent;
        textContent = textContent
            .replace(/\s+/g, ' ')
            .replace(/\n+/g, '\n')
            .trim();
        
        updateProgress(80, 'Processing website content...');
        
        return `Website Content from ${url}:\n\n${textContent}`;
    } catch (error) {
        console.error('Website processing error:', error);
        throw new Error(`Failed to process website: ${error.message}`);
    }
}

// Extract YouTube ID from URL
function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Get YouTube transcript
async function getYouTubeTranscript(videoId) {
    const proxyUrl = "https://api.allorigins.win/raw?url=";
    const transcriptUrl = `https://youtubetranscript.com/?server_vid=${videoId}`;
    
    try {
        updateProgress(40, 'Fetching transcript...');
        const response = await fetch(proxyUrl + encodeURIComponent(transcriptUrl));
        if (!response.ok) throw new Error("Transcript service failed");
        
        const text = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const transcriptLines = Array.from(doc.querySelectorAll('.transcript-line'))
            .map(line => line.textContent.trim())
            .join('\n');
        
        return transcriptLines || null;
    } catch (error) {
        console.error("Transcript error:", error);
        return null;
    }
}

// Process document (PDF/DOCX/TXT)
async function processDocument(file) {
    updateProgress(20, 'Checking file type...');
    
    if (file.name.endsWith('.doc')) {
        const warning = showError(
            'Legacy .doc files are not supported. Please convert to .docx or PDF.',
            true
        );
        throw new Error('Unsupported .doc file');
    }
    
    try {
        if (file.type === 'application/pdf') {
            updateProgress(30, 'Extracting PDF text...');
            return await extractTextFromPdf(file);
        } else if (file.type.includes('wordprocessingml.document')) {
            updateProgress(30, 'Extracting DOCX text...');
            return await extractTextFromDocx(file);
        } else if (file.type === 'text/plain') {
            updateProgress(30, 'Reading text file...');
            return await readFileAsText(file);
        } else {
            throw new Error('Unsupported file type');
        }
    } catch (error) {
        console.error('Document processing failed:', error);
        throw new Error(`Failed to process document: ${error.message}`);
    }
}

// Extract text from PDF
async function extractTextFromPdf(file) {
    const pdfData = await file.arrayBuffer();
    updateProgress(40, 'Loading PDF...');
    
    const pdf = await pdfjsLib.getDocument(pdfData).promise;
    let fullText = '';
    const pageCount = pdf.numPages;
    
    for (let i = 1; i <= pageCount; i++) {
        updateProgress(40 + (i/pageCount)*50, `Processing page ${i}/${pageCount}...`);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map(item => item.str).join(' ') + '\n';
    }
    
    return fullText;
}

// Extract text from DOCX
async function extractTextFromDocx(file) {
    const arrayBuffer = await file.arrayBuffer();
    updateProgress(50, 'Extracting DOCX text...');
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
}

// Read text file
function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

// Process image with OCR
async function processImage(file) {
    updateProgress(20, 'Processing image...');
    try {
        const result = await Tesseract.recognize(
            file,
            'eng',
            { 
                logger: m => {
                    if (m.status === 'recognizing text') {
                        updateProgress(20 + (m.progress * 70), 'Processing image...');
                    }
                }
            }
        );
        return result.data.text;
    } catch (error) {
        throw new Error(`OCR failed: ${error.message}`);
    }
}

// Process audio file with Web Speech API
async function processAudio(file) {
    updateProgress(20, 'Processing audio...');
    
    try {
        // Check if browser supports Web Speech API
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            throw new Error('Your browser does not support speech recognition. Try Chrome or Edge.');
        }

        // Create audio context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = await file.arrayBuffer();
        const decodedData = await audioContext.decodeAudioData(audioBuffer);
        
        // Use Web Speech API for recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        let transcript = '';
        let processingComplete = false;
        
        return new Promise((resolve, reject) => {
            recognition.onresult = (event) => {
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        transcript += event.results[i][0].transcript + ' ';
                        updateProgress(20 + (i/event.results.length)*70, 'Processing audio...');
                    }
                }
            };
            
            recognition.onerror = (event) => {
                if (!processingComplete) {
                    processingComplete = true;
                    reject(new Error(`Speech recognition error: ${event.error}`));
                }
            };
            
            recognition.onend = () => {
                if (!processingComplete) {
                    processingComplete = true;
                    
                    // Check if transcript is too short or empty
                    const wordCount = transcript.trim().split(/\s+/).length;
                    if (wordCount < 10 || transcript.trim() === "") {
                        reject(new Error("No usable transcript was generated from the audio file. The audio might be too short, unclear, or in a language not supported by your browser."));
                    } else {
                        resolve(transcript);
                    }
                }
            };
            
            recognition.start();
            
            // Create a source from the audio buffer
            const source = audioContext.createBufferSource();
            source.buffer = decodedData;
            source.connect(audioContext.destination);
            source.start();
            
            // Set timeout as fallback
            setTimeout(() => {
                if (!processingComplete) {
                    processingComplete = true;
                    recognition.stop();
                    
                    // Check transcript length after timeout too
                    const wordCount = transcript.trim().split(/\s+/).length;
                    if (wordCount < 10 || transcript.trim() === "") {
                        reject(new Error("Audio processing timed out with no usable transcript. The audio might be too long, unclear, or in a language not supported by your browser."));
                    } else {
                        resolve(transcript);
                    }
                }
            }, 60000); // 1 minute timeout
        });
    } catch (error) {
        throw new Error(`Audio processing failed: ${error.message}`);
    }
}

// Call Gemini API with user context
async function generateContentWithAI(prompt) {
    try {
        updateProgress(10, 'Connecting to Gemini AI...');
        
        if (!apiKey) {
            throw new Error('API key not found. Please enter your key.');
        }

        // Add user context to the system message
        const systemMessage = {
            role: "system",
            content: `You are a helpful study assistant for ${userContext.grade} students ` +
                    `following the ${userContext.curriculum} curriculum. ` +
                    `The current subject is ${userContext.subject}. ` +
                    `Provide detailed, curriculum-aligned explanations.`
        };

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const body = {
            contents: [
                { 
                    parts: [
                        { text: systemMessage.content },
                        { text: prompt }
                    ] 
                }
            ],
            generationConfig: {
                maxOutputTokens: 2000,
                temperature: 0.7
            }
        };

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        updateProgress(60, 'Processing response...');

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        updateProgress(90, 'Finalizing...');

        const candidate = data.candidates?.[0];
        const parts = candidate?.content?.parts || [];
        return parts.map(p => p.text).join('') || 'No response content found';
    } catch (error) {
        console.error('API Error:', error);
        throw new Error(`AI service error: ${error.message}`);
    }
}

// Generate notes with context
generateNotes.addEventListener('click', async function() {
    actionSection.classList.add('hidden');
    notesSection.classList.remove('hidden');
    notesOutput.textContent = 'Generating notes...';

    try {
        const notes = await generateContentWithAI(
            `Create comprehensive study notes from the following content. 
            Organize them clearly for a ${userContext.grade} student studying ${userContext.subject}.
            Use markdown-style formatting with:
            - Headings (##, ###)
            - Bullet points (-)
            - Bold for key terms (**term**)
            - Include ${userContext.curriculum}-specific examples where relevant
            
            Content:\n\n${processedContent}`
        );
        notesOutput.innerHTML = formatNotes(notes);
    } catch (error) {
        notesOutput.innerHTML = `<div class="alert alert-danger">
            <i class="fas fa-exclamation-circle"></i>
            Error generating notes: ${error.message}
        </div>`;
    }
});

// Copy notes to clipboard
copyNotes.addEventListener('click', function() {
    const range = document.createRange();
    range.selectNode(notesOutput);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    
    const notification = document.createElement('div');
    notification.className = 'alert alert-success';
    notification.innerHTML = '<i class="fas fa-check-circle"></i> Copied to clipboard!';
    notesSection.insertBefore(notification, notesOutput);
    setTimeout(() => notification.remove(), 2000);
});

// Generate quiz with context
generateQuiz.addEventListener('click', async function() {
    actionSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    questionLoadingBar.classList.remove('hidden');
    
    try {
        const totalQuestions = 7;
        for (let i = 0; i <= totalQuestions; i++) {
            const progress = Math.min((i / totalQuestions) * 100, 100);
            questionLoadingProgress.style.width = `${progress}%`;
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        const quizResponse = await generateContentWithAI(
            `Create a ${userContext.grade}-level quiz about ${userContext.subject} 
            following ${userContext.curriculum} standards. Include exactly 7 questions.
            For each question:
            1. Make it relevant to ${userContext.subject} curriculum
            2. Provide 4 multiple-choice options
            3. Mark the correct answer
            4. Add a brief explanation
            
            Format each question like this:
            [QUESTION_START]
            Question: [The question text]
            A) [Option A]
            B) [Option B]
            C) [Option C]
            D) [Option D]
            Correct Answer: [Letter of correct option]
            Explanation: [Brief explanation of why this is correct]
            [QUESTION_END]
            
            Content:\n\n${processedContent}`
        );
        
        questionLoadingBar.classList.add('hidden');
        quizQuestions = parseQuizQuestions(quizResponse);
        userAnswers = new Array(quizQuestions.length).fill(null);
        currentQuestionIndex = 0;
        quizSubmitted = false;
        
        displayQuestion(currentQuestionIndex);
        updateQuizProgress();
        
    } catch (error) {
        questionLoadingBar.classList.add('hidden');
        currentQuestionElement.innerHTML = `<div class="alert alert-danger">
            <i class="fas fa-exclamation-circle"></i>
            Error generating quiz: ${error.message}
        </div>`;
    }
});

// Parse quiz questions from the AI response
function parseQuizQuestions(quizText) {
    const questions = [];
    const questionBlocks = quizText.split(/QUESTION_START/).filter(block => block.trim());
    
    for (const block of questionBlocks) {
        try {
            const questionMatch = block.match(/Question:\s*(.+?)\n/);
            const optionsMatches = [
                block.match(/A\)\s*(.+?)\n/),
                block.match(/B\)\s*(.+?)\n/),
                block.match(/C\)\s*(.+?)\n/),
                block.match(/D\)\s*(.+?)\n/)
            ];
            const correctAnswerMatch = block.match(/Correct Answer:\s*([A-D])/i);
            const explanationMatch = block.match(/Explanation:\s*(.+?)(?:\n|$)/);
            
            if (questionMatch && optionsMatches.every(m => m) && correctAnswerMatch && explanationMatch) {
                const correctAnswer = correctAnswerMatch[1].toUpperCase();
                questions.push({
                    text: questionMatch[1].trim(),
                    options: optionsMatches.map((m, i) => ({
                        letter: String.fromCharCode(65 + i),
                        text: m[1].trim(),
                        isCorrect: String.fromCharCode(65 + i) === correctAnswer
                    })),
                    correctAnswer: correctAnswer,
                    explanation: explanationMatch[1].trim()
                });
            }
        } catch (e) {
            console.error('Error parsing question block:', e);
        }
    }
    
    return questions.slice(0, 7);
}

// Display a question
function displayQuestion(index) {
    if (index < 0 || index >= quizQuestions.length) return;
    
    const question = quizQuestions[index];
    let html = `<h3>${question.text}</h3><div class="quiz-options">`;
    
    question.options.forEach(option => {
        const isSelected = userAnswers[index] === option.letter;
        html += `
            <div class="quiz-option ${isSelected ? 'selected' : ''}" data-option="${option.letter}">
                <input type="radio" id="q${index}_${option.letter}" name="q${index}" 
                       value="${option.letter}" ${isSelected ? 'checked' : ''}>
                <label for="q${index}_${option.letter}">
                    <strong>${option.letter})</strong> ${option.text}
                </label>
            </div>
        `;
    });
    
    html += `</div>`;
    currentQuestionElement.innerHTML = html;
    
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            if (quizSubmitted) return;
            
            const selectedOption = this.getAttribute('data-option');
            userAnswers[index] = selectedOption;
            
            document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            this.querySelector('input').checked = true;
        });
    });
    
    quizPrevBtn.disabled = index === 0;
    quizNextBtn.disabled = false;
    quizNextBtn.classList.remove('hidden');
    submitQuizBtn.classList.add('hidden');
    
    if (index === quizQuestions.length - 1) {
        quizNextBtn.classList.add('hidden');
        submitQuizBtn.classList.remove('hidden');
    }
}

// Update quiz progress text
function updateQuizProgress() {
    quizProgress.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
}

// Previous question button
quizPrevBtn.addEventListener('click', function() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
        updateQuizProgress();
    }
});

// Next question button
quizNextBtn.addEventListener('click', function() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
        updateQuizProgress();
    }
});

// Submit quiz button
submitQuizBtn.addEventListener('click', function() {
    quizSubmitted = true;
    showQuizResults();
});

// Show quiz results
function showQuizResults() {
    let score = 0;
    quizQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            score++;
        }
    });
    
    quizScore.innerHTML = `You scored ${score} out of ${quizQuestions.length} (<strong>${Math.round((score / quizQuestions.length) * 100)}%</strong>)`;
    
    let resultsHtml = '';
    quizQuestions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        
        resultsHtml += `
            <div class="quiz-question">
                <h3>${index + 1}. ${question.text}</h3>
                <div class="quiz-options">
        `;
        
        question.options.forEach(option => {
            let optionClass = '';
            if (option.letter === question.correctAnswer) {
                optionClass = 'correct';
            } else if (option.letter === userAnswer && !isCorrect) {
                optionClass = 'incorrect';
            }
            
            resultsHtml += `
                <div class="quiz-option ${optionClass}">
                    <input type="radio" disabled ${option.letter === userAnswer ? 'checked' : ''}>
                    <label>
                        <strong>${option.letter})</strong> ${option.text}
                        ${option.letter === question.correctAnswer ? '✓' : ''}
                        ${option.letter === userAnswer && !isCorrect ? '✗' : ''}
                    </label>
                </div>
            `;
        });
        
        resultsHtml += `
                </div>
                <div class="quiz-explanation">
                    <strong>Explanation:</strong> ${question.explanation}
                </div>
                <div class="mt-2">
                    <strong>Your answer:</strong> ${userAnswer || 'Not answered'}
                    ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </div>
            </div>
        `;
    });
    
    allQuestionsResults.innerHTML = resultsHtml;
    quizSection.classList.add('hidden');
    quizResults.classList.remove('hidden');
}

// Retake quiz button
retakeQuiz.addEventListener('click', function() {
    quizResults.classList.add('hidden');
    currentQuestionIndex = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    quizSubmitted = false;
    displayQuestion(currentQuestionIndex);
    updateQuizProgress();
    quizSection.classList.remove('hidden');
});

// Chat about content
chatAboutContent.addEventListener('click', function() {
    actionSection.classList.add('hidden');
    chatSection.classList.remove('hidden');
    chatHistory = [
        { role: 'assistant', content: `I have analyzed the ${userContext.subject} content you provided. Ask me anything about it!` }
    ];
    updateChatHistory();
});

// Send chat message with context
sendChat.addEventListener('click', async function() {
    const message = chatMessage.value.trim();
    if (!message) return;

    chatMessage.value = '';
    chatHistory.push({ role: 'user', content: message });
    updateChatHistory();

    try {
        const response = await generateContentWithAI(
            `Student question (${userContext.grade}, ${userContext.subject}): ${message}
            
            Context from uploaded material:
            ${processedContent.substring(0, 1000)}... [truncated]
            
            Please provide a ${userContext.curriculum}-aligned answer appropriate for ${userContext.grade} level.`
        );
        
        chatHistory.push({ role: 'assistant', content: response });
        updateChatHistory();
    } catch (error) {
        chatHistory.push({ role: 'assistant', content: `Error: ${error.message}` });
        updateChatHistory();
    }
});

// Chat message on Enter key
chatMessage.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendChat.click();
    }
});

// Show error message
function showError(message, isWarning = false, parentId = 'errorContainer') {
    const parent = document.getElementById(parentId);
    const errorElement = document.createElement('div');
    errorElement.className = isWarning ? 'alert alert-warning' : 'alert alert-danger';
    errorElement.innerHTML = `
        <i class="fas ${isWarning ? 'fa-exclamation-triangle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;
    parent.appendChild(errorElement);
    return errorElement;
}

// Update progress bar
function updateProgress(percent, message) {
    document.getElementById('progressBar').style.width = `${percent}%`;
    document.getElementById('processingStatus').textContent = message;
}

// Format notes with Markdown-like styling
function formatNotes(notes) {
    return notes
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^# (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h4>$1</h4>')
        .replace(/^### (.*$)/gm, '<h5>$1</h5>')
        .replace(/^- (.*$)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
        .replace(/\n/g, '<br>');
}

// Update chat history display
function updateChatHistory() {
    chatHistoryElement.innerHTML = '';
    chatHistory.forEach(msg => {
        const msgElement = document.createElement('div');
        msgElement.className = `chat-message ${msg.role}`;
        msgElement.innerHTML = `<strong>${msg.role === 'user' ? 'You' : 'Spavius'}:</strong> ${msg.content}`;
        chatHistoryElement.appendChild(msgElement);
    });
    chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;
}

// Explain in Detail functionality
explainInDetail.addEventListener('click', function() {
    actionSection.classList.add('hidden');
    explainSection.classList.remove('hidden');
    
    // Display the processed content with original formatting
    explainContent.innerHTML = `<pre>${processedContent}</pre>`;
    
    // Initialize chat history
    explainChatHistory.innerHTML = '';
});

// Explain This button functionality
explainThisBtn.addEventListener('click', function() {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText.length > 0) {
        // Add user message to chat
        addExplainChatMessage('user', `Explain this: "${selectedText}"`);
        
        // Generate explanation from AI with full context
        generateExplanation(selectedText);
    }
});

function addExplainChatMessage(role, content) {
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${role}`;
    
    // Format the message content to handle markdown-like syntax
    let formattedContent = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^# (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h4>$1</h4>')
        .replace(/^### (.*$)/gm, '<h5>$1</h5>')
        .replace(/^- (.*$)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
        .replace(/\n/g, '<br>');
    
    messageElement.innerHTML = `<strong>${role === 'user' ? 'You' : 'Spavius'}:</strong> ${formattedContent}`;
    explainChatHistory.appendChild(messageElement);
    explainChatHistory.scrollTop = explainChatHistory.scrollHeight;
}

async function generateExplanation(text) {
    try {
        const prompt = `Explain this ${userContext.subject} concept to a ${userContext.grade} student:
        "${text}"
        
        Requirements:
        1. Use ${userContext.curriculum} terminology
        2. Provide ${userContext.grade}-appropriate examples
        3. Relate to this content when relevant:
        ${processedContent.substring(0, 800)}...`;
        
        const explanation = await generateContentWithAI(prompt);
        addExplainChatMessage('assistant', explanation);
    } catch (error) {
        addExplainChatMessage('assistant', `Error generating explanation: ${error.message}`);
    }
}

// Add this event listener for the explain chat
sendExplainChat.addEventListener('click', async function() {
    const message = explainChatMessage.value.trim();
    if (!message) return;
    
    explainChatMessage.value = '';
    addExplainChatMessage('user', message);
    
    try {
        const prompt = `Regarding the document content, the user asks: "${message}"
        
        Here is the full document content for reference:
        ${processedContent}
        
        Please provide a detailed answer using the document content as reference.
        Curriculum: ${userContext.curriculum}
        Grade Level: ${userContext.grade}
        Subject: ${userContext.subject}`;
        
        const response = await generateContentWithAI(prompt);
        addExplainChatMessage('assistant', response);
    } catch (error) {
        addExplainChatMessage('assistant', `Error: ${error.message}`);
    }
});

// Add Enter key support for explain chat
explainChatMessage.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendExplainChat.click();
    }
});

// More Info Modal
moreInfoLink.addEventListener('click', function(e) {
    e.preventDefault();
    infoModal.classList.remove('hidden');
});

closeInfoModal.addEventListener('click', function() {
    infoModal.classList.add('hidden');
});

// Initialize the app when the page loads
window.addEventListener('load', init);
