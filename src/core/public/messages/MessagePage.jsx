import React from "react";
import MessageContainer from "./MessageContainer";
import MessageSidebar from "./sidebar/MessageSidebar";
import BottomNavBar from "../../../components/BottomNavBar";

const MessagePage = () => {
  return (
    <div className="w-full h-screen flex justify-between overflow-hidden">
      <MessageSidebar />
      <MessageContainer />
      <BottomNavBar/>
    </div>
  );
};

export default MessagePage;
