document.getElementById('btn-import-js').addEventListener('click', sum)

async function sum() {
  const {default : value} = await import('./moduleImport.js')
  console.log(value)
}
