export default class queue{
    private data = []
    
    push = (value) => {
        this.data.push(value)
        return value
    }
    
    pop = () => {
        return this.data.shift()
    }
    
    front = () => {
        return this.data[0]
    }

    size = () => {
        return this.data.length
    }
    
    empty = () => {
        return this.data.length == 0;
    }

}