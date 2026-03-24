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
  private appointmentService = inject(AppointmentService);

  // ngOnInit se ejecuta automáticamente cuando se abre esta pantalla
  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        console.log('Turnos cargados:', this.appointments);
      },
      error: (err) => console.error('Error al cargar los turnos:', err)
    });
  }

  // No olvides agregar 'updateAppointmentStatus' a lo que ya tienes
markAsCompleted(id: string) {
  this.appointmentService.updateAppointmentStatus(id, 'Completado').subscribe({
    next: () => {
      // Si el backend nos da el OK, volveím a cargar la lista para ver los cambios
      this.loadAppointments();
    },
    error: (err) => console.error('Error al actualizar el estado:', err)
  });
}
}
