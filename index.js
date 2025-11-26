// variables
// sidebar
const menuItems = document.querySelectorAll('.menu-item');

// messages
const messagesNotification = document.querySelector('#messages-notifications');
const messages = document.querySelector('.messages');//message box

// theme
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');

// font sizes
const fontSizes = document.querySelectorAll('.choose-size span');

// grabbing the root element in order to change different css variables
var root = document.querySelector(':root');

// primary color
const colorPalette = document.querySelectorAll('.choose-color span');

// theme colors
const Bg1 = document.querySelector('.bg-1');
const Bg2 = document.querySelector('.bg-2');
const Bg3 = document.querySelector('.bg-3');

// message filter search functionality
// get all individual messages
const message = messages.querySelectorAll('.message');
// get the search input
const messageSearch = document.querySelector('#message-search');



// remove active class from all menu items
const removeActiveClass = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
};

// when clicked should have the class of active
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // when clicked remove active class from all menu items
        removeActiveClass();
        // add active class to the clicked menu item
        item.classList.add('active');

        // notification
        // when clicked remove the notification count and show the pop up
        if (item.id !== 'notifications') {
            // hide any popups (desktop or mobile)
            const orig = document.querySelector('.notification-popup');
            if (orig) orig.style.display = 'none';
            removeMobileNotificationsPopup();
            removeMobileMessagesPopup();
        } else {
            // hide the notification count
            const notifCount = document.querySelector('#notifications .notification-count');
            if (notifCount) notifCount.style.display = 'none';

            // On small screens we render a fixed popup attached to body (to avoid
            // sidebar overflow clipping). On larger screens we show the inline popup.
            if (window.innerWidth <= 992) {
                showMobileNotificationsPopup();
            } else {
                const orig = document.querySelector('.notification-popup');
                if (orig) orig.style.display = 'block';
            }
        }

        // On small screens show a temporary toast with the menu item's title
        if (window.innerWidth <= 992) {
            const titleEl = item.querySelector('h3');
            const title = titleEl ? titleEl.textContent.trim() : (item.getAttribute('data-title') || '');
            if (title) showToast(title, 2000);
        }

    });
});


// messages
// search chat messages
// keyup event listener on the search input, is used to capture user input as they type 
messageSearch.addEventListener('keyup', () => {
    // convert the search input to lowercase
    const val = messageSearch.value.toLowerCase();

    // loop through all messages
    message.forEach(chat => {
        // get the name of the message sender
        let name = chat.querySelectorAll('h5').textContent.toLowerCase();

        // check if the name includes the search input value
        // match the names you are getting to the names that are being typed in
        // if there is a match the index of these values is not going to be negative one, hence found 
        if (name.indexOf(val) != -1) {
            // show the message
            chat.style.display = 'flex';//initial display is flex, hence display flex
        } else {
            // hide the message
            chat.style.display = 'none';
        }
    });
});


// when clicked to highlight the messages card
messagesNotification.addEventListener('click', () => {
    // On small screens, show a fixed mobile messages popup to the left of the bar
    if (window.innerWidth <= 992) {
        // hide count
        const cnt = messagesNotification.querySelector('.notification-count');
        if (cnt) cnt.style.display = 'none';

        // toggle mobile messages popup
        if (document.querySelector('.mobile-messages-popup')) {
            removeMobileMessagesPopup();
        } else {
            showMobileMessagesPopup();
        }
        return;
    }

    // Desktop behavior: add box shadow to messages card/box
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';

    // hide the notification count
    const cnt = messagesNotification.querySelector('.notification-count');
    if (cnt) cnt.style.display = 'none';

    // remove the box shadow after 2 seconds
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000);
});



// theme customization
// open modal
const openThemeModal = () => {
    // display the modal as grid, from css we set it to display none initially
    themeModal.style.display = 'grid';
};

// close modal
const closeThemeModal = (e) => {
    // check if the clicked target is the modal itself
    if (e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
    }
};

// close modal
themeModal.addEventListener('click', closeThemeModal);

// open modal
theme.addEventListener('click', openThemeModal);



// remove active class from spans or font size selectors
const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove('active');
    });
};

// fonts
// change font size on the click of the spans
fontSizes.forEach(size => {
    // active class add
    size.addEventListener('click', () => {
        removeSizeSelector();
        let fontSize;
        size.classList.toggle('active');

        // determine font size based on the selected span
        if (size.classList.contains('font-size-1')) {
            fontSize = '10px';
            root.style.setProperty('--sticky-top-left', '5.4rem');
            root.style.setProperty('--sticky-top-right', '5.4rem');
        } else if (size.classList.contains('font-size-2')) {
            fontSize = '13px';
            root.style.setProperty('--sticky-top-left', '5.4rem');
            root.style.setProperty('--sticky-top-right', '-7rem');
        } else if (size.classList.contains('font-size-3')) {
            fontSize = '16px';
            root.style.setProperty('--sticky-top-left', '-2rem');
            root.style.setProperty('--sticky-top-right', '-17rem');
        } else if (size.classList.contains('font-size-4')) {
            fontSize = '19px';
            root.style.setProperty('--sticky-top-left', '-5rem');
            root.style.setProperty('--sticky-top-right', '-25rem');
        } else if (size.classList.contains('font-size-5')) {
            fontSize = '22px';
            root.style.setProperty('--sticky-top-left', '-12rem');
            root.style.setProperty('--sticky-top-right', '-35rem');
        }

        // change the font size of the root html element
        document.querySelector('html').style.fontSize = fontSize;
    });
});

