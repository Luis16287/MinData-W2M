import { NgModule } from "@angular/core";
import { HeroFormModule } from "./hero-form/hero-form.module";
import { HeroesListModule } from "./heroes-list/heroes-list.module";

@NgModule({
  imports: [
    HeroesListModule,
    HeroFormModule
  ],
  declarations: []
})
export class RoutesModule {
}