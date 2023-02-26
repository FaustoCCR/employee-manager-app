import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Employee} from './model/employee';
import {EmployeeService} from './service/employee.service';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employees: Employee[] = [];
  public employeeTemplate: Employee;
  public modalMode: string;

  constructor(private employeeService: EmployeeService) {
    this.employeeTemplate = this.cleanEmployee();
    this.modalMode = '';
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  public cleanEmployee(): any {
    return {
      id: null,
      name: '',
      email: '',
      phone: '',
      jobTitle: '',
      imageUrl: ''
    };
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(mode: string, employee?: Employee): void {
    this.modalMode = mode;
    this.employeeTemplate = this.cleanEmployee();
    const container = document.getElementById('main_container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    switch (mode) {
      case 'add':
        button.setAttribute('data-target', '#employeeModal');
        break;
      case 'edit':
        this.employeeTemplate = {...employee!};
        button.setAttribute('data-target', '#employeeModal');
        break;
      case 'delete':
        this.employeeTemplate = {...employee!};
        button.setAttribute('data-target', '#deleteEmployeeModal');
        break;
    }
    container!.appendChild(button);
    button.click();
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('employee-form')!.click();
    if (this.modalMode === 'add') {
      this.employeeService.addEmployee(addForm.value).subscribe(
        (response) => {
          console.log(response);
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }

    if (this.modalMode === 'edit') {
      this.employeeService.updateEmployee(this.employeeTemplate).subscribe(
        (response) => {
          console.log(response);
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }
  }

  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
