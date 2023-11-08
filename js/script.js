function hitungbmi() {
    // Mengambil berat badan dari input dengan ID 'bmiWeight'
    var berat = $("#bmiWeight").val();
    // Mengambil tinggi badan dari input dengan ID 'bmiHeight' dan mengubahnya menjadi meter
    var tinggi = $("#bmiHeight").val()/100;
    // Mengambil umur dari input dengan ID 'bmiAge'
    var umur = $("#bmiAge").val();
    
    // Jika umur kurang dari 18 tahun, tampilkan pesan peringatan
    if (umur < 18) {
        mscAlert("Informasi !", "Kalkulator hanya untuk 18 tahun ke atas");
    } else {
        // Hitung BMI menggunakan rumus berat/(tinggi*tinggi)
        var bmi = berat / (tinggi * tinggi);
        // Tampilkan elemen dengan ID 'contenthasil'
        document.getElementById("contenthasil").style.display = "block";
        // Sembunyikan elemen dengan ID 'contentunderweight' dan 'contentoverweight'
        document.getElementById("contentunderweight").style.display = "none";
        document.getElementById("contentoverweight").style.display = "none";
        // Tampilkan hasil BMI yang telah dihitung dan dibulatkan ke satu desimal
        document.getElementById("hasilBMI").innerHTML = bmi.toFixed(1).toString();
        
        // Cek nilai BMI dan tampilkan informasi sesuai dengan kategori BMI
        if (bmi < 18.5) {
            // Kategori berat badan kurang
            document.getElementById("hasilKualitas").innerHTML = "Berat Badan Kurang";
            document.getElementById("hasilKet").innerHTML = "Anda kekurangan berat badan";
            document.getElementById("saranBMI").innerHTML = "Anda berada dalam kategori kekurangan berat badan. <br /> Hubungi dokter lebih lanjut mengenai pola makan dan gizi yang baik untuk meningkatkan kesehatan.";
            document.getElementById("kualitasBMI").innerHTML = "Hasil BMI < 18.5";
            document.getElementById("contentunderweight").style.display = "block";
        } else if (bmi < 22.9) {
            // Kategori berat badan normal
            document.getElementById("hasilKualitas").innerHTML = "Normal";
            document.getElementById("hasilKet").innerHTML = "Anda memiliki berat badan ideal.<br />Good job!!";
            document.getElementById("saranBMI").innerHTML = "Anda berada dalam kategori berat badan yang normal. <br /> Tetap pertahankan berat badan Anda dan jaga berat badan Anda dengan mengatur keseimbangan antara pola makan dan aktivitas fisik Anda. ";
            document.getElementById("kualitasBMI").innerHTML = "Hasil BMI diantara 18.5 dan 22.9";
        } else if (bmi < 25) {
            // Kategori berat badan lebih
            document.getElementById("hasilKualitas").innerHTML = "Berat Badan Lebih";
            document.getElementById("hasilKet").innerHTML = "Anda memiliki berat badan berlebih";
            document.getElementById("saranBMI").innerHTML = "Anda berada dalam kategori overweight atau berat badan berlebih. <br /> Cara terbaik untuk menurunkan berat badan adalah dengan mengatur kalor makanan yang dikonsumsi dan berolahraga.  <br /> Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menurunkan berat badan hingga batas normal.";
            document.getElementById("kualitasBMI").innerHTML = "Hasil BMI diantara 23 dan 25 ";
            document.getElementById("contentoverweight").style.display = "block";
        } else {
            // Kategori obesitas
            document.getElementById("hasilKualitas").innerHTML = "Obesitas";
            document.getElementById("hasilKet").innerHTML = "Anda berada dalam kategori obesitas";
            document.getElementById("saranBMI").innerHTML = "Anda berada dalam kategori obesitas. <br /> Usahakan untuk menurunkan berat badan dan menerapkan pola hidup sehat dengan menjaga makan dan aktivitas fisik. <br /> Segera kunjungi dokter untuk dilakukan pemeriksaan kesehatan lanjutan untuk mengetahui risiko yang Anda miliki terkait berat badan Anda.";
            document.getElementById("kualitasBMI").innerHTML = "Hasil BMI lebih dari 25";
            document.getElementById("contentoverweight").style.display = "block";
        }
        
        // Fungsi downloadPdf belum didefinisikan di sini
        downloadPdf(bmi);
        // Pindahkan fokus halaman ke elemen dengan ID 'hasil'
        window.location.href = '#hasil';
    }
}

