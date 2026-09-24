import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Post } from '../models/post.model';

// ده الشكل الكامل لملف الـ JSON: فيه array للـ posts وarray تاني للـ categories
interface PostsData {
  posts: Post[];
  categories: Category[];
}

@Injectable({
  providedIn: 'root'
})
export class Posts {
  // المسار بتاع ملف الـ JSON جوه src/assets
  private dataUrl = '/data/data.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<PostsData> {
    return this.http.get<PostsData>(this.dataUrl);
  }
}