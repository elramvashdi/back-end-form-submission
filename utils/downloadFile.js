export const downloadFile =  (url,fileName) =>{
  return `
    const aTag = document.createElement('a');
    aTag.href = ' ${url} '
    aTag.setAttribute('download', ' ${fileName} ')
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
    `
    }