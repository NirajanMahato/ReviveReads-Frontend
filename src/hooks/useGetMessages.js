import { useEffect, useState } from "react";
import useConversation from "../zustand/useConverstaion";
import axios from "axios";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios(`http://localhost:5000/messages/${selectedConversation._id}`,{headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        }});
        const data = await res.data;
        if(data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if(selectedConversation?._id) getMessages();

    
  }, [selectedConversation?._id,setMessages]);

  return {messages, loading}
};

export default useGetMessages;
