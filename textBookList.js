// （1）全体の処理の流れ
// オブジェクトの起点は各科目から
// 

// （2）ラジオボタンの仕様について
// 　初期状態からラジオボタンをクリックしたとき
// 1、クリックイベントが発生したボタンに応じて次のボタンを表示させる（＝noneクラスを外す）
// 
// 　その後に他のラジオボタンをクリックした場合
// 1、ラジオボタンが付いたらそれ以下にある項目すべてにnoneクラスを付与する
// 2、クリックイベントが発生したボタンに応じて次のボタンを表示させる（＝noneクラスを外す）
// ※最初はnoneクラスをボタンを囲っているdivに付与する
// 
// （3）単元名を出力するラジオボタンについて
// textbook.jsからfindメソッドを使って単元名のオブジェクトを取得する。
// 二章ずつ出力するラジオボタンを設置。if文で条件分岐にすれば出力できる（かも）
// 
// （4）メンテナンス
// 教材の追加はtextbook.jsとhtmlの書き換えが必要になる。
function removeTable(){
    let $textbook_list = document.getElementById("textbook-list");
    while($textbook_list.firstChild){
        $textbook_list.removeChild($textbook_list.firstChild);
    };
}
function removeTextbookBtn(){
    let $btn_container = document.getElementById("textbook-btn__container");
    while($btn_container.firstChild){
        $btn_container.removeChild($btn_container.firstChild);
    };
};
function removeUnitBtn(){
    let $btn_container = document.getElementById("unit-btn__container");
    while($btn_container.firstChild){
        $btn_container.removeChild($btn_container.firstChild);
    };
    removeTextbookBtn();
    removeTable();
};



const $primary_school_btn = document.getElementById("primarySchool");
const $middle_school_btn = document.getElementById("middleSchool");
const $high_school_btn = document.getElementById("highSchool");

const $ps_subjects_container = document.getElementById("ps-subjects__container");
const $ms_subjects_container = document.getElementById("ms-subjects__container");
const $hs_subjects_container = document.getElementById("hs-subjects__container");
const $unit_btn_container = document.getElementById("unit-btn__container");
const $unit_caption = document.getElementById("unit-caption");

$primary_school_btn.addEventListener("click",function(){
    removeUnitBtn();
    $ps_subjects_container.classList.remove("none");
    $ms_subjects_container.classList.add("none");
    $hs_subjects_container.classList.add("none");
    $unit_caption.classList.add("none");
    $unit_btn_container.classList.add("none");
})
$middle_school_btn.addEventListener("click",function(){
    removeUnitBtn();
    $ps_subjects_container.classList.add("none");
    $ms_subjects_container.classList.remove("none");
    $hs_subjects_container.classList.add("none");
    $unit_caption.classList.add("none");
    $unit_btn_container.classList.add("none");
})
$high_school_btn.addEventListener("click",function(){
    removeUnitBtn();
    $hs_subjects_container.classList.remove("none");
    $ps_subjects_container.classList.add("none");
    $ms_subjects_container.classList.add("none");
    $unit_caption.classList.remove("none");
    $unit_btn_container.classList.remove("none");
})


// 「高校」ボタンの処理-------------------------------------------------------------
// $hs_subjects: 英語、国語、数学、理科、社会の5つのオブジェクト
// $subject_id:　5教科のid
// $hs_subject: 5教科の内、選択した1教科のオブジェクト

const $hs_subjects = document.getElementsByName("hs-subject");

