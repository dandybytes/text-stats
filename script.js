class Text {
  constructor(str) {
    this.text = str;
    this.wordArr = this.text.split(" ").filter(word => word.length > 0);
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
const statListCont = doc.querySelector('.stats-row2');


const createElement = (tag, className, text) => {
  const el = doc.createElement(tag);
  if(className) el.className = className;
  if(text) el.textContent = text;
  return el;
};


const renderList = (statList, lettCount) => {
  statListCont.innerHTML = "";
  let topFreqNum = statList.length < 5 ? statList.length : 5;
  if(topFreqNum > 0) {
    const listTitle = createElement("h3", "stat-list-title", `top ${topFreqNum} most frequent letters:`);
    statListCont.appendChild(listTitle);
    const ordList = createElement("ol", "stat-list");
    for(let i = 0; i < topFreqNum; i++) {
      let lett = statList[i][0].toUpperCase();
      let freq = (100 * statList[i][1] / lettCount).toFixed(2);
      let li = createElement("li", "stat-item", `${lett}: ${freq}% *`);
      ordList.appendChild(li);
    }
    statListCont.appendChild(ordList);
    const comment = createElement("p", "comment", "* percent of all letters");
    statListCont.appendChild(comment);
  }
};


textInput.addEventListener('keyup', function(e) {
  const text = new Text(e.target.value);
  
  wordCount.textContent = text.wordCount;
  numChar.textContent = text.charCount;
  numLett.textContent = text.lettCount;

  renderList(text.lettFreqChart, text.lettCount);
});