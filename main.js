(()=>{var e={547:e=>{function t(e,t){e.parentElement.querySelector(".".concat(t)).textContent="",e.classList.remove(t)}function r(e,t){e.setAttribute("disabled",!0),e.classList.add(t)}function n(e,t,n){e.every((function(e){return e.validity.valid}))?(t.removeAttribute("disabled"),t.classList.remove(n.inactiveButtonClass)):r(t,n.inactiveButtonClass)}e.exports={enableValidation:function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(o){!function(e,o){var c=Array.from(e.querySelectorAll(o.inputSelector)),u=e.querySelector(o.submitButtonSelector);c.forEach((function(e){e.addEventListener("input",(function(){!function(e,r){e.validity.valid?t(e,r.errorClass):function(e,t,r){e.parentElement.querySelector(".".concat(r)).textContent=t,e.classList.add(r)}(e,e.dataset.errorMessage||e.validationMessage||e.title,r.errorClass)}(e,o),n(c,u,o)}))})),e.addEventListener("reset",(function(){c.forEach((function(e){return t(e,o.errorClass)})),r(u,o.inactiveButtonClass)})),n(c,u,o)}(o,e)}))},clearValidation:function(e,n){var o=Array.from(e.querySelectorAll(n.inputSelector)),c=e.querySelector(n.submitButtonSelector);o.forEach((function(e){return t(e,n.errorClass)})),r(c,n.inactiveButtonClass)}}}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var c=t[n]={exports:{}};return e[n](c,c.exports,r),c.exports}(()=>{"use strict";function e(e){if(e.ok)return e.json();throw new Error("Ошибка: ".concat(e.status))}function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?n(Object(o),!0).forEach((function(r){var n,c,u,i;n=e,c=r,u=o[r],i=function(e,r){if("object"!=t(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!=t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(c),(c="symbol"==t(i)?i:String(i))in n?Object.defineProperty(n,c,{value:u,enumerable:!0,configurable:!0,writable:!0}):n[c]=u})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var c={baseUrl:"https://nomoreparties.co/v1/wff-cohort-10",headers:{authorization:"936d1ed8-a428-4bb8-ad74-c2df3594c068","Content-Type":"application/json"}};function u(t,r){return fetch(t,r).then(e)}var i=function(e,t){return u("".concat(c.baseUrl,"/users/me"),{method:"PATCH",headers:o({},c.headers),body:JSON.stringify({name:e,about:t})})},a=function(e,t){return u("".concat(c.baseUrl,"/cards"),{method:"POST",headers:o({},c.headers),body:JSON.stringify({name:e,link:t})})},l=function(e){return u("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:c.headers})},s=function(e){return u("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:c.headers})},p=function(e){return u("".concat(c.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:c.headers})},d=function(e){return u("".concat(c.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o({},c.headers),body:JSON.stringify({avatar:e})})};function f(e,t){e.querySelector(".card__like-counter").textContent=t}function y(e,t){t?e.classList.add("card__like-button_is-active"):e.classList.remove("card__like-button_is-active")}function m(e){var t=document.querySelector('[data-card-id="'.concat(e,'"]')),r=t.querySelector(".card__like-button"),n=r.classList.contains("card__like-button_is-active");(n?s:l)(e).then((function(e){f(t,e.likes.length),y(r,!n)})).catch((function(e){return console.error("Ошибка при изменении лайка:",e)}))}function _(e,t,r,n){var o=e.name,c=e.link,u=e.likes,i=e.owner,a=e._id,l=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],s=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),p=s.querySelector(".card__image");p.src=c,p.alt=o,s.querySelector(".card__title").textContent=o,p.addEventListener("click",(function(){return r(c,o)}));var d=s.querySelector(".card__delete-button");i._id===t&&l?d.addEventListener("click",(function(){return n(a)})):d.remove();var _=s.querySelector(".card__like-button");return _.addEventListener("click",(function(){return m(a)})),y(_,u.some((function(e){return e._id===t}))),f(s,u.length),s.setAttribute("data-card-id",a),s}function v(e){function t(t){"Escape"===t.key&&b(e)}e.classList.add("popup_is-opened"),e.closePopupByEsc=t,document.addEventListener("keydown",t)}function b(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",e.closePopupByEsc),delete e.closePopupByEsc}var S=r(547);function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var q,E,g=document.querySelector(".profile__edit-button"),C=document.querySelector(".profile__add-button"),k=document.querySelectorAll(".popup__close"),L=document.querySelector(".popup_type_edit"),O=document.querySelector(".popup_type_new-card"),j=document.querySelector(".popup_type_image"),x=L.querySelector(".popup__form"),w=x.querySelector(".popup__input_type_name"),A=x.querySelector(".popup__input_type_description"),P=document.querySelector(".profile__title"),B=document.querySelector(".profile__description"),U=document.querySelector(".places__list"),D=O.querySelector(".popup__form"),T=document.querySelector(".popup_type_confirm-delete"),I=T.querySelector(".popup__button_confirm-delete"),N=document.querySelector(".profile__edit-icon"),J=document.querySelector(".popup_type_avatar"),M=J.querySelector(".popup__form"),V=M.querySelector(".popup__input_type_avatar-link"),H=j.querySelector(".popup__image"),z=j.querySelector(".popup__caption"),$=document.querySelector(".profile__image");function F(e){$.style.backgroundImage="url(".concat(e.avatar,")"),P.textContent=e.name,B.textContent=e.about,E=e._id}function G(e){q=e,v(T)}function K(e){e.preventDefault();var t=e.target.querySelector(".popup__button");t.textContent="Сохранение...",i(w.value,A.value).then(F).then((function(){return b(L)})).catch((function(e){return console.error("Ошибка при сохранении информации о пользователе:",e)})).finally((function(){return t.textContent="Сохранить"}))}function Q(e){e.preventDefault();var t=e.target.querySelector(".popup__button");t.textContent="Сохранение...";var r=D.elements["place-name"].value,n=D.elements.link.value;a(r,n).then((function(e){U.prepend(_(e,E,R,G,m)),b(O),D.reset()})).catch((function(e){return console.error("Ошибка при добавлении новой карточки:",e)})).finally((function(){t.textContent="Сохранить"}))}function R(e,t){H.src=e,H.alt=t,z.textContent=t,v(j)}function W(e){e.preventDefault(),p(q).then((function(){return document.querySelector('[data-card-id="'.concat(q,'"]')).remove()})).then((function(){return b(T)})).catch((function(e){return console.error("Ошибка при удалении карточки:",e)}))}function X(){v(J)}function Y(e){e.preventDefault();var t=e.target.querySelector(".popup__button");t.textContent="Сохранение...",d(V.value).then(F).then((function(){return b(J)})).catch((function(e){return console.error("Ошибка при обновлении аватара пользователя:",e)})).finally((function(){return t.textContent="Сохранить"}))}(0,S.enableValidation)({formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"}),g.addEventListener("click",(function(){w.value=P.textContent,A.value=B.textContent,v(L)})),C.addEventListener("click",(function(){return v(O)})),k.forEach((function(e){e.addEventListener("click",(function(){return b(e.closest(".popup"))}))})),x.addEventListener("submit",K),D.addEventListener("submit",Q),M.addEventListener("submit",Y),I.addEventListener("click",W),document.querySelector(".profile__image-overlay").addEventListener("click",X),N.addEventListener("click",X),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&b(e)}))})),Promise.all([u("".concat(c.baseUrl,"/users/me"),{headers:c.headers}),u("".concat(c.baseUrl,"/cards"),{headers:c.headers})]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,u,i=[],a=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;a=!1}else for(;!(a=(n=c.call(r)).done)&&(i.push(n.value),i.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=r.return&&(u=r.return(),Object(u)!==u))return}finally{if(l)throw o}}return i}}(t,r)||function(e,t){if(e){if("string"==typeof e)return h(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?h(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],c=n[1];F(o),c.forEach((function(e){U.appendChild(_(e,E,R,G,m))}))})).catch((function(e){return console.error("Ошибка инициализации приложения:",e)}))})()})();