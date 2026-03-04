export interface Contact {
  id: string;
  type: string;
  title: string;
  description: string;
  url: string;
  icon: string;
}

export const userProfile = {
  name: 'LUCAS',
  title: 'Senior Software Engineer',
  subtitle: 'BUILDING FOR THE FUTURE',
  avatar: '/public/avatar.png',
};

export const userContacts: Contact[] = [
  {
    id: 'email',
    type: 'Email',
    title: 'Email',
    description: 'user@example.com',
    url: 'mailto:user@example.com',
    icon: '✉️',
  },
  {
    id: 'github',
    type: 'GitHub',
    title: 'GitHub',
    description: '@userdev',
    url: 'https://github.com/userdev',
    icon: '🐙',
  },
  {
    id: 'linkedin',
    type: 'LinkedIn',
    title: 'LinkedIn',
    description: 'Connect professionally',
    url: 'https://linkedin.com/in/userdev',
    icon: '💼',
  },
  {
    id: 'whatsapp',
    type: 'WhatsApp',
    title: 'WhatsApp',
    description: '+1 (555) 012-3456',
    url: 'https://wa.me/15550123456',
    icon: '💬',
  },
];
