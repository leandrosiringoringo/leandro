// 📚 Penjelasan: File ini berisi semua logika (otak) dari kalkulator, yaitu bagaimana tombol berinteraksi dan melakukan perhitungan.

document.addEventListener('DOMContentLoaded', function() {
    // 📚 Penjelasan: Memastikan semua elemen HTML (DOM) sudah selesai dimuat sebelum kode JavaScript dijalankan. Ini adalah praktik wajib!

    // Mendapatkan elemen-elemen penting dari HTML
    const display = document.getElementById('display');
    // const statusImage = document.getElementById('statusImage'); // Dihapus karena gambar status tidak dipakai
    const buttons = document.querySelectorAll('.btn-calc');
    // 📚 Penjelasan: Mengambil elemen display (input teks) dan semua tombol dengan class '.btn-calc' agar bisa dimanipulasi.

    /**
     * Fungsi untuk menghapus semua input di layar kalkulator
     */
    function clearDisplay() {
        // 📚 Penjelasan: Mengosongkan nilai yang ada di input display (layar).
        display.value = '';
    }

    /**
     * Fungsi untuk menghapus karakter terakhir
     */
    function deleteLastChar() {
        // 📚 Penjelasan: Mengambil nilai display, lalu menggunakan `slice(0, -1)` untuk memotong satu karakter terakhir.
        display.value = display.value.slice(0, -1);
    }

    /**
     * Fungsi untuk menambahkan nilai tombol ke display
     * @param {string} value Nilai dari tombol yang diklik
     */
    function appendToDisplay(value) {
        // 📚 Penjelasan: Menambahkan nilai tombol yang diklik ke akhir string yang ada di display.
        display.value += value;
    }

    /**
     * Fungsi utama untuk menghitung hasil ekspresi
     */
    function calculateResult() {
        // 📚 Penjelasan: Memeriksa apakah display kosong. Jika ya, tampilkan pesan error singkat.
        if (display.value === '') {
            display.value = 'Kosong!';
            // 📚 Penjelasan: Menunda pemanggilan `clearDisplay` selama 1,5 detik (1500ms) agar pesan error sempat terlihat.
            setTimeout(clearDisplay, 1500);
            return;
        }

        try {
            // 📚 Penjelasan: Menggunakan fungsi `eval()` untuk mengevaluasi (menghitung) string ekspresi matematika di display.
            let expression = display.value;
            // 📚 Penjelasan: Mengganti semua simbol '%' menjadi '/100' agar perhitungan persentase bisa dilakukan (misalnya, '50%2' menjadi '50/100*2').
            expression = expression.replace(/%/g, '/100*');
            
            let result = eval(expression);

            // 📚 Penjelasan: Memeriksa apakah hasil perhitungan adalah angka yang valid (tidak Infinity atau NaN).
            if (isFinite(result)) {
                display.value = result;
            } else {
                // 📚 Penjelasan: Jika hasilnya tidak valid (misal, bagi nol), lemparkan error.
                throw new Error("Hasil tidak valid");
            }

        } catch (error) {
            // 📚 Penjelasan: Menangkap error jika ada (misal, format ekspresi salah, bagi nol).
            console.error("Error kalkulasi:", error);
            display.value = 'Error';
            // 📚 Penjelasan: Menunda pemanggilan `clearDisplay` selama 1,5 detik.
            setTimeout(clearDisplay, 1500);
        }
    }


    // === Logika Menangani Klik Tombol ===
    // 📚 Penjelasan: Melakukan perulangan untuk setiap tombol.
    buttons.forEach(button => {
        // 📚 Penjelasan: Menambahkan event listener 'click' ke setiap tombol.
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value'); // Mengambil nilai dari atribut `data-value`
            
            // 📚 Penjelasan: Menggunakan `switch` untuk menentukan aksi yang akan dilakukan berdasarkan nilai tombol.
            switch(value) {
                case 'C':
                    // 📚 Penjelasan: Jika tombol 'C' diklik, panggil fungsi hapus semua.
                    clearDisplay();
                    break;
                case 'DEL':
                    // 📚 Penjelasan: Jika tombol 'DEL' diklik, panggil fungsi hapus karakter terakhir.
                    deleteLastChar();
                    break;
                case '=':
                    // 📚 Penjelasan: Jika tombol '=' diklik, panggil fungsi hitung hasil.
                    calculateResult();
                    break;
                default:
                    // 📚 Penjelasan: Untuk tombol angka dan operator lainnya:
                    // Tambahkan nilai tombol ke display.
                    appendToDisplay(value);
                    break;
            }
        });
    });

    // === Logika Menangani Input dari Keyboard ===
    document.addEventListener('keydown', (e) => {
        // 📚 Penjelasan: Menambahkan event listener untuk menangani tombol keyboard yang ditekan.
        const key = e.key;

        // 📚 Penjelasan: Cek apakah tombol yang ditekan adalah angka (0-9), titik (.), atau operator (+, -, *, /, %).
        if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
            appendToDisplay(key);
            e.preventDefault(); // Mencegah aksi default browser (misal, mengisi input lain)
        } else if (key === 'Enter' || key === '=') {
            // 📚 Penjelasan: Jika tombol Enter atau '=' ditekan, hitung hasilnya.
            calculateResult();
            e.preventDefault();
        } else if (key === 'Backspace') {
            // 📚 Penjelasan: Jika tombol Backspace ditekan, hapus karakter terakhir.
            deleteLastChar();
            e.preventDefault();
        } else if (key === 'Escape' || key.toLowerCase() === 'c') {
            // 📚 Penjelasan: Jika tombol Escape atau 'c' ditekan, bersihkan display.
            clearDisplay();
            e.preventDefault();
        }
    });

});