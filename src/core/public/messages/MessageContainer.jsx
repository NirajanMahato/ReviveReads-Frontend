import { useContext, useEffect } from "react";
import { TiMessages } from "react-icons/ti";
import { UserContext } from "../../../context/UserContext";
import useConversation from "../../../zustand/useConverstaion";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="sm:w-full w-full flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="border-b-2 mx-4 py-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="chat-image avatar">
                <div className="w-9 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={`/api/product_images/${selectedConversation.avatar}`}
                  />
                </div>
              </div>
              <span className="text-gray-900 font-bold">
                {selectedConversation.name}
              </span>
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { userInfo } = useContext(UserContext);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 Mr. {userInfo?.name} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
