export const downloadFile =  (url,fileName) =>{
  return `
    fetch('${url}').then(data => {
      data.blob().then((blobFile)=> {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blobFile);
        a.setAttribute("download", '${fileName}');
        a.click();
        a.remove();
      }
    );
    });
  `
    }