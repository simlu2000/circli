import React, { useState, useEffect } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import UserField from './UserField';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getDatabase, ref, get, remove, push, set, serverTimestamp } from 'firebase/database';
import { AiFillHeart } from 'react-icons/ai';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #f9f9f9;
  width: 100%; 
  min-height: 100vh;
  box-sizing: border-box; 
`;

const ProfileHeader = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
  width: 100%; 
`;

const ProfileInfo = styled.div`
  width: 90%;
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const LogoutButton = styled(LogoutIcon)`
  margin-top: 30px;
  cursor: pointer;
  color: #d32f2f;
  font-size: 2.5rem;

  &:hover {
    color: #b71c1c;
  }
`;

const PostsContainer = styled.div`
  width: 90%;
  margin-top: 20px;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PostCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const PostBody = styled.div`
  margin-bottom: 15px;
`;

const PostFooter = styled.div`
  display: flex;
  flex-direction: column;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${(props) => (props.liked ? 'blue' : 'red')};
`;

const CommentSection = styled.div`
  margin-top: 10px;
`;

const Comment = styled.div`
  margin-bottom: 5px;
`;

function Profile({ user, getAllPosts, addLike }) {
  const auth = getAuth();
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPostsData = async () => {
      setLoading(true);
      try {
        const postsList = await getAllPosts(user);
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
  }, [getAllPosts, user]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/Home');
      })
      .catch((error) => {
        console.error('Error during logout', error);
      });
  };

  const handleLikeClick = async (userId, postId) => {
    const db = getDatabase();
    const likeRef = ref(db, `posts/${userId}/${postId}/likes/${user.uid}`);

    try {
      const likesSnapshot = await get(likeRef);
      const likeExists = likesSnapshot.exists();

      if (!likeExists) {
        addLike(userId, postId, user.uid);
        window.location.reload();
      } else {
        await remove(likeRef);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error checking or adding like:', error);
    }
  };

  const handleComment = (userId, postId, commentText) => {
    const db = getDatabase();
    const commentsRef = ref(db, `posts/${userId}/${postId}/comments`);
    const newCommentRef = push(commentsRef);

    set(newCommentRef, {
      text: commentText,
      displayName: user.displayName,
      timestamp: serverTimestamp(),
    });

    window.location.reload();
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <>
      {user ? (
        <ProfileContainer id="profile">
          <ProfileHeader>{user.displayName || user.email}</ProfileHeader>
          <ProfileInfo>
            <UserField textValue={user.displayName} labelText="Name" className="user-info" />
            <UserField textValue={user.email} labelText="E-mail" className="user-info" />
          </ProfileInfo>
          <PostsContainer>
            <h2>Your Posts</h2>
            <PostList>
              {Object.entries(allPosts).map(([userId, userPosts]) =>
                Object.entries(userPosts).map(([postId, postData]) => (
                  <PostCard key={postId}>
                    <PostHeader>
                      <p>
                        <strong>{postData.displayName}</strong>
                      </p>
                      <p>{new Date(postData.createdAt).toLocaleString()}</p>
                    </PostHeader>
                    <PostBody>
                      <p>{postData.textContent}</p>
                      <p className="post-hashtags">{postData.hashtagsContent}</p>
                    </PostBody>
                    <PostFooter>
                      <LikeButton
                        liked={postData.likes && postData.likes[user.uid]}
                        onClick={() => handleLikeClick(userId, postId)}
                      >
                        <AiFillHeart />
                        {postData.likes && postData.likes[user.uid] ? 'Unlike' : 'Like'}(
                        {postData.likes ? Object.keys(postData.likes).length : 0})
                      </LikeButton>
                      <CommentSection>
                        {postData.comments &&
                          Object.entries(postData.comments).map(([commentId, commentData]) => (
                            <Comment key={commentId}>
                              <strong>{commentData.displayName}:</strong> {commentData.text}
                            </Comment>
                          ))}
                        <textarea
                          placeholder="Add a comment..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleComment(userId, postId, e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                      </CommentSection>
                    </PostFooter>
                  </PostCard>
                ))
              )}
            </PostList>
          </PostsContainer>
          <LogoutButton onClick={handleLogout} />
        </ProfileContainer>
      ) : (
        <h1>No user logged</h1>
      )}
    </>
  );
}

export default Profile;