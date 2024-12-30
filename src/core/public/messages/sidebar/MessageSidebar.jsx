import React from "react";
import Conversations from "./Conversations";

const MessageSidebar = () => {
  return (
    <div className="sm:w-96 h-full border-r bg-[#EEEEEE] border-slate-500 p-4 flex flex-col">
      <h1 className="font-gilroyMedium md:text-3xl">Chats</h1>
      <div className="divider pb-3"></div>
      <Conversations />
    </div>
  );
};

export default MessageSidebar;
