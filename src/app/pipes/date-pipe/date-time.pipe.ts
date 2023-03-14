import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {
  transform(value: string): string {
    const dateValue = new Date(value);

    const year = dateValue.getFullYear();
    const month =
      dateValue.getMonth() > 8
        ? `${dateValue.getMonth() + 1}`
        : `0${dateValue.getMonth() + 1}`;
    const day =
      dateValue.getDate() > 9
        ? `${dateValue.getDate()}`
        : `0${dateValue.getDate()}`;

    const hour =
      dateValue.getHours() > 9
        ? `${dateValue.getHours()}`
        : `0${dateValue.getHours()}`;
    const minute =
      dateValue.getMinutes() > 9
        ? `${dateValue.getMinutes()}`
        : `0${dateValue.getMinutes()}`;
    const second =
      dateValue.getSeconds() > 9
        ? `${dateValue.getSeconds()}`
        : `0${dateValue.getSeconds()}`;
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }
}
