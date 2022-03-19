import React, { useState } from "react";
//useMutation is responsible for any changing or updating any of your data whereas in useQuery you 
//can query or get the details from an endpoint

import { useMutation,useQueryClient } from "react-query";
import * as api from './usersAPI';

const UserForm = ({ user,setIsEditing }) => {
  const [fields, setFields] = useState({ ...user });

  //for trigger the old data to be updated,we need tg import this queryClient
  const queryClient = useQueryClient();
//useMutation doesn't run immediately like a query does. it will trigger when we want it to

  //but on change the data won't got updated in the fetching data so we need 
  //to recall the fetch to update the data. we need to add extra obj in thrid param of useMutation
  const {isLoading,mutate} = useMutation(api.updateUser,{
    //this success is executed when the query is executed fully and res is returned in data
    //so we can also update setQueryData here and this data is successfully returned by resp of the request
    onSuccess:(data) =>{
        //we need to place this line of setQuerydata here in place of this in onMutate
        queryClient.setQueryData(['user',user.id],data)

        //we can also trigger the old data to be updated
        //after placing the setQueryData on Success we dont need to invalidate it anymore so commenting it
        // queryClient.invalidateQueries(['user',user.id]);
        
        
        //we're gonna move this method in onMutate func
        // setIsEditing(false);

        //using this since the main operation are done here
        //since we're no longer iun editing mode so we don't need editing window so need to place it here 
        setIsEditing(false);
    }
    //but this is not probably best thing to do.that's the easy way to get around it
    //another thing you can do is known as optimistic updates which means you can update the data 
    //right away for the user so even if the internet speed is slow it comes off ike it is updated right away
    ,onMutate:(updatedUser) => {
      //this updatedUser obj is basically what you pass to mutate in handleSubmit so it shows enduser 
      //the thing they saved is saved instantly
      
      //commenting this and placing this line in onSuccess
      // queryClient.setQueryData(['user',user.id],upodatedUser)
      // this is added here to wait for loading to be done and show user updated data is this here
      
      //we don't need to use this in onMutate after all operations are done in onSuccess so commenting it
      // setIsEditing(false);

      //so we can see the changes by commenting the loading scenario condition3

      //we cannot assume totally that the data got updated and some error encountered 
      //so we can revert the data to what it was originally
    }
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fields);
    //we will trigger mutate here - 1st arg will be passed and it will be passed down to your api calls
    //in our case we're passing down user obj with updated fields
    mutate(fields);
  };
  //we can also show the end user that data is being saved in our backend we can use isLoading 
  //to showcase this functionality 
  //so we can see the changes by commenting the loading scenario condition for onMutate condition
  if(isLoading) return 'Saving your changes...'
  
  
  return (
    <div style={{ paddingTop: 20 }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:{" "}
          <input
            id='name'
            type="text"
            name="name"
            value={fields.name}
            onChange={handleChange}
            style={{
                width:'100%',
                marginBottom:20
            }}
          />
        </label>

        <label htmlFor="phone">
          Phone:{" "}
          <input
            id='phone'
            type="text"
            name="phone"
            value={fields.phone}
            onChange={handleChange}
            style={{
                width:'100%',
                marginBottom:20
            }}
          />
        </label>

        <label htmlFor="email">
          Email:{" "}
          <input
            id='email'
            type="text"
            name="email"
            value={fields.email}
            onChange={handleChange}
            style={{
                width:'100%',
                marginBottom:20
            }}
          />
        </label>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default UserForm;
