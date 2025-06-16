# Technical Specification: Spaced Repetition Vocabulary Learning Software v2

## 1. System Overview

### System Name

Spaced Repetition Vocabulary Learning Software (SRVLS) v2

### System Description

**Purpose:** SRVLS is designed to assist users in effectively learning and reviewing foreign language vocabulary using the Spaced Repetition algorithm with Multiple Choice Assessment. The software optimizes the learning process by strategically scheduling vocabulary reviews at increasing intervals, reinforcing memory retention while minimizing review time through an interactive multiple-choice interface.

**Core Features:**

- Account Management: User registration, login, password recovery, and password change
- Vocabulary Management: Creation and management of flashcard decks
- Multiple Choice Review: Interactive vocabulary assessment using 4-option multiple choice questions
- Smart Level Progression: Automatic level advancement based on correct/incorrect answers
- Offline Review Capability: Local storage with smart batching for seamless user experience

**Data Isolation:**

- Each user's flashcards are completely private and isolated from other users
- When users copy system-provided flashcards, they create independent instances that can be modified without affecting the original
- No sharing mechanism exists between users - all flashcard creation and modification occurs within the user's private space

### Minimum Viable Product (MVP) Features

### Account Management

- User registration with email verification
- Secure login/authentication
- Password recovery via email
- Profile management

### Vocabulary Management

- Create new flashcard decks
- Copy pre-existing suggested decks (e.g., English B1/B2, Japanese N5/N4 learning paths)
- Add, edit, or delete flashcards within a deck:
    - Manually create new custom flashcards
    - Copy individual flashcards from the system's flashcard repository
- Import/export flashcard decks

### Vocabulary Review (Updated)

- Daily notification of vocabulary due for review
- Visual indication of uncompleted review boxes (highlighted in yellow)
- Multiple choice review interface with 4 options (A, B, C, D)
- Automatic distractor generation from system dictionary and user's deck
- Color-coded feedback system:
    - Green for correct answers (level progression)
    - Red for incorrect answers (reset to level 1)
- Offline review capability with local storage
- Smart batching for server synchronization
- Progress tracking based on correct/incorrect assessment:
    - Correct answer: Move to next level (1→3→7→14→30→180→365 days→learned)
    - Incorrect answer: Return to level 1 (review next day)

## 2. Functional Requirements

### Actors

1. **User** - Primary system user who learns vocabulary
2. **System** - Automated processes handling spaced repetition algorithm and notifications
3. **Administrator** - Technical support and system maintenance personnel

### Key Use Cases

### User Management

- UC1: Register account
- UC2: Login to account
- UC3: Recover password
- UC4: Change password
- UC5: Edit user profile

### Deck Management

- UC6: Create flashcard deck
- UC7: Copy existing deck
- UC8: Edit deck properties
- UC9: Delete deck
- UC10: Import deck
- UC11: Export deck

### Flashcard Management

- UC12: Add manually created flashcard
- UC13: Copy flashcard from system repository
- UC14: Edit flashcard
- UC15: Delete flashcard
- UC16: Add media to flashcard (images, audio)

### Review Management (Updated)

- UC17: Review due vocabulary with multiple choice
- UC18: Process multiple choice answer (correct/incorrect)
- UC19: Sync offline review data
- UC20: View review history
- UC21: View learning statistics

### Use Case Diagram

```
@startuml
left to right direction
skinparam packageStyle rectangle

actor User
actor System
actor Administrator

rectangle "Spaced Repetition Vocabulary Learning Software v2" {
  ' User Management
  User --> (Register account)
  User --> (Login to account)
  User --> (Recover password)
  User --> (Change password)
  User --> (Edit user profile)

  ' Deck Management
  User --> (Create flashcard deck)
  User --> (Copy existing deck)
  User --> (Edit deck properties)
  User --> (Delete deck)
  User --> (Import deck)
  User --> (Export deck)

  ' Flashcard Management
  User --> (Add flashcard)
  User --> (Edit flashcard)
  User --> (Delete flashcard)
  User --> (Add media to flashcard)

  ' Review Management (Updated)
  User --> (Review vocabulary with multiple choice)
  User --> (Select answer option)
  User --> (Sync offline review data)
  User --> (View review history)
  User --> (View learning statistics)

  ' System Actions (Updated)
  System --> (Generate multiple choice options)
  System --> (Schedule vocabulary reviews)
  System --> (Send notifications)
  System --> (Apply level progression algorithm)
  System --> (Process batch review updates)

  ' Admin Actions
  Administrator --> (Manage users)
  Administrator --> (Manage default decks)
  Administrator --> (Manage system dictionary)
  Administrator --> (Monitor system performance)
}
@enduml
```

### Detailed Use Case Descriptions

### UC17: Review Vocabulary with Multiple Choice (Updated)

