# VocabMaster API - cURL Commands

This document contains all the cURL commands for integrating with the VocabMaster backend APIs.

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Replace `YOUR_JWT_TOKEN` with your actual authentication token.

## Base URL

```
http://localhost:8080
```

---

## Deck Operations

### 1. Create Deck

Creates a new flashcard deck owned by the authenticated user.

```bash
curl -X POST http://localhost:8080/decks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Business English",
    "description": "Professional vocabulary for business contexts",
    "languageFrom": "en",
    "languageTo": "en",
    "isPublic": false,
    "tags": ["business", "professional"]
  }'
```

**Response:** Returns the created deck with generated ID.

### 2. Get Deck by ID

Retrieves a specific deck by its ID.

```bash
curl -X GET http://localhost:8080/decks/{deckId} \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Parameters:**
- `{deckId}`: UUID of the deck

### 3. Get User's Decks

Retrieves all decks owned by the authenticated user with pagination.

```bash
curl -X GET "http://localhost:8080/decks/my?page=0&size=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Query Parameters:**
- `page`: Page number (default: 0)
- `size`: Number of items per page (default: 20)

### 4. Get Public Decks

Retrieves all public decks with optional language filtering.

```bash
curl -X GET "http://localhost:8080/decks/public?page=0&size=10&languageFrom=en&languageTo=es" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Query Parameters:**
- `page`: Page number (default: 0)
- `size`: Number of items per page (default: 20)
- `languageFrom`: Source language (optional)
- `languageTo`: Target language (optional)

### 5. Search Decks

Searches for decks by name, description, or tags.

```bash
curl -X GET "http://localhost:8080/decks/search?query=business&searchPublic=true&page=0&size=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Query Parameters:**
- `query`: Search term
- `searchPublic`: Search in public decks (default: true)
- `page`: Page number (default: 0)
- `size`: Number of items per page (default: 20)

### 6. Update Deck

Updates an existing deck owned by the authenticated user.

```bash
curl -X PUT http://localhost:8080/decks/{deckId} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Advanced Business English",
    "description": "Updated description for advanced business vocabulary",
    "languageFrom": "en",
    "languageTo": "en",
    "isPublic": true,
    "tags": ["business", "advanced", "professional"]
  }'
```

**Parameters:**
- `{deckId}`: UUID of the deck to update

### 7. Delete Deck

Deletes a deck owned by the authenticated user.

```bash
curl -X DELETE http://localhost:8080/decks/{deckId} \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Parameters:**
- `{deckId}`: UUID of the deck to delete

---

## Flashcard Operations

### 1. Create Flashcard

Creates a new flashcard in a specific deck.

```bash
curl -X POST http://localhost:8080/flashcards/deck/{deckId} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "front": "Serendipity",
    "back": "The occurrence and development of events by chance in a happy or beneficial way",
    "pronunciation": "/sɛrənˈdɪpɪti/",
    "example": "A fortunate stroke of serendipity led her to discover the hidden café",
    "difficulty": 0,
    "tags": ["noun", "advanced"]
  }'
```

**Parameters:**
- `{deckId}`: UUID of the deck to add the flashcard to

### 2. Get Flashcard by ID

Retrieves a specific flashcard by its ID.

```bash
curl -X GET http://localhost:8080/flashcards/{cardId} \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Parameters:**
- `{cardId}`: UUID of the flashcard

### 3. Get Flashcards in Deck

Retrieves all flashcards in a specific deck with pagination.

```bash
curl -X GET "http://localhost:8080/flashcards/deck/{deckId}?page=0&size=20" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Parameters:**
- `{deckId}`: UUID of the deck

**Query Parameters:**
- `page`: Page number (default: 0)
- `size`: Number of items per page (default: 20)

### 4. Search Flashcards

Searches for flashcards within a specific deck.

```bash
curl -X GET "http://localhost:8080/flashcards/search?deckId={deckId}&query=business&page=0&size=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Query Parameters:**
- `deckId`: UUID of the deck to search in
- `query`: Search term
- `page`: Page number (default: 0)
- `size`: Number of items per page (default: 20)

### 5. Get Flashcards Due for Review

Retrieves flashcards that are due for review based on the spaced repetition algorithm.

```bash
curl -X GET "http://localhost:8080/flashcards/review?deckId={deckId}&page=0&size=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Query Parameters:**
- `deckId`: UUID of the deck (optional - if not provided, returns from all decks)
- `page`: Page number (default: 0)
- `size`: Number of items per page (default: 20)

### 6. Update Flashcard

Updates an existing flashcard.

```bash
curl -X PUT http://localhost:8080/flashcards/{cardId} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "front": "Eloquent",
    "back": "Fluent and persuasive in speaking or writing; having or showing the ability to speak fluently and coherently",
    "pronunciation": "/ˈɛləkwənt/",
    "example": "She gave an eloquent speech that moved the entire audience to tears",
    "difficulty": 1,
    "tags": ["adjective", "intermediate"]
  }'
