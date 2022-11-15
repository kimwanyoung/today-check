package main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import main.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
	public UserEntity findById(String id);
}
