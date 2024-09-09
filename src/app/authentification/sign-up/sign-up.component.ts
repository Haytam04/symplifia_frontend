import { Component } from '@angular/core';
import { FormServiceService } from './service/form-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  syndics: any[] = [];
  buildings: any[] = [];

  constructor(private fb: FormBuilder, private apiService: FormServiceService) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['resident', Validators.required],  // Default to 'resident'
      selectedSyndic: ['', Validators.required],
      selectedBuilding: ['', Validators.required],
      bankName: [''],
      bankAccount: ['']
    });

    // Fetch syndics when the form is loaded (for resident selection)
    this.apiService.getSyndics().subscribe(data => {
      this.syndics = data;
    });
  }

  // Fetch buildings when a syndic is selected
  onSyndicChange(syndicId: any) {
    this.apiService.getBuildings(syndicId).subscribe(data => {
      this.buildings = data;
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      console.log(formData);
      // Submit form data to your API
    }
  }

}
