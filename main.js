(()=>{"use strict";function e(e){if(e.ok)return e.json();throw new Error("Ошибка: ".concat(e.status))}function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function r(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function n(e){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?r(Object(o),!0).forEach((function(r){var n,u,c,a;n=e,u=r,c=o[r],a=function(e,r){if("object"!=t(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!=t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(u),(u="symbol"==t(a)?a:String(a))in n?Object.defineProperty(n,u,{value:c,enumerable:!0,configurable:!0,writable:!0}):n[u]=c})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-10",headers:{authorization:"936d1ed8-a428-4bb8-ad74-c2df3594c068","Content-Type":"application/json"}};function u(t,r){return fetch(t,r).then(e)}var c=function(){return u("".concat(o.baseUrl,"/users/me"),{headers:o.headers})},a=function(e,t){return u("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:n({},o.headers),body:JSON.stringify({name:e,about:t})})},i=function(e,t){return u("".concat(o.baseUrl,"/cards"),{method:"POST",headers:n({},o.headers),body:JSON.stringify({name:e,link:t})})},l=function(e){return u("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers})},s=function(e){return u("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:o.headers})},p=function(e){return u("".concat(o.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:o.headers})};function d(e,t){e.querySelector(".card__like-counter").textContent=t}function f(e,t){t?e.classList.add("card__like-button_is-active"):e.classList.remove("card__like-button_is-active")}function y(e){var t=document.querySelector('[data-card-id="'.concat(e,'"]')),r=t.querySelector(".card__like-button"),n=r.classList.contains("card__like-button_is-active");(n?s:l)(e).then((function(e){d(t,e.likes.length),f(r,!n)})).catch((function(e){return console.error("Ошибка при изменении лайка:",e)}))}function _(e,t,r,n){var o=e.name,u=e.link,c=e.likes,a=e.owner,i=e._id,l=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],s=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),p=s.querySelector(".card__image");p.src=u,p.alt=o,s.querySelector(".card__title").textContent=o,p.addEventListener("click",(function(){return r(u,o)})),a._id===t&&l?s.querySelector(".card__delete-button").addEventListener("click",(function(){return n(i)})):s.querySelector(".card__delete-button").remove();var _=s.querySelector(".card__like-button");return _.addEventListener("click",(function(){return y(i)})),f(_,c.some((function(e){return e._id===t}))),d(s,c.length),s.setAttribute("data-card-id",i),s}function m(e){function t(t){"Escape"===t.key&&v(e)}e.classList.add("popup_is-opened"),e.closePopupByEsc=t,document.addEventListener("keydown",t)}function v(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",e.closePopupByEsc),delete e.closePopupByEsc}var b=["inputSelector","submitButtonSelector"];function S(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},u=Object.keys(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function h(e,t,r,n){var o=n.inputErrorClass,u=n.errorClass,c=t.closest(".popup__field").querySelector(".popup__input-error");t.classList.add(o),c.textContent=r,c.classList.add(u)}function C(e,t,r){var n=r.inputErrorClass,o=r.errorClass,u=t.closest(".popup__field").querySelector(".popup__input-error");t.classList.remove(n),u.textContent="",u.classList.remove(o)}function E(e,t,r){var n=r.inactiveButtonClass;!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n),t.disabled=!1):(t.classList.add(n),t.disabled=!0)}function q(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var g,L,O,k,j,x,w,P,A,B=document.querySelector(".profile__edit-button"),D=document.querySelector(".profile__add-button"),U=document.querySelectorAll(".popup__close"),T=document.querySelector(".popup_type_edit"),I=document.querySelector(".popup_type_new-card"),M=document.querySelector(".popup_type_image"),N=T.querySelector(".popup__form"),J=N.querySelector(".popup__input_type_name"),H=N.querySelector(".popup__input_type_description"),z=document.querySelector(".profile__title"),R=document.querySelector(".profile__description"),$=document.querySelector(".places__list"),F=document.querySelector(".popup_type_new-card .popup__form"),G=document.querySelector(".popup_type_confirm-delete"),K=document.querySelector(".popup__button_confirm-delete"),Q=document.querySelector(".profile__edit-icon");function V(e){m(document.querySelector(".popup_type_confirm-delete")),g=e,document.querySelector('[data-card-id="'.concat(e,'"]'))}function W(e){e.preventDefault();var t=e.target.querySelector(".popup__button"),r=t.textContent;t.textContent="Сохранение...";var n=J.value,o=H.value;a(n,o).then((function(e){z.textContent=e.name,R.textContent=e.about,v(T)})).finally((function(){t.textContent=r}))}function X(e){e.preventDefault();var t=e.target.querySelector(".popup__button"),r=t.textContent;t.textContent="Сохранение...";var n=F.querySelector(".popup__input_type_card-name").value,o=F.querySelector(".popup__input_type_url").value;c().then((function(e){return i(n,o).then((function(t){var r=_(t,e._id,Y,V,y,!1);$.prepend(r),v(I),F.reset()}))})).finally((function(){t.textContent=r}))}function Y(e,t){var r=M.querySelector(".popup__image"),n=M.querySelector(".popup__caption");r.src=e,r.alt=t,n.textContent=t,m(M)}function Z(e){e.preventDefault(),p(g).then((function(){document.querySelector('[data-card-id="'.concat(g,'"]')).remove(),v(G)}))}function ee(){m(document.querySelector(".popup_type_avatar"))}document.querySelector(".profile__image-overlay").addEventListener("click",ee),Q.addEventListener("click",ee),L={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},document.querySelectorAll(L.formSelector).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var r=t.inputSelector,n=t.submitButtonSelector,o=S(t,b),u=Array.from(e.querySelectorAll(r)),c=e.querySelector(n);u.forEach((function(e){e.addEventListener("input",(function(){!function(e,t,r){var n=r.inputErrorClass,o=r.errorClass;t.validity.valueMissing?h(0,t,"Это обязательное поле",{inputErrorClass:n,errorClass:o}):t.validity.typeMismatch?h(0,t,"Пожалуйста, введите корректный URL",{inputErrorClass:n,errorClass:o}):t.validity.tooShort||t.validity.tooLong?h(0,t,"Должно быть от 2 до 30 символов",{inputErrorClass:n,errorClass:o}):t.validity.patternMismatch?(t.getAttribute("pattern"),h(0,t,"Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",{inputErrorClass:n,errorClass:o})):C(0,t,{inputErrorClass:n,errorClass:o})}(0,e,o),E(u,c,o)}))})),e.addEventListener("reset",(function(){u.forEach((function(e){C(0,e,o),E(u,c,o)}))}))}(e,L)})),document.addEventListener("DOMContentLoaded",(function(){c().then((function(e){var t,r;t=e,(r=document.querySelector(".profile__image"))&&(r.style.backgroundImage="url(".concat(t.avatar,")")),z&&(z.textContent=t.name),R&&(R.textContent=t.about)}))})),O=document.querySelector('.popup__form[name="new-place"]'),j=(k={inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled"}).inputErrorClass,x=k.errorClass,w=S(k,["inputErrorClass","errorClass"]),P=Array.from(O.querySelectorAll(w.inputSelector)),A=O.querySelector(w.submitButtonSelector),P.forEach((function(e){C(0,e,{inputErrorClass:j,errorClass:x})})),E(P,A,{inactiveButtonClass:w.inactiveButtonClass}),document.querySelector(".popup_type_avatar .popup__form").addEventListener("submit",(function(e){e.preventDefault();var t,r=e.target.querySelector(".popup__button"),c=r.textContent;r.textContent="Сохранение...",(t=document.querySelector(".popup__input_type_avatar-link").value,u("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:n({},o.headers),body:JSON.stringify({avatar:t})})).then((function(e){var t=document.querySelector(".profile__image");t&&(t.style.backgroundImage="url(".concat(e.avatar,")")),v(document.querySelector(".popup_type_avatar"))})).finally((function(){r.textContent=c}))})),B.addEventListener("click",(function(){J.value=z.textContent,H.value=R.textContent,m(T)})),D.addEventListener("click",(function(){return m(I)})),U.forEach((function(e){e.addEventListener("click",(function(){return v(e.closest(".popup"))}))})),N.addEventListener("submit",W),F.addEventListener("submit",X),document.querySelectorAll(".popup").forEach((function(e){!function(e){e.addEventListener("click",(function(t){t.target===t.currentTarget&&v(e)}))}(e)})),K.addEventListener("click",Z),Promise.all([c(),u("".concat(o.baseUrl,"/cards"),{headers:o.headers})]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,u,c,a=[],i=!0,l=!1;try{if(u=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=u.call(r)).done)&&(a.push(n.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(c=r.return(),Object(c)!==c))return}finally{if(l)throw o}}return a}}(t,r)||function(e,t){if(e){if("string"==typeof e)return q(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?q(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],u=n[1];z.textContent=o.name,R.textContent=o.about,u.forEach((function(e){$.appendChild(_(e,o._id,Y,V,y))}))})).catch((function(e){return console.error("Ошибка инициализации приложения:",e)}))})();