for(let $i=0; $i<$hs_subjects.length; $i++){
    $hs_subjects[$i].addEventListener("click",function(){
        // クリックした科目のidを取得
        let $subject_id = $hs_subjects[$i].id;
        // $hs_subjects_dataの配列の内、配列内のオブジェクトが持つidと
        // 一致する科目のオブジェクトを取得
        let $hs_subject = $hs_subjects_data.find(($subject)=>{
            return $subject.id === $subject_id;
        });

        // unit-btn__containerの中身を全て消す
        removeUnitBtn();
        removeTable();
        // for文で単元のinputとlabel（教科ボタン）を生成
        for(let $j=0; $j<$hs_subject.units.length; $j++){
            // fragmentを生成
            let fragment = document.createDocumentFragment();
            // input要素を生成
            let input = document.createElement("input");
            input.type = "radio";
            input.id = $hs_subject.units[$j].unit_id;
            input.name = "hs-unit";
            // label要素を生成
            let label = document.createElement("label");
            label.htmlFor = $hs_subject.units[$j].unit_id;
            label.classList.add("normal-btn");
            label.innerHTML = $hs_subject.units[$j].unit_name;
            // 生成したinputとlabelをfragmentに入れる
            fragment.appendChild(input);
            fragment.appendChild(label);

            // fragmentをunit-btn__containerにappendChildする
            document.getElementById("unit-btn__container").appendChild(fragment);
            
        };

        // 科目ボタンの処理
        const $hs_units = document.getElementsByName("hs-unit");
        for(let $k=0; $k<$hs_units.length; $k++){
            $hs_units[$k].addEventListener("click",function(){
                
                // $subject_id: 教科のID
                // 科目のIDを取得
                let $unit_id = $hs_subject.units[$k].unit_id;
                // 科目のオブジェクトを取得
                $unit = $hs_subject.units.find((unit)=>{
                    return unit.unit_id === $unit_id;
                });

        // 教材テーブルを作成---------------------------------------
            // テーブルをリセット
            removeTable();
            let $textbook_list = document.getElementById("textbook-list");
        for(let $l=0; $l<$unit.textbooks.length; $l++){
            
            // 教材のIDを取得
            let $textbook_id = $unit.textbooks[$l].id;
            
            // IDから教材のオブジェクトを取得
            $textbook = $unit.textbooks.find((textbook)=>{
                return textbook.id === $textbook_id;
            })
            console.log($textbook.id);

            // trを作る
            let tr = document.createElement("tr");
            tr.classList.add("table-row");
            tr.id = $textbook.id
            // 3つのtdタグを作る

            // title（教材タイトル）
            let td_title = document.createElement("td");
            td_title.classList.add("table__title");
            td_title.innerHTML = $textbook.title;
            
            // content_num（単元数）
            let td_content_num = document.createElement("td");
            td_content_num.classList.add("table__content-num");
            td_content_num.innerHTML = $textbook.contents.length;
            
            // level （教材レベル）
            let td_level = document.createElement("td");
            td_level.classList.add("table__level");
            td_level.innerHTML = $textbook.level;
            // tdのfragmentに入れる
            let td_fragment = document.createDocumentFragment();
            td_fragment.appendChild(td_title);
            td_fragment.appendChild(td_content_num);
            td_fragment.appendChild(td_level);
            // trのfragmentに入れる
            // let tr_fragment = document.createDocumentFragment();
            tr.appendChild(td_fragment);
            // div.textbook-listにtrのフラグメントを出力する

            $textbook_list.appendChild(tr);
            // ---------------------------------------教材テーブルを作成

            // 教材テーブルの操作----------------------------------------------------
            $table_row = document.getElementsByClassName("table-row");
            // 1、教材オブジェクトの取得
            for(let $i=0; $i<$table_row.length; $i++){
                // $table_row = クリックしたテーブルの行
                $table_row[$i].addEventListener("click",()=>{
                // トグルボタン風にする
                let $active_row = document.getElementsByClassName("table-row active");
                if($active_row.length == 1){
                    $active_row[0].classList.remove("active");
                }
                $table_row[$i].classList.toggle("active");

                // 教材のIDを取得
                let $textbook_id = $table_row[$i].id; 
                // ターゲットになる教材のオブジェクトを取得
                $target_textbook = $unit.textbooks.find((textbook)=>{
                    return $textbook_id === textbook.id
                })

                        // 2、textbook-areaに教材のcontentを出力する-----------------
                        // 単元出力先のunit_listに要素があれば消しておく
                        let $unit_list = document.getElementById("unit-list");
                        while($unit_list.firstChild){
                            $unit_list.removeChild($unit_list.firstChild);
                        };
                        
                        for(let $j=0; $j<$target_textbook.contents.length; $j++){
                        // 単元をブチ込む場所を取得
                        
                        
                        // fragmentを生成
                        let fragment = document.createDocumentFragment();
                        // tr要素を生成
                        let tr = document.createElement("tr");
                        tr.classList.add("unit-list__item");
                        // td要素を生成
                        let td = document.createElement("td");
                        td.innerHTML = $target_textbook.contents[$j];
                        td.colSpan = 3;
                        // ↑の要素らを順にネストしていく
                        tr.appendChild(td);
                        fragment.appendChild(tr);
                        $unit_list.appendChild(fragment);
                        console.log(td)
                        }
                });
            }



            // --------------------------------------------------------------教材テーブルの操作
                };
            })
        }
    })
};

