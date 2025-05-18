import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountsService } from '../../services/accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class CreateAccountComponent implements OnInit {
  accountFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      type: this.fb.control('CURRENT_ACCOUNT'),
      balance: this.fb.control(0),
      customerId: this.fb.control(''),
      status: this.fb.control('ACTIVATED'),
      overDraft: this.fb.control(0),
      interestRate: this.fb.control(0)
    });
  }

  handleCreateAccount() {
    const formData = this.accountFormGroup.value;
    const accountData = {
      ...formData,
      customerDTO: {
        id: formData.customerId
      }
    };
    delete accountData.customerId; // Remove the old customerId field
    
    if (accountData.type === 'CURRENT_ACCOUNT') {
      this.accountService.saveCurrentAccount(accountData).subscribe({
        next: () => {
          alert('Current Account created successfully');
          this.router.navigateByUrl('/accounts');
        },
        error: (err) => {
          console.error(err);
          alert('Error creating current account');
        }
      });
    } else {
      this.accountService.saveSavingAccount(accountData).subscribe({
        next: () => {
          alert('Saving Account created successfully');
          this.router.navigateByUrl('/accounts');
        },
        error: (err) => {
          console.error(err);
          alert('Error creating saving account');
        }
      });
    }
  }
}
