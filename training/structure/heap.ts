export default class heap{
    private data = [];
    private _size = 0;
    
    push = (value ) => {
       let k = this._size++;
        while( 0 < k ) {
            let p = Math.floor( (k - 1) / 2 );
            
            if( this.data[p] <= value ) break;
            
            this.data[k] = this.data[p];
            k = p;
        }
        this.data[k] = value
    }

    pop = () => {
        var ret = this.data[0];
        var x = this.data[--this._size];

        var k = 0;
        while( k * 2 + 1 < this._size ) {
        var a = k * 2 + 1;
        var b = k * 2 + 2;
        if( b < this._size && this.data[b] < this.data[a] ) a = b;

        if( x <= this.data[a] ) break;

        this.data[k] = this.data[a];
        k = a;
        }
        this.data[k] = x;
        return ret;
    }

    size = () => {
        return this._size
    }
    
}