// ------------------------------------------------------------「高校」ボタンの処理

// 「中学」ボタンの処理----------------------------------------------------
const $ms_subjects = document.getElementsByName("ms-subject");

for(let $i=0; $i<$ms_subjects.length; $i++){
    $ms_subjects[$i].addEventListener("click",function(){
        let $ms_subject_id = $ms_subjects[$i].id;

        $ms_subject = $ms_subjects_data.find(($subject)=>{
            return $subject.id === $ms_subject_id;
        });

        removeUnitBtn();

        console.log($ms_subject.textbooks)
        // 教材テーブルの生成
        // テーブルをリセット
            removeTable();
            let $textbook_list = document.getElementById("textbook-list");

        for(let $l=0; $l<$ms_subject.textbooks.length; $l++){
            
            // 教材のIDを取得
            let $textbook_id = $ms_subject.textbooks[$l].id;
            
            // IDから教材のオブジェクトを取得
            $textbook = $ms_subject.textbooks.find((textbook)=>{
                return textbook.id === $textbook_id;
            })
            console.log($textbook.id);

            // trを作る
            let tr = document.createElement("tr");
            tr.classList.add("table-row");
            tr.id = $textbook.id
            // 3つのtdタグを作る

            // title（教材タイトル）
            let td_title = document.createElement("td");
            td_title.classList.add("table__title");
            td_title.innerHTML = $textbook.title;
            
            // content_num（単元数）
            let td_content_num = document.createElement("td");
            td_content_num.classList.add("table__content-num");
            td_content_num.innerHTML = $textbook.contents.length;
            
            // level （教材レベル）
            let td_level = document.createElement("td");
            td_level.classList.add("table__level");
            td_level.innerHTML = $textbook.level;
            // tdのfragmentに入れる
            let td_fragment = document.createDocumentFragment();
            td_fragment.appendChild(td_title);
            td_fragment.appendChild(td_content_num);
            td_fragment.appendChild(td_level);
            // trのfragmentに入れる
            // let tr_fragment = document.createDocumentFragment();
            tr.appendChild(td_fragment);
            // div.textbook-listにtrのフラグメントを出力する

            $textbook_list.appendChild(tr);
            // ---------------------------------------教材テーブルを作成
        }

        // 教材テーブルの操作----------------------------------------------------
        $table_row = document.getElementsByClassName("table-row");
        // 1、教材オブジェクトの取得
        for(let $i=0; $i<$table_row.length; $i++){
            // $table_row = クリックしたテーブルの行
            $table_row[$i].addEventListener("click",()=>{
            // トグルボタン風にする
            let $active_row = document.getElementsByClassName("table-row active");
            if($active_row.length == 1){
                $active_row[0].classList.remove("active");
            }
            $table_row[$i].classList.toggle("active");

            // 教材のIDを取得
            let $textbook_id = $table_row[$i].id; 
            // ターゲットになる教材のオブジェクトを取得
            $target_textbook = $ms_subject.textbooks.find((textbook)=>{
                return $textbook_id === textbook.id
            })

                    // 2、textbook-areaに教材のcontentを出力する-----------------
                    // 単元出力先のunit_listに要素があれば消しておく
                    let $unit_list = document.getElementById("unit-list");
                    while($unit_list.firstChild){
                        $unit_list.removeChild($unit_list.firstChild);
                    };
                    
                    for(let $j=0; $j<$target_textbook.contents.length; $j++){
                    // 単元をブチ込む場所を取得
                    
                    
                    // fragmentを生成
                    let fragment = document.createDocumentFragment();
                    // tr要素を生成
                    let tr = document.createElement("tr");
                    tr.classList.add("unit-list__item");
                    // td要素を生成
                    let td = document.createElement("td");
                    td.innerHTML = $target_textbook.contents[$j];
                    td.colSpan = 3;
                    // ↑の要素らを順にネストしていく
                    tr.appendChild(td);
                    fragment.appendChild(tr);
                    $unit_list.appendChild(fragment);
                    console.log(td)
                    }
            });
        }
    });



}
// --------------------------------------------------「中学」ボタンの処理
// 「小学」ボタンの処理----------------------------------------------------
const $ps_subjects = document.getElementsByName("ps-subject");

