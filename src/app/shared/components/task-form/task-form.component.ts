import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronDownOutline, closeOutline } from 'ionicons/icons';
import { TaskI } from 'src/app/core/interfaces/task.interface';
import { CategoryService } from 'src/app/core/services/Category.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);
  private categoryService = inject(CategoryService);

  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    categoryId: ['work', Validators.required],
  });

  categories = this.categoryService.categories();

  private _task = signal<TaskI | null>(null);

  @Input() set task(value: TaskI | null) {
    this._task.set(value);
  }

  private taskWatcher = effect(() => {
    const taskData = this._task();

    if (taskData) {
      this.taskForm.patchValue({
        title: taskData.title,
        description: taskData.description,
        categoryId: taskData.categoryId,
      });
    }
  });

    public labelModal = computed(() => {
    return this._task() ? 'Editar Tarea' : 'Añadir Nueva Tarea';
  });

  get f() {
    return this.taskForm.controls;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  submitForm() {
    if (this.taskForm.valid) this.modalCtrl.dismiss(this.taskForm.value);
    else this.taskForm.markAllAsTouched();
  }
}
