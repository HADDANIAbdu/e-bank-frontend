import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {Account, AccountDetails} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http : HttpClient) { }

  public getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(environment.backendHost+"/accounts");
  }

  public getAccount(accountId : string, page : number, size : number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backendHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }
  public debit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.backendHost+"/accounts/debit",data);
  }
  public credit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.backendHost+"/accounts/credit",data);
  }
  public transfer(accountSource: string,accountDestination: string, amount : number, description:string){
    let data={accountSource, accountDestination, amount, description }
    return this.http.post(environment.backendHost+"/accounts/transfer",data);
  }

  public saveCurrentAccount(data: any) {
    return this.http.post(environment.backendHost + "/accounts/save/current-account", data);
  }

  public saveSavingAccount(data: any) {
    return this.http.post(environment.backendHost + "/accounts/save/saving-account", data);
  }

  public updateCurrentAccount(id: string, data: any) {
    return this.http.put(environment.backendHost + `/accounts/update/current-account/${id}`, data);
  }

  public updateSavingAccount(id: string, data: any) {
    return this.http.put(environment.backendHost + `/accounts/update/saving-account/${id}`, data);
  }

  public deleteAccount(id: string) {
    return this.http.delete(environment.backendHost + `/accounts/delete/${id}`);
  }
}