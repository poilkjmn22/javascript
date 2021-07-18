export function camelCase(word){
  let res = word.replace(/[^a-zA-Z]+([a-zA-Z])/g, (all, letter) => { 
    // console.log(all)
    return letter.toUpperCase() 
  })
  return res.replace(/^[A-Z]/, all => all.toLowerCase())
}
