import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const {
    messages,
    setMessages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
  } = useChat({
    api: '/api/spookify',
  });

  // This is a ref to the bottom of the chat history. We use it to scroll
  // to the bottom when a new message is added.
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-white md:rounded-lg md:shadow-md p-6 w-full h-screen flex flex-col">
      <section className="overflow-y-auto flex-grow mb-4 pb-8">
        <div className="flex flex-col space-y-4">
          {messages.map(message =>
            message.role === 'user' ? (
              <div className="flex items-end justify-end">
                <div className="bg-gray-300 border-gray-100 border-2 rounded-lg p-2 max-w-lg">
                  <p>{message.content}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-end">
                <div className="markdown bg-gray-100 border-gray-300 border-2 rounded-lg p-2 mr-20 w-full">
                  <ReactMarkdown children={message.content} />
                </div>
              </div>
            )
          )}
        </div>
        <div ref={bottomRef} />
      </section>
      <div className="flex items-center justify-center h-20">
        {isLoading && (
          <button
            className="bg-gray-100 text-gray-900 py-2 px-4 my-8"
            onClick={stop}
          >
            Stop generating
          </button>
        )}
      </div>
      <section className="bg-gray-100 rounded-lg p-2">
        <form className="flex" onSubmit={handleSubmit}>
          {messages.length > 1 && (
            <button
              className="bg-gray-100 text-gray-600 py-2 px-4 rounded-l-lg"
              type="button"
              onClick={e => {
                e.preventDefault();
                setInput('');
                setMessages([]);
              }}
            >
              Clear
            </button>
          )}
          <input
            autoFocus
            type="text"
            // ref={inputRef}
            className="w-full rounded-l-lg p-2 outline-none"
            placeholder={isLoading ? '...' : 'Type your message...'}
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          {!isLoading && (
            <button
              className="bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
              type="submit"
            >
              Send
            </button>
          )}
        </form>
      </section>
    </main>
  );
}
