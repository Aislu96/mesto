export class UserInfo {

    getUserInfo() {
        return {
            name: document.querySelector('.profile__title').textContent,
            job: document.querySelector('.profile__subtitle').textContent,
            avatar: document.querySelector('.profile__avatar').src
        };
    }

    setUserInfo(user) {
        document.querySelector('.profile__title').textContent = user.name;
        document.querySelector('.profile__subtitle').textContent = user.about;
        document.querySelector('.profile__avatar').src = user.avatar
    }
}