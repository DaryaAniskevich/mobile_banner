const language = window.navigator.userLanguage || window.navigator.language;
const userLang = language.split("-")[0];

const availableLangs = [];
let currentLang = userLang;
const html = document.querySelector("html");

const heading = document.querySelector(".article__heading");

const tariffItems = document.querySelectorAll(".article-tariff-item ");
const childElements = document.querySelectorAll(".article-tariff-item *");

const tariffHeading = document.querySelectorAll(
  ".article-tariff-item__heading"
);
const tariffPrice = document.querySelectorAll(".article-tariff-item__price");
const tariffFeature = document.querySelectorAll(
  ".article-tariff-item__feature"
);

const continueBtn = document.querySelector(".article-button");

let choosenTariffHref = "";

for (let lang in languages) {
  availableLangs.push(lang);
}

const updateURL = (lang) => {
  const baseUrl = `
    ${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  const newUrl = `${baseUrl}?lang=${
    availableLangs.includes(lang) ? lang : "en"
  }`;
  history.pushState(null, null, newUrl);
};

const changeLanguage = (lang) => {
  document.querySelector("title").innerHTML = languages[
    availableLangs.includes(lang) ? lang : "en"
  ]["Unlimited Access<br>to All Features"].replace("<br>", " ");
  const tagsForChanging = document.querySelectorAll(".lang");
  tagsForChanging.forEach((tag) => {
    const key = tag.getAttribute("key");
    tag.innerHTML = languages[availableLangs.includes(lang) ? lang : "en"][key];
  });
  currentLang = lang;
};

changeLanguage(userLang);

const handUrlChange = () => {
  const url = new URL(document.location);
  const urlSearch = url.search;
  const pageLanguage = urlSearch.split("=")[1];
  changeLanguage(pageLanguage);
  if (!availableLangs.includes(pageLanguage)) {
    const baseUrl = `
    ${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    const newUrl = `${baseUrl}?lang=en`;
    history.pushState(null, null, newUrl);
  }
};

const setURL = () => {
  const url = new URL(document.location);
  const urlSearch = url.search;
  if (urlSearch.includes("lang=")) {
    handUrlChange();
  } else {
    updateURL(userLang);
  }
};

setURL();

html.setAttribute("lang", currentLang);

const changeHeaderFontSize = (element, difFont, difLine) => {
  if (element.offsetHeight > 85 && currentLang !== "en") {
    element.style = `font-size: ${
      +window
        .getComputedStyle(element)
        .getPropertyValue("font-size")
        .slice(0, -2) - difFont
    }px; 
    line-height: ${
      +window
        .getComputedStyle(element)
        .getPropertyValue("line-height")
        .slice(0, -2) - difLine
    }px`;
  }
};

if (document.documentElement.clientWidth === 320) {
  changeHeaderFontSize(heading, 2, 2);
} else {
  changeHeaderFontSize(heading, 9, 6);
}

const changeFontSize = () => {
  if (currentLang === "fr" || currentLang === "ru") {
    tariffFeature.forEach((item) => {
      item.style = `font-size: ${
        +window
          .getComputedStyle(item)
          .getPropertyValue("font-size")
          .slice(0, -2) - 2
      }px; `;
    });
  }
  if (currentLang === "fr") {
    tariffHeading.forEach((item) => {
      item.style = `font-size: ${
        +window
          .getComputedStyle(item)
          .getPropertyValue("font-size")
          .slice(0, -2) - 2
      }px; `;
    });
  }
};

changeFontSize();

tariffItems.forEach((tariffItem) => {
  tariffItem.addEventListener("touchstart", () => {
    choosenTariffHref = tariffItem.dataset.href;

    tariffItems.forEach((item) => {
      if (item === tariffItem) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
    childElements.forEach((child) => {
      if (child.parentNode === tariffItem) {
        child.classList.add("active");
      } else {
        child.classList.remove("active");
      }
    });
  });
});

continueBtn.addEventListener("click", () => {
  document.location.href = choosenTariffHref;
});

tariffPrice.forEach((item) => {
  item.querySelector("strong").classList.add("article-tariff-item__price_big");
});

const setPrice = () => {
  tariffItems.forEach((item) => {
    const monthPrice = item.querySelector(".article-tariff-item__month-price");
    const payment = item.querySelector(".article-tariff-item__price_big");
    if (item.id === "month") {
      monthPrice.innerHTML = monthPrice.innerText.replace("{{price}}", "$9.99");
      payment.innerHTML = payment.innerText.replace("{{price}}", "$9.99");
    } else if (item.id === "year") {
      monthPrice.innerHTML = monthPrice.innerText.replace("{{price}}", "$1.66");
      payment.innerHTML = payment.innerText.replace("{{price}}", "$19.99");
    }
  });
};
setPrice();
