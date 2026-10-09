import { useState } from 'react';
import { MENUITEMS } from '../../../shared/layout-components/sidebar/nav';
import store from '../../../shared/redux/store';

export function Dark(actionfunction) {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataThemeMode: 'dark',
        dataHeaderStyles: 'dark',
        dataMenuStyles: 'dark',
        bodyBg1: '',
        bodyBg: '',
        darkBg: '',
        Light: '',
        inputBorder: '',
    });
    localStorage.setItem('nowadarktheme', 'dark');
    localStorage.removeItem('nowalighttheme');
    // localStorage.removeItem("darkBgRGB1");
    // localStorage.removeItem("darkBgRGB2");
    // localStorage.removeItem("darkBgRGB3");
    // localStorage.removeItem("darkBgRGB4");
}
export function Light(actionfunction) {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataThemeMode: 'light',
        dataHeaderStyles: 'light',
        bodyBg1: '',
        bodyBg: '',
        darkBg: '',
        Light: '',
        inputBorder: '',
        // "dataMenuStyles": theme.dataNavLayout == "horizontal" ? "light" : "dark"
        dataMenuStyles: localStorage.nowaMenu
            ? localStorage.nowaMenu
            : localStorage.nowadarktheme
            ? 'light'
            : 'light',
    });
    localStorage.setItem('nowalighttheme', 'light');
    localStorage.removeItem('nowadarktheme');
    localStorage.removeItem('darkBgRGB1');
    localStorage.removeItem('darkBgRGB2');
    localStorage.removeItem('darkBgRGB3');
    localStorage.removeItem('darkBgRGB4');
}
export function Ltr(actionfunction) {
    const theme = store.getState();
    actionfunction({ ...theme, dir: 'ltr' });
    localStorage.setItem('nowaltr', 'ltr');
    localStorage.removeItem('nowartl');
}
export function Rtl(actionfunction) {
    const theme = store.getState();
    actionfunction({ ...theme, dir: 'rtl' });
    localStorage.setItem('nowartl', 'rtl');
    localStorage.removeItem('nowaltr');
}
export const HorizontalClick = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataNavLayout: 'horizontal',
        //   "dataMenuStyles": localStorage.nowadarktheme ? 'dark' : localStorage.darkBgRGB1 ? 'dark' : localStorage.nowaMenu ? localStorage.nowaMenu : "light",
        dataVerticalStyle: '',
        dataNavStyle: localStorage.nowanavstyles
            ? localStorage.nowanavstyles
            : 'menu-click',
    });
    //   localStorage.setItem("daslotlayout", "horizontal");
    // localStorage.removeItem("nowaverticalstyles");
    localStorage.setItem('nowalayout', 'horizontal');
    localStorage.removeItem('nowaverticalstyles');
};

export const Vertical = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataNavLayout: 'vertical',
        // "dataMenuStyles": "",
        dataVerticalStyle: 'overlay',
        toggled: '',
        dataNavStyle: '',
    });
    localStorage.setItem('nowalayout', 'vertical');
    //
    localStorage.removeItem('nowanavstyles');
};

