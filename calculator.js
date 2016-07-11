function calculate() {

    var pellet_diameter_mm = parseFloat(document.getElementById("pellet_diameter_mm").value);
    var pellet_radius_mm = pellet_diameter_mm/2;
    var pellet_area = Math.PI * pellet_radius_mm * pellet_radius_mm;
    document.getElementById("pellet_area").value = pellet_area;

    var sample_absorption_length_um = parseFloat(document.getElementById("sample_absorption_length_um").value);
    var sample_absorption_lengths = parseFloat(document.getElementById("sample_absorption_lengths").value);
    const um_to_mm = 1.0/1000.0;
    var sample_volume = sample_absorption_lengths * (sample_absorption_length_um*um_to_mm) * pellet_area;
    document.getElementById("sample_volume").value = sample_volume;

    var sample_thick_mm = sample_volume / pellet_area;
    document.getElementById("sample_thick_mm").value = sample_thick_mm;

    var binder_volume_ratio = parseFloat(document.getElementById("binder_volume_ratio").value);
    var binder_volume = binder_volume_ratio * sample_volume;
    document.getElementById("binder_volume").value = binder_volume;

    var binder_thick_mm = binder_volume / pellet_area;
    document.getElementById("binder_thick_mm").value = binder_thick_mm;

    var filler_volume_ratio = parseFloat(document.getElementById("filler_volume_ratio").value);
    var filler_volume = filler_volume_ratio * sample_volume;
    document.getElementById("filler_volume").value = filler_volume;

    var filler_thick_mm = filler_volume / pellet_area;
    document.getElementById("filler_thick_mm").value = filler_thick_mm;

    var total_thick_mm = sample_thick_mm + binder_thick_mm + filler_thick_mm;
    document.getElementById("total_thick_mm").value = total_thick_mm;

    var binder_absorption_length_um = parseFloat(document.getElementById("binder_absorption_length_um").value);
    var binder_absorption_lengths = binder_thick_mm / (binder_absorption_length_um * um_to_mm);
    document.getElementById("binder_absorption_lengths").value = binder_absorption_lengths;

    var filler_absorption_length_um = parseFloat(document.getElementById("filler_absorption_length_um").value);
    var filler_absorption_lengths = filler_thick_mm / (filler_absorption_length_um * um_to_mm);
    document.getElementById("filler_absorption_lengths").value = filler_absorption_lengths;

    var total_absorption_lengths = sample_absorption_lengths + binder_absorption_lengths + filler_absorption_lengths;
    document.getElementById("total_absorption_lengths").value = total_absorption_lengths;

    var sample_density = parseFloat(document.getElementById("sample_density").value);
    var sample_mass_mg = sample_volume * sample_density;
    document.getElementById("sample_mass_mg").value = sample_mass_mg;

    var binder_density = parseFloat(document.getElementById("binder_density").value);
    var binder_mass_mg = binder_volume * binder_density;
    document.getElementById("binder_mass_mg").value = binder_mass_mg;

    var filler_density = parseFloat(document.getElementById("filler_density").value);
    var filler_mass_mg = filler_volume * filler_density;
    document.getElementById("filler_mass_mg").value = filler_mass_mg;

    var total_mass_mg = sample_mass_mg + binder_mass_mg + filler_mass_mg;
    document.getElementById("total_mass_mg").value = total_mass_mg;
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

window.onload = function() {
    calculate();

    var input_ids = new Array();
    input_ids.push("pellet_diameter_mm");
    input_ids.push("sample_absorption_length_um");
    input_ids.push("sample_absorption_lengths");
    input_ids.push("sample_density");
    input_ids.push("binder_absorption_length_um");
    input_ids.push("binder_density");
    input_ids.push("binder_volume_ratio");
    input_ids.push("filler_absorption_length_um");
    input_ids.push("filler_density");
    input_ids.push("filler_volume_ratio");

    var i;
    for (i=0; i<input_ids.length; i++) {
        document.getElementById(input_ids[i]).addEventListener('input', calculate);
    }

    document.getElementById("download_csv_button").addEventListener('click', download_csv);

}
