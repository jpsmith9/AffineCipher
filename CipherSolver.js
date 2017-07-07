function initialize(){

  $.ajax("https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english.txt").done(function(data) {
    dictWords = data.split(/[^\w]/);
  });
  $("#go").click(function (){
    decode();
  });
}

var as = [3, 5, 7, 11, 15, 17, 19, 21, 23, 25];
var alphabet ="abcdefghijklmnopqrstuvwxyz"
var dictWords = [];
function decode(){
	var words=$("#scramble").val().split(/[^\w]/);
  var finalArr=[];
  var finalString="";
  for (var a in as){
    var inverse=calcInverse(as[a]);
    for (var b=1;b<27;b++){
      for (var j=0;j<words.length;j++){
        var newWord="";
        for (i=0;i<words[j].length;i++){
          var charCode=alphabet.indexOf(words[j].charAt(i).toLowerCase()) //check position in alphabet string of lowercase letter
          var newCharCode=mod((inverse*(charCode-b)),26) //convert to new string charcode
          var newChar=alphabet.charAt(newCharCode); //convert back to alphabetic code
          newWord +=newChar;
        }
        if (newWord.length<words[j].length) {break}
        if (validate(newWord)===0){break} //stop looping on this sentence if we fail a word
        finalArr[j]=newWord;
      }
      if (finalArr.length==words.length){break}
    }
    if (finalArr.length==words.length){break}
  }
  for (var node in finalArr) {
    finalString +=(finalArr[node] + " ");
  }
  appendResults(finalString);
}
function calcInverse(x){
  for (var i=1;i<26;i++){
    if ((x*i)%26===1){
      return i;
    }
  }
}
function validate(answerWord){
  if(dictWords.indexOf(answerWord) > -1){
    return 1;
  }
  else{
    return 0;
  }
}
function appendResults(text){
  var out = document.createElement("a");
  var string = document.createTextNode(text);
  out.appendChild(string);
  var element = document.getElementById('results');
  element.appendChild(out)
  alert(text);
}
function mod(n, m) {
        return ((n % m) + m) % m;
}