| Aspect | Description |
| --- | --- |
| **Purpose** | To review vocabulary cards using multiple choice format with automatic distractor generation |
| **Preconditions** | User is logged in; user has vocabulary due for review; system dictionary is populated |
| **Main Flow** | 1. User navigates to review dashboard
2. System displays decks with cards due for review
3. User selects a deck to review
4. System generates multiple choice question:
   - Presents front text as question
   - Generates 3 distractors from system dictionary and user's deck
   - Randomizes 4 options (A, B, C, D)
5. User selects an answer option
6. System displays all 4 options with color coding:
   - Green: Correct answer (shows back text)
   - Red: Incorrect answers
7. System stores result in localStorage
8. System applies level progression logic:
   - Correct: Advance to next level
   - Incorrect: Reset to level 1
9. Process repeats until all due cards are reviewed
10. System performs smart batching to sync with server |
| **Alternative Flows** | 2a. No cards due: System displays message and suggests reviewing ahead
3a. User goes offline: System continues with localStorage, syncs when online
7a. localStorage full: System forces sync before continuing
9a. Network error during sync: System retries with exponential backoff |
| **Postconditions** | Reviewed cards are updated with new levels and next review dates; offline data is synced to server |

### UC18: Process Multiple Choice Answer (New)

| Aspect | Description |
| --- | --- |
| **Purpose** | To process user's multiple choice selection and update card status accordingly |
| **Preconditions** | User has selected an answer option; card data is available |
| **Main Flow** | 1. System receives user's selected option
2. System compares selection with correct answer (back text)
3. System displays color-coded feedback
4. System calculates new level and next review date:
   - Correct: currentLevel + 1 (max level 7 = learned)
   - Incorrect: level = 1, nextReview = tomorrow
5. System stores update in localStorage
6. System triggers batch sync if conditions met |
| **Alternative Flows** | 4a. Card reaches learned status: System marks as completed
5a. localStorage unavailable: System syncs immediately
6a. Sync fails: System queues for retry |
| **Postconditions** | Card status updated locally; update queued for server sync |

### UC19: Sync Offline Review Data (New)

| Aspect | Description |
| --- | --- |
| **Purpose** | To synchronize locally stored review data with server using smart batching |
| **Preconditions** | User has review data in localStorage; network connection available |
| **Main Flow** | 1. System checks localStorage for pending updates
2. System batches multiple card updates together
3. System sends batch request to server
4. Server processes batch and returns results
5. System updates localStorage with server response
6. System clears synced data from pending queue |
| **Alternative Flows** | 3a. Network error: System retries with exponential backoff
4a. Server error: System logs error and retries later
4b. Partial success: System processes successful updates and retries failed ones |
| **Postconditions** | Local data synchronized with server; localStorage cleaned up |

## 3. Static Model

### Main Classes

### User

- Represents a registered user of the system
- **Attributes:** userID, email, passwordHash, name, nativeLanguage, targetLanguages, registrationDate, lastLoginDate
- **Methods:** register(), login(), resetPassword(), updateProfile(), getReviewSchedule()

### Deck

- Represents a collection of flashcards for learning
- **Attributes:** deckID, userID (owner), title, description, targetLanguage, sourceLanguage, creationDate, lastModifiedDate, isSystemDeck, sourceSystemDeckID
- **Methods:** createDeck(), copyFromSystemDeck(), updateDeck(), deleteDeck(), importDeck(), exportDeck()

### Flashcard

- Represents a single vocabulary item
- **Attributes:** cardID, deckID, userID (owner), frontText, backText, examples, pronunciation, imageURL, audioURL, tags, creationDate, isSystemCard, sourceCardID
- **Methods:** createCard(), copyFromRepository(sourceCardID: String): Flashcard, updateCard(), deleteCard(), addMedia(type: String, data: File): Boolean

### SystemDictionary (New)

- Represents the centralized dictionary for generating distractors
- **Attributes:** dictionaryID, targetLanguage, word, definition, partOfSpeech, difficulty, frequency, tags
- **Methods:** findDistractors(targetLanguage: String, excludeWord: String, count: Integer): List<String>, addWord(), updateWord(), deleteWord()

### Box (Updated)

- Represents a spaced repetition level with new intervals
- **Attributes:** boxID, interval (1, 3, 7, 14, 30, 180, 365 days)
- **Methods:** getNextReviewDate()

### CardStatus (Updated)

- Tracks the learning status of each flashcard for a user
- **Attributes:** statusID, userID, cardID, currentLevel (1-7), nextReviewDate, reviewHistory, isLearned
- **Methods:** updateStatus(isCorrect: Boolean), isReviewDue(), advanceLevel(), resetToLevelOne(), markAsLearned()

### MultipleChoiceQuestion (New)

