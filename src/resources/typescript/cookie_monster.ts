
export default class cookie_monster{
    
    public store : object;
    private base : string;
    private path : string;
    private expires : number;
    
    constructor(base , path = "" , expires = 0 ){
        this.store = {}
        this.base = base
        this.path = path
        this.expires = expires
        this.init(base)
    }

    public set = (data) => {
        this.store_data(data);
        this.set_cookie();   
    }

    private set_cookie = () => {
        let cookie_string = this.base + "=" + new String(  encodeURIComponent( JSON.stringify(this.store) ) ) ;
        if(this.expires !== 0 ){
            let da = new Date();
            da.setSeconds( da.getSeconds() + this.expires ); 
            cookie_string += ";expires=" + da.toUTCString();
        }
        
        if(this.path !== ""){
            cookie_string += ";path=" + this.path;
        }
        document.cookie = cookie_string;
    }
    
    public remove = (path : string) => {
        const list = path.split(".");
        const co = list.length;
        let prev = this.store;
        for(let i = 0;i < co ; i++ ){
            let key = list[i];
            if( typeof prev[key] === "undefined"){
                break;   
            }
            if( i === (co - 1) ){
                delete prev[key];
                break;
            }
            if( typeof prev[key] === "object" ){
                prev = prev[key];
            }
        }
        this.set_cookie();
    }

    public get = (path) => {
        const list = path.split(".");
        const co = list.length;
        let prev = this.store;
        for(let i = 0;i < co ; i++ ){
            let key = list[i];
            if( typeof prev[key] === "undefined"){
                return "";   
            }
            if( i === (co - 1) ){
                return prev[key];
            }
            if( typeof prev[key] === "object" ){
                prev = prev[key];
            }
        }

    }


    private init = (base) => {
        let data = this.cookie_perse(document.cookie);
        if(typeof data[base] === "undefined"){
            this.store = {};
            return;
        }
        this.store = this.base_perser(data[base]);
    }


    private base_perser = (str:string) => {
        let decode = decodeURIComponent(str);
        return JSON.parse(decode);
    }

    private deep_merge : (n_o : object ,o_o : object ) => object = ( n_o , o_o ) => {
        for( let k in n_o){
            if( typeof o_o[k] === "undefined"){
                o_o[k] = n_o[k];
                continue;
            }
            if( typeof o_o[k] === "object" ){
                o_o[k] = this.deep_merge( o_o[k] , n_o[k]);
            }
            o_o[k] = n_o[k];
        }
        return o_o;
    }

    private cookie_perse = (str : string ) => {
        let d = str.split(/[;\s]+/);
        let data = {};
        for(let k in d){
            let dd = d[k].split("=");
            data[ dd[0] ] = dd[1]; 
        }
        return data;
    }

    private store_data = (data:object) => {
        this.store = this.deep_merge( this.store , data);
    }

}