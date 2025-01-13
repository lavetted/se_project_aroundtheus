import Card from "../scripts/card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountain",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

console.log(initialCards);

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card-template");
card.getView();

import FormValidator from "../scripts/FormValidator.js";

const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  formSelector: ".modal__form,",
};

// Select the forms

const editProfileForm = document.querySelector("#edit-profile-form");

// Create instances of FormValidator for each form

const editProfileValidator = new FormValidator(
  editProfileForm,
  validationConfig
);

// Enable validation

editProfileValidator.enableValidation();

// General functions

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const previewModal = document.querySelector("#preview-card-modal");
const previewModalImgEl = previewModal.querySelector(".modal__image");
const previewModalImgElCloseButton =
  previewModal.querySelector(".modal__close");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const previewModalCloseButton = previewModal.querySelector(".modal__close");
const previewModalCaption = previewModal.querySelector(".modal-caption");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardValidator = new FormValidator(addCardForm, validationConfig);
addCardValidator.enableValidation();
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Callback functions

function previewModalImg(cardData) {
  previewModalImgEl.src = cardData.link;
  previewModalImgEl.alt = cardData.name;
  previewModalCaption.textContent = cardData.name;
  openModal(previewModal);
}

previewModalCloseButton.addEventListener("click", () =>
  closeModal(previewModal)
);

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

function createCard(data) {
  const card = new Card(data, "#card-template", previewModalImg);

  return card.getView();
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link });
  e.target.reset(); // Changed from evt to e
  addCardValidator.toggleButtonState();
  closeModal(addCardModal);
}

function handleClickOverlay(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");

  document.addEventListener("keydown", handleEscKey);
  modal.addEventListener("mousedown", handleClickOverlay);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");

  document.removeEventListener("keydown", handleEscKey);
  modal.removeEventListener("mousedown", handleClickOverlay);
}

function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    if (modal) {
      closeModal(modal);
    }
  }
}

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileEditCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// Rendering cards

initialCards.forEach((cardData) => renderCard(cardData));
