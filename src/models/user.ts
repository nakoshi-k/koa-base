import model from "../core/model"
import entity from "../entities/user"
export default class user extends model{

    repository = async () => {
        let connection = await this.connection();
        return connection.getRepository(entity);
    }


}