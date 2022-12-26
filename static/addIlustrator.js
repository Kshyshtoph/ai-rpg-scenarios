const addIlustrator = (e) => {
  const btn = document.createElement("button");
  btn.textContent = "ilustrate!";
  e.appendChild(btn);
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const parent = e.target.parentNode;
    console.log(parent, parent.textContent);
    fetch("/image", {
      method: "POST",
      body: JSON.stringify({ desc: parent.textContent }),
      headers: [["Content-Type", "application/json"]],
    })
      .then((res) => res.json())
      .then((res) => {
        const image = document.createElement("img");
        image.src = res.data[0].url;
        e.target.parentNode.appendChild(image);
      });
  });
};
