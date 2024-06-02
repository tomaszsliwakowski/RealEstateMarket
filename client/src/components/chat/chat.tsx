import "./chat.scss";
import { ChatType } from "../../utils/loaders";
import useChats from "./chatHelper";
import { format } from "timeago.js";

type PROPS = {
  chats: ChatType[];
};

export default function Chat({ chats }: PROPS) {
  const { chat, currentUser, handleOpenChat, closeChat, handleSubmit } =
    useChats();

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats.map((el) => (
          <div
            className="message"
            key={el.id}
            style={{
              backgroundColor:
                currentUser && el.seenBy.includes(currentUser?.id)
                  ? "white"
                  : "",
            }}
            onClick={() => handleOpenChat(el.id, el.receiver)}
          >
            <img src={el.receiver?.avatar || "./noavatar.jpg"} alt="avatar" />
            <span>{el.receiver?.username}</span>
            <p>{el.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.receiver?.avatar || "./noavatar.jpg"}
                alt="avatar"
              />
              {chat.receiver?.username}
            </div>
            <span className="close" onClick={() => closeChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className="chatMessage"
                key={message.id}
                style={{
                  alignSelf:
                    message.userId === currentUser?.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser?.id ? "right" : "left",
                }}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
          </div>
          <form className="bottom" onSubmit={handleSubmit}>
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}
