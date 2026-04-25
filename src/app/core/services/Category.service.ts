import { computed, Injectable, signal } from '@angular/core';
import { CategoryI } from '../interfaces/category.interface';

const initialCategories: CategoryI[] = [
  { id: 'work', name: 'Trabajo', color: 'bg-blue-100 text-blue-700' },
  {
    id: 'personal',
    name: 'Personal',
    color: 'bg-emerald-100 text-emerald-700',
  },
  { id: 'shopping', name: 'Compras', color: 'bg-amber-100 text-amber-700' },
  { id: 'health', name: 'Salud', color: 'bg-rose-100 text-rose-700' },
];

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private _categories = signal<CategoryI[]>(initialCategories);

  categories = computed(() => this._categories());

  addCategory(newCategory: CategoryI) {
    this._categories.update((prev) => [newCategory, ...prev]);
  }

  updateCategory(updatedCategory: CategoryI) {
    this._categories.update((categories) =>
      categories.map((c) =>
        c.id === updatedCategory.id ? updatedCategory : c,
      ),
    );
  }

  deleteCategory(id: string) {
    this._categories.update((categories) =>
      categories.filter((c) => c.id !== id),
    );
  }
}
