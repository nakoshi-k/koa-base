
class paiza{

    private data = []
    private first_key = {} 
    private key = {} 
    private index = 1

    constructor( text , first_key = [ "first" , "second" , "third" ] , key = [ "first" , "second" ] ){
        this.data = text.split("\n")
        const first = this.data[0]
        
    }

    first = ( key : string ) => {
        return this.data[0][ this.first_key[ key ] ]
    }

    next = () => {
        let value = this.data[this.index]
        this.index++
        return { "value" : value, "done" : false }
    }
    
}