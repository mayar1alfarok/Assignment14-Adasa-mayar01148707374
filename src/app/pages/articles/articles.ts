import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Blog } from '../../services/blog';

@Component({
  selector: 'app-articles',
  imports: [RouterLink],
  templateUrl: './articles.html',
  styleUrl: './articles.css',
})
export class Articles implements OnInit {

  posts: any[] = [];
  filteredPosts: any[] = [];

  searchTerm = '';
  selectedCategory = 'جميع المقالات';

  viewMode = 'grid';

  currentPage = 1;
  postsPerPage = 6;

  categories = [
    'جميع المقالات',
    'إضاءة',
    'بورتريه',
    'مناظر طبيعية',
    'تقنيات',
    'معدات'
  ];

  constructor(
    private blog: Blog,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.blog.getData().subscribe((data) => {

      this.posts = data.posts;
      this.filteredPosts = this.posts;

      this.route.queryParams.subscribe((params) => {

        const category = params['category'];

        if (category) {
          this.filterByCategory(category);
        }

      });

      this.cdr.detectChanges();

    });

  }

  filterByCategory(category: string): void {

    this.selectedCategory = category;
    this.currentPage = 1;

    if (category === 'جميع المقالات') {

      this.filteredPosts = this.posts;

    } else {

      this.filteredPosts = this.posts.filter(
        post => post.category === category
      );

    }

  }

  onSearch(event: Event): void {

    const value = (event.target as HTMLInputElement).value;

    this.searchTerm = value;
    this.currentPage = 1;

    this.filteredPosts = this.posts.filter(post =>
      post.title.toLowerCase().includes(value.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(value.toLowerCase()) ||
      post.category.toLowerCase().includes(value.toLowerCase())
    );

  }

  get totalPages(): number {

    return Math.ceil(
      this.filteredPosts.length / this.postsPerPage
    );

  }

  get displayedPosts(): any[] {

    const start = (this.currentPage - 1) * this.postsPerPage;
    const end = start + this.postsPerPage;

    return this.filteredPosts.slice(start, end);

  }

  goToPage(page: number): void {

    this.currentPage = page;

  }

}