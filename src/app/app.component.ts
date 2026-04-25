import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  arrowBackOutline,
  checkboxOutline,
  checkmarkOutline,
  checkmarkSharp,
  chevronDownOutline,
  closeOutline,
  createOutline,
  lockClosedOutline,
  pricetagOutline,
  pulseOutline,
  trashOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
// app.component.ts
export class AppComponent {
  constructor() {
    console.log('Registrando iconos...');
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'trash-outline': trashOutline,
      'pricetag-outline': pricetagOutline,
      'create-outline': createOutline,
      'checkbox-outline': checkboxOutline,
      'close-outline': closeOutline,
      'chevron-down-outline': chevronDownOutline,
      'checkmark-sharp': checkmarkSharp,
      'pulse-outline': pulseOutline,
      'checkmark-outline': checkmarkOutline,
      'lock-closed-outline': lockClosedOutline,
      'add-outline': addOutline,
    });
    console.log('Iconos registrados correctamente');
  }
}
