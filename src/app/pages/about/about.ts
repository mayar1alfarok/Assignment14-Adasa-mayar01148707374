import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Blog } from '../../services/blog';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {

  authors: any[] = [];

  constructor(private blog: Blog) {}

  ngOnInit(): void {

    this.blog.getData().subscribe((data) => {

      const authorsMap = new Map();

      data.posts.forEach((post: any) => {

        const author = post.author;

        if (!authorsMap.has(author.name)) {
          authorsMap.set(author.name, author);
        }

      });

      this.authors = Array.from(authorsMap.values());
      console.log('AUTHORS:', this.authors);
console.log('AUTHORS COUNT:', this.authors.length);

      console.log('Number of authors:', this.authors.length);
    });

  }
}