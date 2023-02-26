import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /*
  * transform method
  * value => is the object that will be applied the filter
  * args => is the input to the filter
  * */
  transform(value: any, arg: any): any {
    const result = [];
    for (const data of value) {
      if (data.name.toLowerCase().indexOf(arg.toLowerCase()) > -1
      || data.email.toLowerCase().indexOf(arg.toLowerCase()) > -1
      || data.jobTitle.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        result.push(data);
      }
    }
    return result;
  }

}
