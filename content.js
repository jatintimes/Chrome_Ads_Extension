
window.addEventListener("load", wholescript());

function tableband() {
  var element = document.getElementById("block_xyz");
  element.parentNode.removeChild(element);
}

function tablemini() {
  var iframe = document.getElementById("block_xyz");
  iframe.contentWindow.document.getElementById("adstable").style.height =
    1 + "px";
  document.getElementById("block_xyz").style.height = 30 + "px";
}

function tablemaxi() {
  var iframe = document.getElementById("block_xyz");
  iframe.contentWindow.document.getElementById("adstable").style.height =
    250 + "px";
  document.getElementById("block_xyz").style.height = 250 + "px";
}

var __ads_flame_csv_data = [];
function tableToCSV() {
  // // Combine each row data with new line character
  var __ads_flame_csv_data_str = __ads_flame_csv_data.join("\n");
  // Call this function to download csv file
  downloadCSVFile(__ads_flame_csv_data_str);
}

function downloadCSVFile(__ads_flame_csv_data_str) {
  // Create CSV file object and feed
  // our __ads_flame_csv_data_str into it
  CSVFile = new Blob([__ads_flame_csv_data_str], {
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
  renderTableHTML();
}

function appendIframeToBody(){
  var iDiv = document.createElement("iframe");
  iDiv.id = "block_xyz";
  iDiv.className = "popup"; 
  document.getElementsByTagName("body")[0].appendChild(iDiv);
}

function getSlotTargetValues(obj, keys) {
  const res = {};
  keys.forEach((key) => {
    res[key] = obj.getTargeting(key);
  });
  return res;
}

function getPageAdsObj(){
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
  return pageAds;
}

function renderTableHTML(pageAds){
  __ads_flame_csv_data = [];
  var csvrow = [];

  let headers = Object.keys(pageAds[0]);
  let table = document.createElement('table');
  let headerRow = document.createElement('tr');

  headers.forEach(headerText => {
      let header = document.createElement('th');
      let textNode = document.createTextNode(headerText);
      header.appendChild(textNode);
      headerRow.appendChild(header);
      csvrow.push(headerText);
  });
  table.appendChild(headerRow);
  __ads_flame_csv_data.push(csvrow.join(","));

  pageAds.forEach(adsObj => {
      csvrow = [];
      let row = document.createElement('tr');
      Object.values(adsObj).forEach(text => {
          let cell = document.createElement('td');
          let textNode = document.createTextNode(text);
          cell.appendChild(textNode);
          row.appendChild(cell);
          csvrow.push(text);
      })
      table.appendChild(row);
      __ads_flame_csv_data.push(csvrow.join(","));
  });
  var adstableBlk = document.getElementById("block_xyz").contentWindow.document.getElementById('adstable');
  adstableBlk.innerHTML = '';
  adstableBlk.appendChild(table);
}

function renderControlsAndTablePlaceHolder(){
    var controlsHTML =  `<div class="control-buttons">
                    <button id="close_table" class="ctable" onclick="parent.tableband();">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
                      </svg>
                    </button>
                    <button id="mini_table" class="minitable" onclick="parent.tablemini();">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                          <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"></path>
                      </svg>
                    </button>
                    <button id="maxi_table" class="dtable" onclick="parent.tablemaxi();">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
                          <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"></path>
                      </svg>
                    </button>
                    <button id="downloadcsv" type="button" onclick="parent.tableToCSV()">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-down-fill" viewBox="0 0 16 16">
                          <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z"></path>
                      </svg>
                    </button>
                    <button onclick="parent.refreshfunction();" id="refreshid">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"></path>
                          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"></path>
                      </svg>
                    </button>
          </div>`;
    var tableHTML =  `<div id="adstable" class="table-responsive"></div>`;
  document.getElementById("block_xyz").contentWindow.document.body.innerHTML = controlsHTML +  tableHTML;
}

function renderUI(appendFrame){
    var pageAds = getPageAdsObj();
    if(pageAds.length){
      if(!!appendFrame){
        appendIframeToBody();
        renderControlsAndTablePlaceHolder();
      }
      renderTableHTML(pageAds);
    }
}

function wholescript() {
  setTimeout(function () {
    renderUI(true);
  }, 5000);
}
