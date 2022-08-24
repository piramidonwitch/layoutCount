var list = document.querySelector('.todo-list');
var items = list.children;
// var list_2 = document.querySelector('.todo-list_2');
// var items_2 = list_2.children;
var newItemForm = document.querySelector('.add-form');
var newItemRun = newItemForm.querySelector('.add-form-input');
var totalCount = newItemForm.querySelector('.total-count');
var printRunTemplate = document.querySelector('#printRun-template').content;
var newItemTemplate_1 = printRunTemplate.querySelector('.todo-list-item');
var printCountTemplate = document.querySelector('#printCount-template').content;
var newItemTemplate_2 = printCountTemplate.querySelector('.todo-list-item');
var hiddenItom = document.querySelector('.outBlock');
var progon = hiddenItom.querySelector('.progon');

var toggleHidden = function () {
  if (items.length > 0) {
    hiddenItom.classList.remove('hidden');
  } else {
    hiddenItom.classList.add('hidden');
  }
};


var remover = function (item) {
  var box = item.querySelector('.todo-list-input');
  box.addEventListener('click', function () {
    item.remove();
    createArrs();
    createCountList();
    toggleHidden();
    console.log(createArrs())

  });
};



var createArrs = function () {
  var sum = 0;
  var arr = [];
  var arr_2 = [];
  for (var i = 0; i < items.length; i++) {
    var totalCountValue = totalCount.value;
    var element = Number(items[i].querySelector('span').innerHTML);
    sum += element;
    arr[i] = element;
    for (var j = 0; j < arr.length; j++) {
      arr_2[j] = arr[j] / sum * totalCountValue;

    }
  }
  return arr_2;
}

newItemForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var inputPrintRun = newItemRun.value; //считал данные из поля ввода
  var printRunClone = newItemTemplate_1.cloneNode(true); //клонировал темплейт
  var printRunPlace = printRunClone.querySelector('span'); //нашёл место образования данных
  printRunPlace.textContent = inputPrintRun; //присвоил этому месту введённый тираж
  remover(printRunClone);
  list.appendChild(printRunClone); //добавил клон на страницу  
  newItemRun.value = ''; //обнулил инпут формы
  createCountList();
  toggleHidden();
  console.log(createArrs());
});

var progonCount = function(){
  for (var i = 0; i < items.length; i++) {
    var element = Number(items[i].querySelector('span').innerHTML);
    var prg = element/createArrs()[i];
  }
  return prg;
}

var createCountList = function () {
  // for (i = 0; i < createArrs().length; i++){
  //   var clonElement_2 = newItemTemplate_2.cloneNode(true);
  //   var printCountPlace = clonElement_2.querySelector('span');
  //   printCountPlace.textContent = createArrs()[i];
  //   list_2.appendChild(clonElement_2);

  let out_arr = document.querySelector('.out_arr');
  let str = ' ';
  for (let i = 0; i < createArrs().length; i++) {
    var inputItemNum = Number(items[i].querySelector('span').innerHTML);
    str += inputItemNum + ' - ' + (createArrs()[i]).toFixed(1) + ' шт' + '<br>';
  }
  out_arr.innerHTML = str;
  progon.innerHTML = 'Прогон:' + ' ' + Math.ceil(progonCount()) + '' + 'листов';
}


