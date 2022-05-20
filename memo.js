// const clipboardText = document.getElementsByTagName('p');
let parentDiv = document.getElementById("paste-area");

const myObj = {
    name: 'Skip',
    age: 2,
    favoriteFood: ['Steak','Unko']
  };

  const myObjStr = JSON.stringify(reading);
//   console.log(myObjStr);
  // "{"name":"Sammy","age":6,"favoriteFood":"Tofu"}"
//   console.log(JSON.parse(myObjStr));
  // Object {name:"Sammy",age:6,favoriteFood:"Tofu"}



addChild = () => {
    var fragment = document.createDocumentFragment();
    var $textbook = 'yatteokitai300';
    for(i=0; i<reading[$textbook]['unit'].length; i++){
        var newElement = document.createElement("p");
        newElement.innerText = reading.yatteokitai300.unit[i];
        
        fragment.appendChild(newElement);
    }
    parentDiv.appendChild(fragment);
}


// -------------------------------------------------------

// 小中高のそれぞれの科目ボタンを生成する処理
const $school_btn = document.querySelectorAll('.school-btn');
const $subject_btn_key = 0;


// 学校のボタンに対してイベントを追加
for(i=0; i<$school_btn.length; i++){
    $school_btn[i].addEventListener('click', function(Event){
        // 学校のidを取得
        let $school_btn_id = Event.target.id;
        // ↑のidを設定した教科ボタンを生成

        createSubjects($school_btn_id);
        // ボタンをsubject-btnクラスに出力
        const $subjects = Object.keys(allSubject[$school_btn_id]);
        console.log($subjects.length);
        
    })
}

function createSubjects($school_btn_id){
    let $target_area = document.querySelector('#subject-btn');
    let $new_subject_btn = document.createElement('button');
    // $new_subject_btn.setAttribute('id',科目の名前);
    

    $target_area.appendChild($new_subject_btn);

    
    // $new_subject_btn.innerText = 

};
// var Object;
// $school = Object.keys(allSubject.highSchoolSubject);

const $schools = Object.keys(allSubject);
const $subjects = Object.keys(allSubject.highSchool);
console.log($subjects.length);

// mapMethod
const members = ["Araki", "Ibata", "Fukutome", "Woods", "Alex", "Tatsunami"];

const dragons_2006_members = members.map((output, index) => {
  return `${index + 1}番目は${output}`;
});

console.log(dragons_2006_members);
// 小中学生の教科ボタンの処理
for(let $j=0; $j<$ms_subject.textbooks.length; $j++){
  // fragmentを生成
  let fragment = document.createDocumentFragment();
  // input要素を生成
  let input = document.createElement("input");
  input.type = "radio";
  input.id = $ms_subject.textbooks[$j].id;
  input.name = "ms-textbook"
  // label要素を生成
  let label = document.createElement("label");
  label.htmlFor = $ms_subject.textbooks[$j].id;
  label.classList.add("normal-btn");
  label.innerHTML = $ms_subject.textbooks[$j].name;

  fragment.appendChild(input);
  fragment.appendChild(label);

  document.getElementById("textbook-btn__container").appendChild(fragment);
};
// {   
//   id:"mc-e-2",
//   title:"",
//   level:"基礎",
//   contents:["","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
// },


// -------------------------------------------------------------------
// const allSubject ={
//   highSchool :{
//                 英語: {
//                         長文読解: {
//                                 yatteokitai300: {
//                                     name: 'やっておきたい英語長文300',
//                                     unit: ['第1,2講','第3,4講']
//                                 },

//                                 yatteokitai500: {
//                                     name: 'やっておきたい英語長文500',
//                                     unit: ['第1講','第2講']
//                                 }
//                         },

//                         文法:{
//                                 leadA:{
//                                     name: 'リードA',
//                                     unit: ['文型','基本時制','完了時制']
//                                 },
                                
//                                 leadB:{
//                                     name: 'リードA',
//                                     unit: ['文型','基本時制','完了時制']
//                                 }
//                         }   
//                 },

//                 数学: {
//                         数1A: {
//                             チャート式_数1A:{

//                             }
//                         }
//                 },
//                 国語: {
//                         現代文: {
//                             極める現代文１:{

//                             }
//                         }
//                 }
//   },

//   middleSchool :{
//       英語:{

//       },
//       国語:{

//       },
//       数学:{

//       },
//       理科:{

//       }
//   }
// };

// const $reading = [
// {
// id:'yatteokitai300',
// name: 'やっておきたい英語長文300',
// age: 2, 
// unit: ['第1,2講','第3,4講','第5,6講']
// },

// {
// id:'yatteokitai500',
// name: 'やっておきたい英語長文500',
// age: 2, 
// unit: ['第1講','第2講']
// }
// ];