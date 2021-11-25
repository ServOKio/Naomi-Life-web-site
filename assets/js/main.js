const settings = {
    debug: false,

    //Липкое меню
    sticky_header: false,

    //Плавное появление блоков
    smooth_blocks: true,

    //Intro
    animation: {
        //После загрузки
        after_loading: true,

        //Подождать после того как запустить анимацию (секунды)
        wait: 0
    },

    //Аватары
    avatars: [
        {
            username: 'Mosumiss',
            tag: 6563,
            path: './assets/img/avatars/5.gif',
            color: '#574096'
        },
        {
            username: 'Suraun',
            tag: 9204,
            path: './assets/img/avatars/2.gif',
            color: '#150303'
        },
        {
            username: 'Vlapper',
            tag: 4206,
            path: './assets/img/avatars/9.gif',
            color: '#4147b5'
        },
        {
            username: 'Rehine',
            tag: 6205,
            path: './assets/img/avatars/3.gif',
            color: '#45ffcb'
        },
        {
            username: 'Swuda',
            tag: 4769,
            path: './assets/img/avatars/4.gif',
            color: '#9d50b6'
        },
        {
            username: 'Ciratise',
            tag: 5748,
            path: './assets/img/avatars/1.gif',
            color: '#a25c8f'
        },
        {
            username: 'Klondug',
            tag: 5602,
            path: './assets/img/avatars/10.gif',
            color: '#263978'
        },
        {
            username: 'Jadomeli',
            tag: 5629,
            path: './assets/img/avatars/6.gif',
            color: '#ece7f7'
        },
        {
            username: 'Emprow',
            tag: 1904,
            path: './assets/img/avatars/7.gif',
            color: '#a3f0fd'
        },
        {
            username: 'Lorai',
            tag: 3569,
            path: './assets/img/avatars/8.gif',
            color: '#89f0c7'
        }
    ]
}

const bodyNode = document.body || document.getElementsByTagName('body')[0];
if(!settings.animation.after_loading) setTimeout(()=>bodyNode.classList.add("animate"), settings.animation.wait*1000);
window.addEventListener('load', () => {
    if(settings.debug) console.log('Loaded');
    if(settings.animation.after_loading) setTimeout(()=>bodyNode.classList.add("animate"), settings.animation.wait*1000);
    let popup_is_open = false;
    $(".fix .header .menu").on("click", () => {
        if (!popup_is_open) {
            popup_is_open = true;
            $(".popup").css({ "top": "0%" });
            $("body").css({ "overflow": "hidden" });
        } else {
            popup_is_open = false;
            $(".popup").css({ "top": "-100%" });
            $("body").css({ "overflow": "visible" });
        }
    });

    $(".popup").on("click", () => {
        if (!popup_is_open) {
            popup_is_open = true;
            $(".popup").css({ "top": "0%" });
            $("body").css({ "overflow": "hidden" });
        } else {
            popup_is_open = false;
            $(".popup").css({ "top": "-100%" });
            $("body").css({ "overflow": "visible" });
        }
    });

    if (settings.sticky_header) {
        $(window).on("scroll", function () {
            const fromTop = $(document).scrollTop();
            $('.header').toggleClass("sticky", (fromTop > 200));
        });
    }
});

let res = 0;
if (localStorage.getItem('user_curent') === null) {
    localStorage.setItem('user_curent', 1);
} else {
    const parsed = parseInt(localStorage.getItem('user_curent'));
    if (!isNaN(parsed)) {
        if (parsed > settings.avatars.length || parsed < 1) {
            localStorage.setItem('user_curent', 1);
        } else {
            if (parsed + 1 > settings.avatars.length) {
                localStorage.setItem('user_curent', 1);
                res = parsed - 1;
                if(settings.debug) console.log('Skip to 1');
            } else {
                localStorage.setItem('user_curent', parsed + 1);
                res = parsed - 1;
                if(settings.debug) console.log(`Set to ${parsed + 1}`);
            }
        }
    } else {
        localStorage.setItem('user_curent', 1);
    }
}
if(settings.debug) console.log(`Image number: ${res}`);

const user_avatars = document.getElementsByClassName('discord_user_avatar');
if(settings.debug) console.log(`Discord user avatars: ${user_avatars.length}`);
for (let i = 0; i < user_avatars.length; i++) {
    user_avatars[i].setAttribute("xlink:href", settings.avatars[res].path);
}

const user_color = document.getElementsByClassName('discord_user_color');
if(settings.debug) console.log(`Discord user colors: ${user_color.length}`);
for (i = 0; i < user_color.length; i++) {
    user_color[i].setAttribute("fill", settings.avatars[res].color);
}

const user_username = document.getElementsByClassName('discord_user_username');
if(settings.debug) console.log(`Discord user usernames: ${user_username.length}`);
for (i = 0; i < user_username.length; i++) {
    user_username[i].innerHTML = settings.avatars[res].username;
}

const user_timestamp = document.getElementsByClassName('discord_user_timestamp');
if(settings.debug) console.log(`Discord timestamps: ${user_timestamp.length}`);
for (i = 0; i < user_timestamp.length; i++) {
    user_timestamp[i].innerHTML = `Requested by ${settings.avatars[res].username}#${settings.avatars[res].tag} • Today at 1:16 AM`;
}

fetch(`https://naomi.life/api/nm`).then(response => response.json()).then((naomi_data) => {
    const naomi_avatars = document.getElementsByClassName('discord_naomi_avatar');
    if(settings.debug) console.log(`Discord Naomi avatars: ${naomi_avatars.length}`);
    for (let i = 0; i < naomi_avatars.length; i++) {
        naomi_avatars[i].setAttribute("xlink:href", naomi_data.avatar);
    }

    const naomi_username = document.getElementsByClassName('discord_naomi_username');
    if(settings.debug) console.log(`Discord Naomi usernames: ${naomi_username.length}`);
    for (i = 0; i < naomi_username.length; i++) {
        naomi_username[i].innerHTML = naomi_data.username.nick;
    }
});

const br = document.getElementsByClassName('block_to_right');
const bl = document.getElementsByClassName('block_to_left');
if(settings.debug) console.log(`To right blocks: ${br.length}`);
if(settings.debug) console.log(`To left blocks: ${bl.length}`);
if(settings.debug) console.log(`Observer: ${settings.smooth_blocks ? 'ON' : 'OFF'}`);
if (settings.smooth_blocks) {
    //Обсерсер
    const options = {
        root: null,
        threshold: 0.7
    }
    let observer = new IntersectionObserver(handleIntersection, options);

    for (i = 0; i < br.length; i++) observer.observe(br[i]);
    for (i = 0; i < bl.length; i++) observer.observe(bl[i]);

    function handleIntersection(t, e) {
        t.forEach((t) => {
            if (!t.target.classList.contains('opened') && 0 < t.intersectionRatio) {
                t.target.classList.add("opened");
                if(settings.debug) console.log(`Block opened`);
            }
        })
    }
} else {
    for (i = 0; i < br.length; i++) br[i].style.opacity = 1;
    for (i = 0; i < bl.length; i++) bl[i].style.opacity = 1;
}