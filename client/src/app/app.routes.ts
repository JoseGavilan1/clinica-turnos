import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PatientComponent } from './pages/patient/patient.component';
import { DoctorComponent } from './pages/doctor/doctor.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'paciente', component: PatientComponent },
  { path: 'medico', component: DoctorComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
