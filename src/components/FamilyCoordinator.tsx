import React from 'react';
import { FamilyMember, DomesticTask } from '../types/household';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Shuffle, 
  ShieldAlert, 
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface FamilyCoordinatorProps {
  members: FamilyMember[];
  tasks: DomesticTask[];
  onCompleteTask: (taskId: string) => void;
  onRebalanceTasks: () => void;
}

export const FamilyCoordinator: React.FC<FamilyCoordinatorProps> = ({
  members,
  tasks,
  onCompleteTask,
  onRebalanceTasks,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            Multi-User Family Coordination Engine
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Cognitive Load Balancing
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic domestic ticket dispatch based on member availability, schedule bandwidth, and operational skill.
          </p>
        </div>

        <button
          onClick={onRebalanceTasks}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-500/40 transition-all shadow-sm"
        >
          <Shuffle className="w-3.5 h-3.5 text-cyan-400" />
          <span>Autonomous Load Rebalance</span>
        </button>
      </div>

      {/* Member Bandwidth & Cognitive Load Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {members.map((member) => {
          const isOverloaded = member.cognitiveLoadScore > 75;
          const assignedCount = tasks.filter(t => t.assignedToMemberId === member.id && t.status !== 'completed').length;

          return (
            <div
              key={member.id}
              className={`bg-[#0F172A] border rounded-2xl p-4 transition-all shadow-lg ${
                isOverloaded 
                  ? 'border-amber-500/40' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{member.name}</h3>
                    <p className="text-xs text-slate-400">{member.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {assignedCount} Active
                  </span>
                  <div className="text-[10px] text-slate-500 font-mono">Tasks</div>
                </div>
              </div>

              {/* Cognitive Load Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">Cognitive Load Index</span>
                  <span className={`font-bold ${isOverloaded ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {member.cognitiveLoadScore}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOverloaded ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${member.cognitiveLoadScore}%` }}
                  />
                </div>
              </div>

              {/* Bandwidth details */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800">
                <span>Bandwidth:</span>
                <span className="font-semibold text-slate-200">
                  {member.allocatedHoursThisWeek}h / {member.availableHoursPerWeek}h available
                </span>
              </div>

              {/* Skills Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {member.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dispatched Domestic Task Queue */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
            Domestic Execution Queue ({tasks.filter(t => t.status !== 'completed').length} Pending)
          </span>
          <span className="text-xs text-slate-500 font-mono">Autonomous Ticket Routing</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {tasks.map((task) => {
            const assignee = members.find(m => m.id === task.assignedToMemberId);
            const isCompleted = task.status === 'completed';

            return (
              <div
                key={task.id}
                className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                  isCompleted ? 'bg-slate-950/40 opacity-60' : 'hover:bg-slate-800/30'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => onCompleteTask(task.id)}
                    className={`mt-0.5 p-1 rounded-lg border transition-all ${
                      isCompleted 
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                        : 'border-slate-700 hover:border-emerald-500/40 text-slate-500 hover:text-emerald-400'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-bold ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                        {task.title}
                      </h4>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold border ${
                        task.priority === 'high' 
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {task.priority}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-0.5">{task.description}</p>

                    <div className="flex items-center gap-3 mt-2 text-[11px] font-mono text-slate-500">
                      <span>Due: {task.dueDate}</span>
                      <span>•</span>
                      <span>Category: {task.sourceCategory}</span>
                    </div>
                  </div>
                </div>

                {/* Assignee & Action */}
                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
                  {assignee && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-base">{assignee.avatar}</span>
                      <div className="text-left">
                        <div className="text-xs font-semibold text-slate-200">{assignee.name}</div>
                        <div className="text-[10px] text-slate-500">{assignee.role}</div>
                      </div>
                    </div>
                  )}

                  {!isCompleted && task.automatedActionLabel && (
                    <button
                      onClick={() => onCompleteTask(task.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/30 hover:border-emerald-400 transition-all font-mono"
                    >
                      {task.automatedActionLabel}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
