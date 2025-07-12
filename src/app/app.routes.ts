import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './pages/admin/connexion/connexion.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CitiesListComponent } from './pages/cities/cities-list/cities-list.component';
import { MapComponent } from './pages/map/map.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsersComponent } from './pages/users/users.component';
import { DetailsCitiesComponent } from './pages/cities/details-cities/details-cities.component';
import { LoginComponent } from './pages/utilisateur/authentification/login/login.component';
import { InscriptionComponent } from './pages/utilisateur/authentification/inscription/inscription.component';
import { PasswordForgotComponent } from './pages/utilisateur/authentification/password-forgot/password-forgot.component';
import { OtpVerificationComponent } from './pages/utilisateur/authentification/otp-verification/otp-verification.component';
import { NewPasswordComponent } from './pages/utilisateur/authentification/new-password/new-password.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'website/accueil',
        pathMatch: 'full'
    },
    {
        path: '',
        title: 'Application',
        component: AppComponent
    },

    {
        path : "admin/connxxxion",
        title: "Connexion",
        component: ConnexionComponent
    },

    { path: 'bailleur', loadChildren: () => import('./pages/bailleur/bailleur.module').then(m => m.BailleurModule) },
    { path: 'user', loadChildren: () => import('./pages/utilisateur/utilisateur.module').then(m => m.UtilisateurModule) },
    { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
    { path: 'website', loadChildren: () => import('./pages/website/website.module').then(m => m.WebsiteModule)},

    // Routes d'authentification
    {
      path: '',
      children: [
          {
              path: 'login',
              title: 'Login',
              component: LoginComponent
          },
          {
              path: 'register',
              title: 'Register',
              component: InscriptionComponent
          },

          // Mot de passe oublié
          {
            path: 'forgot-password',
            title: 'Mot de passe oublié',
            component: PasswordForgotComponent
          },
          {
            path: 'otp',
            title: 'Vérification',
            component: OtpVerificationComponent
          },
          {
            path: 'new-password',
            title: 'Nouveau mot de passe',
            component: NewPasswordComponent
          },
      ]
    },

    // Routes de l'administrateur
     {
        path: '',
        children: [
            {
                path: 'dashboard',
                title: 'Tableau de bord',
                component: DashboardComponent
            },
            {
                path: 'cities',
                title: 'Cités',
                component: CitiesListComponent
            },
            {
                path: 'details-cites/:id',
                title: 'Details Cités',
                component: DetailsCitiesComponent
            },
            {
                path: 'map',
                title: 'Carte',
                component: MapComponent
            },
            {
                path: 'users',
                title: 'Utilisateurs',
                component: UsersComponent
            },
            {
                path: 'my-account',
                title: 'Mon compte',
                component: MyAccountComponent
            },
            {
                path: 'settings',
                title: 'Paramètres',
                component: SettingsComponent
            },
        ]
      }

];
