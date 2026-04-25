import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { TaskI } from 'src/app/core/interfaces/task.interface';
import { TaskService } from 'src/app/core/services/Task.service';
import { TaskFormComponent } from 'src/app/shared/components/task-form/task-form.component';

@Component({
  selector: 'app-task',
  imports: [CommonModule, IonicModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  private taskService = inject(TaskService);
  private navCtrl = inject(NavController);
  private modalCtrl = inject(ModalController);

  tasks = this.taskService.tasks;

  async openAddTask() {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
      backdropDismiss: true
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
      }
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

  toggleTask(id: string) {
    this.taskService.toggleTask(id);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  goBack() {
    this.navCtrl.back();
  }
}
