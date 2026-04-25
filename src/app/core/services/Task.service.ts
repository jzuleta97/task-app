import { computed, Injectable, signal } from '@angular/core';
import { TaskI } from '../interfaces/task.interface';

const tasks: TaskI[] = [
  {
    id: '1',
    title: 'Comprar café en grano',
    description: 'Buscar del tipo tostado medio para la cafetera nueva.',
    completed: false,
    categoryId: 'shopping',
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'Revisión técnica del coche',
    description: 'Cita programada para las 10:00 AM en el taller.',
    completed: true,
    categoryId: 'personal',
    createdAt: Date.now(),
  },
  {
    id: '3',
    title: 'Finalizar reporte mensual',
    description: 'Enviar el PDF con las métricas de rendimiento a Don Jorge.',
    completed: false,
    categoryId: 'work',
    createdAt: Date.now(),
  },
  {
    id: '4',
    title: 'Rutina de cardio',
    description: 'Completar los 30 minutos de ejercicio diario.',
    completed: false,
    categoryId: 'health',
    createdAt: Date.now(),
  },
  {
    id: '5',
    title: 'Pagar suscripción de Figma',
    description: 'Revisar que la tarjeta de crédito tenga fondos suficientes.',
    completed: true,
    categoryId: 'work',
    createdAt: Date.now(),
  }, {
    id: '4',
    title: 'Rutina de cardio',
    description: 'Completar los 30 minutos de ejercicio diario.',
    completed: false,
    categoryId: 'health',
    createdAt: Date.now(),
  },
  {
    id: '5',
    title: 'Pagar suscripción de Figma',
    description: 'Revisar que la tarjeta de crédito tenga fondos suficientes.',
    completed: true,
    categoryId: 'work',
    createdAt: Date.now(),
  },
];

@Injectable({ providedIn: 'root' })
export class TaskService {
  // Estado privado con Signals
  private _tasks = signal<TaskI[]>(tasks);

  // Exposición pública reactiva
  tasks = computed(() => this._tasks());

  addTask(newTask: TaskI) {
    this._tasks.update((prev) => [newTask, ...prev]);
  }

  updateTask(updatedTask: TaskI) {
    this._tasks.update((tasks) =>
      tasks.map((t) => (t.id === updatedTask.id ? { ...t, ...updatedTask } : t)),
    );
  }

  toggleTask(id: string) {
    this._tasks.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  deleteTask(id: string) {
    this._tasks.update((tasks) => tasks.filter((t) => t.id !== id));
  }
}