```

**Parameters:**
- `{cardId}`: UUID of the flashcard to update

### 7. Delete Flashcard

Deletes an existing flashcard.

```bash
curl -X DELETE http://localhost:8080/flashcards/{cardId} \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Parameters:**
- `{cardId}`: UUID of the flashcard to delete

---

## Example Usage with Real Data

### Complete Workflow Example

1. **Create a new deck:**
```bash
curl -X POST http://localhost:8080/decks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "IELTS Vocabulary",
    "description": "Essential vocabulary for IELTS preparation",
    "languageFrom": "en",
    "languageTo": "en",
    "isPublic": false,
    "tags": ["ielts", "exam", "vocabulary"]
  }'
```

2. **Add a flashcard to the deck:**
```bash
curl -X POST http://localhost:8080/flashcards/deck/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "front": "Ubiquitous",
    "back": "Present, appearing, or found everywhere",
    "pronunciation": "/juːˈbɪkwɪtəs/",
    "example": "Smartphones have become ubiquitous in modern society",
    "difficulty": 0,
    "tags": ["adjective", "advanced", "ielts"]
  }'
```

3. **Get flashcards due for review:**
```bash
curl -X GET "http://localhost:8080/flashcards/review?page=0&size=5" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Error Responses

### Common HTTP Status Codes

- **200 OK**: Successful GET request
- **201 Created**: Successful POST request
- **204 No Content**: Successful DELETE request
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Access denied (user doesn't own the resource)
- **404 Not Found**: Resource not found

### Example Error Response

```json
{
  "timestamp": "2024-01-20T10:30:00Z",
  "status": 403,
  "error": "Forbidden",
  "message": "Access denied",
  "path": "/decks/550e8400-e29b-41d4-a716-446655440000"
}
```

---

## Frontend Integration APIs

### Add Word Screen CRUD Operations

#### 1. Get User Decks for Selection

Retrieves all user decks for the deck selection dropdown in the add word screen.

```bash
curl -X GET "http://localhost:8080/decks/my?page=0&size=50" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:** Returns paginated list of user's decks with metadata for deck selection.

#### 2. Create New Deck from Add Word Screen

Creates a new deck directly from the add word interface.

```bash
curl -X POST http://localhost:8080/decks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "New Vocabulary Collection",
    "description": "Created from add word screen",
    "languageFrom": "en",
    "languageTo": "en",
    "isPublic": false,
    "tags": ["custom"]
  }'
```

**Response:** Returns the newly created deck with ID for immediate selection.

#### 3. Add Word with Deck Validation

Adds a new flashcard to the selected deck with input validation.

```bash
curl -X POST http://localhost:8080/flashcards/deck/{deckId} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "front": "Serendipity",
    "back": "The occurrence and development of events by chance in a happy or beneficial way",
    "pronunciation": "/sɛrənˈdɪpɪti/",
    "example": "A fortunate stroke of serendipity led her to discover the hidden café",
    "difficulty": 0,
    "tags": ["noun", "advanced"],
    "inputMethod": "manual"
  }'
```

**Parameters:**
- `{deckId}`: UUID of the selected deck
- `inputMethod`: "manual", "camera", or "import"

### Deck Management Screen CRUD Operations

#### 1. Get Deck Details with Statistics

Retrieves comprehensive deck information for the deck management interface.

```bash
curl -X GET http://localhost:8080/decks/{deckId}/details \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response Format:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Business English",
  "description": "Professional vocabulary for business contexts",
  "languageFrom": "en",
  "languageTo": "en",
  "isPublic": false,
  "tags": ["business", "professional"],
  "statistics": {
    "totalCards": 45,
    "learnedCards": 34,
    "reviewCards": 8,
    "newCards": 3,
    "progressPercentage": 75.6,
    "averageAccuracy": 87.5,
    "lastStudied": "2024-01-20T15:30:00Z"
  },
  "owner": {
    "id": "user123",
    "displayName": "Daniel Nguyen"
  },
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-20T15:30:00Z"
}
```

#### 2. Update Deck Settings

Updates deck configuration from the deck management screen.

```bash
curl -X PUT http://localhost:8080/decks/{deckId} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Advanced Business English",
    "description": "Updated professional vocabulary with advanced terms",
    "languageFrom": "en",
    "languageTo": "en",
    "isPublic": true,
    "tags": ["business", "advanced", "professional"],
    "settings": {
      "dailyLimit": 20,
      "reviewMode": "spaced",
      "difficulty": "intermediate"
    }
  }'
```

#### 3. Duplicate Deck

Creates a copy of an existing deck for the user.

```bash
curl -X POST http://localhost:8080/decks/{deckId}/duplicate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Copy of Business English",
    "includeProgress": false,
    "includeStatistics": false
  }'
```

