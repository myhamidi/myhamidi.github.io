
// const myForm1 = document.getElementById("forminput1");
// const myForm2 = document.getElementById("forminput2");
// var csvText1 = "";
// var csvText2 = ""; 
// EASY CSV

// ################################################################
// HTML elements and Globals                                      #
// ################################################################
const reader = new FileReader();

const ecsvFile1 = document.getElementById("ecsvFile1");
const ecsvFile2 = document.getElementById("ecsvFile2");
const ecsvDivOut1 = document.getElementById("ecsvDivOut1");
const ecsvDivOut2 = document.getElementById("ecsvDivOut2");

var ecsv1 = 0;
var ecsv2 = 0;
var activeCSV = 0;

// ################################################################
// Event when loading file                                        #
// ################################################################

ecsvFile1.onchange = () => {
  activeCSV = 1;
  ReadFile(ecsvFile1.files[0])
}

ecsvFile2.onchange = () => {
  activeCSV = 2;
  ReadFile(ecsvFile2.files[0])
}

function ReadFile (file) {
    // reader.addEventListener("load", Load);
    reader.addEventListener("loadend", Loadend);
    reader.readAsText(file);
  }

function Load() {
    // things that shall happen when reader is loaded
  }

function Loadend() {
    eval("ecsv" + activeCSV + " = new clsCSV(reader.result)")
  }

// ################################################################
// class definition                                               #
// ################################################################

class clsCSV {
    constructor(csvtext, delimiter = ";") {
        var str = csvtext.replace(new RegExp('\r\n', "g") , '\n')
        this.headers = str.slice(0, str.indexOf("\n")).split(delimiter);
        this.data = [];
        const rows = str.slice(str.indexOf("\n") + 1).split("\n");
        for (let row of rows) {
            if (this._IsValidRow(row)) {
                let tmp = row.split(delimiter)
                this.data.push(tmp)}
        }
    }

    print(divID, mode = "full") {
      ecsvDivOut1.innerHTML += this._AsHTMLTable()

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
          ret += '<th>' + header + '</th>'
        }
        // header body end 
        ret += '</tr></thead>'
        //row body
        ret += '<tbody>'
        //rows
        for (let row of this.data) {
          ret += '<tr>'
          for (let cell of row) {
            ret += '<td>' + cell + '</td>'
          }
          ret += '</tr>'
        }
        // row body end
        ret += '</tbody>'
        // table end
        ret += '</table>'

        return ret;
    }
}
