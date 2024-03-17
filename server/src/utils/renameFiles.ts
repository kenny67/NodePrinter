const fs = require("fs");
const path = require("path");

// const folderPath = "./assets";
const strToFind = "TEST_FILENAME";
const strReplace = "INFO";

const folderPath = "データ";
const dist = path.join(process.env.PWD || process.cwd(), folderPath);
console.log(dist);

// read all files in the directory
let filesArr = fs.readdirSync(dist);

// Loop through array and rename all files 

filesArr.forEach((file, index) => {
  let fullPath = path.join(folderPath, file);
  let fileExtension = path.extname(file);
  let fileName = path.basename(file, fileExtension);
  console.log(fileName);
  // let newFileName = fileName + index + "." + fileExtension;
  let newFileName = fileName.replace(strToFind, strReplace) + "." + fileExtension;
  console.log(newFileName);

  try {
      fs.renameSync(fullPath, path.join(folderPath, newFileName));
    } catch (error) {
      console.error(error)
    }
  console.log('FINISHED to RENAME the file');

}
)
;