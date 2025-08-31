import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // change to your backend URL when deployed

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Logged-in user
  const currentUserId = localStorage.getItem("userId");
  const currentUserName = localStorage.getItem("userName");

  // The user I'm chatting with
  const chatUser = localStorage.getItem("chatUser");
  const chatUserId = localStorage.getItem("chatUserId");

  // Generate unique roomId for this 1-1 chat
  const roomId =
    currentUserId < chatUserId
      ? `${currentUserId}_${chatUserId}`
      : `${chatUserId}_${currentUserId}`;

  useEffect(() => {
    // Join the private room
    socket.emit("join", roomId);

    // Listen for incoming messages
    socket.on("receiveMessage", (msgObj) => {
      setMessages((prev) => [...prev, msgObj]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [roomId]);

  // Send message
  const sendMessage = () => {
    if (message.trim()) {
      const msgObj = {
        roomId,
        message,
        senderId: currentUserId,
        senderName: currentUserName,
        createdAt: new Date().toISOString(),
      };
      socket.emit("sendMessage", msgObj);
      setMessage("");
    }
  };

  // Format timestamp
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Header */}
      <h2 className="text-xl font-bold text-green-700 mb-2">
        💬 Chatting with {chatUser}
      </h2>

      {/* Chat messages */}
      <div className="bg-gray-200 w-full max-w-2xl h-96 p-4 rounded-lg shadow-md overflow-y-auto mb-4 flex flex-col space-y-2">
        {messages.map((msg, idx) => {
          const isMe = String(msg.senderId) === String(currentUserId);
          return (
            <div
              key={idx}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              {/* Label above message */}
              <span className="text-xs text-gray-500 mb-1">
                {isMe ? "Me" : msg.senderName}
              </span>

              {/* Bubble */}
              <div
                className={`relative max-w-xs px-3 py-2 rounded-lg shadow text-sm ${
                  isMe
                    ? "bg-green-200 text-black rounded-br-none"
                    : "bg-white text-black rounded-bl-none"
                }`}
              >
                <p className="mb-4">{msg.message}</p>
                <span className="absolute bottom-1 right-2 text-[10px] text-gray-500">
                  {formatTime(msg.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex w-full max-w-2xl">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-l-lg"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
