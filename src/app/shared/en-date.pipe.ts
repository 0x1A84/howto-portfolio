import { Pipe, PipeTransform } from '@angular/core';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// '2026-11-25' → 'November 25, 2026'. KoDatePipe처럼 시간대에 따라 날짜가 바뀌지 않도록 문자열로 처리합니다.
@Pipe({ name: 'enDate' })
export class EnDatePipe implements PipeTransform {
  transform(iso: string): string {
    const [year, month, day] = iso.split('-').map(Number);
    return `${MONTHS[month - 1]} ${day}, ${year}`;
  }
}
