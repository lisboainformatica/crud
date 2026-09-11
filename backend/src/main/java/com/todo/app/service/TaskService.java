package com.todo.app.service;

import com.todo.app.model.Priority;
import com.todo.app.model.Task;
import com.todo.app.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<Task> getTaskById(Long id) {
        Objects.requireNonNull(id, "ID não pode ser nulo");
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        Objects.requireNonNull(task, "Task não pode ser nula");
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task updatedTaskDetails) {
        Objects.requireNonNull(id, "ID não pode ser nulo");
        Objects.requireNonNull(updatedTaskDetails, "TaskDetails não pode ser nulo");
        return taskRepository.findById(id).map(existingTask -> {
            existingTask.setTitle(updatedTaskDetails.getTitle());
            existingTask.setDescription(updatedTaskDetails.getDescription());
            existingTask.setCompleted(updatedTaskDetails.isCompleted());
            if (updatedTaskDetails.getPriority() != null) {
                existingTask.setPriority(updatedTaskDetails.getPriority());
            }
            if (updatedTaskDetails.getDueDate() != null) {
                existingTask.setDueDate(updatedTaskDetails.getDueDate());
            }
            return taskRepository.save(existingTask);
        }).orElseThrow(() -> new RuntimeException("Tarefa não encontrada com id: " + id));
    }

    public Task toggleTaskCompleted(Long id) {
        Objects.requireNonNull(id, "ID não pode ser nulo");
        return taskRepository.findById(id).map(task -> {
            task.setCompleted(!task.isCompleted());
            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("Tarefa não encontrada com id: " + id));
    }

    public void deleteTask(Long id) {
        Objects.requireNonNull(id, "ID não pode ser nulo");
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Tarefa não encontrada com id: " + id);
        }
        taskRepository.deleteById(id);
    }

    public List<Task> getTasksByStatus(boolean completed) {
        return taskRepository.findByCompletedOrderByCreatedAtDesc(completed);
    }

    public List<Task> getTasksByPriority(Priority priority) {
        return taskRepository.findByPriority(priority);
    }
}
