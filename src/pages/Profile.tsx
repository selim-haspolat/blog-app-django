import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state: any) => state.auth);

  console.log(user);

  return (
    <div className="flex items-center flex-col gap-5 mt-10">
      <img
        className="w-40 h-40 rounded-full"
        src={
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        }
        alt={user.username}
      />
      <div className="text-5xl">
        {user.username}
      </div>
      <div >
        {user.email}
      </div>
    </div>
  );
};

export default Profile;
