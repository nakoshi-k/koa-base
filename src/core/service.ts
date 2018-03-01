import {createConnection} from "typeorm"
import entities from "../entities"
import query from "./query"

export default class service{
    protected _table = "test";
    private query : query;
    
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

    where = (...params) => {
        this.query.where(...params);
        return this;        
    }
    
    limit = (...params) => {
        this.query.limit(...params);
        return this;        
    }
    
    offset = (...params) => {
        this.query.offset(...params);
        return this;
    }
    
    get = async () => {
        let repository = await this.repository();
        return repository.find(this.query.build());
    }

    entity = async () => {

    }
    
    entities = async () => {

    }

}