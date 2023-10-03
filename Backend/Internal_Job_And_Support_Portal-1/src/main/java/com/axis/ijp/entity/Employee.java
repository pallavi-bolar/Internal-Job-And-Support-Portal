package com.axis.ijp.entity;

import java.time.LocalDate;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import com.axis.ijp.enums.EmployeeRole;
import com.axis.ijp.enums.JobApplicationStatus;
import com.axis.ijp.enums.ProfileStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int employeeId;
	private EmployeeRole role;
	private String fullName;
	private String emailId;
	private String phoneNo;
	private String gender;
	private LocalDate dateOfBirth;
	private String address;
	private LocalDate dateOfJoining;
	private String password; 

	@Enumerated(EnumType.STRING)
	private ProfileStatus profileStatus = ProfileStatus.ACTIVATED; // Default status is active

	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	private List<WorkHistory> workHistoryList;

	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	private List<Skill> skills;

	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	private List<EducationDetail> educationDetails;

	@JsonIgnore
	@OneToMany(mappedBy = "complainant", cascade = CascadeType.ALL)
	private List<Complaint> complaints;

	@JsonIgnore
	@OneToMany(mappedBy = "applicant", cascade = CascadeType.ALL)
	private List<JobApplication> jobApplications;

	@Enumerated(EnumType.STRING)
	private JobApplicationStatus jobApplicationStatus;

	@OneToMany(mappedBy = "applicant")
	private List<UpdatedStatus> updatedStatuses;

	public Employee() {
		super();
	}

	public Employee(int employeeId, EmployeeRole role, String fullName, String emailId, String phoneNo, String gender,
			LocalDate dateOfBirth, String address, LocalDate dateOfJoining, String password,
			ProfileStatus profileStatus, List<WorkHistory> workHistoryList, List<Skill> skills,
			List<EducationDetail> educationDetails, List<Complaint> complaints, List<JobApplication> jobApplications,
			JobApplicationStatus jobApplicationStatus, List<UpdatedStatus> updatedStatuses) {
		super();
		this.employeeId = employeeId;
		this.role = role;
		this.fullName = fullName;
		this.emailId = emailId;
		this.phoneNo = phoneNo;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.address = address;
		this.dateOfJoining = dateOfJoining;
		this.password = password;
		this.profileStatus = profileStatus;
		this.workHistoryList = workHistoryList;
		this.skills = skills;
		this.educationDetails = educationDetails;
		this.complaints = complaints;
		this.jobApplications = jobApplications;
		this.jobApplicationStatus = jobApplicationStatus;
		this.updatedStatuses = updatedStatuses;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public EmployeeRole getRole() {
		return role;
	}

	public void setRole(EmployeeRole role) {
		this.role = role;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public LocalDate getDateOfJoining() {
		return dateOfJoining;
	}

	public void setDateOfJoining(LocalDate dateOfJoining) {
		this.dateOfJoining = dateOfJoining;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public ProfileStatus getProfileStatus() {
		return profileStatus;
	}

	public void setProfileStatus(ProfileStatus profileStatus) {
		this.profileStatus = profileStatus;
	}

	public List<WorkHistory> getWorkHistoryList() {
		return workHistoryList;
	}

	public void setWorkHistoryList(List<WorkHistory> workHistoryList) {
		this.workHistoryList = workHistoryList;
	}

	public List<Skill> getSkills() {
		return skills;
	}

	public void setSkills(List<Skill> skills) {
		this.skills = skills;
	}

	public List<EducationDetail> getEducationDetails() {
		return educationDetails;
	}

	public void setEducationDetails(List<EducationDetail> educationDetails) {
		this.educationDetails = educationDetails;
	}

	public List<Complaint> getComplaints() {
		return complaints;
	}

	public void setComplaints(List<Complaint> complaints) {
		this.complaints = complaints;
	}

	public List<JobApplication> getJobApplications() {
		return jobApplications;
	}

	public void setJobApplications(List<JobApplication> jobApplications) {
		this.jobApplications = jobApplications;
	}

	public JobApplicationStatus getJobApplicationStatus() {
		return jobApplicationStatus;
	}

	public void setJobApplicationStatus(JobApplicationStatus jobApplicationStatus) {
		this.jobApplicationStatus = jobApplicationStatus;
	}

	public List<UpdatedStatus> getUpdatedStatuses() {
		return updatedStatuses;
	}

	public void setUpdatedStatuses(List<UpdatedStatus> updatedStatuses) {
		this.updatedStatuses = updatedStatuses;
	}

}
