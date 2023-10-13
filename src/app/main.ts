import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"

import { persistState } from "@datorama/akita"
import { AppModule } from "./app.module"

persistState()

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err))