// Apply font size mapping for a given size element (used on click and on load)
const applyFontSize = (size) => {
    let fontSize;

    if (size.classList.contains('font-size-1')) {
        fontSize = '10px';
        root.style.setProperty('--sticky-top-left', '5.4rem');
        root.style.setProperty('--sticky-top-right', '5.4rem');
    } else if (size.classList.contains('font-size-2')) {
        fontSize = '13px';
        root.style.setProperty('--sticky-top-left', '5.4rem');
        root.style.setProperty('--sticky-top-right', '-7rem');
    } else if (size.classList.contains('font-size-3')) {
        fontSize = '16px';
        root.style.setProperty('--sticky-top-left', '-2rem');
        root.style.setProperty('--sticky-top-right', '-17rem');
    } else if (size.classList.contains('font-size-4')) {
        fontSize = '19px';
        root.style.setProperty('--sticky-top-left', '-5rem');
        root.style.setProperty('--sticky-top-right', '-25rem');
    } else if (size.classList.contains('font-size-5')) {
        fontSize = '22px';
        root.style.setProperty('--sticky-top-left', '-12rem');
        root.style.setProperty('--sticky-top-right', '-35rem');
    }

    if (fontSize) {
        document.querySelector('html').style.fontSize = fontSize;
    }
};

// Hook up existing click handlers to use the new applyFontSize function
fontSizes.forEach(size => {
    size.addEventListener('click', () => {
        removeSizeSelector();
        size.classList.add('active');
        applyFontSize(size);
    });
});

// On load, if any font-size span already has the `active` class, apply it
document.addEventListener('DOMContentLoaded', () => {
    fontSizes.forEach(size => {
        if (size.classList.contains('active')) {
            applyFontSize(size);
        }
    });
});


// remove active class from colors
const removeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    });
};


// change the primary colors
colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primaryHue;
        removeActiveColorClass();

        // determine the primary color based on the selected span
        if (color.classList.contains('color-1')) {
            primaryHue = 252;//default
        } else if (color.classList.contains('color-2')) {
            primaryHue = 52;
        } else if (color.classList.contains('color-3')) {
            primaryHue = 352;
        } else if (color.classList.contains('color-4')) {
            primaryHue = 152;
        } else if (color.classList.contains('color-5')) {
            primaryHue = 202;
        }

        // adding active
        color.classList.add('active');

        // change the primary color hue value, grab the variable from the css and set it to the new value the one changing
        root.style.setProperty('--primary-color-hue', primaryHue);
    });
});


// theme background variables in order to use the values from css
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// change background color
// we take the values from the css variables and set them to the js variables and use them to change the background
const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
};

// default background, remove active class from the others
Bg1.addEventListener('click', () => {
    // add active class
    Bg1.classList.add('active');
    // remove active class from the others
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');

    // reload the page to set the default background to remove any changes made and from local storage  
    window.location.reload();
});

// change background color
Bg2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';

    // add active class
    Bg2.classList.add('active');
    // remove active class from the others
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');

    changeBG();
});

Bg3.addEventListener('click', () => {
    darkColorLightness = '90%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';

    // add active class
    Bg3.classList.add('active');
    // remove active class from the others
    Bg1.classList.remove('active');
    Bg2.classList.remove('active');

    changeBG();
});


// floating button for menu on small screens
// ============= MOBILE BOTTOM MENU TOGGLE =============
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const leftSidebar = document.querySelector('main .container .left');

if (mobileToggle && leftSidebar) {
    mobileToggle.addEventListener('click', () => {
        // Toggle open class on sidebar
        leftSidebar.classList.toggle('open');
        
        // Toggle open class on toggle button (for icon rotation)
        mobileToggle.classList.toggle('open');
        
        // Toggle body class for backdrop
        document.body.classList.toggle('menu-open');
        
        // If the sidebar was just closed, make sure any mobile popups are removed
        if (!leftSidebar.classList.contains('open')) {
            removeMobileNotificationsPopup();
            removeMobileMessagesPopup();
        }
    });

    // Optional: Close menu when clicking on backdrop
    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('menu-open')) {
            // If click is inside the left sidebar or the FAB, ignore
            if (leftSidebar.contains(e.target) || mobileToggle.contains(e.target)) return;

            // If click is inside any mobile popup (notifications/messages), ignore
            const mobileMsgPopup = document.querySelector('.mobile-messages-popup');
            const mobileNotifPopup = document.querySelector('.mobile-notification-popup');
            if ((mobileMsgPopup && mobileMsgPopup.contains(e.target)) || (mobileNotifPopup && mobileNotifPopup.contains(e.target))) return;

            // Otherwise close the sidebar and remove popups
            leftSidebar.classList.remove('open');
            mobileToggle.classList.remove('open');
            document.body.classList.remove('menu-open');
            // ensure any mobile popups are removed when the menu is closed via backdrop
            removeMobileNotificationsPopup();
            removeMobileMessagesPopup();
            return;
        }
    });
}

