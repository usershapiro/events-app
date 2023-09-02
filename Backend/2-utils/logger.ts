import fsPromises from "fs/promises"

async function logger(msg:string){

    const now = new Date()
    let line=`${now.toLocaleString()} \t ${msg}`
    line += "----------------------------------------------\n"
    await fsPromises.appendFile("./logger.txt",line)
}
export default logger