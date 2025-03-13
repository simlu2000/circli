import React, { useState } from 'react'
import ButtonNewPost from './ButtonNewPost';
import DialogNewPost from './DialogNewPost';
const Feed = ({user, getAllPosts: fetchAllPosts }) => {
  const [AllPosts, setAllPosts]=useState();
  const [newPostOpen, setNewPostOpen] = useState(false);

  const handleNewPostOpen = () => {
    setNewPostOpen(true);
  }
  const handleNewPostClose = () => {
    setNewPostOpen(false);
  }

  useEffect(() => {
    const fetchAllPosts = async () => {
      try{
        const postsList = await fetchAllPosts(user);
        setAllPosts(postsList);
      }catch(error) {
        console.error("Error fetching posts: ",error);
      }
    };
    if(user){
      fetchAllPosts();
    }
  },[fetchAllPosts]);

  return (
    <div>
      <h1>Feed</h1>
      <ButtonNewPost onClick={handleNewPostOpen} />
      <DialogNewPost open={newPostOpen} onClose={handleNewPostClose} user={user}/>
    </div>
  )
}

export default Feed;
