
 export const cardFormat=(e, setBill)=>{
    const p = e.target.value
    const v = p.replace(/\s+/g, "")
        .replace(/[^0-9]/gi, "")
        .substring(0, 16);
    const parts = []
    for(let i =0; i<v.length;i+=4){
        parts.push(v.substring(i, i+4));
    }
    parts.length >1? setBill(parts.join('-')):setBill(p)
}