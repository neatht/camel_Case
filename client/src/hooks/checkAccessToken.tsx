/* Custom hook to check if the logged-in user has a valid access token by getting it from Auth0 then accessing private API route (that requires auth) on the server.
 * Response from the server will be successful (HTTP status code 200) if access token is valid, otherwise UNAUTHORIZED (HTTP status code 401).
 */

import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function useCheckAccessToken() {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch('/auth/check', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log(response);
        return 'Success';
      } catch (e) {
        console.log(e.message);
        return 'Fail';
      }
    };

    checkAuth();
  }, []);
}
