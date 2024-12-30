import { useState } from "react";
import useSendMessage from "../../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form className="md:px-8 px-4 my-3 md:pb-3 pb-1" onSubmit={handleSubmit}>
      <div className="w-full flex gap-3">
        <input
          type="text"
          className="border rounded-lg block w-full p-2.5"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center px-3 rounded-lg  bg-gray-700 border-gray-600 text-white"
        >
          {loading ? <div className='loading loading-spinner'></div> : "Send" }
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
