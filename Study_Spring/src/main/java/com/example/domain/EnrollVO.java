package com.example.domain;

import java.util.*;

public class EnrollVO {
	private String lcode;
	private String scode;
	private Date edate;
	private int grade;

	public String getLcode() {
		return lcode;
	}

	public void setLcode(String lcode) {
		this.lcode = lcode;
	}

	public String getScode() {
		return scode;
	}

	public void setScode(String scode) {
		this.scode = scode;
	}

	public Date getEdate() {
		return edate;
	}

	public void setEdate(Date edate) {
		this.edate = edate;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	@Override
	public String toString() {
		return "EnrollVO [lcode=" + lcode + ", scode=" + scode + ", edate=" + edate + ", grade=" + grade + "]";
	}

}