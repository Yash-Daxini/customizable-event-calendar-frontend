export let onMouseDown = (e, className, colorDivClass) => {
  let onMouseMove = (ex) => {
    let classList = [...ex.target.classList];
    if (classList.includes(colorDivClass)) ex.target.classList.add(className);
  };

  let onMouseUp = (e) => {
    let classList = [...e.target.classList];
    if (classList.includes(className)) e.target.classList.remove(className);

    e.target.removeEventListener("mousemove", onMouseMove);
    e.target.removeEventListener("mouseup", onMouseUp);
  };

  e.target.addEventListener("mousemove", onMouseMove);
  e.target.addEventListener("mouseup", onMouseUp);
};
