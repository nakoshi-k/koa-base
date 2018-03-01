import {createConnection} from "typeorm"
import entities from "../entities"
import query from "./query"

export default class service{
    protected _table = "test";
    private query;
    
    constructor(){
        this.query = new query();
    }

    protected get table(){
        return this._table;
    }

    connection = () => {
        return createConnection()
    }
    
    repository = async () => {
        let connection = await this.connection();
        return connection.getRepository(entities[ this.table ]);
    }

    create = () => {
        return new entities[ this.table ]();
    }
    
    save = async (entity) => {
        let repository = await this.repository();
        return repository.save(entity);
    }

    where = () => {
        this.query.where();
        return this;        
    }

    limit = () => {
        this.query.limit();
        return this;        
    }

    offset = () => {
        this.query.limit();
        return this;
    }

}