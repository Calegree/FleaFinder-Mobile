package com.fleafinder;

import com.fleafinder.persistence.entity.*;
import com.fleafinder.persistence.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	CommandLineRunner init(UserRepository userRepository){
		return args -> {

			// Permissions

			PermissionEntity CREATE_FAIR = PermissionEntity.builder()
					.permissionName(PermissionEnum.CREATE_FAIR)
					.build();

			PermissionEntity READ_FAIR = PermissionEntity.builder()
					.permissionName(PermissionEnum.READ_FAIR)
					.build();

			PermissionEntity UPDATE_FAIR = PermissionEntity.builder()
					.permissionName(PermissionEnum.UPDATE_FAIR)
					.build();

			PermissionEntity DELETE_FAIR = PermissionEntity.builder()
					.permissionName(PermissionEnum.DELETE_FAIR)
					.build();

			PermissionEntity VALIDATE_FAIR = PermissionEntity.builder()
					.permissionName(PermissionEnum.VALIDATE_FAIR)
					.build();

			PermissionEntity REQUEST_FAIR = PermissionEntity.builder()
					.permissionName(PermissionEnum.REQUEST_FAIR)
					.build();

			PermissionEntity CREATE_PRODUCT = PermissionEntity.builder()
					.permissionName(PermissionEnum.CREATE_PRODUCT)
					.build();

			PermissionEntity READ_PRODUCT = PermissionEntity.builder()
					.permissionName(PermissionEnum.READ_PRODUCT)
					.build();

			PermissionEntity UPDATE_PRODUCT = PermissionEntity.builder()
					.permissionName(PermissionEnum.UPDATE_PRODUCT)
					.build();

			PermissionEntity DELETE_PRODUCT = PermissionEntity.builder()
					.permissionName(PermissionEnum.DELETE_PRODUCT)
					.build();

			PermissionEntity CREATE_REVIEW = PermissionEntity.builder()
					.permissionName(PermissionEnum.CREATE_REVIEW)
					.build();

			PermissionEntity READ_REVIEW = PermissionEntity.builder()
					.permissionName(PermissionEnum.READ_REVIEW)
					.build();

			PermissionEntity UPDATE_REVIEW = PermissionEntity.builder()
					.permissionName(PermissionEnum.UPDATE_REVIEW)
					.build();

			PermissionEntity DELETE_REVIEW = PermissionEntity.builder()
					.permissionName(PermissionEnum.DELETE_REVIEW)
					.build();

			PermissionEntity REPORT_REVIEW = PermissionEntity.builder()
					.permissionName(PermissionEnum.REPORT_REVIEW)
					.build();

			PermissionEntity READ_PROFILE = PermissionEntity.builder()
					.permissionName(PermissionEnum.READ_PROFILE)
					.build();

			PermissionEntity UPDATE_PROFILE = PermissionEntity.builder()
					.permissionName(PermissionEnum.UPDATE_PROFILE)
					.build();

			PermissionEntity MANAGE_REPORTS = PermissionEntity.builder()
					.permissionName(PermissionEnum.MANAGE_REPORTS)
					.build();

			PermissionEntity MANAGE_USERS = PermissionEntity.builder()
					.permissionName(PermissionEnum.MANAGE_USERS)
					.build();

			PermissionEntity SEND_ALERTS = PermissionEntity.builder()
					.permissionName(PermissionEnum.SEND_ALERTS)
					.build();

			// Roles

			RoleEntity ADMIN = RoleEntity.builder()
					.roleName(RoleEnum.ADMIN)
					.permissionEntities(Set.of(CREATE_FAIR, READ_FAIR, UPDATE_FAIR, DELETE_FAIR, VALIDATE_FAIR, MANAGE_REPORTS, MANAGE_USERS, SEND_ALERTS))
					.build();

			RoleEntity SELLER = RoleEntity.builder()
					.roleName(RoleEnum.SELLER)
					.permissionEntities(Set.of(CREATE_PRODUCT, READ_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, UPDATE_PROFILE, READ_PROFILE, REQUEST_FAIR))
					.build();

			RoleEntity BUYER = RoleEntity.builder()
					.roleName(RoleEnum.BUYER)
					.permissionEntities(Set.of(READ_PRODUCT, READ_FAIR, CREATE_REVIEW, UPDATE_REVIEW, DELETE_REVIEW, UPDATE_PROFILE, READ_PROFILE, REPORT_REVIEW, REQUEST_FAIR))
					.build();

			RoleEntity ORGANIZER = RoleEntity.builder()
					.roleName(RoleEnum.ORGANIZER)
					.permissionEntities(Set.of(CREATE_FAIR, READ_FAIR, UPDATE_FAIR, VALIDATE_FAIR))
					.build();

			// Test users

			UserEntity admin0 = UserEntity.builder()
					.rut("000000000")
					.name("admin0")
					.birthday(LocalDate.of(2000, 1, 1))
					.email("email0@email.com")
					.phoneNumber("+56900000000")
					.password(new BCryptPasswordEncoder().encode("1234"))
					.accountNonExpired(true)
					.accountNonLocked(true)
					.credentialsNonExpired(true)
					.isEnabled(true)
					.username("admin0")
					.roleEntities(Set.of(ADMIN))
					.build();

			UserEntity seller1 = UserEntity.builder()
					.rut("00000001")
					.name("seller1")
					.birthday(LocalDate.of(2000, 1, 1))
					.email("email1@email.com")
					.phoneNumber("+56900000001")
					.password(new BCryptPasswordEncoder().encode("1234"))
					.accountNonExpired(true)
					.accountNonLocked(true)
					.credentialsNonExpired(true)
					.isEnabled(true)
					.username("seller1")
					.roleEntities(Set.of(SELLER))
					.build();

			UserEntity buyer2 = UserEntity.builder()
					.rut("000000002")
					.name("buyer2")
					.birthday(LocalDate.of(2000, 1, 1))
					.email("email2@email.com")
					.phoneNumber("+56900000002")
					.password(new BCryptPasswordEncoder().encode("1234"))
					.accountNonExpired(true)
					.accountNonLocked(true)
					.credentialsNonExpired(true)
					.isEnabled(true)
					.username("buyer2")
					.roleEntities(Set.of(BUYER))
					.build();

			UserEntity organizer3 = UserEntity.builder()
					.rut("000000003")
					.name("organizer3")
					.birthday(LocalDate.of(2000, 1, 1))
					.email("email3@email.com")
					.phoneNumber("+56900000003")
					.password(new BCryptPasswordEncoder().encode("1234"))
					.accountNonExpired(true)
					.accountNonLocked(true)
					.credentialsNonExpired(true)
					.isEnabled(true)
					.username("organizer3")
					.roleEntities(Set.of(ORGANIZER))
					.build();

			userRepository.saveAll(List.of(admin0, seller1, buyer2, organizer3));
		};
	}
}