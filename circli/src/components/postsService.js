import { ref, get } from 'firebase/database';
import { db } from '../firebaseConfig';

export const fetchAllPosts = async (user) => {
  const postsRef = ref(db, 'posts');
  const snapshot = await get(postsRef);

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log('No posts found');
    return null;
  }
};
