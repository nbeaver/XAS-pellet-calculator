function calc_pellet_area() {
    var pellet_diameter_mm = parseFloat(document.getElementById("pellet_diameter_mm").value);
    var pellet_radius_mm = pellet_diameter_mm/2;
    var pellet_area = Math.PI * pellet_radius_mm * pellet_radius_mm;
    document.getElementById("pellet_area").value = pellet_area;
}

function table_to_csv(table) {
    var table_string = "";
    var row_delimiter = "\n";
    var column_delimiter = ",";
    // http://stackoverflow.com/a/3065389/1608986
    for (var i=0, row; row=table.rows[i]; i++) {
        for (var j=0, col; col=row.cells[j]; j++) {
            if (j < row.cells.length - 1) {
                table_string += col.textContent + column_delimiter;
            }
            else {
                // Last item in row.
                if (col.childElementCount > 0) {
                    table_string += col.children[0].value;
                }
                else {
                    table_string += col.textContent;
                }
            }
        }
        if (i < table.rows.length - 1) {
            table_string += row_delimiter;
        }
    }
    return table_string;
}

function download_csv() {
    var table = document.getElementById("calculator_table");
    var tempAnchor = window.document.createElement('a');
    CSVBlob = new Blob([table_to_csv(table)], {type: 'text/csv'});
    tempAnchor.href = window.URL.createObjectURL(CSVBlob);
    tempAnchor.download = document.getElementById("csv_filename").value;
    tempAnchor.style.display = 'none';
    document.body.appendChild(tempAnchor);
    tempAnchor.click();
    document.body.removeChild(tempAnchor);
}

function add_input_listeners(outputId, calcFunc) {
    console.log(outputId);
    calcFunc();
    var inputIds = document.getElementById(outputId).htmlFor;
    console.log((new Error).lineNumber);
    if (inputIds.length > 0) {
        var i;
        for (i=0; i < inputIds.length; i++) {
            console.log(inputIds[i]);
            console.log((new Error).lineNumber);
            document.getElementById(inputIds[i]).addEventListener('input', calcFunc);
        }
    }
    else {
        console.log("Error: length of inputIds is 0");
    }
}

window.onload = function() {
    //calculate_current();
    //
    //var input_ids = new Array("mg_electrode", "mg_current_collector", "percent_active_material", "percent_carbon", "mg_carbon", "capacity_active_material", "capacity_carbon", "hours_charge_time", "electrode_area");
    //var i;
    //for (i=0; i<input_ids.length; i++) {
    //    document.getElementById(input_ids[i]).addEventListener('input', calculate_current);
    //}


    //calc_pellet_area();
    //document.getElementById("pellet_diameter_mm").addEventListener('input', calc_pellet_area);
    add_input_listeners("pellet_diameter_mm", calc_pellet_area)

    document.getElementById("download_csv_button").addEventListener('click', download_csv);
}
