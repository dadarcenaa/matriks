let stateA = [];
let stateB = [];


function input() {
    simpannilai();
    let barisA = parseInt(document.getElementById("barisA").value);
    let kolomA = parseInt(document.getElementById("kolomA").value);
    let barisB = parseInt(document.getElementById("barisB").value);
    let kolomB = parseInt(document.getElementById("kolomB").value);

    
    

//Matrix A
    if (barisA > 0 && kolomA > 0) {
        let htmlA = "<h3>Matriks A</h3><table>";
        for (let i = 0; i < barisA; i++) {
            htmlA += "<tr>";
            for (let j = 0; j < kolomA; j++) {
                let val = (stateA[i] && stateA[i][j] !== undefined) ? stateA[i][j] : "";
                htmlA += `<td><input type="number" id="A${i}${j}" value="${val}"></td>`;
            }
            htmlA += "</tr>";
        }
        htmlA += "</table>";
        document.getElementById("matriksA").innerHTML = htmlA;
    }

//Matrix B
    if (barisB > 0 && kolomB > 0) {
        let htmlB = "<h3>Matriks B</h3><table>";
        for (let i = 0; i < barisB; i++) {
            htmlB += "<tr>";
            for (let j = 0; j < kolomB; j++) {
                let val = (stateB[i] && stateB[i][j] !== undefined) ? stateB[i][j] : "";
                htmlB += `<td><input type="number" id="B${i}${j}" value="${val}"></td>`;
            }
            htmlB += "</tr>";
        }
        htmlB += "</table>";
        document.getElementById("matriksB").innerHTML = htmlB;
}


}


function ambilMatriks(prefix) {
    let result = [];
    let i = 0;

    while (true) {
        let row = [];
        let j = 0;

        while (true) {
            let el = document.getElementById(prefix + i + j);
            if (!el) break;
            row.push(parseFloat(el.value)|| 0);
            j++;
        }

        if (row.length === 0) break;
        result.push(row);
        i++;
    }

    return result;
}



function simpannilai(){
    stateA = ambilMatriks("A");
    stateB = ambilMatriks("B");
}

function kirim(operasi) {
    simpannilai();

    let data = {
        A: stateA,
        operasi: operasi
    };

    if (operasi !== "transpose") {
        data.B = stateB;
    }

    fetch("/matrix", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if (res.error) {
            alert(res.error);
        } else {
            tampilkanHasil(res.hasil);
        }
    })
    .catch(err => {
        console.error(err);
        alert("Gagal menghubungi server Python");
    });
}

function tampilkanHasil(matriks) {
    let html = "<table border='1'>";
    for (let i = 0; i < matriks.length; i++) {
        html += "<tr>";
        for (let j = 0; j < matriks[i].length; j++) {
            html += `<td>${matriks[i][j]}</td>`;
        }
        html += "</tr>";
    }
    html += "</table>";

    document.getElementById("hasil").innerHTML = html;
}




