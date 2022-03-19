import React from 'react'
import {useQuery} from 'react-query';
import * as api from './usersAPI';

const Users = ({setUserId}) => {
    //this is gonna be key in a cache to retreive it later on
    // and this key will differentiate this key from other queries 
    //in the app - it will be useful for future caching, invalidating data and stuff
    //2nd param will be async function to return data from backend 
    //we can see this query by key in query dev tools

    //we can get isLoading,isError,error and other attribute also out of useQuery func. 
    //these are the imp ones

    //when getting error query will try 3 more times before sending out an error
    //we can remove this feature in third param as in obj with attribute retry:false

    const {data,isLoading,isError,error} = useQuery('users',api.getUsers,
    // {
    //     retry:false
    // }
    );
  
    if(isLoading){
        return <h1>Loading Users....</h1>
    }

    if(isError){
        return <h1>Something Went Wrong!! {error.message}</h1>
    }
    return (
    <div>
        <ul>
            {data?.map(user => (
                <li key={user.id}>
                    {user.name}
                    <button onClick={()=>setUserId(user.id)}>View</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Users