// Toast helper: creates a toast container if needed and shows a fading toast
function showToast(message, duration = 2000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    // trigger fade-in
    requestAnimationFrame(() => toast.classList.add('visible'));

    // remove after duration with fade-out
    setTimeout(() => {
        toast.classList.remove('visible');
        toast.addEventListener('transitionend', () => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, { once: true });
    }, duration);
}

/* Mobile notifications popup handling */
function showMobileNotificationsPopup() {
    // If already present, toggle it off
    if (document.querySelector('.mobile-notification-popup')) return;

    const orig = document.querySelector('.notification-popup');
    if (!orig) return;

    // clone the popup contents so we don't move it from the DOM
    const clone = orig.cloneNode(true);
    clone.style.display = 'block';
    clone.classList.add('cloned-notification-popup');

    const wrapper = document.createElement('div');
    wrapper.className = 'mobile-notification-popup';
    wrapper.appendChild(clone);

    document.body.appendChild(wrapper);

    // Close when clicking outside
    setTimeout(() => { // allow event stack to complete before adding listener
        document.addEventListener('click', mobileNotificationsOutsideClick);
    }, 0);
}

function removeMobileNotificationsPopup() {
    const existing = document.querySelector('.mobile-notification-popup');
    if (existing) {
        existing.parentNode.removeChild(existing);
        document.removeEventListener('click', mobileNotificationsOutsideClick);
    }
}

function mobileNotificationsOutsideClick(e) {
    const popup = document.querySelector('.mobile-notification-popup');
    const leftSidebar = document.querySelector('main .container .left');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (!popup) return;

    // if click is inside popup, sidebar, or toggle button — ignore
    if (popup.contains(e.target) || (leftSidebar && leftSidebar.contains(e.target)) || (mobileToggle && mobileToggle.contains(e.target))) {
        return;
    }

    removeMobileNotificationsPopup();
}

/* Mobile messages popup handling */
function showMobileMessagesPopup() {
    if (document.querySelector('.mobile-messages-popup')) return;

    const orig = document.querySelector('.messages');
    if (!orig) return;

    const clone = orig.cloneNode(true);
    clone.style.display = 'block';
    clone.classList.add('cloned-messages');

    // build wrapper and a small header with close button for better UX
    const wrapper = document.createElement('div');
    wrapper.className = 'mobile-messages-popup';
    wrapper.setAttribute('role', 'dialog');
    wrapper.setAttribute('aria-label', 'Messages');

    // create header bar
    const header = document.createElement('div');
    header.className = 'popup-header';
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.justifyContent = 'space-between';
    header.style.padding = '0.6rem 0.9rem';
    header.style.borderBottom = '1px solid rgba(0,0,0,0.04)';

    const title = document.createElement('div');
    title.className = 'popup-title';
    title.innerHTML = '<h4 style="margin:0">Messages</h4>';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.setAttribute('aria-label', 'Close messages');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeMobileMessagesPopup();
    });

    header.appendChild(title);
    header.appendChild(closeBtn);

    wrapper.appendChild(header);
    wrapper.appendChild(clone);

    document.body.appendChild(wrapper);

    // animate in
    requestAnimationFrame(() => wrapper.classList.add('visible'));

    // Wire up the cloned search input to filter the cloned messages list
    try {
        const clonedSearchInput = clone.querySelector('.search-bar input');
        const clonedMessages = Array.from(clone.querySelectorAll('.message'));
        if (clonedSearchInput) {
            clonedSearchInput.addEventListener('keyup', () => {
                const val = clonedSearchInput.value.toLowerCase();
                clonedMessages.forEach(chat => {
                    const nameEl = chat.querySelector('h5');
                    const name = nameEl ? nameEl.textContent.toLowerCase() : '';
                    chat.style.display = name.indexOf(val) !== -1 ? 'flex' : 'none';
                });
            });
        }
    } catch (e) {
        // non-fatal
    }

    // close when clicking outside
    setTimeout(() => {
        document.addEventListener('click', mobileMessagesOutsideClick);
    }, 0);
}

function removeMobileMessagesPopup() {
    const existing = document.querySelector('.mobile-messages-popup');
    if (existing) {
        // animate out then remove
        existing.classList.remove('visible');
        existing.addEventListener('transitionend', () => {
            if (existing.parentNode) existing.parentNode.removeChild(existing);
        }, { once: true });
        document.removeEventListener('click', mobileMessagesOutsideClick);
    }
}

function mobileMessagesOutsideClick(e) {
    const popup = document.querySelector('.mobile-messages-popup');
    const leftSidebar = document.querySelector('main .container .left');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (!popup) return;

    if (popup.contains(e.target) || (leftSidebar && leftSidebar.contains(e.target)) || (mobileToggle && mobileToggle.contains(e.target))) {
        return;
    }

    removeMobileMessagesPopup();
}
