import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  checkboxOutline,
  checkmarkOutline,
  checkmarkSharp,
  chevronDownOutline,
  closeOutline,
  createOutline,
  pricetagOutline,
  pulseOutline,
  trashOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      arrowBackOutline,
      trashOutline,
      pricetagOutline,
      createOutline,
      checkboxOutline,
      closeOutline,
      chevronDownOutline,
      checkmarkSharp,
      pulseOutline,
      checkmarkOutline
    });
  }
}
