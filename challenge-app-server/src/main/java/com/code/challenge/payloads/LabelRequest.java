package com.code.challenge.payloads;

import javax.validation.constraints.Size;

public class LabelRequest {
	
	@Size(max = 60)
	private String label;

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

}
