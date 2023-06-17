const terminal = document.querySelector(".terminal");
const input = document.querySelector(".input input");
const inputSpan = document.querySelector(".input span");
const output = document.querySelector(".output");

let isWriting = false;
let username = localStorage.getItem("username");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const userInput = input.value.trim();
    if (userInput !== "" && username === null) {
      username = userInput;
      localStorage.setItem("username", username);
      typeMessage(`Hoşgeldin, ${username}!`, () => {
        typeMessage("Buraya gelmeni uzun zamandır bekliyorduk.", () => {
          input.value = "";
          input.disabled = true;
        });
      });
    }
  } else {
    inputSpan.classList.add("writing");
    inputSpan.style.animationPlayState = "running";
    isWriting = true;
  }
});

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    inputSpan.classList.remove("writing");
    inputSpan.style.animationPlayState = "paused";
    isWriting = false;
  }
});

input.addEventListener("input", () => {
  if (!isWriting) {
    inputSpan.style.animationPlayState = "running";
  }
});

// Yazıları yavaşça yazdırmak için fonksiyon
function typeMessage(message, callback) {
  const characters = message.split("");
  let charIndex = 0;
  const messageOutput = document.createElement("div");
  output.appendChild(messageOutput);

  const printCharacter = () => {
    messageOutput.innerHTML += characters[charIndex];
    output.scrollTop = output.scrollHeight;
    charIndex++;
    if (charIndex < characters.length) {
      setTimeout(printCharacter, 50);
    } else {
      callback();
    }
  };

  printCharacter();
}

// Sıfırlama butonunu seçme
const resetButton = document.querySelector('.reset-button');

// Sıfırlama butonuna tıklanma olayını dinleme
resetButton.addEventListener('click', function() {
  // localStorage'deki kullanıcı adını silme
  localStorage.removeItem('username');
  // Sayfayı yenileme
  location.reload();
});

// Kullanıcı adı kaydedildikten sonra mesaj gönderme
if (username !== null) {
  const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
  typeMessage(`Hoşgeldin, ${formattedUsername}!`, () => {
    typeMessage("Buraya gelmeni uzun zamandır bekliyorduk.", () => {
      input.value = "";
      input.disabled = true;
    });
  });
}

// Terminali büyültme/küçültme butonunu seçme
const expandButton = document.querySelector(".expand-button");

let isExpanded = false;

expandButton.addEventListener("click", () => {
  if (isExpanded) {
    terminal.classList.remove("expanded");
    expandButton.classList.remove("expand");
  } else {
    terminal.classList.add("expanded");
    expandButton.classList.add("expand");
  }
  isExpanded = !isExpanded;
});
