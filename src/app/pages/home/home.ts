import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Posts } from '../../services/posts';
import { Post, Category } from '../../models/post.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  posts = signal<Post[]>([]);
  categories = signal<Category[]>([]);
  loading = signal(true);

  constructor(private postsService: Posts) {}

  ngOnInit(): void {

    this.postsService.getData().subscribe((data) => {

      this.posts.set(data.posts);
      this.categories.set(data.categories);

      this.loading.set(false);

    });

  }


  get featuredPosts(): Post[] {

    return this.posts()
      .filter(post => post.featured)
      .slice(0, 3);

  }


  getCategoryCount(categoryName: string): number {

    return this.posts().filter(
      post => post.category === categoryName
    ).length;

  }


  getCategoryIcon(categoryName: string): string {

    const icons: { [key: string]: string } = {

      'إضاءة': '☀',

      'بورتريه': '●',

      'مناظر طبيعية': '⌁',

      'تقنيات': '✎',

      'معدات': '⚙'

    };

    return icons[categoryName] || '✦';

  }

}