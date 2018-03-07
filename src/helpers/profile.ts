import {helper} from "../core"
import * as fs from "fs"
import * as path from "path"

export default class profile extends helper{
    private profile : {name?:string} = {};
    constructor(profile){
        super();
        this.profile = profile;
    }
    get name(){
        return this.profile.name
    }
}
