import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  // La URL de tu backend local
  private apiUrl = 'https://clinica-turnos-chi.vercel.app/api/appointments';

  constructor(private http: HttpClient) { }

  // Función para guardar un turno nuevo
  createAppointment(appointmentData: any): Observable<any> {
    return this.http.post(this.apiUrl, appointmentData);
  }

  // Función para obtener todos los turnos (la usaremos luego en el Panel Médico)
  getAppointments(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateAppointmentStatus(id: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { status });
  }
}
