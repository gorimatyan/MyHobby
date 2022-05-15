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
                let $unit = $hs_subject.units.find((unit)=>{
                    return unit.unit_id === $unit_id;
                });
                console.log($unit.textbooks);
                
            })
        };


        // console.log($hs_subjects[0].id);
    })
};

// ------------------------------------------------------------「高校」ボタンの処理

// 「小学」「中学」ボタンの処理----------------------------------------------------
const $ms_subjects = document.getElementsByName("ms-subject");

for(let $i=0; $i<$ms_subjects.length; $i++){
    $ms_subjects[$i].addEventListener("click",function(){
        let $ms_subject_id = $ms_subjects[$i].id;

        var $ms_subject = $ms_subjects_data.find(($subject)=>{
            return $subject.id === $ms_subject_id;
        });

        removeUnitBtn();
        for(let $i=0; $i<$ms_subject.textbooks.length; $i++){
            // fragmentを生成
            let fragment = document.createDocumentFragment();
            // input要素を生成
            let input = document.createElement("input");
            input.type = "radio";
            input.id = $ms_subject.textbooks[$i].id;
            input.name = "ms-textbook"
            // label要素を生成
            let label = document.createElement("label");
            label.htmlFor = $ms_subject.textbooks[$i].id;
            label.classList.add("normal-btn");
            label.innerHTML = $ms_subject.textbooks[$i].name;

            fragment.appendChild(input);
            fragment.appendChild(label);

            document.getElementById("textbook-btn__container").appendChild(fragment);
        };
    });



}
// --------------------------------------------------「小学」「中学」ボタンの処理

// 教材テーブルの操作----------------------------------------------------
$table_row = document.getElementsByClassName("table-row");
console.log($table_row.length);

    for(let $i=0; $i<$table_row.length; $i++){
        $table_row[$i].addEventListener("click",()=>{
            let $active_row = document.getElementsByClassName("table-row active");
            console.log($active_row);
            if($active_row.length == 1){
                $active_row[0].classList.remove("active");
            }
            
            $table_row[$i].classList.toggle("active");
        });
    }



// --------------------------------------------------教材テーブルの操作