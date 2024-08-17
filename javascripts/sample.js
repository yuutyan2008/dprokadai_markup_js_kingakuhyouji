function addElement() {
  // createElement("p"):HTML文書にはない要素をノードとして作成
  const element = document.createElement("p");
  console.log(element)
};

window.onload = addElement;