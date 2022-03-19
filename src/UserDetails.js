import React from "react";
import { useQuery } from "react-query";
import * as api from "./usersAPI";

const UserDetails = ({ userId }) => {
  /*
    We're gonna set key as something which will uniquely identify this key in queries so 
    here we'll try to use array here (allowed in query) ['user',userId] - so the user and userId 
    will be identified
    */
  /*
   On first loading of app it starts to access the undefined user and it retries 3 times more.
   there is one way to prevent that in extra options in thrid param of useQuery {enabled: Boolean(userId)} but
   make sure the userId is not 0 which will go to false and it will not access the api backend
   */

   /*
   use Defaults we have default activity of query in which each inactive query will be garbage collected 
   after five mins and when this inactive query is being called by user after 5 mins it will just display
   the last data which was cache collected and in background it will check for updated data if updated then
   it will update this data and display

   it also checks for updated data once the browser tab is moved back into focus, network is reconnected
   */

   //isFetcing is boolean value which says if the data is checked for updates by backgound refetching
  const { data: user, isLoading,isFetching } = useQuery(
    ["user", userId],
    () => api.getUser(userId),
    {
      enabled: Boolean(userId),
    }
  );

  if (!userId) return "select a User !";

  if (isLoading) return "Loading User Details";
  return (
    <div>
        {isFetching && 'Background Refetcing.....'}
      <h2>{user.name}</h2>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
    </div>
  );
};

export default UserDetails;
