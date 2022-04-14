import SearchPage from 'pages/SearchPage';
import ProfilePage from 'pages/ProfilePage';

export const routes = [
  { path: '/', component: <SearchPage />, exact: true },
  { path: '/profile', component: <ProfilePage /> },
];
