import icon from "./bulma/icon";
import button from "./bulma/button";
import choices from "./lib/choices";
import modal from "./bulma/modal";
import light_modal from "./bulma/light_modal";
import tab from "./bulma/tab";
import dropdown from "./bulma/dropdown";
import offset from "./bulma/offset";
import toggle from "./bulma/toggle";
import flush from "./flush";
import form from "./form/form";
import history from "./history";
import cookie from "./cookie_monster";
import screen_control from "./screen_control";
import attach_detach from "./attach_detach";
import {u} from "./extends/umbrella_extends";

import * as Promise from "es6-promise";

let APP = {
    button : button,
    icon : icon,
    choices : choices,
    modal : modal,
    light_modal : light_modal,
    tab : tab,
    flush : flush,
    form : form,
    dropdown: dropdown,
    toggle : toggle,
    history : new history(window),
    cookie : new cookie("THD", "/" , 60 * 60 * 24 * 7 * 4 ),
    offset:offset,
    attach_detach : attach_detach,
    u : u
};

//confirm 

const confirm_modal = new APP.modal("#confirm");
confirm_modal.close = () => {
    if(confirm_modal.transaction){
        return;
    }
    confirm_modal.close();
    confirm_modal.button.state = "primary";
    confirm_modal.button.text = "Done";
    confirm_modal.button.enable();
    confirm_modal.button.icon.spin(false);
    confirm_modal.button.icon.change("fa-check");
}

APP["confirm"] = function(title,body,callback){
    confirm_modal.title(title);
    confirm_modal.body(body);
    
    confirm_modal.button.click = (button) => {
       callback(confirm_modal); 
    };

    confirm_modal.open();
    confirm_modal.button.focus();
}

const light_confirm_modal = new light_modal("#light-modal-container" , {
    "done" : ".done",
    "cancel" : ".cancel",
    "message" : ".light-modal-message" ,
    "close" : ".cancel,.delete"
});

APP["confirm_light"] = function(args){
    light_confirm_modal.open(args)
}

APP["token"] = function(){
   const tag = document.querySelector("[name='csrf-token']")
   if(tag === null){
       return ""
   }
   return tag.getAttribute("content");
}


//tab
new APP.tab(".tabs")

//flush
new APP.flush("#flush")

//offset
new APP.offset( "#offset-container" , "#main-container" , APP.cookie )

//dropdown
new APP.dropdown(".has-dropdown")

//toggle
new APP.toggle(".toggle")

//choices
new APP.choices("[data-choice='on']")

//screen controll
const sc = new screen_control("#thd-lock");
APP["lock"] = sc.lock;
ApplicationCache["unlock"] = sc.unlock;

//flatpicker
import * as flatpickr from "flatpickr";
import * as confirmDate from "flatpickr/dist/plugins/confirmDate/confirmDate";
flatpickr(".calender", {});
flatpickr(".calendar-time", {
    "enableTime": true,
    "enableSeconds" : true,
    "time_24hr" : true,
    "plugins": [new confirmDate({})]
});


window["APP"] = APP;
