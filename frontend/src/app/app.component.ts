import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { Task, Priority, CreateTaskDto, UpdateTaskDto } from './models/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  loading = false;
  errorMessage = '';
  toastMessage = '';

  // Filter States
  searchTerm = '';
  selectedStatusFilter: 'ALL' | 'PENDING' | 'COMPLETED' = 'ALL';
  selectedPriorityFilter: 'ALL' | Priority = 'ALL';

  // Modal State
  showModal = false;
  isEditing = false;
  currentTaskId: number | null = null;

  // Form Fields
  formTitle = '';
  formDescription = '';
  formPriority: Priority = 'MEDIUM';
  formDueDate = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.errorMessage = '';
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar tarefas:', err);
        this.errorMessage = 'Não foi possível conectar ao servidor backend (Spring Boot na porta 8080).';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter((task) => {
      // Search term filter
      const matchesSearch =
        !this.searchTerm.trim() ||
        task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(this.searchTerm.toLowerCase()));

      // Status filter
      const matchesStatus =
        this.selectedStatusFilter === 'ALL' ||
        (this.selectedStatusFilter === 'COMPLETED' && task.completed) ||
        (this.selectedStatusFilter === 'PENDING' && !task.completed);

      // Priority filter
      const matchesPriority =
        this.selectedPriorityFilter === 'ALL' || task.priority === this.selectedPriorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  setStatusFilter(status: 'ALL' | 'PENDING' | 'COMPLETED'): void {
    this.selectedStatusFilter = status;
    this.applyFilters();
  }

  setPriorityFilter(priority: 'ALL' | Priority): void {
    this.selectedPriorityFilter = priority;
    this.applyFilters();
  }

  toggleTask(task: Task): void {
    this.taskService.toggleTaskStatus(task.id).subscribe({
      next: (updatedTask) => {
        task.completed = updatedTask.completed;
        this.applyFilters();
        this.showToast(updatedTask.completed ? 'Tarefa marcada como concluída! 🎉' : 'Tarefa reaberta!');
      },
      error: (err) => {
        console.error('Erro ao alterar status:', err);
        this.showToast('Erro ao atualizar tarefa.');
      }
    });
  }

  openCreateModal(): void {
    this.isEditing = false;
    this.currentTaskId = null;
    this.formTitle = '';
    this.formDescription = '';
    this.formPriority = 'MEDIUM';
    this.formDueDate = '';
    this.showModal = true;
  }

  openEditModal(task: Task, event: Event): void {
    event.stopPropagation();
    this.isEditing = true;
    this.currentTaskId = task.id;
    this.formTitle = task.title;
    this.formDescription = task.description || '';
    this.formPriority = task.priority;
    this.formDueDate = task.dueDate || '';
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveTask(): void {
    if (!this.formTitle.trim()) {
      return;
    }

    if (this.isEditing && this.currentTaskId !== null) {
      const existingTask = this.tasks.find(t => t.id === this.currentTaskId);
      const updateDto: UpdateTaskDto = {
        title: this.formTitle.trim(),
        description: this.formDescription.trim() || undefined,
        completed: existingTask ? existingTask.completed : false,
        priority: this.formPriority,
        dueDate: this.formDueDate || undefined
      };

      this.taskService.updateTask(this.currentTaskId, updateDto).subscribe({
        next: (updated) => {
          const index = this.tasks.findIndex(t => t.id === updated.id);
          if (index !== -1) {
            this.tasks[index] = updated;
          }
          this.applyFilters();
          this.closeModal();
          this.showToast('Tarefa atualizada com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao atualizar tarefa:', err);
          this.showToast('Falha ao atualizar tarefa.');
        }
      });
    } else {
      const createDto: CreateTaskDto = {
        title: this.formTitle.trim(),
        description: this.formDescription.trim() || undefined,
        priority: this.formPriority,
        dueDate: this.formDueDate || undefined
      };

      this.taskService.createTask(createDto).subscribe({
        next: (created) => {
          this.tasks.unshift(created);
          this.applyFilters();
          this.closeModal();
          this.showToast('Nova tarefa criada!');
        },
        error: (err) => {
          console.error('Erro ao criar tarefa:', err);
          this.showToast('Falha ao criar tarefa.');
        }
      });
    }
  }

  deleteTask(task: Task, event: Event): void {
    event.stopPropagation();
    if (confirm(`Tem certeza que deseja excluir "${task.title}"?`)) {
      this.taskService.deleteTask(task.id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter((t) => t.id !== task.id);
          this.applyFilters();
          this.showToast('Tarefa excluída.');
        },
        error: (err) => {
          console.error('Erro ao excluir tarefa:', err);
          this.showToast('Erro ao excluir tarefa.');
        }
      });
    }
  }

  // Dashboard Stats
  get totalTasksCount(): number {
    return this.tasks.length;
  }

  get completedTasksCount(): number {
    return this.tasks.filter((t) => t.completed).length;
  }

  get pendingTasksCount(): number {
    return this.tasks.filter((t) => !t.completed).length;
  }

  get completionPercentage(): number {
    if (this.totalTasksCount === 0) return 0;
    return Math.round((this.completedTasksCount / this.totalTasksCount) * 100);
  }

  private showToast(msg: string): void {
    this.toastMessage = msg;
    setTimeout(() => {
      if (this.toastMessage === msg) {
        this.toastMessage = '';
      }
    }, 3000);
  }
}
