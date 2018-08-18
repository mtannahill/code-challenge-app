package com.code.challenge.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.code.challenge.model.audit.DateAudit;

@Entity
@Table(name = "gif", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "user_id",
                "giphyid"
        })
})
public class Gif extends DateAudit{
	private static final long serialVersionUID = -1601799252652054038L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank
    @Size(max = 40)
    private String giphyid;
    
    @Size(max = 60)
    private String label;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    
    public String getGiphyid() {
        return giphyid;
    }

    public void setGiphyid(String giphyid) {
        this.giphyid = giphyid;
    }

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}


}