export const Menuclick = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataNavStyle: 'menu-click',
        dataVerticalStyle: '',
        toggled: 'menu-click-closed',
    });
    localStorage.setItem('nowanavstyles', 'menu-click');
    localStorage.removeItem('nowaverticalstyles');
    const Sidebar = document.querySelector('.main-menu');
    if (Sidebar) {
        Sidebar.style.marginInline = '0px';
    }
};
export const MenuHover = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataNavStyle: 'menu-hover',
        dataVerticalStyle: '',
        toggled: 'menu-hover-closed',
        horStyle: '',
    });
    localStorage.setItem('nowanavstyles', 'menu-hover');
    localStorage.removeItem('nowaverticalstyles');
    const Sidebar = document.querySelector('.main-menu');
    if (Sidebar) {
        Sidebar.style.marginInline = '0px';
    }
};
export const IconClick = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataNavStyle: 'icon-click',
        dataVerticalStyle: '',
        toggled: 'icon-click-closed',
    });
    localStorage.setItem('nowanavstyles', 'icon-click');
    localStorage.removeItem('nowaverticalstyles');
    const Sidebar = document.querySelector('.main-menu');
    if (Sidebar) {
        Sidebar.style.marginInline = '0px';
    }
};
function closeMenuFn() {
    const closeMenuRecursively = (items) => {
        items?.forEach((item) => {
            item.active = false;
            closeMenuRecursively(item.children);
        });
    };
    closeMenuRecursively(MENUITEMS);
}
export const IconHover = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataNavStyle: 'icon-hover',
        dataVerticalStyle: '',
        toggled: 'icon-hover-closed',
    });
    localStorage.setItem('nowanavstyles', 'icon-hover');
    localStorage.removeItem('nowaverticalstyles');
    const Sidebar = document.querySelector('.main-menu');
    if (Sidebar) {
        Sidebar.style.marginInline = '0px';
    }
    closeMenuFn();
};
export const Fullwidth = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataWidth: 'fullwidth',
    });
    localStorage.setItem('nowafullwidth', 'Fullwidth');
    localStorage.removeItem('nowaboxed');
};
export const Boxed = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataWidth: 'boxed',
    });
    localStorage.setItem('nowaboxed', 'Boxed');
    localStorage.removeItem('nowafullwidth');
};
export const FixedMenu = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataMenuPosition: 'fixed',
    });
    localStorage.setItem('nowamenufixed', 'MenuFixed');
    localStorage.removeItem('nowamenuscrollable');
};
export const scrollMenu = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataMenuPosition: 'scrollable',
    });
    localStorage.setItem('nowamenuscrollable', 'Menuscrolled');
    localStorage.removeItem('nowamenufixed');
};
export const Headerpostionfixed = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataHeaderPosition: 'fixed',
    });
    localStorage.setItem('nowaheaderfixed', 'FixedHeader');
    localStorage.removeItem('nowaheaderscrollable');
};
export const Headerpostionscroll = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataHeaderPosition: 'scrollable',
    });
    localStorage.setItem('nowaheaderscrollable', 'ScrollableHeader');
    localStorage.removeItem('nowaheaderfixed');
};
export const Regular = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataPageStyle: 'regular',
    });
    localStorage.setItem('nowaregular', 'Regular');
    localStorage.removeItem('nowaclassic');
    localStorage.removeItem('nowamodern');
};
export const Classic = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataPageStyle: 'classic',
    });
    localStorage.setItem('nowaclassic', 'Classic');
    localStorage.removeItem('nowaregular');
    localStorage.removeItem('nowamodern');
};
export const Modern = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataPageStyle: 'modern',
    });
    localStorage.setItem('nowamodern', 'Modern');
    localStorage.removeItem('nowaregular');
    localStorage.removeItem('nowaclassic');
};

export const Defaultmenu = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataVerticalStyle: 'overlay',
        dataNavLayout: 'vertical',
        toggled: '',
    });
    localStorage.setItem('nowaverticalstyles', 'default');

    const icon = document.getElementById('switcher-default-menu');
    if (icon) {
        icon.checked = true;
    }
    localStorage.removeItem('nowanavstyles');
};
export const Closedmenu = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataNavLayout: 'vertical',
        dataVerticalStyle: 'closed',
        toggled: 'close-menu-close',
    });
    localStorage.setItem('nowaverticalstyles', 'closed');
    localStorage.removeItem('nowanavstyles');
};

function icontextOpenFn() {
    let html = document.documentElement;
    if (html.getAttribute('data-toggled') === 'icon-text-close') {
        html.setAttribute('data-icon-text', 'open');
    }
}
function icontextCloseFn() {
    let html = document.documentElement;
    if (html.getAttribute('data-toggled') === 'icon-text-close') {
        html.removeAttribute('data-icon-text');
    }
}
export const iconTextfn = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataNavLayout: 'vertical',
        dataVerticalStyle: 'icontext',
        toggled: 'icon-text-close',
    });
    localStorage.setItem('nowaverticalstyles', 'icontext');
    localStorage.removeItem('nowanavstyles');
    const MainContent = document.querySelector('.main-content');
    const appSidebar = document.querySelector('.app-sidebar');

    appSidebar?.addEventListener('click', () => {
        icontextOpenFn();
    });
    MainContent?.addEventListener('click', () => {
        icontextCloseFn();
    });
};
export const iconOverayFn = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataNavLayout: 'vertical',
        dataVerticalStyle: 'overlay',
        toggled: 'icon-overlay-close',
    });
    localStorage.setItem('nowaverticalstyles', 'overlay');
    localStorage.removeItem('nowanavstyles');
    const icon = document.getElementById('switcher-icon-overlay');
    if (icon) {
        icon.checked = true;
    }
    const MainContent = document.querySelector('.main-content');
    const appSidebar = document.querySelector('.app-sidebar');
    appSidebar?.addEventListener('click', () => {
        DetachedOpenFn();
    });
    MainContent?.addEventListener('click', () => {
        DetachedCloseFn();
    });
};

