import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export function useUser(options = {}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    const loggedIn = getCookie('cloakwp-logged-in', options);
    setIsLoggedIn(loggedIn)
  }, [])
  
  return {
    isLoggedIn,
    // in future add other WP user data here if a WordPress admin user is logged in
  }
}