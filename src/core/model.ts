import {createConnection} from "typeorm";
export default class model{

    connection = () => {
        return createConnection()
    }
        
}