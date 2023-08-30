export class UserInfo {
    #name;
    #job;

    constructor({name, job}) {
        this.#name = name;
        this.#job = job;
    }

    getUserInfo() {
        return {
            name: this.#name.textContent,
            job: this.#job.textContent
        };
    }

    setUserInfo(data) {
        const keys = Object.keys(data)
    this.#name.textContent = data[keys[0]];
    this.#job.textContent = data[keys[1]];
    }
}