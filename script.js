window.addEventListener("load", wholescript());

function tableband() {
  document.getElementById("adstable").style.display = "none";
}

function tablemini() {
  document.getElementById("adstable").style.width = 1 + "px";
  document.getElementById("adstable").style.height = 1 + "px";
}

function tablemaxi() {
  document.getElementById("adstable").style.width = 100 + "%";
  document.getElementById("adstable").style.height = 300 + "px";
}

function wholescript() {
  setTimeout(function () {
    var iDiv = document.createElement("div");
    iDiv.id = "block_xyz";
    iDiv.className = "popup";
    document.getElementsByTagName("body")[0].appendChild(iDiv);

    function getSlotTargetValues(obj, keys) {
      const res = {};
      //const keys = obj.getTargetingKeys();
      keys.forEach((key) => {
        res[key] = obj.getTargeting(key);
      });
      return res;
    }
    function getAdsTable() {
      const pageAds = [];
      window.parent.googletag
        .pubads()
        .getSlots()
        .forEach((obj) => {
          pageAds.push({
            "AdUnit Path": obj.getAdUnitPath(),
            "Slot Size": JSON.stringify(obj.getSizes()),
            "Slot Keys Values ": JSON.stringify(getSlotTargetValues(obj, obj.getTargetingKeys())),
            "Page Keys Values": JSON.stringify(getSlotTargetValues(window.googletag.pubads(), window.googletag.pubads().getTargetingKeys())),
            "Ad Details": JSON.stringify(obj.getResponseInformation()),
            "Targeted Div ID": obj.getSlotElementId(),
          });
        });
      console.table(pageAds);

      var s = pageAds;

      var cols = [];
      for (var k in s) {
        for (var c in s[k]) {
          if (cols.indexOf(c) === -1) cols.push(c);
        }
      }
      var html =
        "<div><button id='close_table'class='ctable' onclick='tableband();'>x</button><button id='mini_table'class='minitable' onclick='tablemini();'>-</button><button id='maxi_table'class='dtable' onclick='tablemaxi();'>+</button></div><div id='adstable' class='table-responsive'><table class='table table-hover table-dark'><thead><tr>" +
        cols
          .map(function (c) {
            return "<th scope='col'>" + c + "</th>";
          })
          .join("") +
        "</tr></thead><tbody>";
      html += '<tr>'+ + '</tr>'
      for (var l in s) {
        html +=
          "<tr>" +
          cols
            .map(function (c) {
              return (
                "<td style='word-break:break-all;'>" + (s[l][c] || "") + "</td>"
              );
            })
            .join("") +
          "</tr>";
      }
      html += "</tbody></table></div>";

      document.getElementById("block_xyz").innerHTML = html;
    }
    getAdsTable();
  }, 5000);
}