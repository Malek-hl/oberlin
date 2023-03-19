import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userType'
})
export class UserTypePipe implements PipeTransform {

  transform(objs: any, term: any): any {
   
      return (objs || []).filter((obj)=> {
      return (obj.role == term);
      })
  }

}
