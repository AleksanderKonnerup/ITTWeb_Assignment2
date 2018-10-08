import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const bootApplication = () => {
  platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch(err => console.log(err));
};

if (document.readyState === 'complete') {
    window.onload = () => bootApplication();
    location.reload();
}
else {
    document.addEventListener('DOMContentLoaded', bootApplication);
}

