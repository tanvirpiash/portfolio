export const displayDialogue = (text, onDisplayEnd) => {
   const dialogueUI = document.getElementById('textbox-container');
   const dialogue = document.getElementById('dialogue');
   dialogueUI.classList.toggle('hidden');
   let index = 0;
   let currentText = '';
   const intervalRef = setInterval(() => {
      if (index < text.length) {
         currentText += text[index];
         dialogue.innerHTML = currentText;
         index++;
         return;
      }
      clearInterval(intervalRef);
   }, 5);

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
