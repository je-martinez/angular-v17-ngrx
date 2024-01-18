import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { registerMappers } from '@modules/home/mappers/mappers';

if (environment.production) {
  window.console.log = () => {};
}

registerMappers();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
