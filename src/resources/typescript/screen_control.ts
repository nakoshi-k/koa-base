
export default class screen_control{
    private before_focus;
    private lock_container:HTMLElement;
    constructor(selector){
        this.lock_container = document.querySelector(selector);
    }
    lock = () => {
        this.lock_container.classList.add("is-active");
        this.before_focus = <HTMLElement>document.activeElement;
        this.before_focus.blur();
    }
    unlock = () => {
        this.lock_container.classList.remove("is-active");
        this.before_focus.focus();
    }
}