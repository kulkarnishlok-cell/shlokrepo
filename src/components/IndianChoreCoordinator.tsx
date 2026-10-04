import React, { useState } from 'react';
import { IndianChoreTask, IndianFamilyMember } from '../types/household';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  AlertCircle, 
  Plus, 
  Flame, 
  Home, 
  Droplet, 
  Tv, 
  ShoppingBag,
  Sparkles,
  X
} from 'lucide-react';

interface IndianChoreCoordinatorProps {
  chores: IndianChoreTask[];
  members: IndianFamilyMember[];
  onCompleteChore: (choreId: string) => void;
  onAddChore?: (newChore: IndianChoreTask) => void;
}

export const IndianChoreCoordinator: React.FC<IndianChoreCoordinatorProps> = ({
  chores,
  members,
  onCompleteChore,
  onAddChore,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newAssignee, setNewAssignee] = useState(members[0]?.id || 'mem_papa');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const getCategoryIcon = (category: IndianChoreTask['category']) => {
    switch (category) {
      case 'Kitchen & Ration': return <Flame className="w-4 h-4 text-amber-400" />;
      case 'Civic & Tax': return <Home className="w-4 h-4 text-cyan-400" />;
      case 'Asset Maintenance': return <Droplet className="w-4 h-4 text-blue-400" />;
      case 'Staff Management': return <Users className="w-4 h-4 text-emerald-400" />;
      case 'Utility Payment': return <Tv className="w-4 h-4 text-purple-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleCreateChore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const task: IndianChoreTask = {
      id: `tsk_${Date.now()}`,
      title: newTitle,
      description: newDesc || 'Domestic household routine task.',
      category: 'Kitchen & Ration',
      assignedToMemberId: newAssignee,
      dueDate: '2026-10-10',
      priority: newPriority,
      status: 'Pending',
      whatsappReminderText: `Please complete domestic chore: ${newTitle}`
    };

    if (onAddChore) onAddChore(task);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const filteredChores = chores.filter(c => {
    if (activeFilter === 'Pending') return c.status !== 'Completed';
    if (activeFilter === 'Completed') return c.status === 'Completed';
    if (activeFilter !== 'All') return c.assignedToMemberId === activeFilter;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            Indian Household Chore & Family Coordinator
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Cultural Domestic Routines
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Delegates LPG cylinder bookings, Gharpatti tax payments, maid salaries, DTH recharges, and sabzi market runs.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all font-mono shadow-md shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Assign New Family Chore</span>
        </button>
      </div>

      {/* Family Member Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {members.map((member) => {
          const activeTasks = chores.filter(c => c.assignedToMemberId === member.id && c.status !== 'Completed').length;

          return (
            <div
              key={member.id}
              onClick={() => setActiveFilter(activeFilter === member.id ? 'All' : member.id)}
              className={`bg-[#0F172A] border rounded-2xl p-4 transition-all cursor-pointer shadow-lg space-y-2.5 ${
                activeFilter === member.id 
                  ? 'border-emerald-500/80 bg-emerald-500/5' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-1.5 rounded-xl bg-slate-800/80 border border-slate-700">{member.avatar}</span>
                  <div>
                    <h3 className="text-xs font-bold text-white">{member.name}</h3>
                    <p className="text-[10px] text-emerald-400 font-semibold">{member.relationshipRole}</p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30">
                  {activeTasks} Active
                </span>
              </div>

              <div className="text-[10px] text-slate-400 font-mono line-clamp-1">
                Roles: {member.responsibilities.slice(0, 2).join(', ')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chores Queue List */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Domestic Task Execution Queue
            </span>
            <span className="text-xs text-slate-500 font-mono">
              ({chores.filter(c => c.status !== 'Completed').length} Pending)
            </span>
          </div>

          <div className="flex items-center gap-1">
            {['All', 'Pending', 'Completed'].map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-2.5 py-1 text-[11px] rounded-lg transition-all ${
                  activeFilter === f 
                    ? 'bg-slate-800 text-emerald-400 font-semibold border border-slate-700' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-800/80">
          {filteredChores.map((chore) => {
            const assignee = members.find(m => m.id === chore.assignedToMemberId);
            const isCompleted = chore.status === 'Completed';

            return (
              <div
                key={chore.id}
                className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                  isCompleted ? 'bg-slate-950/40 opacity-55' : 'hover:bg-slate-800/30'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => onCompleteChore(chore.id)}
                    className={`mt-0.5 p-1 rounded-lg border transition-all ${
                      isCompleted 
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                        : 'border-slate-700 hover:border-emerald-500/40 text-slate-500 hover:text-emerald-400'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className={`text-sm font-bold ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                        {chore.title}
                      </h4>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold border ${
                        chore.priority === 'High' 
                          ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' 
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {chore.priority} Priority
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        • Due: {chore.dueDate}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                      {chore.description}
                    </p>
                  </div>
                </div>

                {/* Right side: Assignee & WhatsApp Ping */}
                <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                  {assignee && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-base">{assignee.avatar}</span>
                      <div className="text-left">
                        <div className="text-xs font-semibold text-slate-200">{assignee.name}</div>
                        <div className="text-[10px] text-emerald-400 font-mono">{assignee.relationshipRole}</div>
                      </div>
                    </div>
                  )}

                  {!isCompleted && assignee && (
                    <a
                      href={`https://wa.me/${assignee.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(chore.whatsappReminderText || `Namaste, please complete: ${chore.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/30 transition-all font-mono text-xs flex items-center gap-1"
                      title="Send WhatsApp Ping Reminder"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">WhatsApp Ping</span>
                    </a>
                  )}

                  {!isCompleted && (
                    <button
                      onClick={() => onCompleteChore(chore.id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                    >
                      Mark Done
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Chore Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-[#0F172A] border border-emerald-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Assign Indian Household Task</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateChore} className="space-y-3">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">TASK TITLE</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Pay Gharpatti Tax, Call Ramesh Mistri"
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">DETAILS</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Notes, deadline, or portal link"
                  rows={2}
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">ASSIGN TO</label>
                  <select
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    {members.map(m => (
                      <option key={m.id} value={m.id}>{m.name} ({m.relationshipRole})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">PRIORITY</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all font-mono"
                >
                  Dispatch Chore
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
