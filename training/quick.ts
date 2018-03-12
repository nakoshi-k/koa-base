export default (data : number[]) => {
    const sort = ( start = 0 , end = data.length -1 ) => {
        let pivot = data[Math.floor((start + end)/2)]
        let left = start
        let right = end
        while(true){
            while( data[left] < pivot ){
                left++;
            }
            while( data[right] > pivot ){
                right--;
            }
            if(right <= left){
                break;
            }
            let tmp = data[left];
            data[left] = data[right];
            data[right] = tmp;
            left++;
            right--;
        }
        if(start < left-1){
            sort(start,left-1);
        }

        if( end > right+1){
            sort(right+1,end);
        }
        return data;
        
    }
    return sort();
}