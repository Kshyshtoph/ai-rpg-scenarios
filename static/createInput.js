const createInput = (root, key, value) => {
  const div = document.createElement("div");
  div.classList.add("legend");
  const input = document.createElement("input");
  const label = document.createElement("label");
  input.name = key;
  input.type = "radio";
  input.id = value;
  label.htmlFor = value;
  label.textContent = "mark as parent";
  div.appendChild(label);
  div.appendChild(input);
  root.appendChild(div);
};
