import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import SimpleBar from 'simplebar-react';
import { basePath } from '../../../next.config';
import store from '../../../shared/redux/store';
import Menuloop from '../../data/menuloop';
import { ThemeChanger } from '../../redux/action';
import { MENUITEMS } from '../sidebar/nav';

const Sidebar = ({ local_varaiable, ThemeChanger }) => {
    const { data: session } = useSession();
    const userRole = session?.user?.role || 'SUBSCRIBER';

    // Filtrar itens de menu com base no papel do usuário
    const filteredMenuItems = MENUITEMS.filter((item) => {
        // Verificação explícita para ocultar Dashboard e Financeiro para EDITOR
        if (userRole === 'EDITOR') {
            if (item.title === 'Dashboard' || item.title === 'Financeiro') {
                return false;
            }
            if (item.menutitle === 'GERAL' || item.menutitle === 'RELATÓRIOS') {
                return false;
            }
        }
        return !item.roles || item.roles.includes(userRole);
    });

    // Filtrar categorias que não têm itens visíveis para o usuário atual
    const processedMenuItems = filteredMenuItems.filter(
        (item, index, array) => {
            // Se for um item de menu normal (não é um título de categoria), mantém
            if (!item.menutitle) return true;

            // Se for um título de categoria, verifica se há itens visíveis após ele
            const nextIndex = index + 1;
            // Verifica se o próximo item existe e não é outro título de categoria
            if (nextIndex < array.length && !array[nextIndex].menutitle) {
                return true;
            }
            return false;
        }
    );

    const [menuitems, setMenuitems] = useState(processedMenuItems);

    useEffect(() => {
        // Atualizar itens do menu quando o papel do usuário mudar
        const filteredItems = MENUITEMS.filter((item) => {
            // Verificação explícita para ocultar Dashboard e Financeiro para EDITOR
            if (userRole === 'EDITOR') {
                if (item.title === 'Dashboard' || item.title === 'Financeiro') {
                    return false;
                }
                if (
                    item.menutitle === 'GERAL' ||
                    item.menutitle === 'RELATÓRIOS'
                ) {
                    return false;
                }
            }
            return !item.roles || item.roles.includes(userRole);
        });

        // Filtrar categorias que não têm itens visíveis para o usuário atual
        const processedItems = filteredItems.filter((item, index, array) => {
            // Se for um item de menu normal (não é um título de categoria), mantém
            if (!item.menutitle) return true;

            // Se for um título de categoria, verifica se há itens visíveis após ele
            const nextIndex = index + 1;
            // Verifica se o próximo item existe e não é outro título de categoria
            if (nextIndex < array.length && !array[nextIndex].menutitle) {
                return true;
            }
            return false;
        });

        setMenuitems(processedItems);
    }, [userRole]);

    // Efeito para recarregar o menu quando a sessão é carregada ou alterada
    useEffect(() => {
        if (session && session.user) {
            console.log('User role:', session.user.role);
            // Filtrar baseado no papel do usuário
            const newItems = MENUITEMS.filter((item) => {
                // Verificação explícita para ocultar Dashboard e Financeiro para EDITOR
                if (userRole === 'EDITOR') {
                    if (
                        item.title === 'Dashboard' ||
                        item.title === 'Financeiro'
                    ) {
                        return false;
                    }
                    if (
                        item.menutitle === 'GERAL' ||
                        item.menutitle === 'RELATÓRIOS'
                    ) {
                        return false;
                    }
                }
                return !item.roles || item.roles.includes(userRole);
            });

            // Aplicar a lógica de processamento de categorias
            const processedItems = newItems.filter((item, index, array) => {
                if (!item.menutitle) return true;
                const nextIndex = index + 1;
                if (nextIndex < array.length && !array[nextIndex].menutitle) {
                    return true;
                }
                return false;
            });

            setMenuitems(processedItems);
        }
    }, [session, userRole]);

    const router = useRouter();

    const isActiveMenuItem = (path) => {
        if (!path) return false;

        const lowerPath = router.pathname.toLowerCase();
        const checkPath = path.toLowerCase();

        // Exact match
        if (lowerPath === checkPath) return true;

        // For root paths like /admin/products/ - match /admin/products/123 too
        if (checkPath.endsWith('/') && lowerPath.startsWith(checkPath))
            return true;

        // For paths without trailing slash, only match exact or child routes
        if (
            !checkPath.endsWith('/') &&
            (lowerPath === checkPath || lowerPath.startsWith(checkPath + '/'))
        )
            return true;

        return false;
    };

    const isSpecialActive = (title) => {
        if (!title) return false;

        const lowerTitle = title.toLowerCase();
        const lowerPath = router.pathname.toLowerCase();

        // Check specific conditions first
        if (lowerPath.includes('finance') && lowerTitle === 'financeiro')
            return true;
        if (lowerPath.includes('users') && lowerTitle === 'usuários')
            return true;
        if (lowerPath.includes('dashboard') && lowerTitle === 'dashboard')
            return true;
        if (lowerPath.includes('companies') && lowerTitle === 'empresas')
            return true;

        // Check if menu item path matches the current URL
        for (const item of MENUITEMS) {
            if (item.title?.toLowerCase() === lowerTitle && item.path) {
                return isActiveMenuItem(item.path);
            }
        }

        return false;
    };

    function closeMenuFn() {
        const closeMenuRecursively = (items) => {
            items?.forEach((item) => {
                item.active = false;
                closeMenuRecursively(item.children);
            });
        };
        closeMenuRecursively(MENUITEMS);
        setMenuitems((arr) => [...arr]);
    }

    useEffect(() => {
        const mainContent = document.querySelector('.main-content');
        mainContent.addEventListener('click', menuClose);
        const Container = document.querySelector('.layout');
        Container.addEventListener('click', Containerclick);
    }, []);

    const location = useRouter();

    function Onhover() {
        const theme = store.getState();
        if (
            (theme.toggled == 'icon-overlay-close' ||
                theme.toggled == 'detached-close') &&
            theme.iconOverlay != 'open'
        ) {
            ThemeChanger({ ...theme, iconOverlay: 'open' });
        }
    }
    function Outhover() {
        const theme = store.getState();
        if (
            (theme.toggled == 'icon-overlay-close' ||
                theme.toggled == 'detached-close') &&
            theme.iconOverlay == 'open'
        ) {
            ThemeChanger({ ...theme, iconOverlay: '' });
        }
    }

    function menuClose() {
        const theme = store.getState();
        if (window.innerWidth <= 992) {
            ThemeChanger({ ...theme, toggled: 'close' });
        }
        const overlayElement = document.querySelector('#responsive-overlay');
        if (overlayElement) {
            overlayElement.classList.remove('active');
        }
        if (
            theme.dataNavLayout == 'horizontal' ||
            theme.dataNavStyle == 'menu-click' ||
            theme.dataNavStyle == 'icon-click'
        ) {
            closeMenuFn();
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const WindowPreSize = [window.innerWidth];

            function menuResizeFn() {
                WindowPreSize.push(window.innerWidth);
                if (WindowPreSize.length > 2) {
                    WindowPreSize.shift();
                }
                const theme = store.getState();
                if (WindowPreSize.length > 1) {
                    if (
                        WindowPreSize[WindowPreSize.length - 1] < 992 &&
                        WindowPreSize[WindowPreSize.length - 2] >= 992
                    ) {
                        ThemeChanger({ ...theme, toggled: 'close' });
                    }

                    if (
                        WindowPreSize[WindowPreSize.length - 1] >= 992 &&
                        WindowPreSize[WindowPreSize.length - 2] < 992
                    ) {
                        ThemeChanger({
                            ...theme,
                            toggled:
                                theme.dataVerticalStyle == 'doublemenu'
                                    ? 'double-menu-open'
                                    : '',
                        });
                    }
                }
            }

            // Attach the event listener
            window.addEventListener('resize', menuResizeFn);

            // Clean up the event listener when the component unmounts
            return () => {
                window.removeEventListener('resize', menuResizeFn);
            };
        }
    }, []);

    function switcherArrowFn() {
        function slideClick() {
            const slide = document.querySelectorAll('.slide');
            const slideMenu = document.querySelectorAll('.slide-menu');

            slide.forEach((element) => {
                if (element.classList.contains('is-expanded')) {
                    element.classList.remove('is-expanded');
                }
            });

            slideMenu.forEach((element) => {
                if (element.classList.contains('open')) {
                    element.classList.remove('open');
                    element.style.display = 'none';
                }
            });
        }

        slideClick();
    }

    function slideRight() {
        const menuNav = document.querySelector('.main-menu');
        const mainContainer1 = document.querySelector('.main-sidebar');

        if (menuNav && mainContainer1) {
            const marginLeftValue = Math.ceil(
                Number(
                    window
                        .getComputedStyle(menuNav)
                        .marginInlineStart.split('px')[0]
                )
            );
            const marginRightValue = Math.ceil(
                Number(
                    window
                        .getComputedStyle(menuNav)
                        .marginInlineEnd.split('px')[0]
                )
            );
            const check = menuNav.scrollWidth - mainContainer1.offsetWidth;
            let mainContainer1Width = mainContainer1.offsetWidth;

            if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
                if (!(local_varaiable.dataVerticalStyle.dir === 'rtl')) {
                    if (Math.abs(check) > Math.abs(marginLeftValue)) {
                        menuNav.style.marginInlineEnd = '0';

                        if (
                            !(
                                Math.abs(check) >
                                Math.abs(marginLeftValue) + mainContainer1Width
                            )
                        ) {
                            mainContainer1Width =
                                Math.abs(check) - Math.abs(marginLeftValue);
                            const slideRightButton =
                                document.querySelector('#slide-right');
                            if (slideRightButton) {
                                slideRightButton.classList.add('hidden');
                            }
                        }

                        menuNav.style.marginInlineStart =
                            Number(
                                menuNav.style.marginInlineStart.split('px')[0]
                            ) -
                            Math.abs(mainContainer1Width) +
                            'px';

                        const slideRightButton =
                            document.querySelector('#slide-right');
                        if (slideRightButton) {
                            slideRightButton.classList.remove('hidden');
                        }
                    }
                } else {
                    if (Math.abs(check) > Math.abs(marginRightValue)) {
                        menuNav.style.marginInlineEnd = '0';

                        if (
                            !(
                                Math.abs(check) >
                                Math.abs(marginRightValue) + mainContainer1Width
                            )
                        ) {
                            mainContainer1Width =
                                Math.abs(check) - Math.abs(marginRightValue);
                            const slideRightButton =
                                document.querySelector('#slide-right');
                            if (slideRightButton) {
                                slideRightButton.classList.add('hidden');
                            }
                        }

                        menuNav.style.marginInlineStart =
                            Number(
                                menuNav.style.marginInlineStart.split('px')[0]
                            ) -
                            Math.abs(mainContainer1Width) +
                            'px';

                        const slideLeftButton =
                            document.querySelector('#slide-left');
                        if (slideLeftButton) {
                            slideLeftButton.classList.remove('hidden');
                        }
                    }
                }
            }

            const element = document.querySelector('.main-menu > .slide.open');
            const element1 = document.querySelector(
                '.main-menu > .slide.open > ul'
            );
            if (element) {
                element.classList.remove('active');
            }
            if (element1) {
                element1.style.display = 'none';
            }
        }

        switcherArrowFn();
    }

    function slideLeft() {
        const menuNav = document.querySelector('.main-menu');
        const mainContainer1 = document.querySelector('.main-sidebar');

        if (menuNav && mainContainer1) {
            const marginLeftValue = Math.ceil(
                Number(
                    window
                        .getComputedStyle(menuNav)
                        .marginInlineStart.split('px')[0]
                )
            );
            const marginRightValue = Math.ceil(
                Number(
                    window
                        .getComputedStyle(menuNav)
                        .marginInlineEnd.split('px')[0]
                )
            );
            const check = menuNav.scrollWidth - mainContainer1.offsetWidth;
            let mainContainer1Width = mainContainer1.offsetWidth;

            if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
                if (!(local_varaiable.dataVerticalStyle.dir === 'rtl')) {
                    if (Math.abs(check) <= Math.abs(marginLeftValue)) {
                        menuNav.style.marginInlineStart = '0px';
                    }
                } else {
                    if (Math.abs(check) > Math.abs(marginRightValue)) {
                        menuNav.style.marginInlineStart = '0';

                        if (
                            !(
                                Math.abs(check) >
                                Math.abs(marginRightValue) + mainContainer1Width
                            )
                        ) {
                            mainContainer1Width =
                                Math.abs(check) - Math.abs(marginRightValue);
                            const slideRightButton =
                                document.querySelector('#slide-right');
                            if (slideRightButton) {
                                slideRightButton.classList.add('hidden');
                            }
                        }

                        menuNav.style.marginInlineStart =
                            Number(
                                menuNav.style.marginInlineStart.split('px')[0]
                            ) -
                            Math.abs(mainContainer1Width) +
                            'px';

                        const slideLeftButton =
                            document.querySelector('#slide-left');
                        if (slideLeftButton) {
                            slideLeftButton.classList.remove('hidden');
                        }
                    }
                }
            }

            const element = document.querySelector('.main-menu > .slide.open');
            const element1 = document.querySelector(
                '.main-menu > .slide.open > ul'
            );
            if (element) {
                element.classList.remove('active');
            }
            if (element1) {
                element1.style.display = 'none';
            }
        }

        switcherArrowFn();
    }

    const Topup = () => {
        if (window.scrollY > 30 && document.querySelector('.app-sidebar')) {
            const Scolls = document.querySelectorAll('.app-sidebar');
            Scolls.forEach((e) => {
                e.classList.add('sticky-pin');
            });
        } else {
            const Scolls = document.querySelectorAll('.app-sidebar');
            Scolls.forEach((e) => {
                e.classList.remove('sticky-pin');
            });
        }
    };
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', Topup);
    }

    const level = 0;
    let hasParent = false;
    let hasParentLevel = 0;

    function setSubmenu(event, targetObject, MENUITEMS = menuitems) {
        if (!event?.ctrlKey) {
            for (const item of MENUITEMS) {
                if (item === targetObject) {
                    item.active = true;
                    item.selected = true;
                    setMenuAncestorsActive(item);
                } else if (!item.active && !item.selected) {
                    item.active = false;
                    item.selected = false;
                } else {
                    removeActiveOtherMenus(item);
                }
                if (item.children && item.children.length > 0) {
                    setSubmenu(event, targetObject, item.children);
                }
            }
        }
        // }

        setMenuitems((arr) => [...arr]);
    }
    function getParentObject(obj, childObject) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (
                    typeof obj[key] === 'object' &&
                    JSON.stringify(obj[key]) === JSON.stringify(childObject)
                ) {
                    return obj;
                }
                if (typeof obj[key] === 'object') {
                    const parentObject = getParentObject(obj[key], childObject);
                    if (parentObject !== null) {
                        return parentObject;
                    }
                }
            }
        }
        return null;
    }
    function setMenuAncestorsActive(targetObject) {
        const parent = getParentObject(menuitems, targetObject);
        const theme = store.getState();
        if (parent) {
            if (hasParentLevel > 2) {
                hasParent = true;
            }
            parent.active = true;
            parent.selected = true;
            hasParentLevel += 1;
            setMenuAncestorsActive(parent);
        } else if (!hasParent) {
            if (theme.dataVerticalStyle == 'doublemenu') {
                ThemeChanger({ ...theme, toggled: 'double-menu-close' });
            }
        }
    }
    function removeActiveOtherMenus(item) {
        if (item) {
            if (Array.isArray(item)) {
                for (const val of item) {
                    val.active = false;
                    val.selected = false;
                }
            }
            item.active = false;
            item.selected = false;

            if (item.children && item.children.length > 0) {
                removeActiveOtherMenus(item.children);
            }
        } else {
        }
    }
    function setMenuUsingUrl(currentPath) {
        hasParent = false;
        hasParentLevel = 1;

        const setSubmenuRecursively = (items) => {
            items?.forEach((item) => {
                if (item.path == '') {
                } else if (item.path === currentPath) {
                    setSubmenu(null, item);
                }
                setSubmenuRecursively(item.children);
            });
        };
        setSubmenuRecursively(MENUITEMS);
    }
    const [previousUrl, setPreviousUrl] = useState('/');

    useEffect(() => {
        const targetElement = document.documentElement;

        const observer = new MutationObserver(handleAttributeChange);

        const config = { attributes: true };

        observer.observe(targetElement, config);
        let currentPath = location.pathname.endsWith('/')
            ? location.pathname.slice(0, -1)
            : location.pathname;

        if (currentPath !== previousUrl) {
            setMenuUsingUrl(currentPath);
            setPreviousUrl(currentPath);
        }
    }, [location]);

    function toggleSidemenu(event, targetObject, MENUITEMS = menuitems) {
        const theme = store.getState();
        let element = event.target;

        if (
            (theme.dataNavStyle != 'icon-hover' &&
                theme.dataNavStyle != 'menu-hover') ||
            window.innerWidth < 992 ||
            (theme.dataNavLayout != 'horizontal' &&
                (theme.toggled != 'icon-hover-closed' ||
                    theme.toggled != 'menu-hover-closed'))
        ) {
            for (const item of MENUITEMS) {
                if (item === targetObject) {
                    if (
                        theme.dataVerticalStyle == 'doublemenu' &&
                        item.active
                    ) {
                        return;
                    }
                    item.active = !item.active;

                    if (item.active) {
                        closeOtherMenus(MENUITEMS, item);
                    } else {
                        if (theme.dataVerticalStyle == 'doublemenu') {
                            ThemeChanger({
                                ...theme,
                                toggled: 'double-menu-close',
                            });
                        }
                    }
                    setAncestorsActive(MENUITEMS, item);
                } else if (!item.active) {
                    if (theme.dataVerticalStyle != 'doublemenu') {
                        item.active = false;
                    }
                }
                if (item.children && item.children.length > 0) {
                    toggleSidemenu(event, targetObject, item.children);
                }
            }
            if (targetObject?.children && targetObject.active) {
                if (
                    theme.dataVerticalStyle == 'doublemenu' &&
                    theme.toggled != 'double-menu-open'
                ) {
                    ThemeChanger({ ...theme, toggled: 'double-menu-open' });
                }
            }
            if (
                element &&
                theme.dataNavLayout == 'horizontal' &&
                (theme.dataNavStyle == 'menu-click' ||
                    theme.dataNavStyle == 'icon-click')
            ) {
                const listItem = element.closest('li');
                if (listItem) {
                    const siblingUL = listItem.querySelector('ul');
                    let outterUlWidth = 0;
                    let listItemUL = listItem.closest('ul:not(.main-menu)');
                    while (listItemUL) {
                        listItemUL =
                            listItemUL.parentElement.closest(
                                'ul:not(.main-menu)'
                            );
                        if (listItemUL) {
                            outterUlWidth += listItemUL.clientWidth;
                        }
                    }
                    if (siblingUL) {
                        let siblingULRect = listItem.getBoundingClientRect();
                        if (theme.dir == 'rtl') {
                            if (
                                siblingULRect.left -
                                    siblingULRect.width -
                                    outterUlWidth +
                                    150 <
                                    0 &&
                                outterUlWidth < window.innerWidth &&
                                outterUlWidth +
                                    siblingULRect.width +
                                    siblingULRect.width <
                                    window.innerWidth
                            ) {
                                targetObject.dirchange = true;
                            } else {
                                targetObject.dirchange = false;
                            }
                        } else {
                            if (
                                outterUlWidth +
                                    siblingULRect.right +
                                    siblingULRect.width +
                                    50 >
                                    window.innerWidth &&
                                siblingULRect.right >= 0 &&
                                outterUlWidth +
                                    siblingULRect.width +
                                    siblingULRect.width <
                                    window.innerWidth
                            ) {
                                targetObject.dirchange = true;
                            } else {
                                targetObject.dirchange = false;
                            }
                        }
                    }
                    setTimeout(() => {
                        let computedValue = siblingUL.getBoundingClientRect();
                        if (computedValue.bottom > window.innerHeight) {
                            siblingUL.style.height =
                                window.innerHeight -
                                computedValue.top -
                                8 +
                                'px';
                            siblingUL.style.overflow = 'auto';
                        }
                    }, 100);
                }
            }
        }
        setMenuitems((arr) => [...arr]);
    }

    function setAncestorsActive(MENUITEMS, targetObject) {
        const theme = store.getState();
        const parent = findParent(MENUITEMS, targetObject);
        if (parent) {
            parent.active = true;
            if (parent.active) {
                ThemeChanger({ ...theme, toggled: 'double-menu-open' });
            }

            setAncestorsActive(MENUITEMS, parent);
        } else {
            if (theme.dataVerticalStyle == 'doublemenu') {
                ThemeChanger({ ...theme, toggled: 'double-menu-close' });
            }
        }
    }

    function closeOtherMenus(MENUITEMS, targetObject) {
        for (const item of MENUITEMS) {
            if (item !== targetObject) {
                item.active = false;
                if (item.children && item.children.length > 0) {
                    closeOtherMenus(item.children, targetObject);
                }
            }
        }
    }

    function findParent(MENUITEMS, targetObject) {
        for (const item of MENUITEMS) {
            if (item.children && item.children.includes(targetObject)) {
                return item;
            }
            if (item.children && item.children.length > 0) {
                const parent = findParent(
                    (MENUITEMS = item.children),
                    targetObject
                );
                if (parent) {
                    return parent;
                }
            }
        }
        return null;
    }
    //
    function HoverToggleInnerMenuFn(event, item) {
        const theme = store.getState();
        let element = event.target;
        if (
            element &&
            theme.dataNavLayout == 'horizontal' &&
            (theme.dataNavStyle == 'menu-hover' ||
                theme.dataNavStyle == 'icon-hover')
        ) {
            const listItem = element.closest('li');
            if (listItem) {
                const siblingUL = listItem.querySelector('ul');
                let outterUlWidth = 0;
                let listItemUL = listItem.closest('ul:not(.main-menu)');
                while (listItemUL) {
                    listItemUL =
                        listItemUL.parentElement.closest('ul:not(.main-menu)');
                    if (listItemUL) {
                        outterUlWidth += listItemUL.clientWidth;
                    }
                }
                if (siblingUL) {
                    let siblingULRect = listItem.getBoundingClientRect();
                    if (theme.dir == 'rtl') {
                        if (
                            siblingULRect.left -
                                siblingULRect.width -
                                outterUlWidth +
                                150 <
                                0 &&
                            outterUlWidth < window.innerWidth &&
                            outterUlWidth +
                                siblingULRect.width +
                                siblingULRect.width <
                                window.innerWidth
                        ) {
                            item.dirchange = true;
                        } else {
                            item.dirchange = false;
                        }
                    } else {
                        if (
                            outterUlWidth +
                                siblingULRect.right +
                                siblingULRect.width +
                                50 >
                                window.innerWidth &&
                            siblingULRect.right >= 0 &&
                            outterUlWidth +
                                siblingULRect.width +
                                siblingULRect.width <
                                window.innerWidth
                        ) {
                            item.dirchange = true;
                        } else {
                            item.dirchange = false;
                        }
                    }
                }
            }
        }
    }

    const Sideclick = () => {
        if (window.innerWidth > 992) {
            let html = document.documentElement;
            if (html.getAttribute('data-icon-overlay') != 'open') {
                html.setAttribute('data-icon-overlay', 'open');
            }
        }
    };

    const [MyclassName, setMyClass] = useState('');
    const Containerclick = () => {
        if (localStorage.getItem('nowaverticalstyles') == 'icontext') {
            setMyClass('');
        }
        const theme = store.getState();
        if (window.innerWidth > 992) {
            if (theme.iconOverlay === 'open') {
                ThemeChanger({ ...theme, iconOverlay: '' });
            }
        }
    };

    function handleAttributeChange(mutationsList) {
        for (const mutation of mutationsList) {
            if (
                mutation.type === 'attributes' &&
                (mutation.attributeName === 'data-nav-layout' ||
                    mutation.attributeName === 'data-vertical-style')
            ) {
                const newValue =
                    mutation.target.getAttribute('data-nav-layout');
                if (newValue == 'vertical') {
                    let currentPath = location.pathname.endsWith('/')
                        ? location.pathname.slice(0, -1)
                        : location.pathname;
                    currentPath = !currentPath
                        ? 'admin/dashboard/crypto/'
                        : currentPath;
                    setMenuUsingUrl(currentPath);
                } else {
                    closeMenuFn();
                }
            }
        }
    }

    return (
        <Fragment>
            <div id="responsive-overlay" onClick={() => menuClose()}></div>
            <aside
                className="app-sidebar sticky"
                id="sidebar"
                onMouseEnter={() => Onhover()}
                onMouseLeave={() => Outhover()}
            >
                <div className="main-sidebar-header">
                    <Link
                        className="header-logo active"
                        href={'/admin/dashboard/'}
                    >
                    </Link>
                </div>

                <SimpleBar
                    style={{ height: '100%' }}
                    className="main-sidebar"
                    id="sidebar-scroll"
                >
                    <nav className="main-menu-container nav nav-pills flex-column sub-open">
                        <div
                            className="slide-left"
                            id="slide-left"
                            onClick={() => {
                                slideLeft();
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#7b8191"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                {' '}
                                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>{' '}
                            </svg>
                        </div>

                        <ul className="main-menu" onClick={() => Sideclick()}>
                            {menuitems.map((levelone, index) => {
                                // Verificação adicional para evitar itens específicos para EDITOR
                                if (
                                    userRole === 'EDITOR' &&
                                    (levelone.title === 'Dashboard' ||
                                        levelone.title === 'Financeiro' ||
                                        levelone.menutitle === 'GERAL' ||
                                        levelone.menutitle === 'RELATÓRIOS')
                                ) {
                                    return null;
                                }

                                return (
                                    <Fragment key={index}>
                                        <li
                                            className={`${
                                                levelone.menutitle
                                                    ? 'slide__category'
                                                    : ''
                                            } 
                  ${levelone.type === 'link' ? 'slide' : ''} 
                  ${levelone.type === 'sub' ? 'slide has-sub' : ''} 
                  ${isSpecialActive(levelone.title) ? 'active' : ''}`}
                                        >
                                            {levelone.menutitle ? (
                                                <span className="category-name">
                                                    {levelone.menutitle}
                                                </span>
                                            ) : (
                                                ''
                                            )}

                                            {levelone.type === 'link' ? (
                                                <Link
                                                    href={levelone.path}
                                                    className={`side-menu__item ${
                                                        isSpecialActive(
                                                            levelone.title
                                                        )
                                                            ? 'active'
                                                            : ''
                                                    }`}
                                                >
                                                    <span
                                                        className={`${
                                                            local_varaiable?.dataVerticalStyle ==
                                                            'doublemenu'
                                                                ? ''
                                                                : 'd-none'
                                                        } ${
                                                            isSpecialActive(
                                                                levelone.title
                                                            )
                                                                ? 'active'
                                                                : ''
                                                        }`}
                                                    >
                                                        <OverlayTrigger
                                                            placement="right"
                                                            overlay={
                                                                <Tooltip>
                                                                    {
                                                                        levelone.title
                                                                    }
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <div>
                                                                {levelone.icon}
                                                            </div>
                                                        </OverlayTrigger>
                                                    </span>
                                                    {local_varaiable.dataVerticalStyle !==
                                                    'doublemenu' ? (
                                                        <span
                                                            className={
                                                                isSpecialActive(
                                                                    levelone.title
                                                                )
                                                                    ? 'active-icon'
                                                                    : ''
                                                            }
                                                        >
                                                            {levelone.icon}
                                                        </span>
                                                    ) : (
                                                        ''
                                                    )}
                                                    <span
                                                        className={`side-menu__label ${
                                                            isSpecialActive(
                                                                levelone.title
                                                            )
                                                                ? 'active-text'
                                                                : ''
                                                        }`}
                                                    >
                                                        {levelone.title}
                                                        {levelone.badgetxt ? (
                                                            <span
                                                                className={
                                                                    levelone.class
                                                                }
                                                            >
                                                                {' '}
                                                                {
                                                                    levelone.badgetxt
                                                                }
                                                            </span>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </span>
                                                </Link>
                                            ) : (
                                                ''
                                            )}

                                            {/* if Sub level */}
                                            {levelone.type === 'sub' ? (
                                                <Menuloop
                                                    MENUITEMS={levelone}
                                                    level={level + 1}
                                                    toggleSidemenu={
                                                        toggleSidemenu
                                                    }
                                                    HoverToggleInnerMenuFn={
                                                        HoverToggleInnerMenuFn
                                                    }
                                                />
                                            ) : (
                                                ''
                                            )}
                                        </li>
                                    </Fragment>
                                );
                            })}
                        </ul>

                        <div
                            className="slide-right"
                            id="slide-right"
                            onClick={() => {
                                slideRight();
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#7b8191"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                {' '}
                                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>{' '}
                            </svg>
                        </div>
                    </nav>
                </SimpleBar>
            </aside>
        </Fragment>
    );
};
const mapStateToProps = (state) => ({
    local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(Sidebar);
