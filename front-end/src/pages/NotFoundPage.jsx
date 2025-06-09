import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-gray-600 mb-8">
        Page Not Found. The page you are looking for does not exist or has been moved.
      </p>
      <Link 
        to="/"
        className="bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}