- Represents a generated multiple choice question
- **Attributes:** questionID, cardID, correctAnswer, optionA, optionB, optionC, optionD, generatedAt
- **Methods:** generateQuestion(card: Flashcard, distractors: List<String>): MultipleChoiceQuestion, shuffleOptions(), validateAnswer(selectedOption: String): Boolean

### ReviewSession (Updated)

- Represents a single review session with multiple choice tracking
- **Attributes:** sessionID, userID, startTime, endTime, cardsReviewed, correctAnswers, incorrectAnswers, questionsGenerated
- **Methods:** startSession(), recordAnswer(cardID: String, isCorrect: Boolean), endSession(), getAccuracyRate(), generateStatistics()

### OfflineReviewData (New)

- Manages local storage of review data for offline capability
- **Attributes:** localID, cardID, userID, selectedAnswer, isCorrect, timestamp, synced
- **Methods:** storeLocally(), batchForSync(), markAsSynced(), getUnsynced()

### BatchSyncService (New)

- Handles smart batching of review updates to server
- **Attributes:** batchSize, syncInterval, retryAttempts, pendingUpdates
- **Methods:** addToBatch(reviewData: OfflineReviewData), processBatch(), retrySyncFailed(), clearSyncedData()

### SpacedRepetitionAlgorithm (Updated)

- Implements the level-based spaced repetition logic
- **Attributes:** levelIntervals (1, 3, 7, 14, 30, 180, 365 days)
- **Methods:** calculateNextReviewDate(level: Integer), processCorrectAnswer(currentLevel: Integer): Integer, processIncorrectAnswer(): Integer

### Notification

- Manages user notifications about due reviews
- **Attributes:** notificationID, userID, message, creationDate, isRead
- **Methods:** createNotification(), markAsRead(), deleteNotification()

### Class Diagram (Updated)

