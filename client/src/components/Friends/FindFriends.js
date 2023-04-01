import React, {useState} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_FRIEND } from "../../utils/mutations";
import { QUERY_USER, QUERY_USER_LIST } from "../../utils/queries";

const FindFriends = ({findFriends}) => {

    const [addFriend, { error }] = useMutation(ADD_FRIEND,{
      update(cache, { data: { addFriend } }) {
        try {
          cache.writeQuery({
            query: QUERY_USER_LIST,
            data: { user: addFriend },
          });
        } catch (e) {
          console.error(e);
        }
      },
    });
  
    const handleAdd = async (friendName) => {
      try {
        const { data } = await addFriend({
          variables: { friendName: friendName },
        });
      } catch (err) {
        console.error(err);
      }
    };
    const {loading, data}= useQuery(QUERY_USER_LIST);
    const user = data?.me || data?.user || {}; 
    console.log(user)
console.log(findFriends.username)
console.log(QUERY_USER)
console.log(QUERY_USER_LIST)

    return(
         <div >
            {findFriends &&
              findFriends.map((find, index) => (
                <div  key={index} className="col-12 col-xl-6">
                  <ul className="menu bg-base-100 w-56 rounded-box">
                    <li> <a href="add link to profile page">{find.username}</a></li>
                  </ul>
                  <div className="btn-group">
                    <button onClick={()=>handleAdd(find.username)} className="btn">Add Friend</button>
                  </div>
                </div>
              ))}
          </div>  
    )
}

export default FindFriends