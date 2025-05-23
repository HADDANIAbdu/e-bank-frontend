import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Customer } from "../../model/customer.model";
import { CustomerService } from "../../services/customer.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class CreateCustomerComponent implements OnInit {
  newCustomerFormGroup! : FormGroup;
  constructor(private fb : FormBuilder, private customerService:CustomerService, private router:Router) { }

  ngOnInit(): void {
    this.newCustomerFormGroup=this.fb.group({
      name : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      email : this.fb.control(null,[Validators.required, Validators.email])
    });
  }

  handleSaveCustomer() {
    let customer:Customer=this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next : data =>{
        alert("Customer has been successfully saved!");
        //this.newCustomerFormGroup.reset();
        this.router.navigateByUrl("/customers");
      },
      error : err => {
        console.log(err);
      }
    });
  }
}
