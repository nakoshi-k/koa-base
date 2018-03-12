export default class stack{
    private data = []
    
    push = (value) => {
        this.data.push(value)
        return value
    }

    pop = () => {
        return this.data.pop();
    }

    top = () => {
        return this.data[this.data.length - 1]
    }

    size = () => {
        return this.data.length
    }
    
    empty = () => {
        return this.data.length == 0;
    }
}