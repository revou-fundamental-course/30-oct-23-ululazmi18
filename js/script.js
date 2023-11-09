$(document).ready(function() {
    // Fungsi untuk menghapus kelas input-error saat input fokus dan diisi
    $('#bmiWeight, #bmiHeight, #bmiAge, input[name="gender"]').on('input focus', function() {
        if ($(this).val() !== '') {
            $(this).removeClass('input-error');
        }
    });
});


function hitungbmi() {
    // Mengambil berat badan dari input dengan ID 'bmiWeight'
    var berat = $("#bmiWeight").val();
    // Mengambil tinggi badan dari input dengan ID 'bmiHeight' dan mengubahnya menjadi meter
    var tinggi = $("#bmiHeight").val()/100;
    // Mengambil umur dari input dengan ID 'bmiAge'
    var umur = $("#bmiAge").val();
    var jenisKelamin = $("input[name='gender']:checked").val();

    if (berat && tinggi && umur && jenisKelamin) {
        // Jika umur kurang dari 18 tahun, tampilkan pesan peringatan
        if (umur < 18) {
            Swal.fire({
                icon: "error",
                title: "Informasi !",
                text: "Kalkulator ini hanya tersedia untuk usia 18 tahun ke atas."
            });
            // Menghapus class input-error pada input yang sudah diisi
            $("#bmiWeight").removeClass("input-error");
            $("#bmiHeight").removeClass("input-error");
            $("#bmiAge").removeClass("input-error");
            $("input[name='gender']").removeClass("input-error");
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
            
            // Pindahkan fokus halaman ke elemen dengan ID 'hasil'
            window.location.href = '#hasil';
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
            
        }
    } else {
        
        // Berikan tanda merah di sekitar input yang belum diisi
        if (!berat) {
            $("#bmiWeight").addClass("input-error");
        }
        if (!tinggi) {
            $("#bmiHeight").addClass("input-error");
        }
        if (!umur) {
            $("#bmiAge").addClass("input-error");
        }
        if (!jenisKelamin) {
            $("input[name='gender']").addClass("input-error");
        }
        // Tampilkan pesan bahwa semua input harus terisi
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Harap isi semua input sebelum melanjutkan"
        });
        
    }
}

function clearbmi() {
    // Mereset formulir dengan ID 'frmbmi'. Ini akan mengembalikan semua input ke nilai awalnya.
    $("#frmbmi").trigger("reset");
    
    // Menghapus class input-error pada input yang sudah diisi
    $("#bmiWeight").removeClass("input-error");
    $("#bmiHeight").removeClass("input-error");
    $("#bmiAge").removeClass("input-error");
    $("input[name='gender']").removeClass("input-error");

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
