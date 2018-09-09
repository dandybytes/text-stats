class Text {
  constructor(str) {
    this.text = str;
    this.wordArr = this.text.split(" ");
    this.wordCount = this.wordArr.length;
    this.characterArr = this.text.split("");
    this.charCount = this.text.length;
    this.letterArr = this.characterArr.filter(c => c.match(/[a-zA-Z]/));
    this.lettCount = this.letterArr.length;
    this.lettFreqObj = this.letterArr.reduce((obj, letter) => {
      letter = letter.toLowerCase();
      letter in obj ? obj[letter]++ : obj[letter] = 1;
      return obj;
    },{});
    this.lettFreqChart = Object.keys(this.lettFreqObj).map(key => [key, this.lettFreqObj[key]]).sort((a, b) => b[1] - a[1]);
  }
}


const doc = document;
const wordCount = doc.querySelector('#word-count-value');
const numChar = doc.querySelector('#num-char-value');
const numLett = doc.querySelector('#num-lett-value');
const textInput = doc.querySelector('#text-input');


textInput.addEventListener('keyup', function(e) {
  const text = new Text(e.target.value);
  
  wordCount.textContent = text.wordCount;
  numChar.textContent = text.charCount;
  numLett.textContent = text.lettCount;

  console.log(text.lettFreqObj);
  console.log(text.lettFreqChart);
})