```
@startuml
skinparam classAttributeIconSize 0

class User {
  -userID: String
  -email: String
  -passwordHash: String
  -name: String
  -nativeLanguage: String
  -targetLanguages: List<String>
  -registrationDate: DateTime
  -lastLoginDate: DateTime
  +register(): Boolean
  +login(): Boolean
  +resetPassword(): Boolean
  +updateProfile(): Boolean
  +getReviewSchedule(): List<CardStatus>
}

class Deck {
  -deckID: String
  -userID: String
  -title: String
  -description: String
  -targetLanguage: String
  -sourceLanguage: String
  -creationDate: DateTime
  -lastModifiedDate: DateTime
  -isSystemDeck: Boolean
  -sourceSystemDeckID: String
  +createDeck(): Boolean
  +copyFromSystemDeck(systemDeckID: String): Deck
  +updateDeck(): Boolean
  +deleteDeck(): Boolean
  +importDeck(file: File): Boolean
  +exportDeck(): File
}

class Flashcard {
  -cardID: String
  -deckID: String
  -userID: String
  -frontText: String
  -backText: String
  -examples: List<String>
  -pronunciation: String
  -imageURL: String
  -audioURL: String
  -tags: List<String>
  -creationDate: DateTime
  -isSystemCard: Boolean
  -sourceCardID: String
  +createCard(): Boolean
  +copyFromRepository(sourceCardID: String): Flashcard
  +updateCard(): Boolean
  +deleteCard(): Boolean
  +addMedia(type: String, data: File): Boolean
}

class SystemDictionary {
  -dictionaryID: String
  -targetLanguage: String
  -word: String
  -definition: String
  -partOfSpeech: String
  -difficulty: Integer
  -frequency: Integer
  -tags: List<String>
  +findDistractors(targetLanguage: String, excludeWord: String, count: Integer): List<String>
  +addWord(): Boolean
  +updateWord(): Boolean
  +deleteWord(): Boolean
}

class Box {
  -boxID: Integer
  -interval: Integer
  +getNextReviewDate(reviewDate: DateTime): DateTime
}

class CardStatus {
  -statusID: String
  -userID: String
  -cardID: String
  -currentLevel: Integer
  -nextReviewDate: DateTime
  -reviewHistory: List<ReviewResult>
  -isLearned: Boolean
  +updateStatus(isCorrect: Boolean): Boolean
  +isReviewDue(): Boolean
  +advanceLevel(): Boolean
  +resetToLevelOne(): Boolean
  +markAsLearned(): Boolean
}

class MultipleChoiceQuestion {
  -questionID: String
  -cardID: String
  -correctAnswer: String
  -optionA: String
  -optionB: String
  -optionC: String
  -optionD: String
  -generatedAt: DateTime
  +generateQuestion(card: Flashcard, distractors: List<String>): MultipleChoiceQuestion
  +shuffleOptions(): Boolean
  +validateAnswer(selectedOption: String): Boolean
}

class ReviewSession {
  -sessionID: String
  -userID: String
  -startTime: DateTime
  -endTime: DateTime
  -cardsReviewed: Integer
  -correctAnswers: Integer
  -incorrectAnswers: Integer
  -questionsGenerated: Integer
  +startSession(): Boolean
  +recordAnswer(cardID: String, isCorrect: Boolean): Boolean
  +endSession(): Boolean
  +getAccuracyRate(): Double
  +generateStatistics(): Map<String, Integer>
}

class OfflineReviewData {
  -localID: String
  -cardID: String
  -userID: String
  -selectedAnswer: String
  -isCorrect: Boolean
  -timestamp: DateTime
  -synced: Boolean
  +storeLocally(): Boolean
  +batchForSync(): Boolean
  +markAsSynced(): Boolean
  +getUnsynced(): List<OfflineReviewData>
}

class BatchSyncService {
  -batchSize: Integer
  -syncInterval: Integer
  -retryAttempts: Integer
  -pendingUpdates: List<OfflineReviewData>
  +addToBatch(reviewData: OfflineReviewData): Boolean
  +processBatch(): Boolean
  +retrySyncFailed(): Boolean
  +clearSyncedData(): Boolean
}

class SpacedRepetitionAlgorithm {
  -levelIntervals: List<Integer>
  +calculateNextReviewDate(level: Integer): DateTime
  +processCorrectAnswer(currentLevel: Integer): Integer
  +processIncorrectAnswer(): Integer
}

class Notification {
  -notificationID: String
  -userID: String
  -message: String
  -creationDate: DateTime
  -isRead: Boolean
  +createNotification(): Boolean
  +markAsRead(): Boolean
  +deleteNotification(): Boolean
}

class SystemDeck {
  -systemDeckID: String
  -title: String
  -description: String
  -targetLanguage: String
  -sourceLanguage: String
  -level: String
  -category: String
  -cardCount: Integer
  +getCards(): List<SystemCard>
}

class SystemCard {
  -systemCardID: String
  -systemDeckID: String
  -frontText: String
  -backText: String
  -examples: List<String>
  -pronunciation: String
  -imageURL: String
  -audioURL: String
  -tags: List<String>
}

User "1" -- "0..*" Deck : owns >
Deck "1" -- "0..*" Flashcard : contains >
User "1" -- "0..*" CardStatus : tracks >
User "1" -- "0..*" Flashcard : owns >
Flashcard "1" -- "0..*" CardStatus : hasStatus >
CardStatus "0..*" -- "1" Box : assignedTo >
User "1" -- "0..*" ReviewSession : performs >
User "1" -- "0..*" Notification : receives >
SpacedRepetitionAlgorithm -- CardStatus : calculates >
SpacedRepetitionAlgorithm -- Box : uses >
SystemDeck "1" -- "0..*" SystemCard : contains >
SystemDeck ..> Deck : copied to >
SystemCard ..> Flashcard : copied to >
Flashcard "1" -- "0..*" MultipleChoiceQuestion : generates >
SystemDictionary -- MultipleChoiceQuestion : provides distractors >
ReviewSession "1" -- "0..*" OfflineReviewData : contains >
BatchSyncService -- OfflineReviewData : processes >
User "1" -- "0..*" OfflineReviewData : owns >
@enduml
```

## 4. Dynamic Model

### Scenario 1: User Registration

### Description

This sequence depicts the flow of a new user registering for an account in the system.

### Sequence Diagram

```
@startuml
actor User
participant "Registration UI" as UI
participant "User Controller" as Controller
participant "Email Service" as Email
participant "User Repository" as Repository
database "Database" as DB

User -> UI: Enter registration details
UI -> Controller: register(email, password, name, languages)
Controller -> Repository: checkIfEmailExists(email)
Repository -> DB: query(email)
DB --> Repository: result
alt Email already exists
    Repository --> Controller: true
    Controller --> UI: registrationFailed(email_exists)
    UI --> User: Display error message
else Email available
    Repository --> Controller: false
    Controller -> Repository: createUser(userData)
    Repository -> DB: insert(userData)
    DB --> Repository: success
    Repository --> Controller: userCreated
    Controller -> Email: sendVerificationEmail(email, token)
    Email --> User: Send verification email
    Controller --> UI: registrationSuccessful()
    UI --> User: Display success message & login prompt
end
@enduml
```

### Scenario 2: User Login

### Description

This sequence depicts the flow of a registered user logging into the system.

### Sequence Diagram

