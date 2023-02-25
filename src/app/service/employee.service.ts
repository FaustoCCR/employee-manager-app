import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/employee';

// Base URL
const apiServerUrl = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${apiServerUrl}/employee/all`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${apiServerUrl}/employee/add`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${apiServerUrl}/employee/update`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${apiServerUrl}/employee/delete/${employeeId}`);
  }
}
