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

let choosenTariffHref = "";

const continueBtn = document.querySelector(".article-button");

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
