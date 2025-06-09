import { Link, Outlet, useNavigate, useRouteError } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import NotFoundPage from '../pages/NotFoundPage';

export default function NavBar() {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const error = useRouteError(); // 获取路由错误
    
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* Left side navigation */}
                        <div className="flex items-center space-x-6">
                            <Link to="/" className="text-xl font-bold text-gray-800 hover:text-gray-600">
                                Home
                            </Link>
                            <Link to="/articles" className="text-gray-600 hover:text-gray-900">
                                Articles
                            </Link>
                            <Link to="/lesson-plan" className="text-gray-600 hover:text-gray-900">
                                Lesson Plan
                            </Link>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center space-x-4">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-blue-700 font-medium">
                                        Logged in as {user.email}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        to="/login"
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        to="/create-account"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                    >
                                        Create Account
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <main className="container mx-auto px-4 py-8">
                {error ? <NotFoundPage /> : <Outlet />}
            </main>
        </div>
    );
}
