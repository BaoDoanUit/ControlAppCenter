import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCompact'
})
export class DateCompactPipe implements PipeTransform {
  transform(value: string): string {
    return value.split('T')[0];
  }
}
