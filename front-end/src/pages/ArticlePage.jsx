import { useLoaderData, useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export default function ArticlePage() {
    const { user } = useUser();
    const { articleId } = useParams();
    const articleData = useLoaderData();
    
    // Handle case when article data is not available
    if (!articleData) {
        return (
            <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-gray-800">Article Not Found</h2>
                <p className="mt-2 text-gray-600">The article you're looking for doesn't exist or you don't have permission to view it.</p>
            </div>
        );
    }

    const { upvotes = 0, comments = [] } = articleData;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{articleData.title}</h1>
            <div className="prose max-w-none">
                {articleData.content}
            </div>
            
            {/* Upvote section */}
            <div className="mt-8">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={async () => {
                        // Your upvote logic here
                    }}
                >
                    👍 Upvote ({upvotes})
                </button>
            </div>

            {/* Comments section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Comments</h2>
                {comments.map((comment, index) => (
                    <div key={index} className="border-b py-4">
                        <p className="text-gray-600">{comment.content}</p>
                        <p className="text-sm text-gray-400">By {comment.author}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export async function loader({ params }) {
  const response = await axios.get('/api/articles/' + params.name);
  const { upvotes, comments } = response.data;
  return { upvotes, comments };
}