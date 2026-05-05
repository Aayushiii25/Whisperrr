import { formatTime } from "../lib/utils";

export function MessageBubble({ message, currentUser }) {
  const isMe = message.sender?._id === currentUser?._id;

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-md px-4 py-2.5 rounded-2xl ${
          isMe
            ? "bg-linear-to-r from-amber-500 to-orange-500 text-primary-content"
            : "bg-base-300/40 text-base-content"
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <p
          className={`text-xs mt-1 ${isMe ? "text-primary-content/80" : "text-base-content/70"}`}
        >
          {formatTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
}
// MessageBubble = one single message inside chat
// Shows:
//  message text
// message time
//  if message is mine → show on right with orange style
//  if message is from other person → show on left with normal style
