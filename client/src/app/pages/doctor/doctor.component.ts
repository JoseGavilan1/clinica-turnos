
import { Component, inject, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit {
  appointments: any[] = [];
  isLoading = true;
  private appointmentService = inject(AppointmentService);

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.isLoading = true;
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.isLoading = false;
        console.log('Turnos cargados:', this.appointments);
      },
      error: (err) => {
        console.error('Error al cargar los turnos:', err);
        this.isLoading = false;
      }
    });
  }

markAsCompleted(id: string) {
  this.appointmentService.updateAppointmentStatus(id, 'Completado').subscribe({
    next: () => {
      this.loadAppointments();
    },
    error: (err) => console.error('Error al actualizar el estado:', err)
  });
}
}
