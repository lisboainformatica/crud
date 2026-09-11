package com.todo.app.repository;

import com.todo.app.model.Priority;
import com.todo.app.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByOrderByCreatedAtDesc();
    List<Task> findByCompletedOrderByCreatedAtDesc(boolean completed);
    List<Task> findByPriority(Priority priority);
}
