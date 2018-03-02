export default class history{
    private window:Window
    constructor(window : Window){
        this.window = window;
    }

    public push = ( state , title:string , url:string) =>{
        this.window.history.pushState(state, title, url);
    }

}