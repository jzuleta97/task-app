import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import {
  IonIcon,
  IonSelect,
  IonSelectOption,
  ModalController,
} from '@ionic/angular/standalone';
import { TaskI } from 'src/app/core/interfaces/task.interface';
import { CategoryService } from 'src/app/core/services/Category.service';
import { TaskService } from 'src/app/core/services/Task.service';
import { TaskFormComponent } from 'src/app/shared/components/task-form/task-form.component';

@Component({
  selector: 'app-task',
  imports: [CommonModule, IonicModule, IonIcon, IonSelect, IonSelectOption], 
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  private categoryService = inject(CategoryService);
  private modalCtrl = inject(ModalController);
  private taskService = inject(TaskService);
  private navCtrl = inject(NavController);

  tasks = this.taskService.tasks;
  categories = this.categoryService.categories;

  filterSelected = signal<string>('all');

  filteredTasks = computed(() => {
    const currentFilter = this.filterSelected();
    const allTasks = this.tasks();

    if (currentFilter === 'all') return allTasks;
    return allTasks.filter((t) => t.categoryId === currentFilter);
  });

  async openAddTask() {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
      backdropDismiss: true,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const newTask = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: Date.now(),
        completed: false,
      };

      this.taskService.addTask(newTask);
    }
  }

  async openTaskModal(taskToEdit: TaskI) {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
      componentProps: {
        task: taskToEdit,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.taskService.updateTask({
        ...taskToEdit,
        ...data,
      });
    }
  }

  setFilter(event: any) {
    this.filterSelected.set(event.detail.value);
  }

  toggleTask(id: string) {
    this.taskService.toggleTask(id);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  goBack() {
    this.navCtrl.back();
  }

  getCategoryData(categoryId: string) {
    const category = this.categoryService
      .categories()
      .find((c) => c.id === categoryId);

    return (
      category || { name: 'Sin categoría', color: 'bg-gray-100 text-gray-700' }
    );
  }
}
