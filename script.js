window.addEventListener("load", wholescript());

function tableband() {
  var element = document.getElementById("block_xyz");
  element.parentNode.removeChild(element);
}

function tablemini() {
  var iframe = document.getElementById("block_xyz");
  iframe.contentWindow.document.getElementById("adstable").style.height =
    1 + "px";
  // document.getElementById("adstable").style.height = 1 + "px";
  document.getElementById("block_xyz").style.height = 30 + "px";
}

function tablemaxi() {
  var iframe = document.getElementById("block_xyz");
  iframe.contentWindow.document.getElementById("adstable").style.height =
    250 + "px";
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
    var iDiv = document.createElement("iframe");
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
        "<div class='control-buttons'><button id='close_table'class='ctable' onclick='parent.tableband();'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-x-circle-fill' viewBox='0 0 16 16'><path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z'/></svg></button><button id='mini_table'class='minitable' onclick='parent.tablemini();'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-fullscreen-exit' viewBox='0 0 16 16'><path d='M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z'/></svg></button><button id='maxi_table'class='dtable' onclick='parent.tablemaxi();'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-fullscreen' viewBox='0 0 16 16'><path d='M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z'/></svg></button><button id='downloadcsv' type='button' onclick='parent.tableToCSV()'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-cloud-arrow-down-fill' viewBox='0 0 16 16'><path d='M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z'/></svg></button><button onclick='parent.refreshfunction();' id='refreshid'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-clockwise' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z'/><path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z'/></svg></button></div><div id='adstable' class='table-responsive'><table class='table table-bordered table-dark'><thead><tr>" +
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

      html +=
        "<style>.table{width: 100%; margin-bottom: 1rem; color: #212529; font-size: 13px; font-family: Georgia,Times New Roman, Times, serif; background-color: red;}.table th,.table td{padding: 0.75rem; vertical-align: top; border-top: 1px solid #dee2e6;}.table thead th{vertical-align: bottom; border-bottom: 2px solid #dee2e6;}.table tbody + tbody{border-top: 2px solid #dee2e6;}.table-sm th,.table-sm td{padding: 0.3rem;}.table-bordered{border: 1px solid #dee2e6;}.table-bordered th,.table-bordered td{border: 1px solid #dee2e6;}.table-bordered thead th,.table-bordered thead td{border-bottom-width: 2px;}.table-borderless th,.table-borderless td,.table-borderless thead th,.table-borderless tbody + tbody{border: 0;}.table-striped tbody tr:nth-of-type(odd){background-color: rgba(0, 0, 0, 0.05);}.table-hover tbody tr:hover{color: #212529; background-color: rgba(0, 0, 0, 0.075);}.table-primary,.table-primary > th,.table-primary > td{background-color: #b8daff;}.table-primary th,.table-primary td,.table-primary thead th,.table-primary tbody + tbody{border-color: #7abaff;}.table-hover .table-primary:hover{background-color: #9fcdff;}.table-hover .table-primary:hover > td,.table-hover .table-primary:hover > th{background-color: #9fcdff;}.table-secondary,.table-secondary > th,.table-secondary > td{background-color: #d6d8db;}.table-secondary th,.table-secondary td,.table-secondary thead th,.table-secondary tbody + tbody{border-color: #b3b7bb;}.table-hover .table-secondary:hover{background-color: #c8cbcf;}.table-hover .table-secondary:hover > td,.table-hover .table-secondary:hover > th{background-color: #c8cbcf;}.table-success,.table-success > th,.table-success > td{background-color: #c3e6cb;}.table-success th,.table-success td,.table-success thead th,.table-success tbody + tbody{border-color: #8fd19e;}.table-hover .table-success:hover{background-color: #b1dfbb;}.table-hover .table-success:hover > td,.table-hover .table-success:hover > th{background-color: #b1dfbb;}.table-info,.table-info > th,.table-info > td{background-color: #bee5eb;}.table-info th,.table-info td,.table-info thead th,.table-info tbody + tbody{border-color: #86cfda;}.table-hover .table-info:hover{background-color: #abdde5;}.table-hover .table-info:hover > td,.table-hover .table-info:hover > th{background-color: #abdde5;}.table-warning,.table-warning > th,.table-warning > td{background-color: #ffeeba;}.table-warning th,.table-warning td,.table-warning thead th,.table-warning tbody + tbody{border-color: #ffdf7e;}.table-hover .table-warning:hover{background-color: #ffe8a1;}.table-hover .table-warning:hover > td,.table-hover .table-warning:hover > th{background-color: #ffe8a1;}.table-danger,.table-danger > th,.table-danger > td{background-color: #f5c6cb;}.table-danger th,.table-danger td,.table-danger thead th,.table-danger tbody + tbody{border-color: #ed969e;}.table-hover .table-danger:hover{background-color: #f1b0b7;}.table-hover .table-danger:hover > td,.table-hover .table-danger:hover > th{background-color: #f1b0b7;}.table-light,.table-light > th,.table-light > td{background-color: #fdfdfe;}.table-light th,.table-light td,.table-light thead th,.table-light tbody + tbody{border-color: #fbfcfc;}.table-hover .table-light:hover{background-color: #ececf6;}.table-hover .table-light:hover > td,.table-hover .table-light:hover > th{background-color: #ececf6;}.table-dark,.table-dark > th,.table-dark > td{background-color: #c6c8ca;}.table-dark th,.table-dark td,.table-dark thead th,.table-dark tbody + tbody{border-color: #95999c;}.table-hover .table-dark:hover{background-color: #b9bbbe;}.table-hover .table-dark:hover > td,.table-hover .table-dark:hover > th{background-color: #b9bbbe;}.table-active,.table-active > th,.table-active > td{background-color: rgba(0, 0, 0, 0.075);}.table-hover .table-active:hover{background-color: rgba(0, 0, 0, 0.075);}.table-hover .table-active:hover > td,.table-hover .table-active:hover > th{background-color: rgba(0, 0, 0, 0.075);}.table .thead-dark th{color: #fff; background-color: #343a40; border-color: #454d55;}.table .thead-light th{color: #495057; background-color: #e9ecef; border-color: #dee2e6;}.table-dark{color: #fff; background-color: #343a40;}.table-dark th,.table-dark td,.table-dark thead th{border-color: #454d55;}.table-dark.table-bordered{border: 0;}.table-dark.table-striped tbody tr:nth-of-type(odd){background-color: rgba(255, 255, 255, 0.05);}.table-dark.table-hover tbody tr:hover{color: #fff; background-color: rgba(255, 255, 255, 0.075);}@media (max-width: 575.98px){.table-responsive-sm{display: block; width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;}.table-responsive-sm > .table-bordered{border: 0;}}@media (max-width: 767.98px){.table-responsive-md{display: block; width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;}.table-responsive-md > .table-bordered{border: 0;}}@media (max-width: 991.98px){.table-responsive-lg{display: block; width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;}.table-responsive-lg > .table-bordered{border: 0;}}@media (max-width: 1199.98px){.table-responsive-xl{display: block; width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;}.table-responsive-xl > .table-bordered{border: 0;}}.table-responsive{display: block; width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;}.table-responsive > .table-bordered{border: 0;}.table-responsive{display: block; width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;}.table-responsive > .table-bordered{border: 0;}#block_xyz{position: fixed; width: 100%; height: 300px; z-index: 9999; bottom: 0; height: 250px; overflow: auto; border:none; background-color: rgb(69, 77, 85);}.control-buttons{width: 100%; height: 20px; background-color: rgb(69, 77, 85); display: flex; justify-content: center; place-items: center; text-align: center;}#close_table{background: transparent; color: red; border: none; cursor: pointer;}#mini_table{background: transparent; color: white; border: none; cursor: pointer;}#maxi_table{background: transparent; color: white; border: none; cursor: pointer;}#downloadcsv{background: transparent; color: white; border: none; cursor: pointer;}#refreshid{background: transparent; color: white; border: none; cursor: pointer;}</style>";

      //document.getElementById("block_xyz").innerHTML = html;

      var doc = document.getElementById("block_xyz").contentWindow.document;
      doc.open();
      doc.write(html);
      doc.close();
    }
    getAdsTable();
  }, 5000);
}
