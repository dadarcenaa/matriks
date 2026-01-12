from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def bisa_tambah_kurang(A, B):
    return len(A) == len(B) and len(A[0]) == len(B[0])


def bisa_kali(A, B):
    return len(A[0]) == len(B)


def tambah(A, B):
    hasil = []
    for i in range(len(A)):
        baris = []
        for j in range(len(A[0])):
            baris.append(A[i][j] + B[i][j])
        hasil.append(baris)
    return hasil


def kurang(A, B):
    hasil = []
    for i in range(len(A)):
        baris = []
        for j in range(len(A[0])):
            baris.append(A[i][j] - B[i][j])
        hasil.append(baris)
    return hasil


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
    hasil = []
    for j in range(len(M[0])):
        baris = []
        for i in range(len(M)):
            baris.append(M[i][j])
        hasil.append(baris)
    return hasil


@app.route('/')
def index():
    return render_template('index.html')



@app.route('/matrix', methods=['POST'])
def matrix():
    data = request.json
    A = data['A']
    B = data.get('B', [])
    operasi = data['operasi']

    try:
        if operasi == "tambah":
            if bisa_tambah_kurang(A, B):
                result = tambah(A, B)
            else:
                return jsonify({"error": "Ukuran matriks tidak sesuai"}), 400
        elif operasi == "kurang":
            if bisa_tambah_kurang(A, B):
                result = kurang(A, B)
            else:
                return jsonify({"error": "Ukuran matriks tidak sesuai"}), 400
        elif operasi == "kali":
            if bisa_kali(A, B):
                result = kali(A, B)
            else:
                return jsonify({"error": "Ukuran matriks tidak sesuai"}), 400
        elif operasi == "transpose":
            result = transpose(A)
        else:
            return jsonify({"error": "Operasi tidak dikenali"}), 400

        return jsonify({"hasil": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500




if __name__ == '__main__':
    app.run(debug=True)

    