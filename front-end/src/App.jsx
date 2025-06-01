import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage, { loader as articleLoader } from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import LessonPlanGenerator from './pages/LessonPlanGenerator';
import NavBar from './components/NavBar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'articles', element: <ArticlesListPage /> },
      { path: 'articles/:articleId', element: <ArticlePage />, loader: articleLoader},
      { path: 'login', element: <LoginPage /> },
      { path: 'create-account', element: <CreateAccountPage /> },
      { path: 'lesson-plan', element: <LessonPlanGenerator /> },
    ],
  },
]);

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App