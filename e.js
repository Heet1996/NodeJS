// const ejsLint = require('ejs-lint');

// console.log(ejsLint('views/admin/edit-product.ejs'));

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this._capacity = capacity;
    this._usage = [];
    this._cache = {};
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function(key) {

if(this._cache[key])
{
    
    this._usage.splice(this._usage.findIndex((val)=>key==val),1);
    this._usage.push(key);
    return this._cache[key];
}
else return -1;
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function(key, value) {
   
    if(this._cache[key])
    {
        this._cache[key]=value;
        let num=this._usage.shift();
        this._usage.push(key);
        
    }
    else{
        if(Object.keys(this._cache).length>=this._capacity)
        {
            let num=this._usage.shift();
            delete this._cache[num];
            
        }
    
        this._usage.push(key);
        this._cache[key]=value;
    }
    
        
    
};



// Your LRUCache object will be instantiated and called as such:
//["LRUCache","put","put","get","put","get","put","get","get","get"]
//[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]
 var obj = new LRUCache(2)
 console.log(obj.get(2));
 obj.put(2,6);
 console.log(obj.get(1));
 obj.put(1,5);
 
 obj.put(1,2);
 console.log(obj.get(1));
 console.log(obj.get(2));
 
 
