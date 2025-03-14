import React, { useState, useEffect } from 'react';
import ButtonNewPost from './ButtonNewPost';
import DialogNewPost from './DialogNewPost';

const Feed = ({ user, getAllPosts: fetchAllPosts, addLike, addComment }) => {
  const [allPosts, setAllPosts] = useState({});
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleNewPostOpen = () => setNewPostOpen(true);
  const handleNewPostClose = () => setNewPostOpen(false);

  useEffect(() => {
    const fetchAllPostsData = async () => {
      setLoading(true);
      try {
        const postsList = await fetchAllPosts(user);
        console.log('Fetched posts:', postsList);
        setAllPosts(postsList || {});
      } catch (error) {
        console.error('Error fetching posts: ', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAllPostsData();
    }
  }, [fetchAllPosts, user]);

  const handleLike = (userId, postId) => {
    if (addLike) {
      addLike(userId, postId, user.uid);
    }
  };

  const handleComment = (userId, postId, commentText) => {
    if (addComment) {
      addComment(userId, postId, user.uid, commentText);
    }
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      <h1>Feed</h1>
      <ButtonNewPost onClick={handleNewPostOpen} />
      <DialogNewPost open={newPostOpen} onClose={handleNewPostClose} user={user} />

      {Object.keys(allPosts).length === 0 ? (
        <p>No posts available</p>
      ) : (
        Object.entries(allPosts).map(([userId, userPosts]) => (
          <div key={userId} className="post">
            {Object.entries(userPosts).map(([postId, postData]) => (
              <div key={postId} style={{ border: '1px solid #ccc', borderRadius: '25px', marginBottom: '50px' }}>
                <p><strong>Nome:</strong> {postData.displayName}</p>
                <p><strong>Testo:</strong> {postData.textContent}</p>
                <p><strong>Hashtags:</strong> {postData.hashtagsContent}</p>
                <p><strong>Data:</strong> {new Date(postData.createdAt).toLocaleString()}</p>

                <div>
                  <button onClick={() => handleLike(userId, postId)}>
                    Like ({postData.likes ? Object.keys(postData.likes).length : 0})
                  </button>

                  <div>
                    {postData.comments && Object.entries(postData.comments).map(([commentId, commentData]) => (
                      <p key={commentId}>
                        <strong>{commentData.displayName}:</strong> {commentData.text}
                      </p>
                    ))}
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleComment(userId, postId, e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