for(let $i=0; $i<$ps_subjects.length; $i++){
    $ps_subjects[$i].addEventListener("click",function(){
        let $ps_subject_id = $ps_subjects[$i].id;

        console.log($ps_subject_id)
        $ps_subject = $ps_subjects_data.find(($subject)=>{
            return $subject.id === $ps_subject_id;
        });

        removeUnitBtn();

        console.log($ps_subject.textbooks)
        // 教材テーブルの生成
        // テーブルをリセット
            removeTable();
            let $textbook_list = document.getElementById("textbook-list");

        for(let $l=0; $l<$ps_subject.textbooks.length; $l++){
            
            // 教材のIDを取得
            let $textbook_id = $ps_subject.textbooks[$l].id;
            
            // IDから教材のオブジェクトを取得
            $textbook = $ps_subject.textbooks.find((textbook)=>{
                return textbook.id === $textbook_id;
            })
            console.log($textbook.id);

            // trを作る
            let tr = document.createElement("tr");
            tr.classList.add("table-row");
            tr.id = $textbook.id
            // 3つのtdタグを作る

            // title（教材タイトル）
            let td_title = document.createElement("td");
            td_title.classList.add("table__title");
            td_title.innerHTML = $textbook.title;
            
            // content_num（単元数）
            let td_content_num = document.createElement("td");
            td_content_num.classList.add("table__content-num");
            td_content_num.innerHTML = $textbook.contents.length;
            console.log($textbook.content_num)
            
            // level （教材レベル）
            let td_level = document.createElement("td");
            td_level.classList.add("table__level");
            td_level.innerHTML = $textbook.level;
            // tdのfragmentに入れる
            let td_fragment = document.createDocumentFragment();
            td_fragment.appendChild(td_title);
            td_fragment.appendChild(td_content_num);
            td_fragment.appendChild(td_level);
            // trのfragmentに入れる
            // let tr_fragment = document.createDocumentFragment();
            tr.appendChild(td_fragment);
            // div.textbook-listにtrのフラグメントを出力する

            $textbook_list.appendChild(tr);
            // ---------------------------------------教材テーブルを作成
        }

        // 教材テーブルの操作----------------------------------------------------
        $table_row = document.getElementsByClassName("table-row");
        // 1、教材オブジェクトの取得
        for(let $i=0; $i<$table_row.length; $i++){
            // $table_row = クリックしたテーブルの行
            $table_row[$i].addEventListener("click",()=>{
            // トグルボタン風にする
            let $active_row = document.getElementsByClassName("table-row active");
            if($active_row.length == 1){
                $active_row[0].classList.remove("active");
            }
            $table_row[$i].classList.toggle("active");

            // 教材のIDを取得
            let $textbook_id = $table_row[$i].id; 
            // ターゲットになる教材のオブジェクトを取得
            $target_textbook = $ps_subject.textbooks.find((textbook)=>{
                return $textbook_id === textbook.id
            })

                    // 2、textbook-areaに教材のcontentを出力する-----------------
                    // 単元出力先のunit_listに要素があれば消しておく
                    let $unit_list = document.getElementById("unit-list");
                    while($unit_list.firstChild){
                        $unit_list.removeChild($unit_list.firstChild);
                    };
                    
                    for(let $j=0; $j<$target_textbook.contents.length; $j++){
                    // 単元をブチ込む場所を取得
                    
                    
                    // fragmentを生成
                    let fragment = document.createDocumentFragment();
                    // tr要素を生成
                    let tr = document.createElement("tr");
                    tr.classList.add("unit-list__item");
                    // td要素を生成
                    let td = document.createElement("td");
                    td.innerHTML = $target_textbook.contents[$j];
                    td.colSpan = 3;
                    // ↑の要素らを順にネストしていく
                    tr.appendChild(td);
                    fragment.appendChild(tr);
                    $unit_list.appendChild(fragment);
                    console.log(td)
                    }
            });
        }
    });



}
// --------------------------------------------------「小学」ボタンの処理
