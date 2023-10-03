package com.axis.ijp.entity;

import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Skill {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int skillId;

	@ManyToOne
	@JoinColumn(name = "employeeId")
	private Employee employee;

	private String name;
	
	private String proficiency;
	
	public Skill() {
		super();
	}
	public Skill(int skillId, Employee employee, String name, String proficiency) {
		super();
		this.skillId = skillId;
		this.employee = employee;
		this.name = name;
		this.proficiency = proficiency;
	}
	public int getSkillId() {
		return skillId;
	}
	public void setSkillId(int skillId) {
		this.skillId = skillId;
	}
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getProficiency() {
		return proficiency;
	}
	public void setProficiency(String proficiency) {
		this.proficiency = proficiency;
	}
}
