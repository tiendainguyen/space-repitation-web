*** role ***
master react.js
*** context ***
đọc file file_1.desk.management.html
- đây là file mô tả giao diện cho api desk management.
- tiến hành sửa giao diện, khi người dùng chọn Deck Library giao diện này sẽ hiển thị ra
- api search desk được mô tả rất rõ trong file urd_review_card_v1.md
- tôi cung cấp thêm cho bạn code java của api này
  /**
    * Search decks with pagination and statistics - URD API 1
    * @param page Page number (default: 1)
    * @param limit Items per page (default: 10, max: 50)
    * @param search Search term for deck name
    * @param userPrincipal Current authenticated user
    * @return Paginated list of user's decks with card statistics
      */
      @GetMapping("/api/v1/decks/search")
      @PreAuthorize("isAuthenticated()")
      @Operation(
      summary = "Search decks with card statistics",
      description = "Retrieve paginated list of user's decks with card statistics and classification",
      security = @SecurityRequirement(name = "bearerAuth"),
      responses = {
      @ApiResponse(responseCode = "200", description = "Decks retrieved successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
      }
      )
      public ResponseEntity<DeckSearchResponse> searchDecksWithStats(
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int limit,
      @RequestParam(required = false) String search,
      @Parameter(hidden = true) @CurrentUser UserPrincipal userPrincipal) {

      // Validate parameters
      if (limit > 50) {
      limit = 50;
      }
      if (page < 1) {
      page = 1;
      }

      // Create pageable object (Spring is 0-based, so subtract 1 from page)
      Pageable pageable = PageRequest.of(page - 1, limit);

      // Get decks
      Page<Deck> decks;
      if (search != null && !search.trim().isEmpty()) {
      decks = deckService.searchUserDecks(userPrincipal.getId(), search, pageable);
      } else {
      decks = deckService.findByOwnerId(userPrincipal.getId(), pageable);
      }

      // Convert to DTOs with statistics
      List<DeckWithStatsDTO> deckDTOs = decks.getContent().stream()
      .map(deck -> {
      DeckWithStatsDTO dto = new DeckWithStatsDTO(
      deck.getId(),
      deck.getName(),
      deck.getDeckIcon() != null ? deck.getDeckIcon() : "📚",
      deck.getFlashcardCount()
      );

                   // Calculate card statistics
                   var stats = flashcardService.getCardStatistics(deck.getId(), userPrincipal.getId());
                   dto.setReviewCards(stats.reviewCards());
                   dto.setLearnedCards(stats.learnedCards());
                   dto.setNewCards(stats.newCards());
                   dto.setCreatedAt(deck.getCreatedAt());
                   dto.setUpdatedAt(deck.getUpdatedAt());
                   dto.calculateProgress();
                   
                   return dto;
               })
               .collect(Collectors.toList());

      // Build pagination info
      DeckSearchResponse.PaginationInfo paginationInfo = new DeckSearchResponse.PaginationInfo(
      page,
      decks.getTotalPages(),
      decks.getTotalElements(),
      limit,
      decks.hasNext(),
      decks.hasPrevious()
      );

      // Build response
      DeckSearchResponse.DeckSearchData data = new DeckSearchResponse.DeckSearchData(deckDTOs, paginationInfo);
      DeckSearchResponse response = new DeckSearchResponse(true, data, "Decks retrieved successfully");

      return ResponseEntity.ok(response);
      }

package com.xai.srvls.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

/**
* Response structure for deck search API
  */
  @Schema(description = "Deck search response")
  public class DeckSearchResponse {

  @Schema(description = "Success status", example = "true")
  private boolean success;

  @Schema(description = "Response data")
  private DeckSearchData data;

  @Schema(description = "Response message", example = "Decks retrieved successfully")
  private String message;

  public DeckSearchResponse() {
  }

  public DeckSearchResponse(boolean success, DeckSearchData data, String message) {
  this.success = success;
  this.data = data;
  this.message = message;
  }

  // Getters and Setters

  public boolean isSuccess() {
  return success;
  }

  public void setSuccess(boolean success) {
  this.success = success;
  }

  public DeckSearchData getData() {
  return data;
  }

  public void setData(DeckSearchData data) {
  this.data = data;
  }

  public String getMessage() {
  return message;
  }

  public void setMessage(String message) {
  this.message = message;
  }

  /**
    * Data wrapper for deck search response
      */
      @Schema(description = "Deck search data")
      public static class DeckSearchData {

      @Schema(description = "List of decks")
      private List<DeckWithStatsDTO> decks;

      @Schema(description = "Pagination information")
      private PaginationInfo pagination;

      public DeckSearchData() {
      }

      public DeckSearchData(List<DeckWithStatsDTO> decks, PaginationInfo pagination) {
      this.decks = decks;
      this.pagination = pagination;
      }

      public List<DeckWithStatsDTO> getDecks() {
      return decks;
      }

      public void setDecks(List<DeckWithStatsDTO> decks) {
      this.decks = decks;
      }

      public PaginationInfo getPagination() {
      return pagination;
      }

      public void setPagination(PaginationInfo pagination) {
      this.pagination = pagination;
      }
      }

  /**
    * Pagination information
      */
      @Schema(description = "Pagination information")
      public static class PaginationInfo {

      @Schema(description = "Current page number", example = "1")
      private int currentPage;

      @Schema(description = "Total number of pages", example = "3")
      private int totalPages;

      @Schema(description = "Total number of items", example = "25")
      private long totalItems;

      @Schema(description = "Number of items per page", example = "10")
      private int itemsPerPage;

      @Schema(description = "Has next page", example = "true")
      private boolean hasNext;

      @Schema(description = "Has previous page", example = "false")
      private boolean hasPrevious;

      public PaginationInfo() {
      }

      public PaginationInfo(int currentPage, int totalPages, long totalItems,
      int itemsPerPage, boolean hasNext, boolean hasPrevious) {
      this.currentPage = currentPage;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
      this.itemsPerPage = itemsPerPage;
      this.hasNext = hasNext;
      this.hasPrevious = hasPrevious;
      }

      // Getters and Setters

      public int getCurrentPage() {
      return currentPage;
      }

      public void setCurrentPage(int currentPage) {
      this.currentPage = currentPage;
      }

      public int getTotalPages() {
      return totalPages;
      }

      public void setTotalPages(int totalPages) {
      this.totalPages = totalPages;
      }

      public long getTotalItems() {
      return totalItems;
      }

      public void setTotalItems(long totalItems) {
      this.totalItems = totalItems;
      }

      public int getItemsPerPage() {
      return itemsPerPage;
      }

      public void setItemsPerPage(int itemsPerPage) {
      this.itemsPerPage = itemsPerPage;
      }

      public boolean isHasNext() {
      return hasNext;
      }

      public void setHasNext(boolean hasNext) {
      this.hasNext = hasNext;
      }

      public boolean isHasPrevious() {
      return hasPrevious;
      }

      public void setHasPrevious(boolean hasPrevious) {
      this.hasPrevious = hasPrevious;
      }
      }
      }

- *** instruction ***
- dựa theo file này và phần mô tả cho api search desk, tiến hành code phần desklib gọi api search desk để lấy ra các thông tin từ backend
