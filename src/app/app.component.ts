import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Employee} from './model/employee';
import {EmployeeService} from './service/employee.service';
import {NgForm} from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employees: Employee[] = [];
  public employeeTemplate: Employee;
  public modalMode: string;

  // property to filter pipe
  public filterPost;

  constructor(private employeeService: EmployeeService) {
    this.employeeTemplate = this.cleanEmployee();
    this.modalMode = '';
    this.filterPost = '';
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
        this.showAlert({title: 'Error', text: error.message, icon: 'error'});
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
          this.showAlert({title: 'Success', text: 'Employee created', icon: 'success'});
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          this.showAlert({title: 'Error', text: error.message, icon: 'error'});
        }
      )
    }

    if (this.modalMode === 'edit') {
      this.employeeService.updateEmployee(this.employeeTemplate).subscribe(
        (response) => {
          this.showAlert({title: 'Success', text: 'Employee updated', icon: 'success'});
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          this.showAlert({title: 'Error', text: error.message, icon: 'error'});
        }
      )
    }
  }

  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response) => {
        this.showAlert({title: 'Success', text: 'Employee was deleted', icon: 'info'});
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        this.showAlert({title: 'Error', text: error.message, icon: 'error'});
      }
    )
  }

  public showAlert(messageObject: { title: string, text: string, icon: 'error' | 'success' | 'info' }) {
    Swal.fire({
      title: messageObject.title,
      text: messageObject.text,
      icon: messageObject.icon,
      showConfirmButton: false,
      timer: 1500
    });
  }
}
