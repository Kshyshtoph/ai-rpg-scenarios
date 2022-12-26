const inputEl = document.querySelector("#input");
const form = document.querySelector("#form");
const outputEl = document.querySelector(".output");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const payload = inputEl.value;
  const body = JSON.stringify({
    story: payload,
  });
  fetch("/story", {
    method: "POST",
    body,
    headers: [["Content-Type", "application/json"]],
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      const block = document.createElement("div");
      block.classList.add("block");
      const arr = res.response.split("\n").map((text) => {
        const p = document.createElement("p");
        p.textContent = text;
        addIlustrator(p);
        return p;
      });
      createInput(block, "parentMessageId", res.messageId);
      arr.forEach((p) => block.append(p));
      return block;
    })
    .then((block) => {
      outputEl.prepend(block);
    });
});
