import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoggedInGuard } from '../utilities-guards/isLoggedIn/is-logged-in.guard';
import { SearchComponent } from './search/search.component';



const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    canActivate: [IsLoggedInGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
