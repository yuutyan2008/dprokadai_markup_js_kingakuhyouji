// 関数内で長くなった要素を関数の外で別の変数に格納
// htmlのタグ情報を取得
const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
// クリックの度に配列に要素を追加して、purchaseを、合計金額ボタンがクリックされるまで保持する
let purchases = [];

function calc() {
  const sum = subtotal();
  //送料算出の処理をcalcPostageFromPurchase()関数に抜き出しているので、calcPostageFromPurchase()関数の値を送料の値としてpostage定数に代入
  const postage = calcPostageFromPurchase(sum);
  window.alert(
    `小計は${sum}円、送料は${postage}円です。合計は${sum + postage}円です`
  );
  purchases = [];
  priceElement.value = "";
  numberElement.value = "";
  //合計金額を表示後に、フォームに残っている選択した商品や数量をリセットするため、値に空文字を代入しています。
  priceElement.value = "";
  numberElement.value = "";
  //   // id="product"の設定された要素を取得しています。
  //   // getElementById("")は、("")の中のidが設定されているHTML要素を取得するためのメソッドです
  //   // valueを追加するとConsoleには、<option>タグのvalue属性が表示される
  //   // 文字列オブジェクトを数値に変換するparseInt()メソッドを使用して数値に変換します。
  //   const price = parseInt(document.getElementById("product").value);
  //   const number = parseInt(document.getElementById("number").value);
  //   // alertでポップアップさせる
  //   window.alert(`${price}円が${number}個。小計は${price + number}円です`);

  //   console.log(typeof price);
  //   console.log(typeof number);
}
function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 2000) {
    return 500;
  } else {
    return 250;
  }
}
function add() {
  const price = priceElement.value;
  const number = numberElement.value;
  let purchase = {
    price: parseInt(price),
    number: parseInt(number),
  };
  let newPurchase = true; //新しい商品の追加なのか、すでに追加済みの商品の追加なのかをtrue/falseで保持する変数

  purchases.forEach((item) => {
    //purchases配列の要素のpriceプロパティを確認し、newPurchase変数の値を書き換えています
    if (item.price === purchase.price) {
      newPurchase = false;
    }
  });
  // 配列に何も入っていない（初回の追加である）または、newPurchase = trueなら
  if (purchases.length < 1 || newPurchase) {
    purchases.push(purchase); //配列に追加
  } else {
    //追加済でないなら、purchases配列を繰り返してpriceプロパティの値が同じものを見つける
    for (let i = 0; i < purchases.length; i++) {
      if (purchases[i].price === purchase.price) {
        //purchases配列に購入数を追加しています
        purchases[i].number += purchase.number;
      }
    }
  }
  window.alert(`${display()}\n小計${subtotal()}円`);
  priceElement.value = "";
  numberElement.value = "";
}
// 確定した小計金額を返却してくれる
function subtotal() {
  let sum = 0;
  // 合計を算出する処理
  for (let i = 0; i < purchases.length; i++) {
    sum += purchases[i].price * purchases[i].number;
  }
  return sum;
}
function display() {
  return purchases
    .map((purchase) => {
      return `${purchase.price}円が${purchase.number}点`;
      //   .join("\n")とすることで、改行で文字列を連結できるため、一行ごとの文字列にあった”\n”を削除できます。このようにすることで、最後の一行の後の不要な改行もなくすことができます。
    })
    .join("\n");
}
// let purchase = {
//   price: price,
//   number: number,
// };
function sleep() {
  console.log("sleep開始");
  const startTime = new Date(); //　--　1.実行時点の時刻を生成
  while (true) {
    // 2. 1で生成した時間から3000ミリ秒経過しないとwhileを抜け出さない
    if (new Date() - startTime > 3000) {
      console.log("sleep終了");
      return;
    }
  }
}

console.log("処理を開始 " + new Date());
sleep();
console.log("処理を終了 " + new Date());
