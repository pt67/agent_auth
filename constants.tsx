
import React from 'react';
import { Tool, KnowledgeSource } from './types';
import { CalendarIcon, MailIcon, DatabaseIcon, DocumentTextIcon, LockClosedIcon, UserGroupIcon } from './components/Icons';

export const INITIAL_TOOLS: Tool[] = [
  {
    id: 'calendar',
    name: 'Read Calendar',
    description: 'Access and read events from your calendar.',
    icon: <CalendarIcon className="w-6 h-6 text-indigo-400" />,
    connected: false,
  },
  {
    id: 'email',
    name: 'Send Email',
    description: 'Draft and send emails on your behalf.',
    icon: <MailIcon className="w-6 h-6 text-sky-400" />,
    connected: false,
  },
  {
    id: 'database',
    name: 'Query Database',
    description: 'Run read-only queries against the sales DB.',
    icon: <DatabaseIcon className="w-6 h-6 text-emerald-400" />,
    connected: false,
  },
];

export const INITIAL_KNOWLEDGE_SOURCES: KnowledgeSource[] = [
  {
    id: 'public-docs',
    name: 'Public Documentation',
    description: 'General product and API documentation.',
    icon: <DocumentTextIcon className="w-6 h-6 text-gray-400" />,
    accessible: true, // Accessible by default
  },
  {
    id: 'internal-memos',
    name: 'Internal Memos',
    description: 'Confidential company strategy and updates.',
    icon: <UserGroupIcon className="w-6 h-6 text-amber-400" />,
    accessible: false,
  },
  {
    id: 'personal-files',
    name: 'Personal Files',
    description: 'Your private notes and documents.',
    icon: <LockClosedIcon className="w-6 h-6 text-rose-400" />,
    accessible: false,
  },
];
