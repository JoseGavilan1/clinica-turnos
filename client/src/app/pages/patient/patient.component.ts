import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service'; // <-- 1. Importar el servicio

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {
  // 2. Inyectar el servicio
  private appointmentService = inject(AppointmentService);

  appointmentForm = new FormGroup({
    patientName: new FormControl('', Validators.required),
    rut: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.appointmentForm.valid) {
      // 3. Enviar los datos al backend
      this.appointmentService.createAppointment(this.appointmentForm.value).subscribe({
        next: (response) => {
          alert('¡Turno solicitado con éxito!');
          this.appointmentForm.reset();
        },
        error: (err) => {
          console.error('Error al guardar el turno', err);
          alert('Hubo un error al guardar el turno. Revisa la consola.');
        }
      });
    }
  }
}