function clearbmi() {
    // Mereset formulir dengan ID 'frmbmi'. Ini akan mengembalikan semua input ke nilai awalnya.
    $("#frmbmi").trigger("reset");

    // Menyembunyikan elemen yang menampilkan hasil perhitungan BMI.
    document.getElementById("contenthasil").style.display = "none";
    document.getElementById("contentoverweight").style.display = "none";
    document.getElementById("contentunderweight").style.display = "none";

    // Mengosongkan konten dari elemen-elemen yang sebelumnya menampilkan informasi hasil BMI.
    document.getElementById("hasilKualitas").innerHTML = "";
    document.getElementById("hasilKet").innerHTML = "";
    document.getElementById("saranBMI").innerHTML = "";
    document.getElementById("kualitasBMI").innerHTML = "";
    document.getElementById("hasilBMI").innerHTML = "";

    // Mengubah fokus halaman ke bagian dengan ID 'datapengguna', yang mungkin berfungsi untuk memfokuskan pengguna pada bagian tertentu setelah reset.
    window.location.href = '#datapengguna';
}

document.addEventListener('DOMContentLoaded', function () {
    // Event listener untuk tombol 'Hitung BMI'
    document.getElementById('calculateBmiBtn').addEventListener('click', hitungbmi);
    
    // Event listener untuk tombol 'Reset'
    document.getElementById('resetBmiBtn').addEventListener('click', clearbmi);
});

function downloadPdf(hasil) {
    // Membuat objek 'send' yang berisi data untuk dikirim ke server
    var send = {
        // Mengambil nilai yang dipilih untuk input 'gender'
        jenisKelamin: document.querySelector('input[name="gender"]:checked').value,
        // Mengambil nilai dari input berat badan
        berat: $("#bmiWeight").val(),
        // Mengambil nilai dari input tinggi badan
        tinggi: $("#bmiHeight").val(),
        // Mengambil nilai dari input usia
        usia: $("#bmiAge").val(),
        // Memformat hasil BMI ke satu tempat desimal dan mengonversinya ke string
        bmi: hasil.toFixed(1).toString(),
    };
    // Memanggil fungsi 'insertDataBmi' dengan objek 'send' dan fungsi callback
    insertDataBmi(send, function (response) {
        // Mengecek apakah respons dari server menunjukkan keberhasilan
        if (response.success) {
            // Jika sukses, memanggil fungsi 'pdfNew2' dengan data respons
            pdfNew2(response.data);
        } else {
            // Jika terjadi kesalahan, menampilkan pesan error
            mscAlert("Error", "Something Went Wrong");
        }
    });
}

function insertDataBmi(data, onSuccess) {
    // Kirim permintaan AJAX dengan metode POST ke endpoint server "addBmiData"
    // 'data' merupakan objek yang berisi data yang akan dikirim
    // 'onSuccess' adalah fungsi callback yang dipanggil ketika permintaan berhasil
    AJAX("POST", "addBmiData", data, onSuccess, "application/x-www-form-urlencoded; charset=UTF-8");
}

function pdfNew2(pdf64) {
    // Periksa apakah variabel 'pdf64' memiliki nilai
    if (pdf64) {
        // Membuat URI data untuk PDF dengan menggunakan data base64 yang diterima
        var uri = `data:application/pdf;base64,${pdf64}`;
        // Mengatur atribut 'href' untuk elemen link dengan ID 'downloadBmi'
        // sehingga pengguna dapat mengklik dan mendownload file PDF
        $("#downloadBmi").attr("href", uri);
    }
}

function loading(condition, actionname) {
    // Periksa nilai 'condition'
    if (!condition) {
        // Jika 'condition' bernilai false, tampilkan pesan "loading" di konsol
        console.log("loading");
    } else {
        // Jika 'condition' bernilai true, tampilkan pesan "loading" di konsol
        // (Fungsi ini tampaknya tidak melakukan apa-apa yang berbeda berdasarkan kondisi)
        console.log("loading");
    }
}