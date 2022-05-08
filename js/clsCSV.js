
// const myForm1 = document.getElementById("forminput1");
// const myForm2 = document.getElementById("forminput2");
// var csvText1 = "";
// var csvText2 = ""; 
// EASY CSV

// ################################################################
// HTML elements and Globals                                      #
// ################################################################
const reader = new FileReader();

// document elements that must be defined in html
const ecsvFile = document.getElementById("ecsvFile");
const ecsvDivConfig = document.getElementById("configuration");
const ecsvDivInput = document.getElementById("input");
const ecsvDivOut = document.getElementById("ecsvDivOut");

// document elements created by clsCSV
var tableDiv = document.createElement('div');

// document elements
var ecsv1 = 0;
var activeCSV = 0;

// document elements status
var divID_high = "";

// eCSV variables
var eText = ""; // value in input element

// ################################################################
// Event when loading file                                        #
// ################################################################

function ReadFile (file) {
    // reader.addEventListener("load", Load);
    reader.addEventListener("loadend", CreateNewECSV);
    reader.readAsText(file);
  }

function CreateNewECSV() {
    ecsv1 = new clsCSV(reader.result);
    window.addEventListener('click', windowClick)
    ecsv1.print();
    // eval("ecsv" + activeCSV + " = new clsCSV(reader.result)") case formultiple
  }

function Load() {
    // things that shall happen when reader is loaded
  }

const windowClick = (event) => {
    console.log(event.srcElement.id);
    ecsv1._div_toggle_highlight(event.srcElement.id);
  }

ecsvFile.onchange = () => {
    activeCSV = 1;
    ReadFile(ecsvFile.files[0])
    }
  
// ################################################################
// class definition                                               #
// ################################################################

class clsCSV {
    constructor(csvtext, delimiter = ";") {
        // GetCSV Data
        var str = csvtext.replace(new RegExp('\r\n', "g") , '\n')
        this.headers = str.slice(0, str.indexOf("\n")).split(delimiter);
        this.data = [];
        const rows = str.slice(str.indexOf("\n") + 1).split("\n");
        for (let row of rows) {
            if (this._IsValidRow(row)) {
                let tmp = row.split(delimiter)
                this.data.push(tmp)}
        }
        // Add Config and Table Div
        tableDiv.id = "ecsv-Table"
        
    }

    print( mode = "full") {
        ecsvDivConfig.innerHTML += this._Table_ConfigDispalay()
        ecsvDivConfig.innerHTML += this._Table_ConfigLink()
        ecsvDivConfig.innerHTML += this._Table_ConfigImg()
        ecsvDivInput.innerHTML += this._innerHTML_Input()
        ecsvDivOut.innerHTML += this._AsHTMLTable()
        this._Style_Add_Display("ecsvtable", "table-cell")
    }

    _IsValidRow(row) {
      if (row == "") {
        return false}
      return true;
    }

    _AsHTMLTable() {
        // table
        let ret = '<table class="table">';
        //header body
        ret += '<thead><tr>'
        // headers
        for (let header of this.headers) {
          ret += '<th class="ecsvtable col-' + header + '">' + header + '</th>'
        }
        // header body end 
        ret += '</tr></thead>'
        //row body
        ret += '<tbody>'
        //rows
        var rowidx = -1;
        for (let row of this.data) {
            rowidx += 1;
            var i = -1;
            ret += '<tr>';
            for (let cell of row) {
                i += 1;
                ret += '<td id="R:' + rowidx + 'C:' + i + 'H:' + this.headers[i] + '" class="ecsvtable col-' + this.headers[i] + ' ecsvcell">' + cell + '</td>'
            }
          ret += '</tr>'
        }
        // row body end
        ret += '</tbody>'
        // table end
        ret += '</table>'

        return ret;
    }

    _AsCSV(sep = ";") {
        let ret = '';
        // headers
        for (let header of this.headers) {
            ret += header + ';'}
        ret = ret.slice(0, -1)
        ret += "\n"
        //rows
        for (let row of this.data) {
            for (let cell of row) {
                ret += cell + ';'}
            ret = ret.slice(0, -1)
            ret += "\n"
        }
        return ret;
  }

    _Table_ConfigDispalay() {
      let ret = 'Show/Hide: ';
      for (let header of this.headers) {
        let strr = "ecsv1._Table_ToggleCol('col-" + header + "')"
        ret += '<a id="configheader-' + header + '" href="#" onclick="' + strr + '">' + header + '</a>' + ' . '}
      return ret + "<br/>";
    }