```
@startuml
actor User
participant "Login UI" as UI
participant "Auth Controller" as Controller
participant "User Repository" as Repository
database "Database" as DB

User -> UI: Enter email and password
UI -> Controller: login(email, password)
Controller -> Repository: getUserByEmail(email)
Repository -> DB: query(email)
DB --> Repository: userData
Repository --> Controller: user
alt User not found
    Controller --> UI: loginFailed(invalid_credentials)
    UI --> User: Display error message
else User found
    Controller -> Controller: validatePassword(password, user.passwordHash)
    alt Password invalid
        Controller --> UI: loginFailed(invalid_credentials)
        UI --> User: Display error message
    else Password valid
        Controller -> Repository: updateLastLoginDate(user.id)
        Repository -> DB: update(user.id, currentDateTime)
        Controller -> Controller: generateSessionToken(user)
        Controller --> UI: loginSuccessful(sessionToken, user)
        UI --> User: Redirect to dashboard
    end
end
@enduml
```

### Scenario 3: Adding a Flashcard Deck

### Description

This sequence depicts the process of a user adding a new flashcard deck to their account.

### Sequence Diagram

```
@startuml
actor User
participant "Deck UI" as UI
participant "Deck Controller" as Controller
participant "Deck Repository" as DeckRepo
database "Database" as DB

User -> UI: Click "Create New Deck"
UI --> User: Display deck creation form
User -> UI: Enter deck details and submit
UI -> Controller: createDeck(deckData)
Controller -> Controller: validateDeckData(deckData)
alt Invalid data
    Controller --> UI: creationFailed(validation_error)
    UI --> User: Display validation errors
else Valid data
    Controller -> DeckRepo: createDeck(deckData)
    DeckRepo -> DB: insert(deckData)
    DB --> DeckRepo: success
    DeckRepo --> Controller: deckCreated(deckID)
    Controller --> UI: creationSuccessful(deckID)
    UI --> User: Display success message & redirect to deck
end
@enduml
```

### Scenario 4: Adding Flashcards (Multiple Sources)

### Description

This sequence depicts the process of a user adding flashcards to a deck from both manual creation and the system repository.

### Sequence Diagram

```
@startuml
actor User
participant "Flashcard UI" as UI
participant "Flashcard Controller" as Controller
participant "Flashcard Repository" as FlashcardRepo
participant "System Card Repository" as SystemRepo
database "Database" as DB

alt Manual Creation
    User -> UI: Click "Add New Flashcard"
    UI --> User: Display flashcard creation form
    User -> UI: Enter flashcard details and submit
    UI -> Controller: createFlashcard(flashcardData)
    Controller -> Controller: validateFlashcardData(flashcardData)
    Controller -> FlashcardRepo: createFlashcard(flashcardData)
    FlashcardRepo -> DB: insert(flashcardData)
    DB --> FlashcardRepo: success
    FlashcardRepo --> Controller: flashcardCreated(cardID)
    Controller --> UI: creationSuccessful(cardID)
    UI --> User: Display success message
else Copy From Repository
    User -> UI: Navigate to system repository
    UI -> Controller: getSystemCards(filters)
    Controller -> SystemRepo: findCards(filters)
    SystemRepo -> DB: query(filters)
    DB --> SystemRepo: systemCards
    SystemRepo --> Controller: systemCards
    Controller --> UI: displaySystemCards(systemCards)
    UI --> User: Display system flashcards
    User -> UI: Select card and click "Copy to My Deck"
    UI -> UI: Display deck selection dialog
    User -> UI: Select target deck
    UI -> Controller: copySystemCard(cardID, targetDeckID)
    Controller -> SystemRepo: getSystemCard(cardID)
    SystemRepo -> DB: query(cardID)
    DB --> SystemRepo: systemCard
    SystemRepo --> Controller: systemCard
    Controller -> FlashcardRepo: copyFromRepository(systemCard, targetDeckID)
    FlashcardRepo -> DB: insert(newCard)
    DB --> FlashcardRepo: success
    FlashcardRepo --> Controller: flashcardCopied(newCardID)
    Controller --> UI: copySuccessful(newCardID)
    UI --> User: Display success message
end
@enduml
```

### Scenario 5: Multiple Choice Vocabulary Review (Updated)

### Description

This sequence depicts the flow of a user reviewing vocabulary cards using the new multiple choice system with offline capability.

### Sequence Diagram

