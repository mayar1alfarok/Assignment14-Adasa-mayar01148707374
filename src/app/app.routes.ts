import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Articles } from './pages/articles/articles';
import { ArticleDetails } from './pages/article-details/article-details';
import { About } from './pages/about/about';


export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'عدسة — الرئيسية'
  },

  {
    path: 'articles',
    component: Articles,
    title: 'عدسة — المدونة'
  },
  {
  path:'articles/:id',
  component:ArticleDetails,
  title: 'عدسة — تفاصيل المقال'

  },

  {
    path: 'about',
    component: About,
    title: 'عدسة — من نحن'
  },

  {
    path: '**',
    redirectTo: ''
  }
  
];