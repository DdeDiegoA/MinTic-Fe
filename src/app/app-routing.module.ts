import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PublicComponent } from './components/public/public.component';
import { SignUpComponent} from './components/sign-up/sign-up.component'

// cuando la ruta está vacia ese es el componente que se va lanzar 
const routes: Routes = [
  
  {
    path:'',  // cuando la ruta está vacia puede responder a dos rutas
    component: PublicComponent, // una ruta a su vez puede tener hijos
    children:[
      {
        path:'',  //si esta vacia responde el login
        component: LoginComponent
      },
      {
        path:'singup',
        component: SignUpComponent
      },
      // sino para poner el componente de not-found
      {
        path: 'not-found',
        component: NotFoundComponent
      },
    ]
  },
  // cualquier path que no tenga correspondencia lo redireccione a not-found 
  {
    path:'**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
