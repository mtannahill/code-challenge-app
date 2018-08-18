package com.code.challenge.payloads;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonInclude;

public class GifResponse {
	
	 private Long id;
	 private String giphyid;
	 private Instant creationDateTime;
	 private UserSummary createdBy;

	 @JsonInclude(JsonInclude.Include.NON_NULL)
	 private String label;
	 
	 public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getGiphyid() {
			return giphyid;
		}

		public void setGiphyid(String giphyid) {
			this.giphyid = giphyid;
		}

		public UserSummary getCreatedBy() {
			return createdBy;
		}

		public void setCreatedBy(UserSummary createdBy) {
			this.createdBy = createdBy;
		}

		public String getLabel() {
			return label;
		}

		public void setLabel(String label) {
			this.label = label;
		}

		public Instant getCreationDateTime() {
			return creationDateTime;
		}

		public void setCreationDateTime(Instant creationDateTime) {
			this.creationDateTime = creationDateTime;
		}
}
