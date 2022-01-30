//---Accordion----------------------------------------------------
const accordion__items = [...document.querySelectorAll(".accordion__item")]; // Получаю элементы .accordion__item

accordion__items.forEach((item) => {
  // прохожусь по ним в цикле
  const btn = item.querySelector(".accordion__header__img"); //Нахожу у элемента кружок, в котором будет плюс или минус
  const text = item.querySelector(".accordion__text__wrapper"); // Нахожу обертку у элемента, которую буду уменьшать
  let height; // Высота обертки элемента
  resize(); // Вызываем просчёт высоты и задаём CSS стили для обёртки

  if (!item.classList.contains("active")) {
    // если у текущего элемента аккордеона нету класс .active
    text.style.height = "0px"; // задать обертке нулевую высоту
  }

  function addOrRemoveHeight(height) {
    if (item.classList.contains("active")) {
      // если у текущего элемента аккордеона есть класс .active
      text.style.height = height + "px"; // задать высоту, которую мы просчитали перед этим в переменной height
    } else {
      text.style.height = "0px"; // Иначе задать нулевую высоту
    }
  }

  function resize() {
    text.style.height = "auto"; // Задать элементу высоту auto, чтобы мы могли её посчитать, потому что мы её могли обнулить в CSS стилях
    height = text.scrollHeight; // Запоминаем высоту элемента в переменную
    addOrRemoveHeight(height); // Вызываем функцию, которая добавляет в CSS высоту элементу
  }

  window.addEventListener("resize", resize); // ставим слушатель события resize на функцию resize

  btn.addEventListener("click", () => {
    // при клике на кружок, выполнять анонимную функцию
    item.classList.toggle("active"); // удаляем класс .active если он есть, иначе добавляем
    addOrRemoveHeight(height); // Вызываем функцию, которая добавляет в CSS высоту элементу
  });
});

//-------MODAL-----------------------------------------------------------------------------------

const modalTrigger = document.querySelector(".main-block__button_blue"),
  modal = document.querySelector(".modal"),
  modalCloseBtnSubmit = document.querySelector(".btn_min"),
  formSubmit = document.querySelector("#formSubmit"),
  modalCloseBtn = document.querySelector("[data-close]");

modalTrigger.addEventListener("click", openModal);

// modalCloseBtnSubmit.addEventListener('click', closeModal)

function closeModal() {
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

function openModal() {
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
}

modalCloseBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});

//-----QUOTE-SLIDER----------------------------------------------------------------------------------------------------------------------

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activated", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " activated";
}
//*------------------------------------------------------------------------------------------------------------------------------------

const modalWindowSuccsess = document.querySelector(".form_form"),
  modalSuccessBtn = document.querySelector(".btn_min"),
  formWindowSuccsess = document.querySelector(".getContact__body"),
  formSuccessBtn = document.querySelector(".getContact__button"),
  modalInput = document.querySelectorAll(".modal__input"),
  getContactInput = document.querySelectorAll(".getContact__input"),
  getContactBody = document.querySelector(".getContact__Body");

function telephoneCheck(str) {
  let isPhone = /^\d+$/.test(str);
  return isPhone;
}


function nameCheck(str) {
  let isName = /^[А-Яа-я ]+$/.test(str);
  return isName;
}

modalSuccessBtn.addEventListener("click", (e) => {
  let trueNameModal = nameCheck(modalInput[0].value);
  let trueNumberModal = telephoneCheck(modalInput[1].value);

  if (trueNameModal == true && trueNumberModal == true) {
    e.preventDefault();
    FormSend(
      JSON.stringify({
        name: modalInput[0].value,
        phone: modalInput[1].value
      })
    );
    modalWindowSuccsess.classList.add("modal__title");

    modalWindowSuccsess.innerHTML =
      "Заявка Успішно прийнята. Невдовзі з вами зв'яжуться!";
  } else if (trueNameModal == false) {
    e.preventDefault();
    modalInput[0].value = "";
    modalInput[0].placeholder = "Вкажіть коректні дані";
    modalInput[0].style.borderColor = "red";
  } else if (trueNumberModal == false) {
    e.preventDefault();
    modalInput[1].value = "";
    modalInput[1].placeholder = "Вкажіть коректний номер";
    modalInput[1].style.borderColor = "red";
  }

  if (trueNameModal == false && trueNumberModal == false) {
    e.preventDefault();
    modalInput[0].value = "";
    modalInput[0].style.borderColor = "red";
    modalInput[0].placeholder = "Вкажіть коректні дані";
    modalInput[1].value = "";
    modalInput[1].style.borderColor = "red";
    modalInput[1].placeholder = "Вкажіть коректний номер";
  }
});

formSuccessBtn.addEventListener("click", (e) => {
  let trueName = nameCheck(getContactInput[0].value);
  let trueNumber = telephoneCheck(getContactInput[1].value);

  if (trueName == true && trueNumber == true) {
    e.preventDefault();
    FormSend(JSON.stringify({
      name: getContactInput[0].value,
      phone: getContactInput[1].value
    }));
    formWindowSuccsess.classList.add("modal__title");
    formWindowSuccsess.style.padding = "20px 30px";
    formWindowSuccsess.style.color = "white";

    formWindowSuccsess.innerHTML =
      "Заявка Успішно прийнята. Невдовзі з вами зв'яжуться!";
    getContactBody.style.padding = "0px";
  } else if (trueName == false) {
    e.preventDefault();
    modalInput[0].value = "";
    modalInput[0].placeholder = "Вкажіть коректні дані";
    modalInput[0].style.borderColor = "red";
  } else if (trueNumber == false) {
    e.preventDefault();
    modalInput[1].value = "";
    modalInput[1].placeholder = "Вкажіть коректний номер";
    modalInput[1].style.borderColor = "red";
  }

  if (trueName == false && trueNumber == false) {
    e.preventDefault();
    getContactInput[0].value = "";
    getContactInput[0].style.borderColor = "red";
    modalInput[0].placeholder = "Вкажіть коректні дані";
    getContactInput[1].value = "";
    getContactInput[1].style.borderColor = "red";
    modalInput[1].placeholder = "Вкажіть коректний номер";
  }
});

//----Sending-----------------------------------------------------------------------

function FormSend(data) {
  fetch("send.php", {
      method: "POST",
      body: data,
    })
    .then(function (response) {
      let res = JSON.parse(response);
      if (res.status == "0") {
      } else {
        modalWindowSuccsess.classList.add("modal__title");

        modalWindowSuccsess.innerHTML =
          "Сталася помилка( Спробуйте пізніше(";
        formWindowSuccsess.classList.add("modal__title");
        formWindowSuccsess.style.padding = "30px 70px";
        formWindowSuccsess.style.color = "white";

        formWindowSuccsess.innerHTML =
          "Сталася помилка( Спробуйте пізніше(";
        getContactBody.style.padding = "0px";
      }
    })
    .catch(function (error) {});
}

//FormSend(JSON.stringify({name: 'лолодлывооылвао', phone: '232323223'}));