import { getDatabase, ref, get } from 'firebase/database';
import { db } from '../firebaseConfig'; 

export const fetchAllPosts = async (user) => {
  try {
    const postsRef = ref(db, 'posts');
    const snapshot = await get(postsRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return {};
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {};
  }
};