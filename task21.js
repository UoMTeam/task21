/**
 * Created by jiangyiming on 4/13/16.
 */
var tags = new Array();
var hobbies = new Array();
window.onload = function () {
    var oTag = document.getElementById("tag");
    var oBtn = document.getElementById("btn");
    addEventHandler(oTag, 'keyup', addTag);
    addEventHandler(oBtn, 'click', addHobby);
};

function addTag(event) {
    var e = event || window.event;
    if (e.keyCode == 32 || e.keyCode == 13 || e.keyCode == 188) {
        var oTag = document.getElementById("tag");
        var oShowtag = document.getElementById("showTag");
        var spanTag = document.createElement("span");
        var value = oTag.value;
        value = value.replace(/,/g, '');
        value = value.replace(/，/g, '');

        value = value.trim();
        if (value == "") {
            oTag.value = "";
            return;
        }
        else if (!notrepeat(value)) {
            alert("输入有重复");
            oTag.value = "";
            return;
        } else if (tags.length < 10) {
            tags.push(value);
        } else {
            tags.shift();
            oShowtag.removeChild(oShowtag.childNodes[0]);
            tags.push(value);
        }

        spanTag.innerHTML = value;
        addEventHandler(spanTag, 'mouseover', function () {
            this.style.background = 'red';
            this.innerHTML = "删除" + this.innerHTML;
        });
        addEventHandler(spanTag, 'mouseout', function () {
            this.style.background = 'blue';
            var text = this.innerHTML;
            var text2 = text.substr(2);
            this.innerHTML = text2;
        });
        addEventHandler(spanTag, 'click', function () {
            var deleteValue = this.innerHTML.substr(2);
            deleteTag(deleteValue);
            oShowtag.removeChild(this);
        });
        oShowtag.appendChild(spanTag);
        oTag.value = "";
    }
}
function notrepeat(v) {
    for (var i = 0; i < tags.length; i++) {
        if (v == tags[i]) {
            return false;
        }
    }
    return true;
}
function deleteTag(v) {
    for (var i = 0; i < tags.length; i++) {
        if (v == tags[i]) {
            tags.splice(i, 1);
        }
    }
}

function addHobby() {
    var oHobby = document.getElementById("textarea").value;
    var oShowhobby = document.getElementById("showHobby");
    var temp = oHobby.trim().split(/[,，;；、。.\s\n]+/);
    var notrepeat = noRepeat(temp);
    var noSame = deleteSame(hobbies, notrepeat);

    for (var i = 0; i < noSame.length; i++) {
        hobbies.push(noSame[i]);
    }
    if (hobbies.length > 10) {
        for (var k = 0, l = (hobbies.length - 10); k < l; k++) {
            hobbies.shift();
        }
    }
    oShowhobby.innerHTML = "";
    for (var i = 0; i < hobbies.length; i++) {
        var spanHobby = document.createElement("span");
        spanHobby.innerHTML = hobbies[i];
        oShowhobby.appendChild(spanHobby);
    }

}


function deleteSame(a1, a2) {
    for (var i = 0, iLen = a1.length; i < iLen; i++) {
        for (var j = 0, jLen = a2.length; j < jLen; j++) {
            if (a1[i] === a2[j]) {
                a2.splice(j, 1);
            }
        }
    }
    return a2;
}
function noRepeat(t) {
    var res = [t[0]];
    for (var i = 1; i < t.length; i++) {
        var repeat = false;
        for (var j = 0; j < res.length; j++) {
            if (t[i] == res[j]) {
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            res.push(t[i]);
        }
    }
    return res;
}
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + event, hanlder);
    } else {
        ele["on" + event] = hanlder;
    }
}
