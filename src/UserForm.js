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
    onSuccess:() =>{
        //we can also trigger the old data to be updated
        queryClient.invalidateQueries(['user',user.id]);

        setIsEditing(false)
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
  //we can also show the end user that data is being saved in our backend we can use isLoaing 
  //to showcase this functionality 
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