function DetachedOpenFn() {
    if (window.innerWidth > 992) {
        let html = document.documentElement;
        if (
            html.getAttribute('data-toggled') === 'detached-close' ||
            html.getAttribute('data-toggled') === 'icon-overlay-close'
        ) {
            html.setAttribute('icon-overlay', 'open');
        }
    }
}
function DetachedCloseFn() {
    if (window.innerWidth > 992) {
        let html = document.documentElement;
        if (
            html.getAttribute('data-toggled') === 'detached-close' ||
            html.getAttribute('data-toggled') === 'icon-overlay-close'
        ) {
            html.removeAttribute('icon-overlay');
        }
    }
}
export const DetachedFn = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataNavLayout: 'vertical',
        dataVerticalStyle: 'detached',
        toggled: 'detached-close',
    });
    localStorage.setItem('nowaverticalstyles', 'detached');
    localStorage.removeItem('nowanavstyles');

    const MainContent = document.querySelector('.main-content');
    const appSidebar = document.querySelector('.app-sidebar');

    appSidebar?.addEventListener('click', () => {
        DetachedOpenFn();
    });
    MainContent?.addEventListener('click', () => {
        DetachedCloseFn();
    });
};

export const DoubletFn = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataNavLayout: 'vertical',
        dataVerticalStyle: 'doublemenu',
        dataNavStyle: '',
        toggled: 'double-menu-open',
    });
    localStorage.setItem('nowaverticalstyles', 'doublemenu');
    localStorage.removeItem('nowanavstyles');

    setTimeout(() => {
        if (
            !document
                .querySelectorAll('.main-menu .slide.active')[0]
                .querySelector('ul')
        ) {
            const theme = store.getState();
            actionfunction({
                ...theme,
                toggled: 'double-menu-close',
            });
        }
    }, 100);
};

export const bgImage1 = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        bgImg: 'bgimg1',
    });
    localStorage.setItem('bgimage1', 'bgimg1');
    localStorage.removeItem('bgimage2');
    localStorage.removeItem('bgimage3');
    localStorage.removeItem('bgimage4');
    localStorage.removeItem('bgimage5');
};
export const bgImage2 = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        bgImg: 'bgimg2',
    });
    localStorage.setItem('bgimage2', 'bgimg2');
    localStorage.removeItem('bgimage1');
    localStorage.removeItem('bgimage3');
    localStorage.removeItem('bgimage4');
    localStorage.removeItem('bgimage5');
};
export const bgImage3 = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        bgImg: 'bgimg3',
    });
    localStorage.setItem('bgimage3', 'bgimg3');
    localStorage.removeItem('bgimage1');
    localStorage.removeItem('bgimage2');
    localStorage.removeItem('bgimage4');
    localStorage.removeItem('bgimage5');
};
export const bgImage4 = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        bgImg: 'bgimg4',
    });
    localStorage.setItem('bgimage4', 'bgimg4');
    localStorage.removeItem('bgimage1');
    localStorage.removeItem('bgimage2');
    localStorage.removeItem('bgimage3');
    localStorage.removeItem('bgimage5');
};
export const bgImage5 = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        bgImg: 'bgimg5',
    });
    localStorage.setItem('bgimage5', 'bgimg5');
    localStorage.removeItem('bgimage1');
    localStorage.removeItem('bgimage2');
    localStorage.removeItem('bgimage3');
    localStorage.removeItem('bgimage4');
};

export const colorMenu = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataMenuStyles: 'color',
    });
    localStorage.setItem('nowaMenu', 'color');
    localStorage.removeItem('gradient');
};

export const lightMenu = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataMenuStyles: 'light',
    });
    localStorage.setItem('nowaMenu', 'light');
    localStorage.removeItem('light');
};

