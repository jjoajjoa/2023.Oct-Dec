package com.example.domain;

import java.util.Date;

public class PostVO extends UserVO{
	private int pid;
	private String title;
	private String body;
	private String writer;
	private Date regdate;
	private int viewcnt;
	private int commcnt;
	
	public int getCommcnt() {
		return commcnt;
	}
	public void setCommcnt(int commcnt) {
		this.commcnt = commcnt;
	}
	public int getViewcnt() {
		return viewcnt;
	}
	public void setViewcnt(int viewcnt) {
		this.viewcnt = viewcnt;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}
	public Date getRegdate() {
		return regdate;
	}
	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
	
	@Override
	public String toString() {
		return "PostVO [pid=" + pid + ", title=" + title + ", body=" + body + ", writer=" + writer + ", regdate="
				+ regdate + "]";
	}
}