**Parameters:**
- `includeProgress`: Whether to copy user progress (default: false)
- `includeStatistics`: Whether to copy learning statistics (default: false)

#### 4. Archive/Unarchive Deck

Archives a deck without deleting it (soft delete).

```bash
curl -X PATCH http://localhost:8080/decks/{deckId}/archive \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

To unarchive:
```bash
curl -X PATCH http://localhost:8080/decks/{deckId}/unarchive \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### 5. Get Deck Study Analytics

Retrieves detailed study analytics for deck performance tracking.

```bash
curl -X GET "http://localhost:8080/decks/{deckId}/analytics?period=30&timezone=UTC" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Query Parameters:**
- `period`: Number of days for analytics (default: 30)
- `timezone`: User's timezone for accurate date calculations

**Response Format:**
```json
{
  "deckId": "550e8400-e29b-41d4-a716-446655440000",
  "period": 30,
  "summary": {
    "totalSessions": 24,
    "totalTimeSpent": 720,
    "averageSessionTime": 30,
    "cardsStudied": 156,
    "accuracy": 85.2
  },
  "dailyProgress": [
    {
      "date": "2024-01-20",
      "cardsStudied": 8,
      "timeSpent": 25,
      "accuracy": 87.5,
      "newCards": 2,
      "reviewCards": 6
    }
  ],
  "difficultyBreakdown": {
    "easy": 45,
    "medium": 35,
    "hard": 20
  }
}
```

#### 6. Export Deck Data

Exports deck content in various formats.

```bash
curl -X GET "http://localhost:8080/decks/{deckId}/export?format=csv&includeProgress=true" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Accept: application/octet-stream"
```

**Query Parameters:**
- `format`: "csv", "json", "anki" (default: "json")
- `includeProgress`: Include user progress data (default: false)

#### 7. Import Cards to Deck

Imports flashcards from file upload to existing deck.

```bash
curl -X POST http://localhost:8080/decks/{deckId}/import \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@vocabulary.csv" \
  -F "format=csv" \
  -F "overwriteExisting=false"
```

**Form Parameters:**
- `file`: The file to import
- `format`: "csv", "json", "anki"
- `overwriteExisting`: Whether to overwrite existing cards with same front text

### Flashcard Management in Add Card Screen

#### 1. Search Existing Cards

Searches for existing cards to prevent duplicates when adding new words.

```bash
curl -X GET "http://localhost:8080/flashcards/search-duplicates?query=serendipity&deckId={deckId}" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:** Returns potential duplicate cards with similarity scores.

#### 2. Bulk Add Cards

Adds multiple flashcards in a single request for import functionality.

```bash
curl -X POST http://localhost:8080/flashcards/deck/{deckId}/bulk \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "cards": [
      {
        "front": "Eloquent",
        "back": "Fluent and persuasive in speaking or writing",
        "pronunciation": "/ˈɛləkwənt/",
        "example": "She gave an eloquent speech",
        "difficulty": 1,
        "tags": ["adjective", "intermediate"]
      },
      {
        "front": "Ubiquitous",
        "back": "Present everywhere at the same time",
        "pronunciation": "/juːˈbɪkwɪtəs/",
        "example": "Smartphones are ubiquitous in modern society",
        "difficulty": 2,
        "tags": ["adjective", "advanced"]
      }
    ],
    "validateDuplicates": true
  }'
```

#### 3. Auto-Generate Card Content

Uses AI/dictionary API to auto-complete card information from just the word.

```bash
curl -X POST http://localhost:8080/flashcards/auto-generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "word": "serendipity",
    "language": "en",
    "difficulty": "auto",
    "includeExample": true,
    "includePronunciation": true
  }'
```

**Response:** Returns suggested card content that can be edited before saving.

---

## Notes

1. **UUIDs**: All IDs in the system are UUIDs. Make sure to use the correct format.
2. **Authentication**: Always include the JWT token in the Authorization header.
3. **Pagination**: Most list endpoints support pagination with `page` and `size` parameters.
4. **Content-Type**: Always set `Content-Type: application/json` for POST and PUT requests.
5. **CORS**: If calling from a web application, ensure CORS is properly configured on the backend.

---

## Testing with Postman

You can import these cURL commands into Postman by:
1. Opening Postman
2. Clicking "Import" 
3. Selecting "Raw text"
4. Pasting any of the cURL commands above
5. Postman will automatically convert them to requests

---

## Environment Variables

For easier testing, you can set these environment variables:

```bash
export API_BASE_URL="http://localhost:8080"
export JWT_TOKEN="your_jwt_token_here"
export DECK_ID="550e8400-e29b-41d4-a716-446655440000"
export CARD_ID="660e8400-e29b-41d4-a716-446655440001"
```

Then use them in your cURL commands:
```bash
curl -X GET "$API_BASE_URL/decks/$DECK_ID" \
  -H "Authorization: Bearer $JWT_TOKEN"
```