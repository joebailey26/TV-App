window.addEventListener("load", function(){
    setTimeout(
        function() {
            document.querySelector(".static-motion").classList.add("hidden")
            document.getElementsByTagName("BODY")[0].classList.remove("loading")
        }
    , 1000)

    getActive()

    document.addEventListener("keydown", (function(e) {
        switch(e.which) {
            case 37: // left
                moveInSectorToLeft();
            break;
  
           case 38: // up
                moveInSectorToUp(); //Dont know if you want to use it
           break;
  
           case 39: // right
                moveInSectorToRight();
           break;
  
           case 40: // down
                moveInSectorToDown();
           break;
  
           default: return; 
       }
       e.preventDefault(); 
    }))
})
function moveInSectorToRight() {
    document.querySelector(".item.active").nextElementSibling.focus()
    document.querySelector(".item.active").nextElementSibling.classList.add("active")
    document.querySelector(".item.active").classList.remove("active")
    if (!document.querySelectorAll(".row")[0].classList.contains("active")) {
        getActive()
    }
}
function moveInSectorToLeft() {
    document.querySelector(".item.active").previousElementSibling.focus()
    document.querySelector(".item.active").previousElementSibling.classList.add("active")
    document.querySelectorAll(".item.active")[1].classList.remove("active")
    if (!document.querySelectorAll(".row")[0].classList.contains("active")) {
        getActive()
    }
}
function moveInSectorToUp() {
    var i = 0
    document.querySelectorAll(".row").forEach(function(e) {
        if (e.classList.contains("active")) {
            if (e == document.querySelectorAll(".row")[1]) {
                document.querySelectorAll(".row")[0].classList.add("active")
                e.classList.remove("active")
                e.querySelectorAll(".item").forEach(function(e) {
                    e.classList.remove("active")
                })
                document.querySelectorAll(".row")[i-1].querySelectorAll(".item").forEach(function(e) {
                    if (e.hasAttribute("aria-current")) {
                        e.classList.add("active")
                    }
                })
            }
            else {
                document.querySelectorAll(".row")[i-1].classList.add("active")
                e.classList.remove("active")
                var y = 0
                for (var f = 0; f < e.querySelectorAll(".item").length; f++) {
                    if (e.querySelectorAll(".item")[f].classList.contains("active")) {
                        e.querySelectorAll(".item")[f].classList.remove("active")
                        break
                    }
                    else {
                        y++
                    }
                }
                document.querySelectorAll(".row")[i-1].querySelectorAll(".item")[y].classList.add("active")
                document.querySelectorAll(".row")[i-1].querySelectorAll(".item")[y].focus()

                getActive()
            }
        }
        i++
    })
}
function moveInSectorToDown() {
    for (var i = 0; i < document.querySelectorAll(".row").length; i++) {
        if (document.querySelectorAll(".row")[i].classList.contains("active")) {
            document.querySelectorAll(".row")[i+1].classList.add("active")
            document.querySelectorAll(".row")[i].classList.remove("active")
            var y = 0
            for (var f = 0; f < document.querySelectorAll(".row")[i].querySelectorAll(".item").length; f++) {
                if (document.querySelectorAll(".row")[i].querySelectorAll(".item")[f].classList.contains("active")) {
                    document.querySelectorAll(".row")[i].querySelectorAll(".item")[f].classList.remove("active")
                    break
                }
                else {
                    y++
                }
            }
            document.querySelector(".row.active").querySelectorAll(".item")[y].classList.add("active")
            document.querySelector(".row.active").querySelectorAll(".item")[y].focus()
            break
        }
    }
    getActive()
}
function getActive() {
    var active = document.querySelector(".item.active")
    var title = active.dataset.title
    var length = active.dataset.length
    var rating = active.dataset.rating
    var age = parseInt(active.dataset.age, 10)
    var year = active.dataset.year
    var desc = active.dataset.desc
    var rate = ''
    var ageColor = ''
    var u = 0

    for(i = 0; i < 5; i++) {
        if (u < rating) {
            rate = rate + '<i class="material-icons">grade</i>'
        }
        else {
            rate = rate + '<i class="material-icons outline">grade</i>'
        }
        u++
    }

    if (age >= 15) {
        ageColor = "red"
    }

    document.querySelector(".details").innerHTML = `
        <h2 class="title">${title}</h2>
        <div class="info">
            <div class="length">
                ${length}
            </div>
            <div class="rating">
                ${rate}
            </div>
            <div class="age ${ageColor}">
                ${age}
            </div>
            <div class="year">
                ${year}
            </div>
        </div>
        <p>${desc}</p>
    `
}