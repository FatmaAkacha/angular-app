import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class DataService {
private email$ = new BehaviorSubject<string | null>(null);
user$ = this.email$.asObservable();


login(email: string) {
this.email$.next(email.toLowerCase());
}


logout() {
this.email$.next(null);
}


get currentEmail() {
return this.email$.value;
}
}