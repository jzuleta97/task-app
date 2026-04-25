import { Component, computed, effect, inject, Input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CategoryI } from 'src/app/core/interfaces/category.interface';

const COLOR_OPTIONS = [
  { id: 'blue', class: 'bg-blue-100 text-blue-700', bg: 'bg-blue-500' },
  {
    id: 'emerald',
    class: 'bg-emerald-100 text-emerald-700',
    bg: 'bg-emerald-500',
  },
  { id: 'amber', class: 'bg-amber-100 text-amber-700', bg: 'bg-amber-500' },
  { id: 'rose', class: 'bg-rose-100 text-rose-700', bg: 'bg-rose-500' },
  { id: 'purple', class: 'bg-purple-100 text-purple-700', bg: 'bg-purple-500' },
  { id: 'cyan', class: 'bg-cyan-100 text-cyan-700', bg: 'bg-cyan-500' },
  { id: 'orange', class: 'bg-orange-100 text-orange-700', bg: 'bg-orange-500' },
  { id: 'gray', class: 'bg-gray-100 text-gray-700', bg: 'bg-gray-500' },
];

@Component({
  selector: 'app-category-form',
  imports: [IonicModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);

  colorOptions = COLOR_OPTIONS;
  selectedColor = signal(COLOR_OPTIONS[0]);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
  });

  private _category = signal<CategoryI | null>(null);

  @Input() set category(value: CategoryI | null) {
    this._category.set(value);
  }

  private categoryWatcher = effect(() => {
    const categoryData = this._category();

    if (categoryData) {
      this.form.patchValue({
        name: categoryData.name,
      });
      this.selectedColor.set(
        this.colorOptions.find((c) => c.class === categoryData.color) ||
          this.colorOptions[0]
      );
    }
  });

  public labelModal = computed(() => {
    return this._category() ? 'Editar Categoría' : 'Añadir Nueva Categoría';
  });

  close() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (this.form.valid) {
      this.modalCtrl.dismiss({
        name: this.form.value.name?.trim(),
        color: this.selectedColor().class,
      });
    }
  }
}
