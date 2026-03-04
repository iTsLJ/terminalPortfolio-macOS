export interface Contact {
  id: string;
  type: string;
  title: string;
  description: string;
  url: string;
  icon: string;
}

export const userProfile = {
  name: 'CAIO RESENDE',
  title: 'Junior Cloud Architect | Software Engineer Student',
  avatar: '/avatar.png',
};

export const userContacts: Contact[] = [
  {
    id: 'email',
    type: 'Email',
    title: 'Email',
    description: 'caiosouzamresende@gmail.com',
    url: 'mailto:caiosouzamresende@gmail.com',
    icon: '✉️',
  },
  {
    id: 'github',
    type: 'GitHub',
    title: 'GitHub',
    description: '@CaioSResende',
    url: 'https://github.com/CaioSResende',
    icon: '🐙',
  },
  {
    id: 'linkedin',
    type: 'LinkedIn',
    title: 'LinkedIn',
    description: 'Connect professionally',
    url: 'https://linkedin.com/in/caiosouzaderesende',
    icon: '💼',
  },
  {
    id: 'credly',
    type: 'Credly',
    title: 'Credly',
    description: 'View my certifications',
    url: 'https://www.credly.com/users/caiosresende',
    icon: '📜',
  },
  {
    id: 'whatsapp',
    type: 'WhatsApp',
    title: 'WhatsApp',
    description: '+55 (31) 99752-9293',
    url: 'https://wa.me/5531997529293',
    icon: '💬',
  },
];
