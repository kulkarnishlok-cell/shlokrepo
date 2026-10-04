import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types/household';
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  Terminal, 
  ChevronRight,
  ShieldCheck,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface ConversationalAgentProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onExecuteActionCard: (actionType: string) => void;
}

export const ConversationalAgent: React.FC<ConversationalAgentProps> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  onExecuteActionCard,
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const quickPrompts = [
    "Run pre-vacation risk check (10 days)",
    "Audit top financial anomalies",
    "Check consumable runout velocity",
    "Rebalance family cognitive load"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText;
    setInputText('');
    onSendMessage(query);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-lg bg-[#0F172A] border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-950/40 flex flex-col h-[620px] overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
      
      {/* Header */}
      <div className="px-4 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 text-cyan-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-white">Household OS Agent</h3>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Online
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Domestic Twin Natural Language Interface</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Sender Label */}
            <span className="text-[10px] font-mono text-slate-500 mb-1 px-1">
              {msg.sender === 'user' ? 'Alex Rivera (Presenter)' : 'HH-OS Kernel (Gemini 2.5)'} • {msg.timestamp}
            </span>

            {/* Bubble */}
            <div
              className={`p-3.5 rounded-2xl max-w-[90%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-tr-sm shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm shadow-md'
              }`}
            >
              {/* Tool Calling Visualization Badge */}
              {msg.toolCall && (
                <div className="mb-2.5 p-2 rounded-lg bg-slate-950/80 border border-cyan-500/30 font-mono text-[11px] text-cyan-300 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">
                    Tool Call: <span className="font-bold">{msg.toolCall.name}</span>
                  </span>
                  <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    {msg.toolCall.status}
                  </span>
                </div>
              )}

              {/* Message text with formatting */}
              <div className="whitespace-pre-line">{msg.content}</div>

              {/* Interactive Action Card */}
              {msg.actionCard && (
                <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{msg.actionCard.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-300">{msg.actionCard.description}</p>
                  
                  <div className="space-y-1">
                    {msg.actionCard.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onExecuteActionCard(msg.actionCard!.type)}
                    className="w-full mt-2 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5"
                  >
                    <span>{msg.actionCard.actionLabel}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSendMessage(prompt)}
            className="px-2.5 py-1 text-[11px] whitespace-nowrap rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Input bar */}
      <form onSubmit={handleSubmit} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask HH-OS: 'What needs attention before Friday?'"
          className="flex-1 bg-slate-950 text-slate-100 placeholder-slate-500 text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500 transition-all"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-cyan-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
