import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import axios from 'axios';
import articles from '../article-content.js';

export default function ArticlePage() {
    const { user } = useUser();
    const { articleId } = useParams();
    const initialArticleData = useLoaderData();
    
    // State for dynamic data
    const [articleData, setArticleData] = useState(initialArticleData);
    const { upvotes = 0, comments = [] } = articleData;
    
    // Handle case when article data is not available
    if (!articleData) {
        return (
            <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-gray-800">Article Not Found</h2>
                <p className="mt-2 text-gray-600">The article you're looking for doesn't exist or you don't have permission to view it.</p>
            </div>
        );
    }

    // Handle upvoting
    const handleUpvote = async () => {
        if (!user) {
            alert('You must be logged in to upvote articles');
            return;
        }

        try {
            const token = await user.getIdToken();
            const response = await axios.post(`/api/articles/${articleId}/upvote`, null, {
                headers: { authtoken: token }
            });
            setArticleData(prevData => ({
                ...prevData,
                upvotes: response.data.upvotes
            }));
        } catch (error) {
            console.error('Error upvoting article:', error);
            if (error.response?.status === 403) {
                alert('You have already upvoted this article');
            } else {
                alert('Error upvoting article. Please try again later.');
            }
        }
    };

    // Handle adding comments
    const handleAddComment = async (commentText) => {
        if (!user) return;

        try {
            const token = await user.getIdToken();
            const response = await axios.post(`/api/articles/${articleId}/comments`, {
                postedBy: user.email || 'Anonymous',
                text: commentText
            }, {
                headers: { authtoken: token }
            });
            
            setArticleData(prevData => ({
                ...prevData,
                comments: response.data.comments
            }));
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Failed to add comment. Please try again.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{articleData.title}</h1>
            <div className="prose max-w-none">
                {Array.isArray(articleData.content) ? 
                    articleData.content.map((paragraph, i) => (
                        <p key={i} className="mb-4">{paragraph}</p>
                    )) : 
                    articleData.content
                }
            </div>
            
            {/* Upvote section */}
            <div className="mt-8">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    onClick={handleUpvote}
                    disabled={!user}
                >
                    👍 Upvote ({upvotes})
                </button>
                {!user && (
                    <p className="text-sm text-gray-500 mt-2">You must be logged in to upvote articles</p>
                )}
            </div>

            {/* Comments section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Comments</h2>
                
                {/* Add comment form */}
                {user ? (
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Add a Comment</h3>
                        <textarea 
                            className="w-full border rounded p-2 mb-2"
                            rows="3"
                            placeholder="Write your comment here..."
                            id="commentText"
                        ></textarea>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => {
                                const commentText = document.getElementById('commentText').value;
                                if (commentText.trim()) {
                                    handleAddComment(commentText);
                                    document.getElementById('commentText').value = '';
                                }
                            }}
                        >
                            Post Comment
                        </button>
                    </div>
                ) : (
                    <p className="italic text-gray-500 mb-4">Please log in to add a comment</p>
                )}
                
                {/* Comments list */}
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="border-b py-4">
                            <p className="text-gray-600">{comment.text}</p>
                            <p className="text-sm text-gray-400">By {comment.postedBy}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
}

export async function loader({ params }) {
  try {
    // Get static article content
    const articleContent = articles.find(article => article.name === params.articleId);
    
    if (!articleContent) {
      return null;
    }
    
    // Get dynamic data (upvotes, comments)
    const response = await axios.get(`/api/articles/${params.articleId}`);
    
    // If the article exists in MongoDB, merge the data
    if (response.data) {
      const { upvotes, comments } = response.data;
      return {
        ...articleContent,
        upvotes,
        comments
      };
    } 
    // If article doesn't exist in MongoDB yet, return just the content
    else {
      return {
        ...articleContent,
        upvotes: 0,
        comments: []
      };
    }
  } catch (error) {
    console.error('Error loading article:', error);
    // Return static content if API request fails
    const articleContent = articles.find(article => article.name === params.articleId);
    return articleContent ? { ...articleContent, upvotes: 0, comments: [] } : null;
  }
}