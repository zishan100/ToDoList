const itemForm = document.querySelector("#itemForm");
const itemInput = document.getElementById("itemInput");

const itemList = document.querySelector(".item-list");
const clearBtn = document.getElementById("clear-list");
const feedBack = document.querySelector(".feedback");

let itemData = JSON.parse(localStorage.getItem("Item")) || [];

if (itemData.length > 0) {
  itemData.forEach(function(item) {
    addItem(item);
  });
  itemData.forEach(function(item) {
    HandleItem(item);
  });
}

// HandleItem(itemInput.value);
// form submission

itemForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const textValue = itemInput.value;
  //   console.log(textValue);
  if (textValue == "") {
    showFeedback("please enter valid value", "danger");
  } else {
    //add item
    addItem(textValue);

    //clear input Field
    itemInput.value = "";
    //add to ItemData
    itemData.push(textValue);
    //add to localstorage
    localStorage.setItem("Item", JSON.stringify(itemData));
    //add event listener to icons
    HandleItem(textValue);
  }
});

function showFeedback(text, action) {
  feedBack.classList.add("showItem", `alert-${action}`);
  feedBack.innerHTML = `<p>${text}</p>`;

  setTimeout(function() {
    feedBack.classList.remove("showItem", `alert-${action}`);
  }, 3000);
}

function addItem(value) {
  const div = document.createElement("div");
  div.classList.add("item", "my-3");
  div.innerHTML = `<h5 class="item-name text-capitalize">${value}</h5>
                <div class="item-icons">
                  <a href="#" class="complete-item mx-2 item-icon"
                    ><i class="far fa-check-circle"></i
                  ></a>
                  <a href="#" class="edit-item mx-2 item-icon"
                    ><i class="far fa-edit"></i
                  ></a>
                  <a href="#" class="delete-item item-icon"
                    ><i class="far fa-times-circle"></i
                  ></a>
                </div>`;
  itemList.appendChild(div);
  showFeedback("You Have Added Items Succesfully", "success");
}

function HandleItem(Value) {
  const items = itemList.querySelectorAll(".item");
  console.log(items);

  items.forEach(function(item) {
    if (item.querySelector(".item-name").textContent == Value) {
      item
        .querySelector(".complete-item")
        .addEventListener("click", function(event) {
          item.querySelector(".item-name").classList.toggle("completed");
        });

      item.querySelector(".edit-item").addEventListener("click", function() {
        itemInput.value = Value;
        itemList.removeChild(item);
        console.log(itemData);
        itemData = itemData.filter(function(item) {
          return item != Value;
        });
        localStorage.setItem("Item", JSON.stringify(itemData));
      });
      item
        .querySelector(".delete-item")
        .addEventListener("click", function(event) {
          console.log(items);

          itemList.removeChild(item);
          console.log(itemData);
          itemData = itemData.filter(function(item) {
            return item != Value;
          });
          localStorage.setItem("Item", JSON.stringify(itemData));
          console.log(itemData);
        });
    }
  });
}

clearBtn.addEventListener("click", function() {
  itemData = [];
  const items = itemList.querySelectorAll(".item");
  localStorage.removeItem("Item");
  console.log(items);
  if (items.length > 0) {
    items.forEach(function(item) {
      itemList.removeChild(item);
    });
  }
});
