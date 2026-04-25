import { Component, inject } from '@angular/core';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { CategoryI } from 'src/app/core/interfaces/category.interface';
import { CategoryService } from 'src/app/core/services/Category.service';
import { RemoteConfigService } from 'src/app/core/services/RemoteConfig.service';
import { CategoryFormComponent } from 'src/app/shared/components/category-form/category-form.component';

@Component({
  selector: 'app-categories',
  imports: [IonicModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  private remoteConfigService = inject(RemoteConfigService);
  private categoryService = inject(CategoryService);
  private modalCtrl = inject(ModalController);
  private navCtrl = inject(NavController);

  categories = this.categoryService.categories;
  canCreate = this.remoteConfigService.canCreateCategories;

  goBack() {
    this.navCtrl.back();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: CategoryFormComponent,
      backdropDismiss: true,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.categoryService.addCategory({
        id: crypto.randomUUID(),
        ...data,
      });
    }
  }

  async openCategoryModal(categoryToEdit: CategoryI) {
    const modal = await this.modalCtrl.create({
      component: CategoryFormComponent,
      componentProps: {
        category: categoryToEdit,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.categoryService.updateCategory({
        ...categoryToEdit,
        ...data,
      });
    }
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id);
  }
}
