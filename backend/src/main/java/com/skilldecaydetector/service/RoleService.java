package com.skilldecaydetector.service;

import java.util.List;

import org.springframework.context.support.BeanDefinitionDsl.Role;


public interface RoleService {

	@SuppressWarnings("deprecation")
	Role createRole(Role role);

    List<Role> getAllRoles();

    Role getRoleByName(String name);
}