<?php

namespace Database\Seeders;

use App\Models\Indicator;
use App\Models\IndicatorCriteria;
use Illuminate\Database\Seeder;

class IndicatorTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        IndicatorCriteria::truncate();
        Indicator::truncate();

        $data = collect([
            'People' => [
                ['PP.01', '', null, [
                    ['Jumlah Kegiatan Bakti Sosial Desa dalam 1 tahun terakhir', 'Kegiatan']
                ]],
                ['PP.02', '', null, [
                    ['Jumlah Partisipan yang diundang', 'Orang'],
                    ['Jumlah Partisipan yang hadir', 'Orang']
                ]],
                ['PP.03', '', null, [
                    ['Jumlah ketersediaan sekolah', 'Sekolah']
                ]],
                ['PP.04', '', null, [
                    ['Jumlah warga usia produktif yang buta huruf', 'Orang']
                ]],
                ['PP.05', '', null, [
                    ['Jumlah Warga usia produktif pengguna smartphone dan computer', 'Orang']
                ]],
                ['PP.06', '', null, [
                    ['Jumlah Warga usia produktif yang memiliki Pendidikan Akhir SMA', 'Orang']
                ]],
                ['PP.07', '', null, [
                    ['Jumlah Warga usia produktif yang memiliki Pendidikan Akhir minimal D3', 'Orang']
                ]]
            ],
            'Environment' => [
                ['EV.01', 'Tingkat Ketersediaan Ruang Terbuka Hijau (RTH) public dan private pada satu wilayah desa. Standar Koefisien Daerah Hijau (KDH) menurut UU No. 26 Tahun 2007 adalah minimal 20% untuk RTH Public.', 'Dokumentasi ruang terbuka hijau yang dimiliki desa meliputi data rekap luas dareah terbuka hijau public dan daerah terbuka hijau private', [
                    ['Luas ketersediaan ruang terbuka hijau public (RTHPu)', '㎡']
                ]],
                ['EV.02', 'Tingkat Ketersediaan Ruang Terbuka Hijau (RTH) private dan private pada satu wilayah desa. Standar Koefisien Daerah Hijau (KDH) menurut UU No. 26 Tahun 2007 adalah minimal 10% untuk RTH Private.', 'Dokumentasi ruang terbuka hijau yang dimiliki desa meliputi data rekap luas dareah terbuka hijau public dan daerah terbuka hijau private', [
                    ['Ketersediaan ruang terbuka hijau private (RTHPr)', '㎡']
                ]],
                ['EV.03', '', 'Dokumentasi foto pembangkit', [
                    ['Ketersediaan pembangkit listrik selain PLN', 'Pembangkit']
                ]],
                ['EV.04', 'Tingkat ketersediaan Ruang bermain public', null, [
                    ['Jumlah Ketersediaan ruang terbuka public yang dapat digunakan untuk arena bermain atau rekreasi masyarakat desa', 'Tempat']
                ]],
                ['EV.05', '', null, [
                    ['Jumlah rumah warga', 'Rumah'],
                    ['Jumlah rumah warga yang memanfaatkan air tadah hujan', 'Rumah']
                ]],
                ['EV.06', '', null, [
                    ['Jumlah titik penerangan jalan umum', 'Titik'],
                    ['Jumlah titik penerangan jalan umum yang menggunakan otomatis energy manajemen (Solar cell, LDR, atau lainnya)', 'Titik']
                ]],
                ['EV.07', '', null, [
                    ['Index kualitas udara', 'µgram/m3']
                ]],
                ['EV.08', '', null, [
                    ['Ketersediaan bank sampah atau pengelolaan limbah', 'Unit']
                ]]
            ],
            'Economy' => [
                ['EC.01', '', null, [
                    ['Jumlah usia produktif (15 – 60 tahun) yang bekerja', 'Orang']
                ]],
                ['EC.02', '', null, [
                    ['Jumlah usia produktif (15 – 60 tahun) yang wiraswasta', 'Orang']
                ]],
                ['EC.03', 'Penciptaan lapangan kerja lokal / UMKM', 'Daftar UMKM yang terdaftar atau yang memiliki surat keterangan izin usaha', [
                    ['Jumlah lapangan pekerjaan lokal (UMKM) yang tersedia dalam 1 tahun terakhir', 'Pekerjaan']
                ]],
                ['EC.04', 'Tingkat GDP per kepala dari populasi desa tiap Tahun', null, [
                    ['Nilai Rerata GDP per Kepala dari populasi desa', 'Rp/Tahun']
                ]],
                ['EC.05', 'Banyaknya jumlah usaha bisnis yang menerapkan / terdaftar pada platform TI', null, [
                    ['Jumlah usaha/bisnis yang menerapkan Teknologi Informasi (TI) atau yang terdaftar pada platform teknologi informasi seperti marketplace', 'Usaha']
                ]],
                ['EC.06', 'Banyaknya jumlah objek wisata yang dimiliki desa', 'Surat keterangan objek wisata dari desa atau dinas pariwisata', [
                    ['Jumlah objek wisata', 'Obyek']
                ]],
                ['EC.07', 'Tingkat kunjungan wisatawan dapa objek wisata yang dimiliki Desa', null, [
                    ['Kunjungan Wisatawan baik lokal maupun luar daerah', 'Kunjungan']
                ]],
                ['EC.08', 'Tingkat Kepuasan wisatawan terhadap pelayanan selama berwisata di objek wisata yang dimiliki Desa', 'Dibutuhkan Hasil survey kepuasan wisatawan terhadap pelayanan selama berwisata di objek wisata yang dimiliki Desa', [
                    ['Nilai Kepuasan wisatawan terhadap pelayanan selama berwisata di objek wisata yang dimiliki Desa', '(0 – 100)']
                ]],
                ['EC.09', 'Kemampuan desa dalam membiayai untuk mewujudkan desa cerdas', 'Rencana Program Kerja Desa tahunan yang memuat program Desa Cerdas', [
                    ['Alokasi dana desa untuk proyek atau program desa cerdas selama 1 tahun terakhir', 'Juta']
                ]],
                ['EC.10', 'Banyaknya aplikasi desa cerdas', 'Daftar Aplikasi yang memuat URL maupun nama aplikasi', [
                    ['Jumlah Aplikasi Desa Cerdas yang dimiliki baik berbasis website maupun mobile', 'Aplikasi']
                ]]
            ],
            'Governance' => [
                ['GV.01', 'Sejauh mana informasi pemerintah desa dipublikasikan', 'Dibutuhkan Hasil survey kepuasan masyarakat terhadap tata Kelola layanan pemerintah desa', [
                    ['Nilai Persepsi masyarakat terhadap Ketersediaan dan transparansi data maupun informasi oleh pemerintahan desa', '(0 – 100)']
                ]],
                ['GV.02', 'Tingkat keandalan layanan umum yang diberikan pemerintah desa kepada para pemangku kepentingan', 'Dibutuhkan Hasil survey kepuasan masyarakat terhadap tata Kelola layanan pemerintah desa', [
                    ['Keandalan layanan umum yang diberikan oleh pemerintah desa kepada stakeholder', '(0 – 100)']
                ]],
                ['GV.03', '', null, [
                    ['Nilai persepsi masyarakat terhadap Efektivitas tata Kelola dan kebijakan umum pemerintahan desa dalam mewujudkan desa cerdas', '(0 – 100)']
                ]],
                ['GV.04', 'Tingkat efisiensi sistem tata Kelola, layanan dan umpan balik pemerintah desa berbasis elektronik (ICT)', 'Dibutuhkan Hasil survey kepuasan masyarakat terhadap tata Kelola layanan pemerintah desa', [
                    ['Efisiensi Sistem tata Kelola, layanan dan umpan balik pemerintah desa berbasis elektronik (ICT)', '(0 - 100)']
                ]],
                ['GV.05', 'Tingkat kebaruan informasi yang diberikan oleh pemerintah desa', 'Cek official website', [
                    ['Intensitas update informasi yang diberikan oleh pemerintah desa berbasis website', '(1 - 12)']
                ]],
                ['GV.06', 'Tingkat kualitas dukungan staff pemerintahan desa dalam memberikan pelayanan kepada masyarakat', 'Dibutuhkan Hasil survey kepuasan masyarakat terhadap tata Kelola layanan pemerintah desa', [
                    ['Kualitas dukungan perangkat pemerintahan desa dalam memberikan layanan terhadap masyarakat', '(0 - 100)']
                ]]
            ],
            'Infrastructure' => [
                ['IS.01', 'Persentase (KK) yang berlangganan internet berkecepatan tinggi 100 Mbps', null, [
                    ['Jumlah Kepala Keluarga', 'KK'],
                    ['Jumlah KK yang berlangganan internet berkecepatan tinggi 100 Mbps', 'KK']
                ]],
                ['IS.02', 'Ketersediaan akses internet gratis bagi warga', 'Submit bukti pembayaran langganan internet Wifi desa selama 3 bulan terakhir', [
                    ['Jumlah RT', 'Titik'],
                    ['Jumlah Wi-Fi hotspot gratis untuk akses internet di ruang public', 'Titik']
                ]],
                ['IS.03', 'Access to public transportation', null, [
                    ['Jumlah rumah warga', 'Rumah'],
                    ['Jumlah rumah warga yang dapat mengakses fasilitas transportasi umum dalam radius ≤ 500 meter (APT)', 'Rumah']
                ]]
            ],
            'Living' => [
                ['LV.01', 'Tingkat Kepadatan penduduk dalam satu wilayah pedesaan', null, [
                    ['Kepadatan penduduk desa', 'Jiwa/Ha']
                ]],
                ['LV.02', 'Angka kejahatan (crime rate) per 100.000 penduduk', null, [
                    ['Jumlah kejadian tindak kriminalitas dalam 1 tahun terakhir', 'Kasus']
                ]],
                ['LV.03', 'Biaya hidup masyarakat desa', null, [
                    ['Biaya hidup', 'Rp/Bulan']
                ]],
                ['LV.04', 'Tingkat kepuasan masyarakat terhadap Perencanaan, pemantauan, dan pengelolaan risiko bencana', null, [
                    ['Kepuasan masyarakat terhadap Perencanaan, pemantauan, dan pengelolaan risiko bencana', '(0 - 100)']
                ]],
                ['LV.05', 'Tingkat kepuasan masyarakat terhadap Akses ke layanan perawatan kesehatan dasar', null, [
                    ['Kepuasan masyarakat terhadap Akses ke layanan perawatan kesehatan dasar', '(0 – 100)']
                ]]
            ]
        ]);
        $data->each(function ($values, $key) {
            $criteria = IndicatorCriteria::create([
                'name' => $key
            ]);
            if ($criteria) {
                $questions = collect($values)->map(function ($value) {
                    return [
                        'code' => $value[0],
                        'description' => $value[1],
                        'evidence' => $value[2]
                    ];
                })->toArray();
                $criteria->indicators()->createMany($questions);
                $criteria->indicators->map(function ($indicator, $index) use ($values) {
                    $inputs = collect($values[$index][3])->map(function ($input) {
                        return [
                            'label' => $input[0],
                            'unit' => $input[1]
                        ];
                    })->toArray();
                    $indicator->inputs()->createMany($inputs);
                });
            }
        });
    }
}
