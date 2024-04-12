import { marked } from 'marked';
export const displayDialogue = async (text, onDisplayEnd) => {
   const dialogueUI = document.getElementById('textbox-container');
   const dialogue = document.getElementById('dialogue');
   dialogueUI.classList.toggle('hidden');
   let intervalRef;
   try {
      const contents = await (await fetch(`./content/${text}.md`)).text();
      const html = marked.parse(contents);
      let index = 0;
      let currentText = '';
      intervalRef = setInterval(() => {
         if (index < html.length) {
            currentText += html[index];
            dialogue.innerHTML = currentText;
            index++;
            return;
         }
         clearInterval(intervalRef);
      }, 10);
   } catch (error) {
      console.log(error);
   }

   const closeBtn = document.getElementById('close');

   function onCloseBtnClick() {
      onDisplayEnd();
      dialogueUI.classList.toggle('hidden');
      dialogue.innerHTML = '';
      clearInterval(intervalRef);
      closeBtn.removeEventListener('click', onCloseBtnClick);
   }

   closeBtn.addEventListener('click', onCloseBtnClick);
};

export const setCamScale = (k) => {
   const resizeFactor = k.width() / k.height();
   if (resizeFactor < 1) {
      k.camScale(k.vec2(1));
      return;
   }
   k.camScale(k.vec2(1.5));
};
