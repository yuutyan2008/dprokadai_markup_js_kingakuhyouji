window.onload = function() {
    // document.formsでHTMLの中のform要素が HTMLCollectionオブジェクト として取得できる
    // HTMLCollectionオブジェクトの特徴であるhtml要素(form)の取得が可能
    const forms = document.forms;
    // elementsプロパティを参照することで、フォームの中の<input>タグや<textarea>タグの要素などを取得することができます。
    console.log(forms[0].elements);
  };
  // 送信ボタンをクリックした時のイベントハンドラ
  function confirmSubmit() {
    const forms = document.forms;
    forms[0].onsubmit = function(){
      const name = forms[0].name.value; // お名前欄の内容を取得してname変数に格納する処理
      // confirm()メソッドは「OK」ボタンをクリックした時はtrueが、「キャンセル」ボタンをクリックした時はfalseが返る
      if (!(confirm("${name}さん、本当に送信しますか？"))) {
        alert("キャンセルされました");
        return false;
      }
    };
  };
  
  window.onload = confirmSubmit;