import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountsService } from '../../services/accounts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Account } from '../../model/account.model';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css'],
  imports: [ReactiveFormsModule, RouterModule],
  standalone: true
})
export class UpdateAccountComponent implements OnInit {
  accountFormGroup!: FormGroup;
  accountId!: string;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.accountId = this.route.snapshot.params['id'];
    const account = history.state.account as Account;

    this.accountFormGroup = this.fb.group({
      type: this.fb.control(account.type),
      balance: this.fb.control(account.balance),
      customerId: this.fb.control(account.customerDTO.id),
      status: this.fb.control(account.status),
      overDraft: this.fb.control(account.overDraft),
      interestRate: this.fb.control(account.interestRate)
    });
  }

  handleUpdateAccount() {
    const formData = this.accountFormGroup.value;
    const accountData = {
      ...formData,
      customerDTO: {
        id: formData.customerId
      }
    };
    delete accountData.customerId;

    if (accountData.type === 'CURRENT_ACCOUNT') {
      this.accountService.updateCurrentAccount(this.accountId, accountData).subscribe({
        next: () => {
          alert('Current Account updated successfully');
          this.router.navigateByUrl('/accounts');
        },
        error: (err: Error) => {
          console.error(err);
          alert('Error updating current account');
        }
      });
    } else {
      this.accountService.updateSavingAccount(this.accountId, accountData).subscribe({
        next: () => {
          alert('Saving Account updated successfully');
          this.router.navigateByUrl('/accounts');
        },
        error: (err: Error) => {
          console.error(err);
          alert('Error updating saving account');
        }
      });
    }
  }
}
