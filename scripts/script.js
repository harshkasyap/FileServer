function searchAndFilter() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    listOfFiles = document.getElementById("listOfFiles");
    divs = listOfFiles.getElementsByTagName("div");
    for (i = 0; i < divs.length; i++) {
        p = document.getElementById("p" + i);
        txtValue = p.textContent || p.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            divs[i].style.display = "";
        } else {
            divs[i].style.display = "none";
        }
    }
}

function scrollBottom() {
    var mydiv = document.getElementById("listOfMsgs")
    mydiv.scrollTop = mydiv.scrollHeight;
}

window.onload = function () {

    var dataResult = []
    var listMsgs = []

    let url = "http://" + location.hostname + ":" + location.port + "/files";
    setInterval(() => {
        fetch(url).then(response => response.json())
            .then((result) => {
                var flag = false
                for (var i = 0; i < result.length; i++) {
                    if (dataResult.length == 0 || dataResult[i] !== result[i]) {
                        flag = true;
                        break;
                    }
                }
                if (flag) {
                    dataResult = result
                    var mydiv = document.getElementById("listOfFiles");
                    mydiv.scrollTop = mydiv.scrollHeight - mydiv.clientHeight;
                    mydiv.innerHTML = ""
                    for (var i = 0; i < dataResult.length; i++) {
                        if (dataResult[i] !== undefined) {
                            var dTag = document.createElement('div');

                            var tag = document.createElement('p');
                            tag.setAttribute('id', "p" + i);
                            tag.innerHTML = dataResult[i] + "<emsp>";
                            dTag.appendChild(tag);

                            var table = document.createElement('table');
                            var tr = document.createElement('tr');

                            // Add all the type of files which we want to open at runtime
                            if (dataResult[i].toUpperCase().split('.').pop().indexOf("PDF") > -1
                                || dataResult[i].toUpperCase().split('.').pop().indexOf("JS") > -1) {
                                var td1 = document.createElement('td');
                                var aTagOpen = document.createElement('a');
                                aTagOpen.setAttribute('href', dataResult[i]);
                                aTagOpen.innerHTML = "Open <emsp>";
                                td1.appendChild(aTagOpen);
                                tr.appendChild(td1);
                            }

                            var td2 = document.createElement('td');
                            var aTagDown = document.createElement('a');
                            aTagDown.setAttribute('href', dataResult[i]);
                            aTagDown.setAttribute('download', '');
                            aTagDown.innerHTML = "Download </br>";
                            td2.appendChild(aTagDown);
                            tr.appendChild(td2);

                            var td3 = document.createElement('td');
                            var aTagDel = document.createElement('a');
                            aTagDel.setAttribute('href', "delete/?_file=" + dataResult[i]);
                            aTagDel.setAttribute('onclick', "return (() => confirm(\"are you sure you want to delete " + dataResult[i] + "?\"))()");
                            aTagDel.innerHTML = "Delete </br>";
                            td3.appendChild(aTagDel);
                            tr.appendChild(td3);

                            table.appendChild(tr);
                            dTag.append(table);
                            mydiv.appendChild(dTag);
                        }
                    }
                }
            })
            .catch(error => alert(error));

        let msgUrl = "http://" + location.hostname + ":" + location.port + "/getMsgs";
        fetch(msgUrl).then(response => response.json())
            .then((result) => {
                var flag = false

                if (listMsgs.length == 0 || (listMsgs[listMsgs.length - 1] !== result[result.length - 1])) {
                    flag = true;
                }
                console.log(flag + "  " + listMsgs[listMsgs.length - 1] + " " + result[result.length - 1])

                if (flag) {
                    var index = 0
                    if (listMsgs.length > 0) {
                        index = result.indexOf(listMsgs[listMsgs.length - 1]) + 1
                        listMsgs = listMsgs.concat(result.slice(index))
                    } else {
                        listMsgs = result
                    }

                    console.log(listMsgs)
                    var mydiv = document.getElementById("listOfMsgs")
                    //mydiv.scrollTop = mydiv.scrollHeight;
                    for (var i = index; i < listMsgs.length; i++) {
                        if (listMsgs[i] !== undefined) {
                            var splitMsg = listMsgs[i].split(":F@!M!@S:")
                            var dTag = document.createElement('div')

                            var tag = document.createElement('p')
                            tag.setAttribute('id', "mp" + i)
                            if (splitMsg[0] == "")
                                splitMsg[0] = "any"
                            tag.innerHTML = splitMsg[0] + " : " + splitMsg[1] + "<emsp>"
                            dTag.setAttribute('class', "container")
                            dTag.appendChild(tag)

                            var stag = document.createElement('span')
                            stag.setAttribute('id', "msp" + i)
                            stag.setAttribute('class', "time-left")
                            stag.innerHTML = splitMsg[2] + "<emsp>"
                            dTag.appendChild(stag);

                            mydiv.appendChild(dTag)
                        }
                    }
                    // Leep Scroll Bar at bottom
                    scrollBottom();

                    // Keep ChatName in Local Storage
                    if (document.getElementById("chatname").value !== "") {
                        localStorage['chatname'] = document.getElementById("chatname").value
                    } else if (localStorage['chatname'] !== undefined) {
                        document.getElementById("chatname").value = localStorage['chatname']
                    }

                }
            })
            .catch(error => alert(error));
    }, 1000);
}

function openForm() {
    if (document.getElementById("chatname").value == "") {
        alert("First Enter Your name to start chat")
    } else {
        document.getElementById("myForm").style.display = "block";
        document.getElementById("lblchatname").innerText = "Hello " + document.getElementById("chatname").value
    }
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}