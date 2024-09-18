import { Component } from '@angular/core';
import { FormServiceService } from './service/form-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { emptyValidator } from 'src/app/validators/emptyValidator';
import { passwordValidator } from 'src/app/validators/passwordValidator';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js'; 


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
  phoneExist?: boolean;

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

    let localStorageSyndic = localStorage.getItem('syndic');
    let localStorageResident = localStorage.getItem('resident');

    if( localStorageSyndic ) {
      this.router.navigate(['/syndic']);  
      return ;
    } else if(localStorageResident) {
      this.router.navigate(['/user']);  
      return ;
    }
    
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
    
    this.signUpForm = this.fb.group({
      fullName: [data.fullName, emptyValidator()],
      phoneNumber: [data.phoneNumber,  [emptyValidator() ,Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      password: [data.password, [emptyValidator(), Validators.minLength(8), passwordValidator(), Validators.maxLength(255)]],
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

  // kat fetchi buildings mli ka selectioner syndic
  onSyndicChange(syndicId: any) {
    this.apiService.getBuildings(syndicId).subscribe(data => {
      this.buildings = data;
    });
  }

  // Handle form submission
  onSubmit() {
    
    if (this.signUpForm.valid) {
      let formData = this.signUpForm.value;
      
      const encryptedPassword = CryptoJS.SHA256(formData.password).toString();

      this.SignService.checkPhoneNumberExists(formData.phoneNumber).subscribe(
        (exists) => {
          if (exists) {
            this.phoneExist = true;
          } else {
            // Proceed with registration
            if (formData.role === 'syndic') {
              let newSyndic = {
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber,
                password: encryptedPassword,
                bankName: formData.bankName,
                bankAccount: formData.bankAccount,
                role: formData.role
              };
              this.SignService.Signup(newSyndic, newSyndic.role).subscribe(response => {
                localStorage.setItem('syndic', JSON.stringify({
                  id: response.idSyndic,
                  role: response.role
                }));
                this.router.navigate(['/syndic']);
              }, error => {
                this.signupFailed = true;
              });
            } else if (formData.role === 'resident') {
              let newResident = {
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber,
                password: encryptedPassword,
                building: { idBuilding: formData.selectedBuilding },
                role: formData.role
              };
              this.SignService.Signup(newResident, newResident.role).subscribe(response => {
                localStorage.setItem('resident', JSON.stringify({
                  id: response.idResident,
                  role: response.role
                }));
                this.router.navigate(['/user']);
              }, error => {
                this.signupFailed = true;
              });
            }
          }
        },
        error => {
          console.error(error);
          this.signupFailed = true;
        }
      );
    }
      
  }
}
