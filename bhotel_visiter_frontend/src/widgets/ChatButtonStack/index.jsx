import { useContext, useEffect, useRef } from "react";
import ChatContext from "./../../app/context";
import "./main.css";

const ChatButtonStack = (props) => {
  const chatContext = useContext(ChatContext);
  const { socket } = props;

  const buttonsRef = useRef()

  const onClick = (e) => {
    if (socket === undefined || socket === null) return;

    socket.current.emit("chat message", {
      owner: "USER",
      message: e.target.value,
    });
  };

  useEffect(() => {
    chatContext.setButtonsHeight(buttonsRef.current.clientHeight);
  }, [chatContext])

  return (
    <div className="chat__button-stack" ref={buttonsRef}>
      {Array.isArray(chatContext.chat.chat.buttons) &&
        chatContext.chat.chat.buttons.length > 0 &&
        chatContext.chat.chat.buttons.map((button, index) => (
          <button
            value={button.command}
            onClick={onClick}
            className="chat__button"
            key={index}
          >
            {button.title}
          </button>
        ))}
    </div>
  );
};

export default ChatButtonStack;
