import {createConnection} from "typeorm";
import entities from "../entities"

export default class model{
    protected table_name = "test";

    connection = () => {
        return createConnection()
    }
    
    repository = async () => {
        let connection = await this.connection();
        return connection.getRepository(entities[ this.table_name ]);
    }


}