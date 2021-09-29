const language = window.navigator.userLanguage || window.navigator.language;
const userLang = language.split("-")[0];

const availableLangs = [];
let currentLang = userLang;
const html = document.querySelector("html");

const heading = document.querySelector(".article__heading");

const tariffItems = document.querySelectorAll(".article-tariff-item ");
const tariffHeading = document.querySelectorAll(
  ".article-tariff-item__heading"
);
const tariffPrice = document.querySelectorAll(".article-tariff-item__price");
const tariffFeature = document.querySelectorAll(
  ".article-tariff-item__feature"
);
const tariffMonthPrice = document.querySelectorAll(
  ".article-tariff-item__month-price"
);
const tariffDiscount = document.querySelector(".article-tariff__discount");

const continueBtn = document.querySelector(".article-button");

let choosenTariffHref = "";

for (let lang in languages) {
  availableLangs.push(lang);
}

let updateURL = (lang) => {
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
  let url = new URL(document.location);
  let urlSearch = url.search;
  let pageLanguage = urlSearch.split("=")[1];
  changeLanguage(pageLanguage);
};

const setURL = () => {
  let url = new URL(document.location);
  let urlSearch = url.search;
  if (urlSearch.includes("lang=")) {
    handUrlChange();
  } else {
    updateURL(userLang);
  }
};

setURL();

html.setAttribute("lang", currentLang);

const changeFontSize = (element, difFont, difLine) => {
  if (heading.offsetHeight > 85 && currentLang !== "en") {
    heading.style = `font-size: ${
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
  changeFontSize(heading, 2, 2);
} else {
  changeFontSize(heading, 7, 4);
}

tariffItems.forEach((tariffItem) => {
  tariffItem.addEventListener("touchstart", () => {
    choosenTariffHref = tariffItem.dataset.href;

    if (tariffDiscount.parentNode === tariffItem) {
      tariffDiscount.classList.add("article-tariff__discount_active");
    } else {
      tariffDiscount.classList.remove("article-tariff__discount_active");
    }

    tariffItems.forEach((item) => {
      if (item === tariffItem) {
        if (item.id === "month") {
          item.classList.add("article-tariff-item_active");
        } else if (item.id === "year") {
          item.classList.add("article-tariff-item_annual-active");
        }
      } else {
        if (item.id === "month") {
          item.classList.remove("article-tariff-item_active");
        } else if (item.id === "year") {
          item.classList.remove("article-tariff-item_annual-active");
        }
      }
    });

    tariffHeading.forEach((item) => {
      if (item.parentNode === tariffItem) {
        item.classList.add("article-tariff-item__heading_active");
      } else {
        item.classList.remove("article-tariff-item__heading_active");
      }
    });

    tariffPrice.forEach((item) => {
      if (item.parentNode === tariffItem) {
        item.classList.add("article-tariff-item__price_active");
      } else {
        item.classList.remove("article-tariff-item__price_active");
      }
    });

    tariffFeature.forEach((item) => {
      if (item.parentNode === tariffItem) {
        item.classList.add("article-tariff-item__feature_active");
      } else {
        item.classList.remove("article-tariff-item__feature_active");
      }
    });

    tariffMonthPrice.forEach((item) => {
      if (item.parentNode === tariffItem) {
        item.classList.add("article-tariff-item__month-price_active");
      } else {
        item.classList.remove("article-tariff-item__month-price_active");
      }
    });
  });
});

continueBtn.addEventListener("click", (event) => {
  event.preventDefault;
  document.location.href = choosenTariffHref;
});

tariffPrice.forEach((item) => {
  item.querySelector("strong").classList.add("article-tariff-item__price_big");
});

const setPrice = () => {
  tariffItems.forEach((item) => {
    if (item.id === "month") {
      let monthPrice = item.querySelector(".article-tariff-item__month-price");
      let payment = item.querySelector(".article-tariff-item__price_big");
      monthPrice.innerHTML = monthPrice.innerText.replace("{{price}}", "$9.99");
      payment.innerHTML = payment.innerText.replace("{{price}}", "$9.99");
    } else if (item.id === "year") {
      let monthPrice = item.querySelector(".article-tariff-item__month-price");
      let payment = item.querySelector(".article-tariff-item__price_big");
      monthPrice.innerHTML = monthPrice.innerText.replace("{{price}}", "$1.66");
      payment.innerHTML = payment.innerText.replace("{{price}}", "$19.99");
    }
  });
};
setPrice();
