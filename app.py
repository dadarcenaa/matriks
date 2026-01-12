from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def bisa_tambah_kurang(A, B):
    return len(A) == len(B) and len(A[0]) == len(B[0])

def bisa_kali(A, B):
    return len(A[0]) == len(B)

def tambah(A, B):
    return [[A[i][j] + B[i][j] for j in range(len(A[0]))] for i in range(len(A))]

def kurang(A, B):
    return [[A[i][j] - B[i][j] for j in range(len(A[0]))] for i in range(len(A))]

def kali(A, B):
    hasil = []
    for i in range(len(A)):
        baris = []
        for j in range(len(B[0])):
            total = 0
            for k in range(len(B)):
                total += A[i][k] * B[k][j]
            baris.append(total)
        hasil.append(baris)
    return hasil

def transpose(M):
    return [[M[i][j] for i in range(len(M))] for j in range(len(M[0]))]


def invers(M):
    n = len(M)

    if n != len(M[0]):
        raise Exception("Matriks harus persegi")

    aug = [M[i] + [1 if i == j else 0 for j in range(n)] for i in range(n)]

    for i in range(n):
        if aug[i][i] == 0:
            raise Exception("Matriks tidak memiliki invers")

        pivot = aug[i][i]
        for j in range(2 * n):
            aug[i][j] /= pivot

        for k in range(n):
            if k != i:
                faktor = aug[k][i]
                for j in range(2 * n):
                    aug[k][j] -= faktor * aug[i][j]

    return [row[n:] for row in aug]


def copy_matrix(A):
    return [row[:] for row in A]


def determinan(A):
    if len(A) != len(A[0]):
        raise Exception("Matriks harus persegi")

    n = len(A)
    M = copy_matrix(A)
    det = 1

    for i in range(n):
        if M[i][i] == 0:
            for k in range(i + 1, n):
                if M[k][i] != 0:
                    M[i], M[k] = M[k], M[i]
                    det *= -1
                    break
            else:
                return 0

        pivot = M[i][i]
        det *= pivot

        for j in range(i, n):
            M[i][j] /= pivot

        for k in range(i + 1, n):
            faktor = M[k][i]
            for j in range(i, n):
                M[k][j] -= faktor * M[i][j]

    return round(det, 5)


def obe_tukar_baris(M, i, j):
    M[i], M[j] = M[j], M[i]
    return M

def obe_kali_baris(M, i, k):
    M[i] = [k * x for x in M[i]]
    return M

def obe_tambah_baris(M, target, source, k):
    M[target] = [
        M[target][c] + k * M[source][c]
        for c in range(len(M[0]))
    ]
    return M

# ================= OBE KOLOM =================
def obe_tukar_kolom(M, i, j):
    for r in range(len(M)):
        M[r][i], M[r][j] = M[r][j], M[r][i]
    return M

def obe_kali_kolom(M, i, k):
    for r in range(len(M)):
        M[r][i] *= k
    return M

def obe_tambah_kolom(M, target, source, k):
    for r in range(len(M)):
        M[r][target] += k * M[r][source]
    return M

# ================= ROUTES =================
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/matrix', methods=['POST'])
def matrix():
    data = request.json
    A = data.get("A", [])
    B = data.get("B", [])
    operasi = data.get("operasi")
    target = data.get("target", "A")

    try:
        # ==== OPERASI DASAR ====
        if operasi == "tambah":
            result = tambah(A, B)

        elif operasi == "kurang":
            result = kurang(A, B)

        elif operasi == "kali":
            result = kali(A, B)

        elif operasi == "transpose":
            result = transpose(A if target == "A" else B)

        elif operasi == "invers":
            result = invers(A if target == "A" else B)

        elif operasi == "detA":
            result = [[determinan(A)]]

        elif operasi == "detB":
            result = [[determinan(B)]]

        # ==== OBE BARIS ====
        elif operasi == "tukar":
            result = obe_tukar_baris(A, data["i"], data["j"])

        elif operasi == "kaliBaris":
            result = obe_kali_baris(A, data["i"], data["k"])

        elif operasi == "tambahBaris":
            result = obe_tambah_baris(A, data["i"], data["j"], data["k"])

        # ==== OBE KOLOM ====
        elif operasi == "tukarKolom":
            result = obe_tukar_kolom(A, data["i"], data["j"])

        elif operasi == "kaliKolom":
            result = obe_kali_kolom(A, data["i"], data["k"])

        elif operasi == "tambahKolom":
            result = obe_tambah_kolom(A, data["i"], data["j"], data["k"])

        else:
            return jsonify({"error": "Operasi tidak dikenali"}), 400

        return jsonify({"hasil": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
