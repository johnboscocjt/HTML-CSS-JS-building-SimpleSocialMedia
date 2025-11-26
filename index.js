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
            // hide the notification pop up
            document.querySelector('.notification-popup').style.display = 'none';
        } else {
            // show the notification pop up
            document.querySelector('.notification-popup').style.display = 'block';

            // hide the notification count
            document.querySelector('#notifications .notification-count').style.display = 'none';
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
    // add box shadow to messages card/box
    // boxShadow 0 0 1rem var(--color-primary) means a glow effect
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';

    // hide the notification count
    messagesNotification.querySelector('.notification-count').style.display = 'none';

    // remove the box shadow after 2 seconds
    setTimeout(() => {
        // disappear the box shadow after 2 seconds
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
    });

    // Optional: Close menu when clicking on backdrop
    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('menu-open')) {
            if (!leftSidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                leftSidebar.classList.remove('open');
                mobileToggle.classList.remove('open');
                document.body.classList.remove('menu-open');
            }
        }
    });
}