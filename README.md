# Spavius - AI Study Assistant

Welcome to Spavius, your friendly AI-powered study companion! Spavius helps you turn any study material—documents, videos, websites, images, or plain text—into organized notes, quizzes, and even a chat interface for asking questions. Visit the website [here](https://sisschoolguy.github.io/Spavius/study.html)

## Getting Started

### First-Time Setup
1. **Welcome Questions**  
   On your first visit, you'll answer 3 quick questions to personalize your experience:
   - **Curriculum**: Select your program (IGCSE, IB, or specify your own)
   - **Grade Level**: Choose your current grade
   - **Subject**: Pick your subject of study (you can skip and set this later)

2. **Theme Selection**  
   The app defaults to your system preference (dark/light mode), but you can toggle this anytime using the switch in the header.

## API Key Setup (Optional)
For faster processing, you can add your own Google Gemini API key:
1. Click "Upload API key" in the header
2. Get a free key from [Google AI Studio](https://aistudio.google.com/apikey)
3. Paste your key in the modal
4. Click "Continue"

*Note: The app works without your own key, but may be slower during peak times.*

## Uploading Study Materials
Spavius supports multiple content types:

### Main Options
- **Documents**: PDF, DOCX, or TXT files
  - Click "Choose File" to upload
- **YouTube Videos**
  - Paste any YouTube video URL
- **Websites**
  - Enter any webpage URL

### More Options (click the ⋮ menu)
- **Images** (OCR text extraction)
  - Upload JPG/PNG images of notes or textbook pages
- **Audio Files** (Beta)
  - Upload WAV/MP3 recordings of lectures
- **Direct Text**
  - Paste or type text directly

##  Processing Content
1. Select your content type
2. Upload your file or paste the URL/text
3. Click "Process Content"
4. Watch the progress bar as Spavius analyzes your material

### Generate Notes
- Gets structured notes with:
  - Clear headings and subheadings
  - Bullet point summaries
  - Key terms in bold
  - Curriculum-specific examples

*Tip: Use the "Copy" button to save your notes*

###  Generate Quiz
- Creates a 7-question multiple-choice quiz:
  - Curriculum-aligned questions
  - Immediate feedback on answers
  - Detailed explanations
  - Score tracking

*Tip: Click "Retake Quiz" to practice again*

### Chat About Content
- Ask any questions about your material
- Get instant, curriculum-specific answers
- Conversation history is saved during your session

### Explain in Detail
- Highlight any text from your processed content
- Click "Explain This" for in-depth explanations
- Ask follow-up questions in the chat
- Only works when you upload a document or text

## Tips
1. For best OCR results, use clear images of typed text
2. YouTube videos with captions will process best
3. The audio feature works best with clear speech (try lecture recordings)
4. Use dark mode for late-night study sessions
5. Instead of uploading audio files try finding an online audio to text website and upload the text into the website instead

## Limitations
1. The website only can take in text material, that means it can't understand graphs or pictures without text uploaded
2. The website pulls the transcripts (and title/description) from the youtube video uploaded, and doesn't understand the video it self. 
3. The audio processing only works on chrome and edge, and actually understands whats being said by outputting the audio from your file and make your browser try to under stand it
4. Audio best works for files under one minute

## Details
Spavius is an open source free AI study website. It started as a personal project of mine in early march of 2025, being tired of so many websites charging to use AI to study when so many students have no funds to afford it. I felt that this set some students ahead than others in life, so I tried making my very own AI study website that was 100% free.

Spavius unfortunetly probably will never be as good as those payed study website, but they it is a very big step ahead from nothing. Since Spavius was made with 0 funds for people will 0 funds it has no backend sever to do all the processing, this makes it so the website can't store data, and limits some features (like audio processing). Since Spavius is made with 0 funds I had to find an Large Language Model AI that has a free API, after a LONG while of condideration and testing Gemini felt like the way to go. Gemini 2.0 Flash has insane free response speeds for being completely free while still being accurate, and had easy intergraition into the website to keep it client side. 

The website being client side set a lot of set backs for the creation of the website, countless hours were spent at my laptop trying to make everything work client side, but eventually I figured it out. If the website ever feels slow in processing or something like that it's not the website it's YOUR device so keep that in mind.

---

# Credits

**Head Delevoper** Mehdi Rahimli

**Website Designer** Mehdi Rahimli 

**Absolute website beast** Mehdi Rahimli

**Gave Youtube API and a lot of critique** Seonghyun Je

**Made the Very cool logo** Luke Angeles