export const darkMenu = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataMenuStyles: 'dark',
    });
    localStorage.setItem('nowaMenu', 'dark');
    localStorage.removeItem('light');
};

export const gradientMenu = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataMenuStyles: 'gradient',
    });
    localStorage.setItem('nowaMenu', 'gradient');
    localStorage.removeItem('color');
};
export const transparentMenu = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataMenuStyles: 'transparent',
    });
    localStorage.setItem('nowaMenu', 'transparent');
    localStorage.removeItem('gradient');
};

export const lightHeader = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataHeaderStyles: 'light',
    });
    localStorage.setItem('nowaHeader', 'light');
    localStorage.removeItem('dark');
};
export const darkHeader = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataHeaderStyles: 'dark',
    });
    localStorage.setItem('nowaHeader', 'dark');
    localStorage.removeItem('light');
};
export const colorHeader = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataHeaderStyles: 'color',
    });
    localStorage.setItem('nowaHeader', 'color');
    localStorage.removeItem('dark');
};
export const gradientHeader = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataHeaderStyles: 'gradient',
    });
    localStorage.setItem('nowaHeader', 'gradient');
    localStorage.removeItem('transparent');
};
export const transparentHeader = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        dataHeaderStyles: 'transparent',
    });
    localStorage.removeItem('gradient');
    localStorage.setItem('nowaHeader', 'transparent');
};

export const primaryColor1 = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        colorPrimaryRgb: '58, 88, 146',
    });
    localStorage.setItem('primaryRGB', '58, 88, 146');
};
export const primaryColor2 = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        colorPrimaryRgb: '92, 144, 163',
    });
    localStorage.setItem('primaryRGB', '92, 144, 163');
};
export const primaryColor3 = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        colorPrimaryRgb: '161, 90, 223',
    });
    localStorage.setItem('primaryRGB', '161, 90, 223');
};
export const primaryColor4 = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        colorPrimaryRgb: '78, 172, 76',
    });
    localStorage.setItem('primaryRGB', '78, 172, 76');
};
export const primaryColor5 = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        colorPrimaryRgb: '223, 90, 90',
    });
    localStorage.setItem('primaryRGB', '223, 90, 90');
};

export const backgroundColor1 = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        bodyBg: '20, 30, 96',
        bodyBg1: '25, 38, 101',
        Light: '25, 38, 101',
        darkBg: '25, 38, 101',
        inputBorder: '255, 255, 255, 0.1',
        dataThemeMode: 'dark',
        dataMenuStyles: 'dark',
        dataHeaderStyles: 'dark',
    });
    localStorage.setItem('darkBgRGB1', '20, 30, 96');
    localStorage.setItem('darkBgRGB2', '25, 38, 101');
    localStorage.setItem('darkBgRGB3', '25, 38, 101');
    localStorage.setItem('LightRGB', '25, 38, 101');
    localStorage.setItem('darkBgRGB4', '255, 255, 255, 0.1');
};
export const backgroundColor2 = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        bodyBg: '8, 78, 115',
        bodyBg1: '13, 86, 120',
        Light: '13, 86, 120',
        darkBg: '13, 86, 120',
        inputBorder: '255, 255, 255, 0.1',
        dataThemeMode: 'dark',
        dataMenuStyles: 'dark',
        dataHeaderStyles: localStorage.nowaHeader
            ? localStorage.nowaHeader
            : localStorage.nowadarktheme
            ? 'dark'
            : 'dark',
    });
    localStorage.setItem('darkBgRGB1', '8, 78, 115');
    localStorage.setItem('darkBgRGB2', '13, 86, 120');
    localStorage.setItem('darkBgRGB3', '13, 86, 120');
    localStorage.setItem('LightRGB', '13, 86, 120');
    localStorage.setItem('darkBgRGB4', '255, 255, 255, 0.1');
};
export const backgroundColor3 = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        bodyBg: '90, 37, 135',
        bodyBg1: '95, 45, 140',
        Light: '95, 45, 140',
        darkBg: '95, 45, 140',
        inputBorder: '255, 255, 255, 0.1',
        dataThemeMode: 'dark',
        dataMenuStyles: 'dark',
        dataHeaderStyles: localStorage.nowaHeader
            ? localStorage.nowaHeader
            : localStorage.nowadarktheme
            ? 'dark'
            : 'dark',
    });
    localStorage.setItem('darkBgRGB1', '90, 37, 135');
    localStorage.setItem('darkBgRGB2', '95, 45, 140');
    localStorage.setItem('darkBgRGB3', '95, 45, 140');
    localStorage.setItem('LightRGB', '95, 45, 140');
    localStorage.setItem('darkBgRGB4', '255, 255, 255, 0.1');
};
export const backgroundColor4 = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        bodyBg: '24, 101, 51',
        bodyBg1: '29, 109, 56',
        Light: '29, 109, 56',
        darkBg: '29, 109, 56',
        inputBorder: '255, 255, 255, 0.1',
        dataThemeMode: 'dark',
        dataMenuStyles: 'dark',
        dataHeaderStyles: localStorage.nowaHeader
            ? localStorage.nowaHeader
            : localStorage.nowadarktheme
            ? 'dark'
            : 'dark',
    });
    localStorage.setItem('darkBgRGB1', '24, 101, 51');
    localStorage.setItem('darkBgRGB2', '29, 109, 56');
    localStorage.setItem('darkBgRGB3', '29, 109, 56');
    localStorage.setItem('LightRGB', '29, 109, 56');
    localStorage.setItem('darkBgRGB4', '255, 255, 255, 0.1');
};
export const backgroundColor5 = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        bodyBg: '120, 66, 20',
        bodyBg1: '125, 74,25',
        Light: '125, 74,25',
        darkBg: '125, 74, 25',
        inputBorder: '255, 255, 255, 0.1',
        dataThemeMode: 'dark',
        dataMenuStyles: 'dark',
        dataHeaderStyles: localStorage.nowaHeader
            ? localStorage.nowaHeader
            : localStorage.nowadarktheme
            ? 'dark'
            : 'dark',
    });
    localStorage.setItem('darkBgRGB1', '120, 66, 20');
    localStorage.setItem('darkBgRGB2', '125, 74,25');
    localStorage.setItem('darkBgRGB3', '125, 74,25');
    localStorage.setItem('LightRGB', '125, 74,25');
    localStorage.setItem('darkBgRGB4', '255, 255, 255, 0.1');
};

