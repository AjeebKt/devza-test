import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient
  ) { }

  getTasksList(): Observable<any> {
    return this.http.get('/tasks/list');
  }
  createTask(data): Observable<any> {
    return this.http.post('/tasks/create', data);
  }
  updateTask(data): Observable<any> {
    return this.http.post('/tasks/update', data);
  }
  deleteTask(param): Observable<any> {
    return this.http.post('/tasks/delete', param);
  }
}
