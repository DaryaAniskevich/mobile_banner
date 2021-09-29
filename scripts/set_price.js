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
