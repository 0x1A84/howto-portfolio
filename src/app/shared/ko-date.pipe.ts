import { Pipe, PipeTransform } from '@angular/core';

// '2026-11-25' → '2026년 11월 25일'. 서버와 브라우저의 시간대에 따라 날짜가 바뀌지 않도록 문자열로 처리합니다.
@Pipe({ name: 'koDate' })
export class KoDatePipe implements PipeTransform {
  transform(iso: string): string {
    const [year, month, day] = iso.split('-').map(Number);
    return `${year}년 ${month}월 ${day}일`;
  }
}
