package com.example.domain;

import java.util.Date;

public class CommentVO extends UserVO{
	private int cid;
	private int pid;
	private String body;
	private String writer;
	private Date regdate;
	
	public int getCid() {
		return cid;
	}
	public void setCid(int cid) {
		this.cid = cid;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
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
		return "CommentVO [cid=" + cid + ", pid=" + pid + ", body=" + body + ", writer=" + writer + ", regdate="
				+ regdate + "]";
	}
}
