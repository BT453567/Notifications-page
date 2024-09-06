let shop = document.getElementById("notifications-content");
let badge = document.getElementById("badge");
let read = document.getElementById("read");

let users = {
    101: {
        id: 101,
        name: 'Anna Kim',
        avatar: './assets/images/avatar-anna-kim.webp'
    },

    102: {
        id: 102,
        name: 'Nathan Peterson',
        avatar: './assets/images/avatar-nathan-peterson.webp'
    },

    103: {
        id: 103,
        name: 'Kimberly Smith',
        avatar: './assets/images/avatar-kimberly-smith.webp'
    },

    104: {
        id: 104,
        name: 'Rizky Hasanuddin',
        avatar: './assets/images/avatar-rizky-hasanuddin.webp'
    },

    105: {
        id: 105,
        name: 'Jacob Thompson',
        avatar: './assets/images/avatar-jacob-thompson.webp'
    },

    106: {
        id: 106,
        name: 'Angela Gray',
        avatar: './assets/images/avatar-angela-gray.webp'
    },

    107: {
        id: 107,
        name: 'Mark Webber',
        avatar: './assets/images/avatar-mark-webber.webp'
    }
}

let notifications = [
    {
        id: 1,
        type: 'left-group',
        timestamp: '2024-06-03T14:30:00Z',
        isRead: true,
        userId: 101,
        context: {
            groupName: 'Chess Club'
        }
    },
    {
        id: 2,
        type: 'react',
        timestamp: '2024-06-04T14:30:00Z',
        isRead: true,
        userId: 102,
        context: {
            postName: '5 end-game strategies to increase your win rate'
        }
    },
    {
        id: 3,
        type: 'comment',
        timestamp: '2024-07-04T14:30:00Z',
        isRead: true,
        userId: 103,
        context: {
            picture: './assets/images/image-chess.webp'
        }
    },
    {
        id: 4,
        type: 'message',
        timestamp: '2024-08-01T14:30:00Z',
        isRead: true,
        userId: 104,
        context: {
            message: `Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and 
            I'm already having lots of fun and improving my game`
        }
    },
    {
        id: 5,
        type: 'join-group',
        timestamp: '2024-08-10T14:30:00Z',
        isRead: false,
        userId: 105,
        context: {
            groupName: 'Chess Club'
        }
    },
    {
        id: 6,
        type: 'follow',
        timestamp: '2024-08-25T14:30:00Z',
        isRead: false,
        userId: 106,
    },
    {
        id: 7,
        type: 'react',
        timestamp: '2024-09-04T14:30:00Z',
        isRead: false,
        userId: 107,
        context: {
            postName: 'My first tournament today!'
        }
    },
]

