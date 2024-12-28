import React from "react";
import MessageContainer from "./MessageContainer";
import MessageSidebar from "./sidebar/MessageSidebar";

const MessagePage = () => {
  return (
    <div className="w-full h-screen flex justify-between overflow-hidden">
      <MessageSidebar />
      <MessageContainer />
    </div>
  );
};

export default MessagePage;
