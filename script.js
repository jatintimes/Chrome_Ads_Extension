window.addEventListener("load", wholescript());

function tableband() {
  var element = document.getElementById("block_xyz");
  element.parentNode.removeChild(element);
}

function tablemini() {
  document.getElementById("adstable").style.width = 1 + "px";
  document.getElementById("adstable").style.height = 1 + "px";
  document.getElementById("block_xyz").style.height = 20 + "px";
}

function tablemaxi() {
  document.getElementById("adstable").style.width = 100 + "%";
  document.getElementById("adstable").style.height = 250 + "px";
  document.getElementById("block_xyz").style.height = 250 + "px";
}

function tableToCSV() {
  // Variable to store the final csv data
  var csv_data = [];

  // Get each row data
  var rows = document.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    // Get each column data
    var cols = rows[i].querySelectorAll("td,th");

    // Stores each csv row data
    var csvrow = [];
    for (var j = 0; j < cols.length; j++) {
      // Get the text data of each cell
      // of a row and push it to csvrow
      csvrow.push(cols[j].innerHTML);
    }

    // Combine each column value with comma
    csv_data.push(csvrow.join(","));
  }

  // Combine each row data with new line character
  csv_data = csv_data.join("\n");

  // Call this function to download csv file
  downloadCSVFile(csv_data);
}

function downloadCSVFile(csv_data) {
  // Create CSV file object and feed
  // our csv_data into it
  CSVFile = new Blob([csv_data], {
    type: "text/csv",
  });

  // Create to temporary link to initiate
  // download process
  var temp_link = document.createElement("a");

  // Download csv file
  temp_link.download = "GfG.csv";
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  // This link should not be displayed
  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  // Automatically click the link to
  // trigger download
  temp_link.click();
  document.body.removeChild(temp_link);
}

function refreshfunction() {
  wholescript();
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
            "Slot Keys Values ": JSON.stringify(
              getSlotTargetValues(obj, obj.getTargetingKeys())
            ),
            "Page Keys Values": JSON.stringify(
              getSlotTargetValues(
                window.googletag.pubads(),
                window.googletag.pubads().getTargetingKeys()
              )
            ),
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
        "<div class='control-buttons'><button id='close_table'class='ctable' onclick='tableband();'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-x-circle-fill' viewBox='0 0 16 16'><path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z'/></svg></button><button id='mini_table'class='minitable' onclick='tablemini();'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-fullscreen-exit' viewBox='0 0 16 16'><path d='M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z'/></svg></button><button id='maxi_table'class='dtable' onclick='tablemaxi();'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-fullscreen' viewBox='0 0 16 16'><path d='M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z'/></svg></button><button id='downloadcsv' type='button' onclick='tableToCSV()'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-cloud-arrow-down-fill' viewBox='0 0 16 16'><path d='M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z'/></svg></button><button onclick='refreshfunction();'>refresh</button></div><div id='adstable' class='table-responsive'><table class='table table-bordered table-dark'><thead><tr>" +
        cols
          .map(function (c) {
            return "<th scope='col'>" + c + "</th>";
          })
          .join("") +
        "</tr></thead><tbody>";
      html += "<tr>" + +"</tr>";
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