function generateNotifications() {

    const unreadCount = notifications.filter((x) => !x.isRead).length;
    badge.innerText = unreadCount;

    return (shop.innerHTML = notifications
    .slice()
    .reverse()
    .map((x) => {

        let user = users[x.userId];
        let timeSinceNotification = timeSince(x.timestamp);
        let unreadDot = "";
        if (!x.isRead) {
            console.log("in isRead false method", x.id);
            unreadDot = `<span class="dot"></span>`;
        }

        let contentHTML = "";

        if (x.type === 'left-group') {
            contentHTML = `
                <div class="flex column gap-5px">
                    <div>
                        <a href="#" class="notifications__user-name remove-a-styling fw-800 fc-very-dark-blue">${user.name}</a><span class="text-spacing">left the group</span>
                        <a href="#" class="notifications__group-name remove-a-styling fw-800 fc-dark-grayish-blue">${x.context.groupName}</a>${unreadDot}
                    </div>
                    <div>
                        <span class="notifications__post-time">${timeSinceNotification}</span>
                    </div>
                </div>`;
        } else if (x.type === 'react') {
            contentHTML = `
                <div class="flex column gap-5px">
                    <div>
                        <a href="#" class="notifications__user-name remove-a-styling fw-800 fc-very-dark-blue">${user.name}</a><span class="text-spacing">reacted to your recent post</span>
                        <a href="#" class="notifications__post-name remove-a-styling fw-800">${x.context.postName}</a>${unreadDot}
                    </div>
                    <div>
                        <span class="notifications__post-time">${timeSinceNotification}</span>
                    </div>
                </div>`;
        } else if (x.type === 'comment') {
            contentHTML = `
                <div class="notifications__comment-container flex">
                    <div class="notifications__comment-text-wrapper flex column gap-5px">
                        <div>
                            <a href="#" class="notifications__user-name remove-a-styling right-text-space-7px fw-800 fc-very-dark-blue">${user.name}</a>
                            <span>commented on your picture</span>
                            ${unreadDot}
                        </div>
                        <div>
                            <span class="notifications__post-time">${timeSinceNotification}</span>
                        </div>
                    </div>
                    <div>
                        <a href="#"><img class="notifications__commment-image" src="${x.context.picture}" alt=""></img></a>
                    </div>
                </div>`;
        } else if (x.type === 'message') {
            contentHTML = `
                <div class="flex column gap-5px">
                    <div>
                        <a href="#" class="notifications__user-name remove-a-styling fw-800 fc-very-dark-blue right-text-space-7px">${user.name}</a>
                        <span>sent you a private message</span>${unreadDot}
                    </div>
                    <div>
                        <span class="notifications__post-time">${timeSinceNotification}</span>
                    </div>
                    <div>
                        <a href="#" class="notifications__private-message remove-a-styling">Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.
                        </a>
                    </div>
                </div>`;
        } else if (x.type === 'join-group') {
            contentHTML = `
            <div class="flex column gap-5px">
                <div>
                    <a href="#" class="notifications__user-name remove-a-styling fw-800 fc-very-dark-blue">${user.name}</a><span class="text-spacing">has joined your group</span>
                    <a href="#" class="notifications__group-name remove-a-styling fw-800 fc-dark-grayish-blue">${x.context.groupName}</a>${unreadDot}
                </div>
                <div>
                    <span class="notifications__post-time">${timeSinceNotification}</span>
                </div>
            </div>`;
        } else if (x.type === 'follow') {
            contentHTML = `
            <div class="flex column gap-5px">
                <div>
                    <a href="#" class="notifications__user-name remove-a-styling fw-800 fc-very-dark-blue right-text-space-7px">${user.name}</a>
                    <span>followed you</span>${unreadDot}
                </div>
                <div>
                    <span class="notifications__post-time">${timeSinceNotification}</span>
                </div>
            </div>`;
        }

        const itemWrapperClass = x.isRead ? 'notifications__item-wrapper flex gap-20px' : 'notifications__item-wrapper flex gap-20px unread';

        return `
        <div class="${itemWrapperClass}">
            <div>
                <img class="notifications__avatar-image" src="${user.avatar}" alt="avatar of ${user.name}"> </img>
            </div>
            ${contentHTML}
        </div>`;
    }).join(""));
}

function timeSince(timestamp) {
    const now = new Date();
    const notificationDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - notificationDate) / 1000);

    const pluralise = (count, singular, plural) => count === 1 ? singular : plural;

    if (diffInSeconds < 60) {
        return `${diffInSeconds} ${pluralise(diffInSeconds, 'second', 'seconds')} ago`;
    } else if (diffInSeconds < 3600) { // 60 * 60
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} ${pluralise(minutes, 'minute', 'minutes')} ago`;
    } else if (diffInSeconds < 86400) { // 60 * 60 * 24
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} ${pluralise(hours, 'hour', 'hours')} ago`;
    } else if (diffInSeconds < 604800) { // 60 * 60 * 24 * 7
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} ${pluralise(days, 'day', 'days')} ago`;
    } else if (diffInSeconds < 2592000) { // 60 * 60 * 24 * 30 (approx)
        const weeks = Math.floor(diffInSeconds / 604800);
        return `${weeks} ${pluralise(weeks, 'week', 'weeks')} ago`;
    } else if (diffInSeconds < 31536000) { // 60 * 60 * 24 * 365 (approx)
        const months = Math.floor(diffInSeconds / 2592000);
        return `${months} ${pluralise(months, 'month', 'months')} ago`;
    } else {
        const years = Math.floor(diffInSeconds / 31536000);
        return `${years} ${pluralise(years, 'year', 'years')} ago`;
    }
}

function markAllAsRead() {
    notifications.forEach(function(notificationItem) {
        if (!notificationItem.isRead) {
            notificationItem.isRead = true;
        }
    });
    generateNotifications();
}

document.addEventListener('DOMContentLoaded', generateNotifications);

read.addEventListener('click', markAllAsRead);