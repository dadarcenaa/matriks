let stateA = [];
let stateB = [];

// =================== INPUT DINAMIS ===================
function input() {
    simpannilai();
<<<<<<< HEAD

=======
    
>>>>>>> c310904e20aa8002271894607c90543717054bd2
    let barisA = parseInt(document.getElementById("barisA").value);
    let kolomA = parseInt(document.getElementById("kolomA").value);
    let barisB = parseInt(document.getElementById("barisB").value);
    let kolomB = parseInt(document.getElementById("kolomB").value);

<<<<<<< HEAD
    // Matriks A
=======

//Matrix A
>>>>>>> c310904e20aa8002271894607c90543717054bd2
    if (barisA > 0 && kolomA > 0) {
        let htmlA = "<h3>Matriks A</h3><table>";
        for (let i = 0; i < barisA; i++) {
            htmlA += "<tr>";
            for (let j = 0; j < kolomA; j++) {
                let val = (stateA[i] && stateA[i][j] !== undefined) ? stateA[i][j] : "";
                htmlA += `<td><input type="number" id="A${i}${j}" value="${val}" oninput="simpannilai()"></td>`;
            }
            htmlA += "</tr>";
        }
        htmlA += "</table>";
        document.getElementById("matriksA").innerHTML = htmlA;
    }

    // Matriks B
    if (barisB > 0 && kolomB > 0) {
        let htmlB = "<h3>Matriks B</h3><table>";
        for (let i = 0; i < barisB; i++) {
            htmlB += "<tr>";
            for (let j = 0; j < kolomB; j++) {
                let val = (stateB[i] && stateB[i][j] !== undefined) ? stateB[i][j] : "";
                htmlB += `<td><input type="number" id="B${i}${j}" value="${val}" oninput="simpannilai()"></td>`;
            }
            htmlB += "</tr>";
        }
        htmlB += "</table>";
        document.getElementById("matriksB").innerHTML = htmlB;
    }
}

// =================== AMBIL MATRKS ===================
function ambilMatriks(prefix) {
    let result = [];
    let i = 0;

    while (true) {
        let row = [];
        let j = 0;

        while (true) {
            let el = document.getElementById(prefix + i + j);
            if (!el) break;
<<<<<<< HEAD
            row.push(parseFloat(el.value) || 0);
=======
            row.push(parseFloat(el.value)|| 0);
>>>>>>> c310904e20aa8002271894607c90543717054bd2
            j++;
        }

        if (row.length === 0) break;
        result.push(row);
        i++;
    }

    return result;
}

// =================== SIMPAN STATE ===================
function simpannilai() {
    stateA = ambilMatriks("A");
    stateB = ambilMatriks("B");
}

<<<<<<< HEAD
// =================== KIRIM OPERASI MATRIKS ===================
function kirim(operasi, target = "A") {
    simpannilai();
=======
function kirim(operasi) {
    simpannilai(); // ambil state terbaru
>>>>>>> c310904e20aa8002271894607c90543717054bd2

    let data = { operasi: operasi, target: target, A: stateA, B: stateB };

    fetch("/matrix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if (res.error) alert(res.error);
        else {
            tampilkanHasil(res.hasil);
            if (target === "A") stateA = res.hasil;
            else stateB = res.hasil;
        }
    })
    .catch(err => { console.error(err); alert("Gagal menghubungi server"); });
}

// =================== OBE BARIS/KOLOM TUNGAL ===================
function obeExecute(type) {
    simpannilai();

    let obeType = document.getElementById("obeType").value; // row/col
    let i = parseInt(document.getElementById("obe_i").value);
    let j = parseInt(document.getElementById("obe_j").value);
    let k = parseFloat(document.getElementById("obe_k").value);

    let payload = { A: stateA };

    if (type === "swap") payload.operasi = obeType === "row" ? "tukar" : "tukarKolom";
    else if (type === "scale") payload.operasi = obeType === "row" ? "kaliBaris" : "kaliKolom";
    else if (type === "add") payload.operasi = obeType === "row" ? "tambahBaris" : "tambahKolom";

    // Parameter sesuai jenis operasi
    if (type === "swap") { payload.i = i; payload.j = j; }
    else if (type === "scale") { payload.i = i; payload.k = k; }
    else if (type === "add") { payload.i = j; payload.j = i; payload.k = k; }

    fetch("/matrix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
        if (res.error) alert(res.error);
        else {
            tampilkanHasil(res.hasil);
            stateA = res.hasil;
        }
    })
    .catch(err => { console.error(err); alert("Gagal menghubungi server"); });
}

// =================== TAMPILKAN HASIL ===================
function tampilkanHasil(matriks) {
    if (!matriks || matriks.length === 0) {
        document.getElementById("hasil").innerHTML = "—";
        return;
    }

    let html = "<table class='hasil-table'>";
    for (let i = 0; i < matriks.length; i++) {
        html += "<tr>";
        for (let j = 0; j < matriks[i].length; j++) {
            html += `<td>${Number(matriks[i][j].toFixed(4))}</td>`;
        }
        html += "</tr>";
    }
    html += "</table>";

    document.getElementById("hasil").innerHTML = html;
}
<<<<<<< HEAD
=======




>>>>>>> c310904e20aa8002271894607c90543717054bd2
