package com.axis.ijp.security.config;

import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.axis.ijp.entity.Employee;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserInfoUserDetails implements UserDetails {


    private String name;
    private String password;
    private List<GrantedAuthority> authorities;

    public UserInfoUserDetails(Employee employee) {
        name = employee.getFullName();
        password = employee.getPassword();
        authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + employee.getRole().name()));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
