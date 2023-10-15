import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

import Button from '~/components/Button';

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

  const handleClear = () => {
    setInput('');
    setMessages([]);
  };

  return (
    <section>
      <div className="py-8 w-full flex flex-col overflow-y-auto flex-grow mb-4 pb-8">
        <div className="flex flex-col space-y-4">
          {messages.map((message, i) =>
            message.role === 'user' ? (
              <div key={`message-${i}`} className="flex items-end justify-end">
                <div className="bg-gray-700 text-white rounded-2xl p-4 max-w-prose">
                  <p>{message.content}</p>
                </div>
              </div>
            ) : (
              <div key={`message-${i}`} className="flex items-end">
                <div className="markdown bg-gray-100 rounded-2xl p-4 max-w-prose">
                  <ReactMarkdown children={message.content} />
                </div>
              </div>
            )
          )}
        </div>
        <div ref={bottomRef} className="pb-40" />
      </div>
      <div className="bg-slate-900 fixed bottom-0 py-4 w-[calc(100%-60px)]">
        <form className="flex" onSubmit={handleSubmit}>
          {messages.length > 1 && <Button onClick={handleClear}>Clear</Button>}
          <input
            autoFocus
            type="text"
            // ref={inputRef}
            className="bg-gray-800 focus:outline-none focus:ring text-white w-full rounded-full px-6 py-2 mx-4"
            placeholder={
              isLoading
                ? '...'
                : 'What spooky story would you like to generate?'
            }
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          {isLoading ? (
            <Button onClick={stop}>Stop</Button>
          ) : (
            <Button type="submit">Send</Button>
          )}
        </form>
      </div>
    </section>
  );
}
