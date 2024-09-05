// 関数内で長くなった要素を関数の外で別の変数に格納
// htmlのタグ情報を取得
// selectタグのid="product"でタグの情報を取得
const priceElement = document.getElementById("product");//ユーザ購入商品と値段
const numberElement = document.getElementById("number");//ユーザ購入数

// クリックの度に配列に要素を追加して、purchaseを、合計金額ボタンがクリックされるまで保持する
let purchases = [];//ユーザの購入データの最終格納先。purchaseに一時保管されたデータの格納先
let data = [//dataは商品在庫データ。ここから一致する商品を選ぶ
  {
    id: 1,
    name: "オリジナルブレンド200g",
    price: 500,
  },

  {
    id: 2,
    name: "オリジナルブレンド500g",
    price: 900,
  },
  {
    id: 3,
    name: "スペシャルブレンド200g",
    price: 700,
  },
  {
    id: 4,
    name: "スペシャルブレンド500g",
    price: 1200,
  },
];
/// データベースの代わりに連想配列を定義する



function display() {
  return purchases
    .map(function (purchase) {
      return `${purchase.name} ${purchase.price}円:${purchase.number}点`;
    })
    //.join("\n")とすることで、改行で文字列を連結できるため、一行ごとの文字列にあった”\n”を削除できる。このようにすることで、最後の一行の後の不要な改行もなくすことができる。
    .join("\n");
}

//ユーザ入力商品を保管する処理
function add() {
  const product_id = priceElement.value; // HTMLのselect要素から選ばれた商品のIDを取得
  const number = numberElement.value;//HTMLのinput要素から入力された数量を取得

  /// 商品在庫のdataからproduct_idをキーにして 名前と価格を取得、
  const found = data.find(function (elem) {
    if (elem.id == product_id) {//商品dataと入力フォームから取得したproduct_idが一致するか確認、その時のelemをfoundに格納
      return true;
    } else {
      return false;
    }
  });
//商品在庫のdataから商品を選び、一時的にpurchaseに格納
  let purchase = {
    name: found.name,
    price: parseInt(found.price),//整数に変換
    number: parseInt(number),
  };


  let newPurchase = true; //新しい商品の追加なのか、すでに追加済みの商品の追加なのかをtrue/falseで判定する
  purchases.forEach((item) => {
    //既にかごに追加済の商品の値段と一致するなら、新規追加ではないのでnewPurchase変数の値をfalseに書き換え
    if (item.price === purchase.price) {//カゴと一時カゴの値段が一致しないなら新規購入ではない
      newPurchase = false;
    }
  });
  // 配列に何も入っていない（初回の追加である）または、newPurchase = trueなら
  if (purchases.length < 1 || newPurchase) {
    purchases.push(purchase); //配列に追加
  } else {
    //追加済なら、purchases配列を繰り返してpriceプロパティの値が同じものを見つける
    for (let i = 0; i < purchases.length; i++) {
      if (purchases[i].price === purchase.price) {
        //purchases配列に購入数を追加
        purchases[i].number += purchase.number;
      }
    }
  }
  window.alert(`${display()}\n小計${subtotal()}円`);//alert表示
  priceElement.value = "";//  //フォームに残っている選択した商品や数量をリセットするため、値に空文字を代入。
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

//送料の計算
function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 2000) {
    return 500;
  } else {
    return 250;
  }
}

function calc() {
  const sum = subtotal();
  //送料算出の処理calcPostageFromPurchase()関数の値を送料の値としてpostage定数に代入
  const postage = calcPostageFromPurchase(sum);
  window.alert(
    `小計は${sum}円、送料は${postage}円です。合計は${sum + postage}円です`
  );
  purchases = [];
  //合計金額を表示後に、フォームに残っている選択した商品や数量をリセットするため、値に空文字を代入。
  priceElement.value = "";
  numberElement.value = "";
}