```
@startuml
actor User
participant "Review UI" as UI
participant "Review Controller" as Controller
participant "Card Status Repository" as StatusRepo
participant "System Dictionary" as Dictionary
participant "Distractor Service" as DistractorSvc
participant "Local Storage" as LocalStore
participant "Batch Sync Service" as BatchSync
participant "Spaced Repetition Algorithm" as SRA
database "Database" as DB

User -> UI: Click "Review Due Cards"
UI -> Controller: getDueCards(userID)
Controller -> StatusRepo: findDueCards(userID, today)
StatusRepo -> DB: query(userID, today)
DB --> StatusRepo: dueCardStatuses
StatusRepo --> Controller: dueCardStatuses
Controller --> UI: dueCards

loop For each card
    UI --> User: Display flashcard front text
    UI -> Controller: generateMultipleChoice(cardID)
    Controller -> DistractorSvc: generateDistractors(cardID, deckID, targetLanguage)
    DistractorSvc -> Dictionary: findDistractors(targetLanguage, correctAnswer, 3)
    Dictionary -> DB: query(targetLanguage, excludeWords)
    DB --> Dictionary: distractorWords
    Dictionary --> DistractorSvc: distractors
    DistractorSvc -> StatusRepo: getOtherCardsInDeck(deckID, cardID)
    StatusRepo -> DB: query(deckID, excludeCardID)
    DB --> StatusRepo: deckCards
    StatusRepo --> DistractorSvc: deckCards
    DistractorSvc -> DistractorSvc: mixAndRandomize(distractors, deckCards)
    DistractorSvc --> Controller: finalDistractors
    Controller -> Controller: createMultipleChoice(correctAnswer, distractors)
    Controller --> UI: multipleChoiceQuestion(optionA, optionB, optionC, optionD)
    
    UI --> User: Display 4 options (A, B, C, D)
    User -> UI: Select option
    UI -> Controller: processAnswer(cardID, selectedOption)
    Controller -> Controller: validateAnswer(selectedOption, correctAnswer)
    
    alt Correct Answer
        Controller -> UI: showFeedback(correct, greenColor)
        UI --> User: Display green for correct, red for others + back text
        Controller -> SRA: processCorrectAnswer(currentLevel)
        SRA --> Controller: newLevel, nextReviewDate
    else Incorrect Answer
        Controller -> UI: showFeedback(incorrect, redColor)
        UI --> User: Display green for correct, red for selected + back text
        Controller -> SRA: processIncorrectAnswer()
        SRA --> Controller: level=1, nextReviewDate=tomorrow
    end
    
    Controller -> LocalStore: storeReviewResult(cardID, isCorrect, newLevel, nextReviewDate)
    LocalStore --> Controller: stored
    
    Controller -> BatchSync: checkSyncConditions()
    alt Sync conditions met
        BatchSync -> LocalStore: getUnsynced()
        LocalStore --> BatchSync: pendingUpdates
        BatchSync -> StatusRepo: batchUpdateCardStatuses(pendingUpdates)
        StatusRepo -> DB: batchUpdate(pendingUpdates)
        DB --> StatusRepo: success
        StatusRepo --> BatchSync: updated
        BatchSync -> LocalStore: markAsSynced(pendingUpdates)
    else Continue offline
        BatchSync --> Controller: continueOffline
    end
end

alt Final sync
    UI -> BatchSync: forceFinalSync()
    BatchSync -> LocalStore: getAllUnsynced()
    LocalStore --> BatchSync: allPending
    BatchSync -> StatusRepo: batchUpdateCardStatuses(allPending)
    StatusRepo -> DB: batchUpdate(allPending)
    DB --> StatusRepo: success
    BatchSync -> LocalStore: clearSyncedData()
end

UI --> User: Display review summary with statistics
@enduml
```

## 5. Non-Functional Requirements

### Performance

- **Response Time:** The system must respond to user interactions within 1 second under normal load conditions.
- **Concurrent Users:** The system must support at least 5,000 concurrent users without degradation in performance.
- **API Response Time:** API endpoints must respond within 300ms for 95% of requests.
- **Review Load Time:** Flashcards must load within 500ms during review sessions.
- **Multiple Choice Generation:** Distractor generation must complete within 200ms per question.
- **Offline Performance:** Local storage operations must complete within 100ms.
- **Batch Sync Performance:** Batch synchronization should process up to 100 card updates per request.

### Scalability

- **User Base:** The system must support up to 50,000 registered users in the initial deployment.
- **Storage:** The system must handle up to 10 million flashcards across all users.
- **Growth:** The architecture must allow for horizontal scaling to support user base growth of 100% annually.
- **Database Partitioning:** The database design must support future sharding or partitioning if needed.
- **Data Isolation:** The system architecture must efficiently manage the complete isolation of user data while maintaining performance.
- **Dictionary Scaling:** System dictionary must support up to 1 million words per language.
- **Local Storage:** Client-side storage must handle up to 10,000 offline review records per user.

### Security

- **Authentication:** Implement OAuth 2.0 or JWT-based authentication mechanisms.
- **Password Policy:** Passwords must be at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.
- **Data Protection:** All sensitive user data must be encrypted at rest and in transit (HTTPS/TLS 1.3).
- **Session Management:** User sessions must expire after 30 minutes of inactivity.
- **Input Validation:** All user inputs must be validated and sanitized to prevent injection attacks.
- **Rate Limiting:** Implement API rate limiting to prevent abuse (max 100 requests per minute per user).
- **Data Privacy:** The system must enforce strict data isolation between users with no possibility of data leakage between accounts.
- **Local Storage Security:** Implement encryption for sensitive data stored in localStorage.
- **Batch Sync Security:** Validate and authorize all batch sync operations to prevent data tampering.

