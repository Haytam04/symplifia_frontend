import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuildingService } from '../building.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Building } from 'src/app/models/Building';
import { emptyValidator } from 'src/app/validators/emptyValidator';
import { minCostValidator } from 'src/app/validators/minCostValidator';

@Component({
  selector: 'app-building-form',
  templateUrl: './building-form.component.html',
  styleUrls: ['./building-form.component.css']
})
export class BuildingFormComponent {
  buildingForm!: FormGroup;
  idSyndic: string;

  constructor(
    private fb: FormBuilder,
    private buildingService: BuildingService,
    private dialogRef: MatDialogRef<BuildingFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data : { building: Building, isUpdate: boolean, idSyndic: string }
  ) {
    this.idSyndic = data.idSyndic;
  }

  ngOnInit(): void {

    this.buildingForm = this.fb.group({
      name: [this.data.building?.name || '', [ Validators.maxLength(30), emptyValidator() ]],
      syndicPrice: [this.data.building?.syndicPrice || '', [ Validators.pattern('^[0-9]*$'), minCostValidator(50)]],
      location: [this.data.building?.location || '', [ Validators.maxLength(30), emptyValidator() ]]
    });
  }

  onSubmit(): void {
    if (this.buildingForm.valid) {
      const formValues = this.buildingForm.value;
      if (this.data.isUpdate) {
        this.buildingService.updateBuilding(this.data.idSyndic, this.data.building.idBuilding, formValues)
          .subscribe({
            next: () => {
            this.dialogRef.close(true),
            this.showSnackbar('Building updated successfully');
            },
            error: (err) => console.error('Error updating building:', err)
          });
      } else {
        this.buildingService.addBuildings(this.data.idSyndic, formValues)
          .subscribe({
            next: () => { 
            this.dialogRef.close(true),
            this.showSnackbar('Building created successfully');
            },
            error: (err) => console.error('Error creating building:', err)
          });
      }
    }
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2500, 
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

}
