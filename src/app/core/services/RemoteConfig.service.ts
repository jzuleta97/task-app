import { inject, Injectable, signal } from '@angular/core';
import {
  fetchAndActivate,
  getValue,
  RemoteConfig,
} from '@angular/fire/remote-config';

@Injectable({ providedIn: 'root' })
export class RemoteConfigService {
  private remoteConfig = inject(RemoteConfig);

  canCreateCategories = signal<boolean>(true);

  constructor() {
    this.initConfiguration();
  }

  async initConfiguration() {
    try {
      this.remoteConfig.settings.minimumFetchIntervalMillis = 0;
      const activated = await fetchAndActivate(this.remoteConfig);

      if (activated || activated === false) {
        const configValue = getValue(
          this.remoteConfig,
          'can_create_categories',
        );

        const boolValue = configValue.asBoolean();
        this.canCreateCategories.set(boolValue);
      }
    } catch (error) {
      console.error('Error al conectar con Firebase Remote Config:', error);
    }
  }
}
