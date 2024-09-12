import { Component } from '@angular/core';
import { FormServiceService } from './service/form-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { emptyValidator } from 'src/app/validators/emptyValidator';
import { passwordValidator } from 'src/app/validators/passwordValidator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  syndics: any[] = [];
  buildings: any[] = [];
  signupFailed?: boolean;
  DEFAULT_DATA_FORM_VALUE = {
    fullName: '',
    phoneNumber: '',
    password: '',
    role: 'resident',
  };
  constructor(
            private fb: FormBuilder,
            private apiService: FormServiceService,
            private SignService: AuthService,
            private router: Router,
            ) {}

  ngOnInit() {

    this.initForm(this.DEFAULT_DATA_FORM_VALUE);
    
    // kan fetche les syndics fl first render dyal page
    this.apiService.getSyndics().subscribe(data => {
      this.syndics = data;
    });
  }

  initForm(data: any){
    let residentValidation: [any] = [''];
    let syndicValidation: [any] = [''];
    console.log("role",data.role);
    
    if(this.isResident(data.role)){
      residentValidation.push(Validators.required);
    }else{
      syndicValidation.push(Validators.required);
    }

    console.log("resident validation",residentValidation);
    console.log("syndic validation",syndicValidation);
    
    this.signUpForm = this.fb.group({
      fullName: [data.fullName, emptyValidator()],
      phoneNumber: [data.phoneNumber,  Validators.pattern('^[0-9]*$')],
      password: [data.password, [emptyValidator(), Validators.minLength(8), passwordValidator(), Validators.maxLength(200)]],
      role: [data.role, emptyValidator()], 
      selectedSyndic: [...residentValidation],
      selectedBuilding: [...residentValidation],
      bankName: [...syndicValidation],
      bankAccount: [...syndicValidation],
    });
    console.log("form",this.signUpForm);
    
  }
  isResident(role: string) {
    return role === 'resident';
  }
  isSyndic(role: string) {
    return role === 'syndic';
  }


  onRoleChanged(role: string){
    console.log("onchange role ",this.signUpForm.value.role);
    
    this.signUpForm.value.role = role;
    this.initForm(this.signUpForm.value);
    if(this.isSyndic(role)){
      this.signUpForm.value.selectedSyndic = '';
      this.signUpForm.value.selectedBuilding = '';
    }else {
      this.signUpForm.value.bankAccount = '';
      this.signUpForm.value.bankName = '';
    }
   
  }


  // Fetch buildings when a syndic is selected
  onSyndicChange(syndicId: any) {
    this.apiService.getBuildings(syndicId).subscribe(data => {
      this.buildings = data;
    });
  }

  // Handle form submission
  onSubmit() {
    console.log("submit"+this.signUpForm.valid);
    
    if (this.signUpForm.valid) {
      let formData = this.signUpForm.value;
      if (formData.role === 'syndic') {

        let newSyndic = {
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          bankAccount: formData.bankAccount,
          bankName: formData.bankName,
          password: formData.password,
        };
        this.SignService.Signup(newSyndic, formData.role).subscribe(
          response => {
            console.log('Syndic created successfully',response);
            localStorage.setItem('user', JSON.stringify(response));
            this.router.navigate(['syndic']);
          },
          error => {
            console.error('Error creating syndic:', error);
            this.signupFailed = true;
          }
        );
      }else if (formData.role === 'resident'){
          let newResident = {
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
            building: { idBuilding: formData.selectedBuilding }
          };
          this.SignService.Signup(newResident, formData.role).subscribe(
            response => {
              console.log('Resident created successfully',response);
              localStorage.setItem('user', JSON.stringify(response));
              this.router.navigate(['user']);
            },
            error => {
              console.error('Error creating resident:', error);
              this.signupFailed = true;
            }
          );
      }
    }
  }
}