(function () {
    "use strict";

    function DSSTCertificationDate(Str, NCP_Date, BNC_TTT_Date, BNC_Youth_Date, BNC_Coaching_Date) {
        let name = Str;
        let ncp_Date = NCP_Date;
        let ttt_Date = BNC_TTT_Date;
        let youth_Date = BNC_Youth_Date;
        let coaching_Date = BNC_Coaching_Date;



    }

    function makeObjectString(str) {
        
        
    }

    function parseData(str) {
        let arrayOfChars = str.split('');
        let entry = 0;
        for (let i = 0; i < arrayOfChars.length; i++){

        }
    }

    document.getElementById("dsst_data_submit").addEventListener("click", function (event) {
        event.preventDefault();
        let data = document.getElementById("data").value;
        document.getElementById("display_results").innerText = data;
    });
})();