### Availability

- **Uptime:** The system must maintain 99.9% uptime (approximately 8.8 hours of downtime per year).
- **Backup:** Automated daily backups with 30-day retention policy.
- **Disaster Recovery:** Recovery Time Objective (RTO) of less than 4 hours and Recovery Point Objective (RPO) of less than 1 hour.
- **Maintenance Windows:** Scheduled maintenance should not exceed 2 hours per month and must be performed during off-peak hours.
- **Offline Capability:** Users must be able to continue reviewing for up to 24 hours without internet connectivity.
- **Sync Recovery:** System must automatically recover and sync data when connectivity is restored.

### Maintainability

- **Code Quality:** Code must follow industry-standard style guides and maintain a test coverage of at least 80%.
- **Documentation:** All APIs must be documented with OpenAPI/Swagger specifications.
- **Modular Design:** System components must be modular to allow for independent updates and replacements.
- **Versioning:** API endpoints should support versioning to prevent breaking changes for clients.
- **Logging:** Comprehensive logging system with adjustable verbosity levels for troubleshooting.
- **Dictionary Management:** Administrators must be able to update system dictionary without system downtime.

### Compatibility

- **Web Browsers:** Support for latest versions of Chrome, Firefox, Safari, and Edge browsers.
- **Mobile Devices:** Responsive web design or native applications for iOS 14+ and Android 10+.
- **Screen Sizes:** Support for screen sizes from 320px width (mobile) to 1920px width (desktop).
- **Offline Support:** Limited functionality available when offline with synchronization upon reconnection.
- **Local Storage Support:** Compatible with browsers supporting localStorage API (all modern browsers).

## 6. Technology Recommendations

### Frontend

| Component | Recommendation | Rationale |
| --- | --- | --- |
| **Web Platform** | Next.js with TypeScript | - Server-side rendering for better SEO and performance 
- Strong typing improves reliability 
- Built-in API routes simplify backend integration 
- Excellent for interactive UIs 
- Large community and ecosystem |
| **Mobile - iOS** | Kotlin (Native) | - Native performance for iOS devices 
- Better integration with iOS ecosystem 
- Robust support for offline functionality 
- Strong type safety with Kotlin |
| **Mobile - Android** | Kotlin (Native) | - Native performance for Android devices 
- Official language for Android development 
- Shared Kotlin logic reduces maintenance 
- Strong community support |
| **State Management** | Redux or Zustand | - Predictable state management 
- Easier debugging 
- Lightweight with Zustand for simpler apps 
- Supports complex application state |
| **UI Framework** | Tailwind CSS | - Utility-first CSS for rapid development 
- Highly customizable for responsive design 
- Consistent styling across platforms 
- Minimal runtime overhead |
| **Local Storage** | IndexedDB with Dexie.js | - Large storage capacity for offline data
- Better performance than localStorage
- Structured query capabilities
- Transaction support for data integrity |

### Backend

| Component | Recommendation | Rationale |
| --- | --- | --- |
| **Server Framework** | Spring Boot | - Robust Java-based framework for enterprise applications 
- Built-in dependency injection and ORM (Hibernate) 
- Simplified API development with REST support 
- Strong security features out of the box |
| **API Architecture** | RESTful with GraphQL for complex queries | - Standardized REST approach for simplicity 
- Scalable and stateless 
- GraphQL provides flexible data fetching for mobile clients 
- Reduced network overhead |
| **Programming Language** | Java with Kotlin | - Java for Spring Boot compatibility and maturity 
- Kotlin for concise, safe code in shared logic 
- Strong typing reduces runtime errors 
- Excellent IDE support |
| **Authentication** | OAuth 2.0 + JWT | - Industry-standard security 
- Supports third-party integrations 
- Stateless authentication reduces server load 
- Seamless integration with Spring Security |
| **Batch Processing** | Spring Batch | - Robust batch processing framework
- Transaction management
- Retry and error handling
- Performance optimization for large datasets |

### Database

| Component | Recommendation | Rationale |
| --- | --- | --- |
| **Primary Database** | PostgreSQL | - ACID compliance for user data integrity 
- Excellent performance for the anticipated scale 
- Good support for JSON data types for flexible schemas 
- Robust indexing capabilities |
| **Caching Layer** | Redis | - High-performance in-memory data store 
- Reduces database load for frequently accessed data 
- Supports complex data structures 
- Can handle session management |
| **Search Functionality** | Elasticsearch | - Fast full-text search for vocabulary 
- Support for multiple languages 
- Fuzzy matching capabilities 
- Scales well for large datasets |
| **Dictionary Storage** | PostgreSQL with Full-Text Search | - Efficient storage and retrieval of dictionary data
- Built-in full-text search capabilities
- Support for multiple languages
- ACID compliance for data integrity |

