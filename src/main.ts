import { bootstrapApplication } from '@angular/platform-browser';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

const firebaseConfig = {
  apiKey: 'AIzaSyD45hQgYLrnOM5ZxQQMRRwataI5h2CM3Uw',
  authDomain: 'web-app-3504c.firebaseapp.com',
  projectId: 'web-app-3504c',
  storageBucket: 'web-app-3504c.firebasestorage.app',
  messagingSenderId: '55593564149',
  appId: '1:55593564149:web:8b1fab69b091f37392d2bc',
  measurementId: 'G-JRL1RS24N0',
};

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideRemoteConfig(() => getRemoteConfig()),
  ],
});
