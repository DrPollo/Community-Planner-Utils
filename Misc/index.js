import Ziggurat from "node-ziggurat";


// general utils

export class Distribution{
    constructor(){}
    static normal() {
        let z = new Ziggurat();
        let num = z.nextGaussian();
        return Math.max(0,(num+5)/10);
    }
    static uniform() {
        return Math.random();
    }
}

export function toArray(list) {
    if(Array.isArray(list)){return list;}
    if(list instanceof Map){
        return Array.from(list.values());
    }
    if(list instanceof Set){
        return Array.from(list);
    }
    return Array.from(list);
}

export function mapToObject(map) {
    if( map instanceof Map){
        let keys = Array.from(map.keys());
        return keys.reduce((r,v) => {
            r[v]=map.get(v);
            return r;
        }, {});
    }
    return false;
}


export function mergeMaps(map1,map2) {
    let result = new Map(map1);
    // console.log(map1,map2.keys());
    Array.from(map2.keys()).forEach(key=>{
        if(result.has(key)){
            let value = merge( result.get(key) , map2.get(key) );
            result.set(key,value);
        }else{
            result.set(key,map2.get(key));
        }
    });
    return result;
}

export function mergeObjects(o1,o2) {
    let result = Object.assign({},o1);
    Object.keys(o2).forEach(key=>{
        if(!result[key]){
            result[key] = o2[key];
        }else{
            let val = result[key];
            result[key] = merge(val,o2[key]);
        }
    });
    return result;
}

export function merge(e1, e2) {
    if(Array.isArray(e1) && Array.isArray(e2)){
        return e1.concat(e2);
    }
    if(!isNaN(e1) && !isNaN(e2)){
        return e1+e2;
    }
    if(e1 instanceof Object && e2 instanceof Object){
        return Object.assign({},e1,e2);
    }
    return false;
}


// recursive function extracting a value from a nested object
export function extractFromObject(obj,fields) {
    return fields.reduce((partial,field)=>{
        // console.log(partial,field);

        if(!partial || obj[field] === false){
            return false;
        }

        return partial[field];
    },obj);
}