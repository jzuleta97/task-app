import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CategoryService } from 'src/app/core/services/Category.service';
import { TaskService } from 'src/app/core/services/Task.service';
import { IonIcon } from '@ionic/angular/standalone';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, IonicModule, IonIcon],
  templateUrl: './home.page.html',
})
export class HomePageComponent {
  private taskService = inject(TaskService);
  private categoryService = inject(CategoryService);
  private navCtrl = inject(NavController);

  tasks = this.taskService.tasks;
  categories = this.categoryService.categories;

  completedCount = computed(
    () => this.tasks().filter((t) => t.completed).length,
  );
  totalCount = computed(() => this.tasks().length);
  categoriesCount = computed(() => this.categories().length);

  onCardClick(view: string) {
    this.navCtrl.navigateForward(`/${view}`);
  }
}
