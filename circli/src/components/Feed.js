import React, { useState, useEffect } from 'react';
import ButtonNewPost from './ButtonNewPost';
import DialogNewPost from './DialogNewPost';

const Feed = ({ user, getAllPosts: fetchAllPosts }) => {
  const [AllPosts, setAllPosts] = useState({}); 
  const [newPostOpen, setNewPostOpen] = useState(false);

  const handleNewPostOpen = () => {
    setNewPostOpen(true);
  };
  const handleNewPostClose = () => {
    setNewPostOpen(false);
  };

  useEffect(() => {
    const fetchAllPostsData = async () => {
      try {
        const postsList = await fetchAllPosts(user);
        setAllPosts(postsList || {}); 
      } catch (error) {
        console.error('Error fetching posts: ', error);
      }
    };
    if (user) {
      fetchAllPostsData();
    }
  }, [fetchAllPosts, user]);

  return (
    <div>
      <h1>Feed</h1>
      <ButtonNewPost onClick={handleNewPostOpen} />
      <DialogNewPost open={newPostOpen} onClose={handleNewPostClose} user={user} />

      {Object.entries(AllPosts).map(([userId, userPosts]) => (
        <div key={userId}>
          {Object.entries(userPosts).map(([postId, postData]) => (
            <div key={postId} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
              <p><strong>Nome:</strong> {postData.displayName}</p>
              <p><strong>Testo:</strong> {postData.textContent}</p>
              <p><strong>Hashtags:</strong> {postData.hashtagsContent}</p>
              <p><strong>Data:</strong> {new Date(postData.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Feed;