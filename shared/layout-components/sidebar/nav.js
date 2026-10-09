export const MENUITEMS = [
    {
        menutitle: 'GERAL',
        roles: ['ADMIN'],
    },
    {
        title: 'Dashboard',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="side-menu__icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z" />
            </svg>
        ),
        type: 'link',
        selected: false,
        path: '/admin/dashboard',
        roles: ['ADMIN'],
    },
    {
        menutitle: 'GERENCIAMENTO',
        roles: ['ADMIN', 'EDITOR'],
    },
    {
        title: 'Financeiro',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="side-menu__icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path d="M20 7h-4V4c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H4c-1.103 0-2 .897-2 2v9a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9c0-1.103-.897-2-2-2zM4 11h4v8H4v-8zm6-1V4h4v15h-4v-9zm10 9h-4V9h4v10z" />
            </svg>
        ),
        type: 'link',
        selected: false,
        path: '/admin/finance/',
        roles: ['ADMIN'],
    },
    {
        title: 'Pagamentos',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="side-menu__icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Zm2 0v2h14V5H5Zm0 4v10h14V9H5Zm3 3h8v2H8v-2Z" />
            </svg>
        ),
        type: 'link',
        selected: false,
        path: '/admin/pagamentos',
        roles: ['ADMIN', 'EDITOR'],
    },
    {
        title: 'Cobrança',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="side-menu__icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M19 2H7a2 2 0 0 0-2 2v16l3-1 3 1 3-1 3 1 3-1 3 1V4a2 2 0 0 0-2-2ZM9 7h8v2H9V7Zm0 4h8v2H9v-2Zm0 4h6v2H9v-2Z" />
            </svg>
        ),
        type: 'link',
        selected: false,
        path: '/admin/invoice',
        roles: ['ADMIN', 'EDITOR'],
    },
    {
        title: 'Futuros',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="side-menu__icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 16H5V9h14v11Z" />
            </svg>
        ),
        type: 'link',
        selected: false,
        path: '/admin/futures',
        roles: ['ADMIN', 'EDITOR'],
    },

    {
        title: 'Inadimplentes',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="side-menu__icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20Zm0 4a1 1 0 0 1 .993.883L13 7v6a1 1 0 0 1-1.993.117L11 13V7a1 1 0 0 1 1-1Zm0 10a1.25 1.25 0 1 1 0 2.5a1.25 1.25 0 0 1 0-2.5Z" />
            </svg>
        ),
        type: 'link',
        selected: false,
        path: '/admin/inadimplentes',
        roles: ['ADMIN', 'EDITOR'],
    },
    {
        title: 'Empresas',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="side-menu__icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M3 21V7a2 2 0 0 1 2-2h2V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2a2 2 0 0 1 2 2v14h-6v-4H9v4H3zm6-6h6v-2H9v2zm0-4h6v-2H9v2zm0-4h6V5H9v2z" />
            </svg>
        ),
        type: 'link',
        selected: false,
        path: '/admin/companies/',
        roles: ['ADMIN', 'EDITOR'],
    },
    {
        menutitle: 'TAREFAS',
        roles: ['ADMIN', 'EDITOR'],
    },
    {
        title: 'Tarefas',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="side-menu__icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M4 5h2v2H4V5Zm0 6h2v2H4v-2Zm0 6h2v2H4v-2Zm4-11h12v2H8V6Zm0 6h12v2H8v-2Zm0 6h12v2H8v-2Z" />
            </svg>
        ),
        type: 'link',
        selected: false,
        path: '/admin/tarefas',
        roles: ['ADMIN', 'EDITOR'],
    },
    {
        menutitle: 'USUÁRIOS',
        roles: ['ADMIN', 'EDITOR'],
    },
    {
        title: 'Usuários',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="side-menu__icon person"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" />
            </svg>
        ),
        type: 'link',
        selected: false,
        path: '/admin/users',
        roles: ['ADMIN', 'EDITOR'],
    },
    {
        menutitle: 'REUSO DE SOFTWARE',
        roles: ['ADMIN', 'EDITOR', 'SUBSCRIBER'],
    },
    {
        title: 'Variabilidade (Parte III)',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="side-menu__icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
        ),
        type: 'link',
        selected: false,
        path: '/admin/variabilidade',
        roles: ['ADMIN', 'EDITOR', 'SUBSCRIBER'],
    },
];
