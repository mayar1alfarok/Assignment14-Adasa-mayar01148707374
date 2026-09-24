import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Blog } from '../../services/blog';

@Component({
  selector: 'app-article-details',
  imports:[RouterLink],
  templateUrl: './article-details.html',
  styleUrl: './article-details.css',
})
export class ArticleDetails implements OnInit {

  post: any;
  relatedPosts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private blog: Blog,
    private cdr: ChangeDetectorRef
  ) {}

 ngOnInit(): void {

  this.route.paramMap.subscribe((params) => {

    const id = params.get('id');

    this.blog.getData().subscribe((data) => {

      this.post = data.posts.find(
        (post: any) => String(post.id) === id
      );

      this.relatedPosts = data.posts
        .filter((post: any) =>
          post.category === this.post.category &&
          String(post.id) !== id
        )
        .slice(0, 3);

      this.cdr.detectChanges();

    });

  });

}
}