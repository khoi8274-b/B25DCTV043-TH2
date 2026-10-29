import { state } from "./state.js";
import { createBook } from "./api.js";

const CURRENT_YEAR = new Date().getFullYear();
const FIELDS = ["ten", "tacGia", "theLoai", "nam"];

export function initForm(onSuccess) {
  const form = document.getElementById("book-form");

  // Báo lỗi ngay khi gõ
  FIELDS.forEach((name) => {
    form.elements[name].addEventListener("input", () =>
      validateField(form, name),
    );
    form.elements[name].addEventListener("change", () =>
      validateField(form, name),
    );
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let ok = true;
    FIELDS.forEach((name) => {
      if (!validateField(form, name)) ok = false;
    });
    if (!ok) return;

    const book = {
      ten: form.elements.ten.value.trim(),
      tacGia: form.elements.tacGia.value.trim(),
      theLoai: form.elements.theLoai.value,
      nam: Number(form.elements.nam.value),
    };

    try {
      const created = await createBook(book);
      state.books.unshift(created); // Thêm vào đầu danh sách
      form.reset();
      FIELDS.forEach((n) => showError(form, n, ""));
      onSuccess?.();
    } catch (err) {
      alert("Không thêm được sách: " + err.message);
    }
  });
}

function showError(form, name, msg) {
  const el = document.getElementById("error-" + name);
  if (el) el.textContent = msg;
  form.elements[name].classList.toggle("invalid", Boolean(msg));
}

export function validateField(form, name) {
  const v = form.elements[name].value;
  let msg = "";

  if (name === "ten") {
    if (v.trim().length < 3) msg = "Tên sách phải có ít nhất 3 ký tự.";
  } else if (name === "tacGia") {
    if (!v.trim()) msg = "Vui lòng nhập tác giả.";
  } else if (name === "theLoai") {
    if (!v) msg = "Vui lòng chọn thể loại.";
  } else if (name === "nam") {
    const y = Number(v);
    if (!v || !Number.isInteger(y) || y < 1900 || y > CURRENT_YEAR) {
      msg = `Năm phải từ 1900 đến ${CURRENT_YEAR}.`;
    }
  }

  showError(form, name, msg);
  return !msg;
}
