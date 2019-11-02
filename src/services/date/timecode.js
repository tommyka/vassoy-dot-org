
const numberfix = (numb, digs = 2) => {
  let numstr = String(numb);

  while (numstr.length < digs) {
    numstr = '0'+numstr;
  }

  return numstr;
}

export const Today = () => {
  const now = new Date();
  return `${now.getFullYear()}${numberfix(now.getMonth()+1)}${numberfix(now.getDate())}`;
}