package com.example.domain;

import java.util.Date;

public class StuVO extends ProVO {
	private String scode;
	private String sname;
	private String dept;
	private int year;
	private Date birthday;
	private String advisor;
	public String getScode() {
		return scode;
	}
	public void setScode(String scode) {
		this.scode = scode;
	}
	public String getSname() {
		return sname;
	}
	public void setSname(String sname) {
		this.sname = sname;
	}
	public String getDept() {
		return dept;
	}
	public void setDept(String dept) {
		this.dept = dept;
	}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	public String getAdvisor() {
		return advisor;
	}
	public void setAdvisor(String advisor) {
		this.advisor = advisor;
	}
	@Override
	public String toString() {
		return "StuVO [scode=" + scode + ", sname=" + sname + ", dept=" + dept + ", year=" + year + ", birthday="
				+ birthday + ", advisor=" + advisor + "]";
	}
	
}
