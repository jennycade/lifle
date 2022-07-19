import { getResponse } from './getResponse';

async function getUserId() {
  /*
  looks in localStorage for user id
  not found? register and save to localStorage
  */

  let userId = localStorage.getItem('userId');

  if (!userId) {
    userId = await getResponse('users/', 'POST');
    if (userId.errorMessage) {
      console.log(userId.errorMessage);
    } else {
      localStorage.setItem('userId', userId);
    }
  }

  return userId;
}

export default getUserId;