const ColorPicker = (props) => {
    return (
        <div className="color-picker-input">
            <input type="color" {...props} />
        </div>
    );
};

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}
const Themeprimarycolor = ({ actionfunction }) => {
    const theme = store.getState();
    const [state, updateState] = useState('#FFFFFF');

    const handleInput = (e) => {
        const rgb = hexToRgb(e.target.value);

        if (rgb !== null) {
            const { r, g, b } = rgb;
            updateState(e.target.value);
            actionfunction({
                ...theme,
                colorPrimaryRgb: `${r} , ${g} , ${b}`,
            });
            localStorage.setItem('dynamiccolor', `${r}, ${g}, ${b}`);
        }
    };

    return (
        <div className="Themeprimarycolor theme-container-primary pickr-container-primary">
            <ColorPicker onChange={handleInput} value={state} />
        </div>
    );
};
export default Themeprimarycolor;

//themeBackground
export const Themebackgroundcolor = ({ actionfunction }) => {
    const theme = store.getState();
    const [state, updateState] = useState('#FFFFFF');
    const handleInput = (e) => {
        const { r, g, b } = hexToRgb(e.target.value);
        updateState(e.target.value);
        actionfunction({
            ...theme,
            bodyBg: `${r}, ${g}, ${b}`,
            bodyBg1: `${r + 19}, ${g + 19}, ${b + 19}`,
            Light: `${r + 19}, ${g + 19}, ${b + 19}`,
            darkBg: `${r + 19}, ${g + 19}, ${b + 19}`,
            inputBorder: '255, 255, 255, 0.1',
            dataThemeMode: 'dark',
            dataHeaderStyles: localStorage.nowaHeader
                ? localStorage.nowaHeader
                : localStorage.nowadarktheme
                ? 'dark'
                : 'dark',
            dataMenuStyles: 'dark',
        });
        localStorage.setItem('darkBgRGB1', `${r}, ${g}, ${b}`);
        localStorage.setItem('darkBgRGB2', `${r + 19}, ${g + 19}, ${b + 19}`);
        localStorage.setItem('LightRGB', `${r + 19}, ${g + 19}, ${b + 19}`);
        localStorage.setItem('darkBgRGB3', `${r + 19}, ${g + 19}, ${b + 19}`);
        localStorage.setItem('darkBgRGB4', '255, 255, 255, 0.1');
        localStorage.removeItem('nowaMenu');
        localStorage.removeItem('nowaHeader');
    };
    return (
        <div className="Themebackgroundcolor">
            <ColorPicker onChange={handleInput} value={state} />
        </div>
    );
};

