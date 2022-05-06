function test_passed(fname) {
    console.log(fname + '  OK')
}

function test_failed(fname) {
    console.log(fname + '  failed')
}

class clsTest {

    // test_loadForms() {
    //     name = "LoadForms"
    //     var res = myForm1 == undefined || myForm2 == undefined
    //     if (res) {
    //         test_failed(name)}
    //     else {
    //         test_passed(name)}
    // }

    // test_CSVFile() {
    //     name = "CSVFile"
    //     var res = ecsvFile1 == undefined || ecsvFile2 == undefined
    //     if (res) {
    //         test_failed(name)}
    //     else {
    //         test_passed(name)}
    // }



    // test_LoadCSV2() {
    //     name = "LoadCSV 2"
    //     var test_csv = new clsCSV(csvText1)
    //     var assert = IsEqual_List(test_csv.headers, ["Stadt", "Land", "Fluss"])
    //     if (assert) {
    //         test_passed(name)}
    //     else {
    //         test_failed(name)}
    // }

    test_LoadCSV() {
        // Test Set after Loading CSV
        // this.test_LoadCSV1()
        // this.test_LoadCSV2()
    }


    
    test_PrintCSV1() {
        let name = "PrintCSV 1" 
        let assert1 = document.getElementById("ecsvDivOut1").innerText == "";
        ecsv1.print("ecsvDivOut1")
        let assert2 = document.getElementById("ecsvDivOut1").innerText == 'Stadt,Land,Fluss\nMunich,Germany,Isar\nLondon,UK,Themse\nParis,France,Seine\n\n';
        let assert = assert1 && assert2;
        if (assert) {
            test_passed(name)}
        else {
            test_failed(name)}
    }

    test_PrintCSV() {
        // Test Set for Printing CSV
        this.test_PrintCSV1()
    }
}



test = new clsTest()
// test.test_loadForms()
// test.test_CSVFile()
// test.test_LoadCSV()
// test.test_PrintCSV()




