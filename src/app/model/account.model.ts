import { Customer } from "./customer.model";

export interface AccountDetails {
    accountId:            string;
    balance:              number;
    currentPage:          number;
    totalPages:           number;
    pageSize:             number;
    accountOperationDTOS: AccountOperation[];
  }
  
  export interface AccountOperation {
    id:            number;
    operationDate: Date;
    amount:        number;
    type:          string;
    description:   string;
  }

  export interface Account {
    id:            string;
    type:          string;
    balance:       number;
    interestRate:  number;
    overDraft:     number;
    status:        string;
    createdAt:     string;
    customerDTO:      Customer;
  }