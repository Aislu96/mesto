export class UserInfo {

    getUserInfo() {
        return {
            name: document.querySelector('.profile__title').textContent,
            job: document.querySelector('.profile__subtitle').textContent
        };
    }

    setUserInfo(user) {
        document.querySelector('.profile__title').textContent = user.name;
        document.querySelector('.profile__subtitle').textContent = user.about;
    }
}