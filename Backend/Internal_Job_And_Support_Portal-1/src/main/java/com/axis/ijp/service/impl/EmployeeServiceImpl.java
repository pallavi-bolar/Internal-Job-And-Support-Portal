package com.axis.ijp.service.impl;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.axis.ijp.entity.Employee;
import com.axis.ijp.entity.UpdatedStatus;
import com.axis.ijp.enums.EmployeeRole;
import com.axis.ijp.enums.ProfileStatus;
import com.axis.ijp.repository.EmployeeRepository;
import com.axis.ijp.repository.UpdatedStatusRepository;
import com.axis.ijp.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	private final EmployeeRepository employeeRepository;
    private final UpdatedStatusRepository updatedStatusRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository, UpdatedStatusRepository updatedStatusRepository,PasswordEncoder passwordEncoder) {
        this.employeeRepository = employeeRepository;
        this.updatedStatusRepository = updatedStatusRepository;
        this.passwordEncoder = passwordEncoder;
    }

	  @Override
	    public Employee createEmployee(Employee employee) {
		  employee.setPassword(passwordEncoder.encode(employee.getPassword()));
	        return employeeRepository.save(employee);
	    }
	  
	    @Override
	    public Employee getEmployeeById(int employeeId) {
	        return employeeRepository.findById(employeeId).orElse(null);
	    }
	    
	    @Override
	    public List<Employee> getAllEmployees() {
	        return employeeRepository.findAll();
	    }
	    
	 // find employee by user role-HR,Customer_support,candidate
	    @Override
	 	public List<Employee> getEmployeesByRole(EmployeeRole role) {
	    	return employeeRepository.findByRole(role);
	 	}
	    
	 // save an employee detail and set password as first for letter of name and DDMM of DOB
	    @Override
	 	public ResponseEntity<Void> saveEmployee(Employee employee) {
	 		
	         String nameFirstFour = employee.getFullName().substring(0, Math.min(employee.getFullName().length(), 4));
	         String dobDDMM = String.format("%02d%02d", employee.getDateOfBirth().getDayOfMonth(), employee.getDateOfBirth().getMonthValue());
	         String password = nameFirstFour + dobDDMM;
	         employee.setPassword(password);
	         employeeRepository.save(employee);
	         
	 		return ResponseEntity.status(HttpStatus.CREATED).build();
	 	}

	 	// employee details are never deleted, so employee status is set to deactivated
	    @Override
	 	public ResponseEntity<Void> deactivateEmployee(int id) {
	 		Optional<Employee> deactEmployee = employeeRepository.findById(id);
	 		if (deactEmployee.isPresent()) {
	 			Employee existingEmployee = deactEmployee.get();
	 			existingEmployee.setProfileStatus(ProfileStatus.DEACTIVATED);
	 			employeeRepository.save(existingEmployee);
	 			return ResponseEntity.ok().build();
	 		} else {
	 			return ResponseEntity.notFound().build();
	 		}
	 	}

	 // update employee details
	    @Override
	 	public ResponseEntity<Void> updateEmployee(int id, Employee employee) {
	 		Optional<Employee> existingEmployee = employeeRepository.findById(id);
	 		if (existingEmployee.isPresent()) {
	 			Employee emp = existingEmployee.get();
	 			emp.setEmployeeId(id);
	 			emp.setFullName(employee.getFullName());
	 			emp.setEmailId(employee.getEmailId());
	 			emp.setPhoneNo(employee.getPhoneNo());
	 			emp.setDateOfBirth(employee.getDateOfBirth());
	 			emp.setGender(employee.getGender());
	 			emp.setProfileStatus(employee.getProfileStatus());
	 			emp.setComplaints(employee.getComplaints());
	 			emp.setEducationDetails(employee.getEducationDetails());
	 			emp.setJobApplications(employee.getJobApplications());
	 			emp.setRole(employee.getRole());
	 			emp.setSkills(employee.getSkills());
	 			emp.setWorkHistoryList(employee.getWorkHistoryList());
	 			emp.setPassword(employee.getPassword());
	 			
	 			employeeRepository.save(emp);
	 			return ResponseEntity.ok().build();
	 		} else {
	 			return ResponseEntity.notFound().build();
	 		}
	 	}
	 	
	    @Override
	    public void deleteEmployee(int employeeId) {
	        employeeRepository.deleteById(employeeId);
	    }
	    
	    @Override
	    public List<Employee> searchEmployeesByName(String name) {
	        return employeeRepository.findByFullNameContainingIgnoreCase(name);
	    }
	    
	    @Override
	    public Employee updateJobApplicationStatus(int employeeId) {
	        Employee employee = employeeRepository.findById(employeeId).orElse(null);
	        if (employee != null) {
	            List<UpdatedStatus> updatedStatuses = updatedStatusRepository.findByApplicant(employee);
	            employee.setUpdatedStatuses(updatedStatuses);
	        }
	        return employee;
	    }
	    
	    //login
	    @Override
	    public Employee loginEmployee(String emailId, String password) {
			Employee employee = employeeRepository.findByEmailId(emailId);

			if (employee == null) {
				throw new RuntimeException("User not found");
			}

			if (!employee.getPassword().equals(password) || !employee.getEmailId().equals(emailId)) {
				throw new RuntimeException("Invalid password/user name");
			}

			return employee;
		}
	    
	    public Employee getEmployeeByFullName(String fullName) {
	        Optional<Employee> optionalEmployee = employeeRepository.findByFullName(fullName);
	        return optionalEmployee.orElse(null);
	    }
	    
	    @Override
	    public Integer getEmployeeIdByFullName(String fullName) {
	        Employee employee = employeeRepository.findByFullName(fullName).orElse(null);
	        return (employee != null) ? employee.getEmployeeId() : null;
	    }
	    
	    @Override
	    public long getEmployeeCount() {
	        return employeeRepository.count(); // This counts all employees in the table
	    }
	   
	   @Override
	   public List<Employee> filterByGender(String gender) {
		    return employeeRepository.findByGender(gender);
		}

}
