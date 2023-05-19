const router = require("express").Router();
const { RepairOrder } = require("../../models/repair-order");
const XLSX = require('xlsx');
const fs = require("fs");

router.get("/", async (req, httpGetResponse) => {

    console.log("Getting XLS...");

    try {

        let tableRows = [];

        // Get repair orders form database
        RepairOrder.find().sort({ time: 'descending' }).exec((err, findResult) => {

            // console.log("RES = " + JSON.stringify(findResult));
            findResult.forEach(ro => {
                let entryDate = (new Date(ro.time)).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
                let exitDate = (new Date(ro.exitDate)).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
                let state = (ro.state == 'DONE') ? "Validé" : "En cours...";
                let lock = (ro.locked) ? "Oui" : "Non";
                let itemsText = ItemsToText(ro.items);
                tableRows.push({ "Identifiant": ro.roid, "Data d'Entrée": entryDate, "Nom du Client": ro.customer, "N° de Téléphone du Client": ro.phone, "Appareil(s)": itemsText, "Etat": state, "Verrouiller": lock, "Date de Sortie": exitDate });
            });

            // New
            const workbook = XLSX.utils.book_new();

            // const worksheet = XLSX.utils.json_to_sheet([
            //     { A: 'Value 1', B: 'Value 2', C: 'Value 3' },
            //     { A: 'Value 4', B: 'Value 5', C: 'Value 6' },
            //     { A: 'Value 7', B: 'Value 8', D: 'Value 9' },
            // ]);

            // Json to Sheet
            // console.log(JSON.stringify(tableRows));
            const worksheet = XLSX.utils.json_to_sheet(tableRows);

            // // Set column width
            // worksheet['!cols'] = [
            //     { wch: 20 },
            //     { wch: 35 },
            //     { wch: 20 },
            //     { wch: 20 },
            //     { wch: 10 },
            //     { wch: 10 },
            //     { wch: 35 }
            // ];

            worksheet['!cols'] = [
                { auto: true }
            ];

            worksheet['!rows'] = [
                { auto: true }
            ];

            // Add sheet to workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

            // Package and Release Data (`writeFile` tries to write and save an XLSB file)
            XLSX.writeFile(workbook, "Ordres De Réparation.xls");

            // Set HTTP headers to allow the file to be downloaded
            httpGetResponse.setHeader('Content-Disposition', `attachment; filename="\Ordres De Réparation.xls"`);
            httpGetResponse.setHeader('Content-Type', 'text/plain');

            // Read and respond with the file
            fs.readFile("\Report.ods", (err, data) => {
                if (err) {
                    httpGetResponse.writeHead(404, { 'Content-Type': 'text/html' });
                    httpGetResponse.status(200).send("ERROR");
                }
                httpGetResponse.status(200).send(data);
            });

        });

    } catch (error) {
        console.log("ERROR : " + error.message);
        httpGetResponse.status(500).send({ message: "Internal server error" });
    }
})

const ItemsToText = (ParamItems) => {
    let result = "???";

    if (ParamItems) {

        if (ParamItems.length == 0) {
            result = "Aucun";
        }
        // else if (ParamItems.length == 1) {
        //     result = "1 Appareil :\n";
        //     result += "Model : " + ParamItems[0][0].ref + "\n";
        //     result += "IMEI : " + ParamItems[0][0].imei;
        // }
        else {
            result = "";
            for (let i = 0; i < ParamItems.length; i++) {
                const currentItem = ParamItems[i];
                result += "• Appareil N° " + (i+1) + " : \n";
                result += "Model : " + currentItem.ref + "\n";
                result += "IMEI : " + currentItem.imei + "\n";
                result += "Prix Estimé : " + currentItem.estPrice + "\n\n";
            }
        }
    }

return result;
}

module.exports = router;