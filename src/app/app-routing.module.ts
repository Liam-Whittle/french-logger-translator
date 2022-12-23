import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { GenderComponent } from './gender/gender.component';
import { MenuPage } from './menu/menu.page';
import { SettingsComponent } from './settings/settings.component';
import { VerbsComponent } from './verbs/verbs.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    component: MenuPage,
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'verbs',
    component: VerbsComponent
  },
  {
    path: 'gender',
    component: GenderComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