### Infrastructure

| Component | Recommendation | Rationale |
| --- | --- | --- |
| **Server OS** | Linux (Ubuntu Server) | - Stable and mature ecosystem 
- Excellent security track record 
- Lower resource overhead 
- Strong community support |
| **Hosting** | Docker + Kubernetes | - Containerization for consistent deployment 
- Easier scaling and management 
- Efficient resource utilization 
- Simplified CI/CD integration |
| **CDN** | Cloudflare or AWS CloudFront | - Global content delivery 
- Reduced latency for users 
- DDoS protection 
- Edge caching for static assets |
| **Storage** | AWS S3 or Google Cloud Storage | - Reliable object storage for media files 
- Highly durable 
- Cost-effective 
- Scales automatically |

## 7. Risk and Performance Analysis

### Security Risks

| Risk | Description | Mitigation Strategy |
| --- | --- | --- |
| **SQL Injection** | Malicious SQL queries inserted through user inputs | - Use parameterized queries
- Implement ORM with proper escaping
- Input validation and sanitization
- Least privilege database access |
| **Cross-Site Scripting (XSS)** | Injection of malicious scripts into web pages | - Content Security Policy (CSP)
- Output encoding
- Input validation
- Modern framework XSS protections |
| **Cross-Site Request Forgery (CSRF)** | Tricking users into executing unwanted actions | - Anti-CSRF tokens
- Same-site cookies
- Verify request origin
- Require re-authentication for sensitive actions |
| **Session Hijacking** | Unauthorized acquisition of session identifiers | - HTTPS for all communications
- Secure and HttpOnly cookie flags
- Session timeout and rotation
- IP validation where appropriate |
| **Insecure Direct Object References** | Exposing references to internal implementation objects | - Indirect reference maps
- Access control checks
- Authentication for all API endpoints
- Resource-based authorization |
| **Data Breach** | Unauthorized access to user data | - Encryption at rest and in transit
- Data minimization
- Regular security audits
- Strong access controls |
| **Local Storage Tampering** | Client-side data manipulation | - Data validation on server sync
- Checksums for critical data
- Regular sync validation
- Server-side authority on all data |

### Performance Risks

| Risk | Description | Mitigation Strategy |
| --- | --- | --- |
| **Slow Data Retrieval** | Performance degradation with large flashcard datasets | - Implement database indexing
- Use caching for frequently accessed data
- Paginate large result sets
- Query optimization |
| **High Concurrent User Load** | System slowdown during peak usage times | - Horizontal scaling
- Load balancing
- Connection pooling
- Asynchronous processing where possible |
| **Excessive Database Queries** | Too many queries causing database bottlenecks | - Batch operations
- Denormalize data where appropriate
- Use read replicas for heavy read operations
- Optimize query patterns |
| **Mobile Network Latency** | Slow performance on mobile devices with poor connectivity | - Minimize payload size
- Implement offline capabilities
- Lazy loading for non-critical content
- Progressive web app approach |
| **Resource-Intensive Operations** | Operations that consume significant CPU or memory | - Background processing for intensive tasks
- Rate limiting
- Caching calculation results
- Optimize algorithms |
| **Local Storage Overflow** | Client storage capacity exceeded | - Implement storage quotas
- Automatic cleanup of old data
- Force sync when approaching limits
- Graceful degradation when full |
| **Batch Sync Bottlenecks** | Large batch updates causing server delays | - Optimize batch size
- Parallel processing
- Queue management
- Incremental sync strategies |

### Performance Optimization Solutions

| Area | Optimization Approach |
| --- | --- |
| **Database** | - Index frequently queried fields (especially nextReviewDate and userID)
- Partition tables by user or date ranges
- Implement read replicas for heavy read operations
- Use connection pooling to reduce connection overhead
- Optimize dictionary queries with proper indexing |
| **Caching** | - Cache user data and frequently accessed flashcards
- Store daily review schedules in memory
- Implement browser caching for static assets
- Use CDN for media files (images/audio)
- Cache generated multiple choice questions |
| **API Optimization** | - Implement GraphQL for flexible data fetching
- Compress API responses (gzip)
- Batch API requests where possible
- Use HTTP/2 for multiplexing
- Optimize batch sync endpoints |
| **Frontend** | - Code splitting and lazy loading
- Optimize bundle size
- Use service workers for caching
- Virtual scrolling for long lists
- Efficient local storage management |
| **Resource Management** | - Implement auto-scaling based on load
- Use containerization for efficient resource allocation
- Set appropriate resource limits
- Monitor resource usage and optimize based on patterns
- Optimize batch processing workflows |
| **Offline Optimization** | - Implement intelligent sync strategies
- Optimize local storage usage
- Background sync when possible
- Conflict resolution mechanisms
- Progressive sync for large datasets |