import data from "../../data_penerbangan_global.json" assert { type: "json" };

export default  function fetchFlightStatesWithCache() { // ttl = 10 detik
  /**
 * Anggap 'data' adalah variabel yang berisi hasil parse dari file JSON Anda.
 * const data = await fetch('data_penerbangan_global_15000.json').then(res => res.json());
 */

// Menggunakan .map untuk mentransformasi setiap objek penerbangan
// menjadi format yang lebih "flat" dan mudah digunakan di frontend.
const flightsForFrontend = data.penerbangan.map(flight => {
  // Ambil data dari struktur JSON yang detail
  const {
    flight_id,
    info_penerbangan,
    pesawat,
    rute,
    data_live,
    jadwal,
    perkiraan_jarak_km
  } = flight;

  // Susun kembali menjadi objek baru yang lebih sederhana
  return {
    // Properti yang Anda inginkan:
    id: flight_id,
    from: `${rute.keberangkatan.kota} (${rute.keberangkatan.kode})`,
    to: `${rute.tujuan.kota} (${rute.tujuan.kode})`,
    status: info_penerbangan.status_teks,
    timestamp: jadwal.berangkat, // Menggunakan waktu keberangkatan sebagai timestamp utama

    // --- Properti TAMBAHAN (Sangat Penting untuk Visualisasi Globe 3D) ---

    // 1. Posisi real-time untuk ikon pesawat
    position: {
      lat: data_live.posisi_sekarang.lat,
      lon: data_live.posisi_sekarang.lon
    },

    // 2. Arah hadap ikon pesawat di peta
    heading: data_live.heading_derajat,

    // 3. Koordinat untuk menggambar garis/lengkung rute
    pathCoordinates: [
      rute.keberangkatan.koordinat,
      rute.tujuan.koordinat
    ],
    
    // 4. Progres penerbangan untuk progress bar atau animasi
    progress: data_live.progres_penerbangan_persen,

    // 5. Info detail untuk ditampilkan saat ikon di-klik (Tooltip/Popup)
    tooltipInfo: {
      maskapai: info_penerbangan.maskapai,
      pesawat: pesawat.tipe,
      kecepatan: data_live.kecepatan_kph,
      ketinggian: data_live.ketinggian_meter,
      jarak: perkiraan_jarak_km
    }
  };
});

// Sekarang, variabel 'flightsForFrontend' siap digunakan
console.log("Data penerbangan berhasil disusun untuk frontend.");
console.log("Contoh data pertama:", flightsForFrontend[0]);
return flightsForFrontend; // Anda bisa me-return ini dari sebuah fungsi
// return flightsForFrontend; // Anda bisa me-return ini dari sebuah fungsi
}
