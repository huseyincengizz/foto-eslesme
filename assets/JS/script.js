let puanText = document.getElementById('puanText');
puan = 0;

puanText.innerHTML = "0"

const kartTemplate = `
    <div class="kart-cerceve">
        <div class="kart-onyuz">
            <img src="https://via.placeholder.com/100x100?text=?">
        </div>

        <div class="kart-arkayuz">
            <img src="">
        </div>
    </div>
`;

    let randomNum = function() {
    let randomArray = [];
    let numbers = [];
  
    for (let i = 1; i <= 99; i++) {
      numbers.push(i);
    }
  
    for (let i = 0; i < 4; i++) {
      
      let randomNumber = Math.floor(Math.random() * numbers.length);
      let number = numbers[randomNumber];
  
      
      randomArray.push(number, number);
      numbers.splice(randomNumber, 1); 
  
      randomNumber = Math.floor(Math.random() * numbers.length);
      number = numbers[randomNumber];
  
      randomArray.push(number, number);
      numbers.splice(randomNumber, 1);
    }
  
    return randomArray;
  };
  
  const fotoNumaralari = randomNum();
  console.log(fotoNumaralari);
  

for (fotoNumara of fotoNumaralari) {
    const yenikart = document.createElement("div");
    yenikart.innerHTML = kartTemplate;
    yenikart.classList.add("kart");
    yenikart.querySelector(".kart-arkayuz img").src = `https://lipsum.app/id/${fotoNumara}/100x100`;
    document.querySelector("div#oyun-cerceve").append(yenikart);

    //Her bir karta tıklandığında "kartTiklama" fonksiyonu çalışacak.
    yenikart.addEventListener("click", kartTiklama);
}

function kartTiklama(olay) {
    //Tıklanan kartı seçilen olarak değişkene atayalım
    const secilenKart = olay.currentTarget;

    //Tıklanan kart eslesti classına sahipse daha önce başka kartla eşleşmiş ve zaten açık durumda demektir, işlem yapmayacağız.
    if (secilenKart.classList.contains("eslesti") === true) {
        return;
    }

    //Tıklanan ve açılan karta tekrar tıklanırsa işlem yapmayacağız.
    if (secilenKart.classList.contains("acik") === true) {
        return;
    }

    //Peşpeşe kartlara tıklandığında 2'den fazla kart tıklanmasını engellememiz gerekiyor.
    const tumAcikKartlar = document.querySelectorAll(".acik");
    if (tumAcikKartlar.length === 2) {
        return;
    }

    //Açık olan kart varsa seçelim.
    const acikKart = document.querySelector(".acik");

    //Hiç açık kart yoksa tıklanan karta açık class veriyoruz ve fonksiyondan çıkıyoruz.
    if (acikKart === null) {
        secilenKart.classList.add("acik");

        setTimeout(
            () => {
                secilenKart.classList.remove("acik");
            }, 1500
        );
        return;
    }

    //Daha önce bir açık kartımız varmış, son seçilen karta da açık class vererek tersini çevirelim.
    secilenKart.classList.add("acik");

    //Açık kartlara ait img etiketlerinin src görsel dosyaları eşleşiyor mu?
    const acikKartImg = acikKart.querySelector(".kart-arkayuz img");
    const secilenKartImg = secilenKart.querySelector(".kart-arkayuz img");

    if (acikKartImg.src === secilenKartImg.src) {
        //İki açık kart arasında eşleşme var.
        acikKart.classList.add("eslesti");
        secilenKart.classList.add("eslesti");

        puan++;

        console.log(puan);

        puanText.innerHTML = puan;

        if (puan == 8){
            var congrats = document.createElement('img');
            congrats.src = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTdkZTY4ODQ3MjQ5YjQ0MzZlN2RjY2YxNWQxOTliNDhjYWFjODAxNCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/0bBGQgpJTUfTVzY6Xo/giphy.gif" 
            imageShow = document.querySelector('body').appendChild(congrats);
            console.log("Tebrikler");

            setTimeout(function(){
                imageShow.remove();
                console.log("Image Deleted");
            }, 5000);
        }

        acikKart.classList.remove("acik");
        secilenKart.classList.remove("acik");

        setTimeout(() => {
            acikKart.removeEventListener("click", kartTiklama);
            secilenKart.removeEventListener("click", kartTiklama);
        }, 1000);
    } else {
        //İki açık kartın görsel dosya adı birbirinden farklı, eşleşme yok, kartlar kapansın.
        setTimeout(() => {
            acikKart.classList.remove("acik");
            secilenKart.classList.remove("acik");
        }, 1500);
    }
}