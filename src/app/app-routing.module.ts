import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ProjectCrudComponent } from './views/project-crud/project-crud.component';
import { ProjectCreateComponent } from './components/project/project-create/project-create.component';
import { ProjectUpdateComponent } from './components/project/project-update/project-update.component';
import { ProjectDeleteComponent } from './components/project/project-delete/project-delete.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "projects",
    component: ProjectCrudComponent
   },
   {
     path: "projects/create",
     component: ProjectCreateComponent
   },
   {
     path: "projects/update/:id",
     component: ProjectUpdateComponent
   },
   {
     path: "projects/delete/:id",
     component: ProjectDeleteComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
