package com.axis.ijp.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.axis.ijp.entity.Employee;
import com.axis.ijp.repository.EmployeeRepository;

import java.util.Optional;

@Component
public class UserInfoUserDetailsService implements UserDetailsService {

    @Autowired
    private EmployeeRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Employee> employee = repository.findByFullName(username);
        return employee.map(UserInfoUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));

    }
}
