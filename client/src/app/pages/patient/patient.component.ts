import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service'; // <-- 1. Importar el servicio
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {
  isLoading = false;
  private appointmentService = inject(AppointmentService);

  appointmentForm = new FormGroup({
    patientName: new FormControl('', Validators.required),
    rut: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.isLoading = true;
      this.appointmentService.createAppointment(this.appointmentForm.value).subscribe({
        next: () => {
          alert('¡Turno solicitado con éxito!');
          this.appointmentForm.reset();
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false; 
        }
      });
    }
  }
}
