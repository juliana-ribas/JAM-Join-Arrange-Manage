import { useEffect, useRef, useState } from "react";
import { closeChat } from "../../reduxFiles/slices/chat";
import { RootState, useAppDispatch } from "../../reduxFiles/store";
import { useAuth } from "../../utils/useAuth";
import "./chatContainer.css";
import { useSelector } from "react-redux";
import {
  socket,
  useAddMsgMutation,
  useGetEventQuery,
  useGetMsgsQuery,
} from "../../services/ThesisDB";
import moment from "moment";
import { MsgState, addMessage, setMessages } from "../../reduxFiles/slices/msg";
import { ColorRing } from "react-loader-spinner";
import Msg from "./Msg";

function ChatContainer() {
  const [addNewMsg] = useAddMsgMutation();
  const { eventId } = useSelector((state: RootState) => state.chatReducer);
  const messages = useSelector((state: RootState) => state.msgListReducer);
  const dispatch = useAppDispatch();
  useAuth();
  const [message, setMessage] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);
  const userId = localStorage.getItem("token");

  // useEffect(() => {
  //   console.log("Chat contaiiner comp ==> ", eventId)
  // }, [eventId])
  const { data: dataevent } = useGetEventQuery(eventId as string);
  // console.log(dataevent?.data.title, 'this is event')
  const {
    data: _data,
    isSuccess,
    refetch,
    isLoading,
  } = useGetMsgsQuery(eventId as string);
  const data = _data?.data;
  const handleMessageSubmit = async (message: string) => {
    try {
      // await addNewMsg({ userId: userId || "", eventId, message });
      socket.emit("newMessage", { userId, eventId, message });

      if (isSuccess) {
        refetch();
      }

      setMessage("");

      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    socket.on("newMessage", (res: any) => {
      dispatch(addMessage(res.data));
    });
  }, [socket]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleMessageSubmit(message);
    }
  };

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(setMessages(data));
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    }
  }, [data, isLoading]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-title">{dataevent?.data.title}</div>
        <div className="close" onClick={() => dispatch(closeChat())}>
          ×
        </div>
      </div>
      <div className="chat-messages">
        {isLoading ? (
          <ColorRing
            visible={true}
            height="100%"
            width="100%"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : (
          isSuccess && <Msg messages={messages} userId={userId} />
        )}
      </div>
      <div className="input-container">
        <input
          className="bg-gray-400 w-5/6 py-4 px-3 rounded-xl xl-2 pr-2"
          type="text"
          placeholder="Type your message here..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          name="message"
          autoComplete="off" // Disable autocomplete
          autoCorrect="off" // Disable autocorrect
          autoCapitalize="off" // Disable autocapitalize
          spellCheck="false" // Disable spellcheck
        />
      </div>
    </div>
  );
}

export default ChatContainer;
