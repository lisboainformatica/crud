package com.todo.app.config;

import com.todo.app.model.Priority;
import com.todo.app.model.Task;
import com.todo.app.repository.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private final TaskRepository taskRepository;

    public DataInitializer(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (taskRepository.count() == 0) {
            Task task1 = new Task(
                    "Configurar ambiente de desenvolvimento",
                    "Instalar dependências e validar integração entre Spring Boot e Angular",
                    Priority.HIGH,
                    LocalDate.now().plusDays(1)
            );
            task1.setCompleted(true);

            Task task2 = new Task(
                    "Desenvolver API REST com Spring Boot",
                    "Criar controllers, services e repositórios para o CRUD de tarefas com banco H2",
                    Priority.HIGH,
                    LocalDate.now().plusDays(2)
            );
            task2.setCompleted(true);

            Task task3 = new Task(
                    "Criar Interface no Angular",
                    "Construir telas responsivas com filtros, badges de prioridade e estatísticas dinâmicas",
                    Priority.MEDIUM,
                    LocalDate.now().plusDays(3)
            );

            Task task4 = new Task(
                    "Realizar testes de integração",
                    "Validar fluxo completo de inclusão, alteração, exclusão e alteração de status",
                    Priority.LOW,
                    LocalDate.now().plusDays(5)
            );

            taskRepository.save(task1);
            taskRepository.save(task2);
            taskRepository.save(task3);
            taskRepository.save(task4);
        }
    }
}
