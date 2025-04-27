import React, { useState, useEffect } from 'react';
import ButtonNewPost from './ButtonNewPost';
import DialogNewPost from './DialogNewPost';
import { AiFillHeart } from 'react-icons/ai';
import { getDatabase, ref, get, remove, push, set, serverTimestamp } from 'firebase/database';
import { Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'; 

const Feed = ({ user, getAllPosts: fetchAllPosts, addLike }) => {
  const [allPosts, setAllPosts] = useState({});
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleNewPostOpen = () => setNewPostOpen(true);
  const handleNewPostClose = () => setNewPostOpen(false);

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

  useEffect(() => {
    if (user) {
      fetchAllPostsData();
    }
  }, [fetchAllPosts, user]);

  const handleLike = async (userId, postId) => {
    const db = getDatabase();
    const likeRef = ref(db, `posts/${userId}/${postId}/likes/${user.uid}`);

    try {
      const likesSnapshot = await get(likeRef);
      const likeExists = likesSnapshot.exists();

      if (!likeExists) {
        addLike(userId, postId, user.uid);
        await fetchAllPostsData();
      } else {
        console.log('User already liked this post.');
      }
    } catch (error) {
      console.error('Error checking or adding like:', error);
    }
  };

  const handleUnlike = async (userId, postId) => {
    const db = getDatabase();
    const likeRef = ref(db, `posts/${userId}/${postId}/likes/${user.uid}`);

    try {
      await remove(likeRef);
      window.location.reload();
    } catch (error) {
      console.error('Error removing like:', error);
    }
  };
  const handleComment = (userId, postId, commentText) => {
    if (addComment) {
      const displayName = user.displayName;

      addComment(userId, postId, commentText, displayName);
      window.location.reload();
    }
  };

  const addComment = (userId, postId, commentText, displayName) => {
    const db = getDatabase();
    const commentsRef = ref(db, `posts/${userId}/${postId}/comments`);
    const newCommentRef = push(commentsRef);

    set(newCommentRef, {
      text: commentText,
      displayName: displayName,
      timestamp: serverTimestamp()
    });
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      <ButtonNewPost onClick={handleNewPostOpen} />
      <DialogNewPost open={newPostOpen} onClose={handleNewPostClose} user={user} />
      <Typography variant="h5" sx={{textAlign:"left", marginLeft:'5%', marginTop:'5%'}}>Feed</Typography>
      {Object.keys(allPosts).length === 0 ? (
        <p>No posts available</p>
      ) : (
        
        Object.entries(allPosts).map(([userId, userPosts]) => (
          <div key={userId} className="post">
            {Object.entries(userPosts)
              .sort((a, b) => b[1].createdAt - a[1].createdAt) //ordinamento decrescente
              .map(([postId, postData]) => (
                <div key={postId} className="post-card">
                  <div className="post-header">
                    <p><strong>{postData.displayName}</strong></p>
                    <p>{new Date(postData.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="post-body">
                    <p>{postData.textContent}</p>
                    <p className="post-hashtags">{postData.hashtagsContent}</p>
                  </div>
                  <div className="post-footer">
                    <button
                      className="like-button"
                      onClick={() => {
                        if (postData.likes && postData.likes[user.uid]) {
                          handleUnlike(userId, postId);
                        } else {
                          handleLike(userId, postId);
                        }
                      }}
                    >
                      {postData.likes && postData.likes[user.uid]
                        ? <FavoriteIcon />
                        : <FavoriteBorderIcon sx={{ color: "#74ebd5" }} />}
                      {postData.likes ? Object.keys(postData.likes).length : 0}
                    </button>
        
                    <div className="comments-section">
                      <textarea
                        placeholder="Add a comment..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleComment(userId, postId, e.target.value);
                            e.target.value = '';
                          }
                        }}
                      />
                      {postData.comments && Object.entries(postData.comments).map(([commentId, commentData]) => (
                        <div key={commentId} className="comment">
                          <p><strong>{commentData.displayName}:</strong> {commentData.text}</p>
                        </div>
                      ))}
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