export const Reset = (actionfunction) => {
    const theme = store.getState();
    Vertical(actionfunction);
    actionfunction({
        ...theme,
        lang: 'en',
        dir: 'ltr',
        dataThemeMode: 'light',
        dataMenuStyles: 'light',
        dataNavLayout: 'vertical',
        dataHeaderStyles: 'light',
        dataVerticalStyle: 'overlay',
        StylebodyBg: '107 64 64',
        StyleDarkBg: '93 50 50',
        toggled: '',
        dataNavStyle: '',
        horStyle: '',
        dataPageStyle: 'regular',
        dataWidth: 'fullwidth',
        dataMenuPosition: 'fixed',
        dataHeaderPosition: 'fixed',
        loader: 'disable',
        iconOverlay: '',
        colorPrimaryRgb: '',
        bodyBg1: '',
        bodyBg: '',
        Light: '',
        darkBg: '',
        inputBorder: '',
        bgImg: '',
        iconText: '',
        body: {
            class: '',
        },
    });
    localStorage.clear();
    const icon = document.getElementById('switcher-default-menu');
    if (icon) {
        icon.checked = true;
    }
};

export const LocalStorageBackup = (actionfunction) => {
    localStorage.nowaltr ? Ltr(actionfunction) : '';
    localStorage.nowartl ? Rtl(actionfunction) : '';
    localStorage.nowadarktheme ? Dark(actionfunction) : '';
    localStorage.nowalighttheme ? Light(actionfunction) : '';
    localStorage.nowaregular ? Regular(actionfunction) : '';
    localStorage.nowaclassic ? Classic(actionfunction) : '';
    localStorage.nowamodern ? Modern(actionfunction) : '';
    localStorage.nowafullwidth ? Fullwidth(actionfunction) : '';
    localStorage.nowaboxed ? Boxed(actionfunction) : '';
    localStorage.nowamenufixed ? FixedMenu(actionfunction) : '';
    localStorage.nowamenuscrollable ? scrollMenu(actionfunction) : '';
    localStorage.nowaheaderfixed ? Headerpostionfixed(actionfunction) : '';
    localStorage.nowaheaderscrollable
        ? Headerpostionscroll(actionfunction)
        : '';

    localStorage.nowanavstyles === 'menu-click'
        ? Menuclick(actionfunction)
        : '';
    localStorage.nowanavstyles === 'menu-hover'
        ? MenuHover(actionfunction)
        : '';
    localStorage.nowanavstyles === 'icon-click'
        ? IconClick(actionfunction)
        : '';
    localStorage.nowanavstyles === 'icon-hover'
        ? IconHover(actionfunction)
        : '';

    localStorage.bgimage1 ? bgImage1(actionfunction) : '';
    localStorage.bgimage2 ? bgImage2(actionfunction) : '';
    localStorage.bgimage3 ? bgImage3(actionfunction) : '';
    localStorage.bgimage4 ? bgImage4(actionfunction) : '';
    localStorage.bgimage5 ? bgImage5(actionfunction) : '';
    localStorage.nowalayout == 'horizontal' && HorizontalClick(actionfunction);
    localStorage.nowalayout == 'vertical' && Vertical(actionfunction);
    //primitive
    if (
        localStorage.getItem('nowaltr') == null ||
        localStorage.getItem('nowaltr') == 'ltr'
    )
        if (localStorage.getItem('nowartl') == 'rtl') {
            document.querySelector('body')?.classList.add('rtl');
            document.querySelector('html[lang=en]')?.setAttribute('dir', 'rtl');
        }

    // Theme Primary: Colors: Start
    switch (localStorage.primaryRGB) {
        case '58, 88, 146':
            primaryColor1(actionfunction);

            break;
        case '92, 144, 163':
            primaryColor2(actionfunction);

            break;
        case '161, 90, 223':
            primaryColor3(actionfunction);

            break;
        case '78, 172, 76':
            primaryColor4(actionfunction);

            break;
        case '223, 90, 90':
            primaryColor5(actionfunction);

            break;
        default:
            break;
    }
    // Theme Primary: Colors: End

    switch (localStorage.darkBgRGB1) {
        case '20, 30, 96':
            backgroundColor1(actionfunction);

            break;
        case '8, 78, 115':
            backgroundColor2(actionfunction);

            break;
        case '90, 37, 135':
            backgroundColor3(actionfunction);

            break;
        case '24, 101, 51':
            backgroundColor4(actionfunction);

            break;
        case '120, 66, 20':
            backgroundColor5(actionfunction);

            break;
        default:
            break;
    }

    //layout
    if (localStorage.nowaverticalstyles) {
        const verticalStyles = localStorage.getItem('nowaverticalstyles');

        switch (verticalStyles) {
            case 'default':
                Defaultmenu(actionfunction);
                break;
            case 'closed':
                Closedmenu(actionfunction);
                break;
            case 'icontext':
                iconTextfn(actionfunction);
                break;
            case 'overlay':
                iconOverayFn(actionfunction);
                break;
            case 'detached':
                DetachedFn(actionfunction);
                break;
            case 'doublemenu':
                DoubletFn(actionfunction);
                break;
        }
    }

    //Theme Primary:
    if (localStorage.dynamiccolor) {
        const theme = store.getState();
        actionfunction({
            ...theme,
            colorPrimaryRgb: localStorage.dynamiccolor,
            colorPrimary: localStorage.dynamiccolor,
        });
    }
    //Theme BAckground:
    if (localStorage.darkBgRGB1) {
        const theme = store.getState();
        actionfunction({
            ...theme,
            bodyBg: localStorage.darkBgRGB1,
            bodyBg1: localStorage.darkBgRGB2,
            Light: localStorage.LightRGB,
            darkBg: localStorage.darkBgRGB3,
            inputBorder: localStorage.darkBgRGB4,
            dataThemeMode: 'dark',
            dataHeaderStyles: localStorage.nowaHeader
                ? localStorage.nowaHeader
                : localStorage.nowadarktheme
                ? 'dark'
                : 'dark',
            dataMenuStyles: 'dark',
        });
    }
    // ThemeColor MenuColor Start
    switch (localStorage.nowaMenu) {
        case 'light':
            lightMenu(actionfunction);
            break;
        case 'dark':
            darkMenu(actionfunction);

            break;
        case 'color':
            colorMenu(actionfunction);

            break;
        case 'gradient':
            gradientMenu(actionfunction);

            break;
        case 'transparent':
            transparentMenu(actionfunction);

            break;
        default:
            break;
    }
    // ThemeColor Header Colors: start
    switch (localStorage.nowaHeader) {
        case 'light':
            lightHeader(actionfunction);

            break;
        case 'dark':
            darkHeader(actionfunction);

            break;
        case 'color':
            colorHeader(actionfunction);

            break;
        case 'gradient':
            gradientHeader(actionfunction);

            break;
        case 'transparent':
            transparentHeader(actionfunction);

            break;
        default:
            break;
    }
};
export const defaultlightHeader = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        defaultHeaderStyles: 'light',
        dataHeaderStyles: '',
    });
    localStorage.setItem('nowadefaultHeader', 'light');
    localStorage.removeItem('dark');
};
export const defaultdarkHeader = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        defaultHeaderStyles: 'dark',
        dataHeaderStyles: '',
    });
    localStorage.setItem('nowadefaultHeader', 'dark');
    localStorage.removeItem('light');
};
export const defaultcolorHeader = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        defaultHeaderStyles: 'color',
        dataHeaderStyles: '',
    });
    localStorage.setItem('nowadefaultHeader', 'color');
    localStorage.removeItem('dark');
};
export const defaultgradientHeader = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        defaultHeaderStyles: 'gradient',
        dataHeaderStyles: '',
    });
    localStorage.setItem('nowadefaultHeader', 'gradient');
    localStorage.removeItem('transparent');
};
export const defaulttransparentHeader = (actionfunction) => {
    const theme = store.getState();
    actionfunction({
        ...theme,
        defaultHeaderStyles: 'transparent',
        dataHeaderStyles: '',
    });
    localStorage.removeItem('gradient');
    localStorage.setItem('nowadefaultHeader', 'transparent');
};