    _Table_ConfigLink() {
      let ret = 'Link: ';
      for (let header of this.headers) {
        let strr = "ecsv1._Table_ToggleLink('col-" + header + "')"
        ret += '<a id="configlink-' + header + '" href="#" onclick="' + strr + '">' + header + '</a>' + ' . '}
      return ret + "<br/>";
    }

    _Table_ConfigImg() {
      let ret = 'Image: ';
      for (let header of this.headers) {
        let strr = "ecsv1._Table_ToggleImg('col-" + header + "')"
        ret += '<a id="configimg-' + header + '" href="#" onclick="' + strr + '">' + header + '</a>' + ' . '}
      return ret + "<br/>";
    }

    _Table_ToggleCol(colname) {
      var cols = document.getElementsByClassName(colname);
      for (let col of cols) {
          if (col.style.display === "table-cell") {
            col.style.display = "none";
          } else {
            col.style.display = "table-cell";
          }
        }
    }

    _Table_ToggleLink(colname) {
      var cells = document.getElementsByClassName("ecsvcell " + colname);
      for (let cell of cells) {
          cell.innerHTML = this._InnerHTML_ToggleToLink(cell);
        }

    }

    _Table_ToggleImg(colname) {
      var cells = document.getElementsByClassName("ecsvcell " + colname);
      for (let cell of cells) {
          cell.innerHTML = this._InnerHTML_ToggleToLImg(cell);
        }
    }

    _Style_Add_Display(classname, style) {
      var elements = document.getElementsByClassName(classname);
      for (let e of elements) {
          e.style.display = style;
        }
    }

    _InnerHTML_ToggleToLink(cell) {
        if (cell.innerHTML.includes("<a href=")){
            return cell.innerText}
        else {
            return '<a href="' + cell.innerText +'">' + cell.innerText + '</a>'}
    }

    _InnerHTML_ToggleToLImg(cell) {
      if (cell.innerHTML.includes("<img src=")){
          return cell.innerHTML.slice(cell.innerHTML.indexOf('src="')+5,cell.innerHTML.indexOf('"></a>'))}
      else {
          return '<a href="' + cell.innerText +'"><img src="' + cell.innerText + '" height="80"></a>'}
    }

    // document elements innerHTML 
    // ###############################################################################

    _innerHTML_Input() {
        return '<div class="form-group"> \n\
        <a id="idSaveText" class="btn btn-outline-primary my-2 my-sm-0" type="submit" onclick="text_save()"> Save </a>\n\
        <textarea class="form-control" rows="5" id="idText"></textarea> \n\
        </div>';
    }

    // document elements highlighting 
    // ###############################################################################
    _div_toggle_highlight(divID) {
        let d = 0;
        if (divID.includes("R:") && divID.includes("C:")) {
            if (divID_high != '') {
                d = document.getElementById(divID_high)
                d.classList.remove("table-info");}
            divID_high = divID;
            d = document.getElementById(divID_high);
            d.classList.add("table-info");
        } else {
            if (divID_high != '') {
                d = document.getElementById(divID_high)
                d.classList.remove("table-info");}
        }
    }
}
  // ###############################################################################
  // Load and Save                                                                 #
  // ###############################################################################

    function _download(filename, text) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);

        pom.style.display = 'none';
        document.body.appendChild(pom);

        pom.click();

        document.body.removeChild(pom);
    }

    function download_save() {
        let filename = ecsvFile.value.split("\\").slice(-1)[0]
        let text = ecsv1._AsCSV()
        _download(filename, text)
    }

    function text_save() {
      let newText = document.getElementById("idText").value;
      let row = RetStringBetween(divID_high,"R:", "C:");
      let col = RetStringBetween(divID_high,"C:", "H:");
      ecsv1.data[row][col] = newText;
      let divH = document.getElementById(divID_high).innerText = newText;
  }

  // ###############################################################################
  // Basis                                                                         #
  // ###############################################################################


  function RetStringBetween(text, fromStr, toStr = "") {
    /**
     * Returns the String between two  strings.
     * 
     */
     var idx1 = text.indexOf(fromStr);
     if (idx1 > -1) {
         if (toStr != "") {
            var idx2 = text.indexOf(toStr, fromIndex = idx1);
            if (idx2 > idx1) {
                return text.substring(idx1+fromStr.length, idx2);}
             }
         } else {
            return text.substring(idx1+fromStr.length)
         }
         

     return "";
}

function RetStringOutside(text, fromStr, toStr) {
    /**
     * Returns the String except the text between two  strings.
     * 
     */
     var idx1 = text.indexOf(fromStr);
     if (idx1 > -1) {
         var idx2 = text.indexOf(toStr, fromIndex = idx1);
         if (idx2 > idx1) {
            return text.substring(0, idx1) + text.substring(idx2 + toStr.length);}
         }
     return "";
}
