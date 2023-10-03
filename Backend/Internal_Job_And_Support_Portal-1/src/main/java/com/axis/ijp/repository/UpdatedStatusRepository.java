
package com.axis.ijp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.axis.ijp.entity.Employee;
import com.axis.ijp.entity.UpdatedStatus;

public interface UpdatedStatusRepository extends JpaRepository<UpdatedStatus, Integer> {
	
	List<UpdatedStatus> findByApplicant(Employee employee);
}
