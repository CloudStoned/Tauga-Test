import ReactMarkdown from "react-markdown";

interface ChatBubbleProps {
  sender: "user" | "bot";
  text: string;
}

function formatBotText(text: string) {
  return text
    .replace(/:\s+/g, ":\n")
    .replace(/;\s+/g, ";\n");
}

export function ChatBubble({ sender, text }: ChatBubbleProps) {
  const isUser = sender === "user";
  const displayText = isUser ? text : formatBotText(text);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mr-2.5 mt-1 text-xs font-bold">
          CH
        </div>
      )}
      <div
        className={`
          max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed
          ${isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-card border border-border text-card-foreground rounded-bl-md"
          }
        `}
      >
        <div className="prose prose-sm max-w-none break-words [&_p]:my-1 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-0.5">
          <ReactMarkdown>{displayText}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
