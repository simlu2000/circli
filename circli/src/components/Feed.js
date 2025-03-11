import React, { useState } from 'react'
import ButtonNewPost from './ButtonNewPost';
import DialogNewPost from './DialogNewPost';
function Feed({user}) {
  const [newPostOpen, setNewPostOpen] = useState(false);

  const handleNewPostOpen = () => {
    setNewPostOpen(true);
  }
  const handleNewPostClose = () => {
    setNewPostOpen(false);
  }

  return (
    <div>
      <h1>Feed</h1>
      <ButtonNewPost onClick={handleNewPostOpen} />
      <DialogNewPost open={newPostOpen} onClose={handleNewPostClose} user={user}/>
    </div>
  )
}

export default Feed;
