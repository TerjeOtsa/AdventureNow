import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  randomizeActivity(time: number, intensity: number, city: string): Observable<any> {
    return this.http.post('/randomize', { time, intensity, city });
  }

  addActivity(activity: string, time: number, intensity: number, city: string): Observable<any> {
    return this.http.post('/add_activity', { activity, time, intensity, city });
  }

  removeActivity(activity: string, city: string): Observable<any> {
    return this.http.post('/remove_activity', { activity, city });
  }

  suggestActivities(query: string, city: string): Observable<any> {
    return this.http.get(`/suggest_activities?query=${query}&city=${city}`);
  }
}
