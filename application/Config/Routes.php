<?php

namespace Config;

/**
 * --------------------------------------------------------------------
 * URI Routing
 * --------------------------------------------------------------------
 * This file lets you re-map URI requests to specific controller functions.
 *
 * Typically there is a one-to-one relationship between a URL string
 * and its corresponding controller class/method. The segments in a
 * URL normally follow this pattern:
 *
 *    example.com/class/method/id
 *
 * In some instances, however, you may want to remap this relationship
 * so that a different class/function is called than the one
 * corresponding to the URL.
 *
 */

// Create a new instance of our RouteCollection class.
$routes = Services::routes(true);

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(BASEPATH . 'Config/Routes.php')) {
	require BASEPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 * The RouteCollection object allows you to modify the way that the
 * Router works, by acting as a holder for it's configuration settings.
 * The following methods can be called on the object to modify
 * the default operations.
 *
 *    $routes->defaultNamespace()
 *
 * Modifies the namespace that is added to a controller if it doesn't
 * already have one. By default this is the global namespace (\).
 *
 *    $routes->defaultController()
 *
 * Changes the name of the class used as a controller when the route
 * points to a folder instead of a class.
 *
 *    $routes->defaultMethod()
 *
 * Assigns the method inside the controller that is ran when the
 * Router is unable to determine the appropriate method to run.
 *
 *    $routes->setAutoRoute()
 *
 * Determines whether the Router will attempt to match URIs to
 * Controllers when no specific route has been defined. If false,
 * only routes that have been defined here will be available.
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('View');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// $routes->set404Override(function() {
// 	echo view('404');die;
// });
$routes->setAutoRoute(false);

/**
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.

// FRONT END
$routes->add('/', 'View::index');
$routes->add('layanan_informasi_mahasiswa', 'View::layanan_informasi_mahasiswa');
$routes->add('layanan_informasi_dosen', 'View::layanan_informasi_dosen');
$routes->add('layanan_informasi_buku', 'View::layanan_informasi_buku');
$routes->add('portal', 'Front::portal');
// BERITA
$routes->add('layanan_berita', 'View::layanan_berita');
$routes->add('detailberita/(:any)', 'View::detail_berita');
// AGENDA
$routes->add('layanan_agenda', 'View::layanan_agenda');
$routes->add('detailagenda/(:any)', 'View::detail_agenda');


// LOGIN
$routes->add('login', 'View::login');
$routes->add('register', 'View::register');

// BACKEND
$routes->add('dashboard', 'View::dashboard');
$routes->add('permohonan', 'View::permohonan');
$routes->add('verifikasi_dokumen', 'View::verifikasi_dokumen');
$routes->add('bangunan_bertahap', 'View::bangunan_bertahap');
$routes->add('profil_pu', 'View::profil_pu');
$routes->add('data_asn', 'View::data_asn');
$routes->add('input_tpa', 'View::input_tpa');
$routes->add('surat_keputusan', 'View::surat_keputusan');
$routes->add('data_kampus', 'View::data_kampus');
$routes->add('konsultasi', 'View::konsultasi');
$routes->add('pengawas_pupr', 'View::pengawas_pupr');
$routes->add('penilaian_konsultasi', 'View::penilaian_konsultasi');
$routes->add('inspeksi', 'View::inspeksi');
$routes->add('validasi_rekomtek_kadis', 'View::validasi_rekomtek_kadis');
$routes->add('validasi_hasil_inspeksi', 'View::validasi_hasil_inspeksi');
$routes->add('penagihan_retribusi', 'View::penagihan_retribusi');
$routes->add('penyerahan_dokumen', 'View::penyerahan_dokumen');
$routes->add('penerbitan_dokumen', 'View::penerbitan_dokumen');
$routes->add('FormPendaftaran', 'View::FormPendaftaran');

$routes->add('data_mahasiswa', 'View::data_mahasiswa');
$routes->add('data_dosen', 'View::data_dosen');
// $routes->add('data_kampus', 'View::data_kampus');
$routes->add('data_jadwal', 'View::data_jadwal');
$routes->add('data_buku', 'View::data_buku');
$routes->add('data_user', 'View::user');
$routes->add('data_slider', 'View::data_slider');
$routes->add('data_berita', 'View::data_berita');

$routes->add('vouchers', 'View::vouchers');
$routes->add('reportVouchers', 'View::reportVouchers');

// Add route Dealer dan Payment
$routes->add('data_payment', 'View::data_payment');
$routes->add('dealerData', 'View::dealerData');

// Add route Token Data
$routes->add('tokenData', 'View::tokenData');

// $routes->add('/', 'View::login');

// $routes->add('login', 'View::login');
// $routes->add('dashboard', 'View::dashboard');
$routes->add('users', 'View::user');
 
$routes->add('auth', 'Auth::auth');
$routes->add('reg', 'Auth::reg');
$routes->add('logout', 'Auth::logout');

$routes->add('dataprofile', 'View::dataprofile');
$routes->post('getalluser', 'Jsondata::getalluser');
$routes->post('getuser', 'Jsondata::getuser');
$routes->post('adduser', 'Jsondata::adduser');
$routes->post('addrole', 'Jsondata::addrole');
$routes->post('deleteuser', 'Jsondata::deleteuser');

$routes->post('getallpermohonan', 'Jsondata::getallpermohonan');
$routes->post('getjsonjbg', 'Jsondata::getjsonjbg');

$routes->post('addpermohonan', 'Jsondata::addpermohonan');

$routes->post('getjsonkabkot', 'Jsondata::getjsonkabkot');
$routes->post('getjsonkec', 'Jsondata::getjsonkec');
$routes->post('getjsonkel', 'Jsondata::getjsonkel');

$routes->post('getjsoncount', 'Jsondata::getjsoncount');

$routes->post('getallDealerData', 'Jsondata::getallDealerData');
$routes->post('getDealerData', 'Jsondata::getDealerData');
$routes->post('addDealerData', 'Jsondata::addDealerData');
$routes->post('deleteDealerData', 'Jsondata::deleteDealerData');

$routes->post('getallPaymentData', 'Jsondata::getallPaymentData');
$routes->post('getPaymentData', 'Jsondata::getPaymentData');
$routes->post('addPaymentData', 'Jsondata::addPaymentData');
$routes->post('deletePaymentData', 'Jsondata::deletePaymentData');

$routes->post('getallVoucherData', 'Jsondata::getallVoucherData');
$routes->post('getVoucherData', 'Jsondata::getVoucherData');
$routes->post('addVoucherData', 'Jsondata::addVoucherData');
$routes->post('deleteVoucher', 'Jsondata::deleteVoucher');

$routes->post('getallTokenData', 'Jsondata::getallTokenData');
$routes->post('getTokenData', 'Jsondata::getTokenData');
$routes->post('addTokenData', 'Jsondata::addTokenData');
$routes->post('deleteTokenData', 'Jsondata::deleteTokenData');

$routes->post('getdata', 'Jsondata::getdata');
$routes->post('deletedata', 'Jsondata::deletedata');
$routes->post('addslider', 'Jsondata::addslider');
$routes->post('addmahasiswa', 'Jsondata::addmahasiswa');
$routes->post('adddosen', 'Jsondata::adddosen');
$routes->post('addkegiatan', 'Jsondata::addkegiatan');
$routes->post('addberita', 'Jsondata::addberita');
$routes->post('addbuku', 'Jsondata::addbuku');


$routes->post('savepermohonan', 'Jsondata::savepermohonan');
$routes->post('getwil', 'Jsondata::getwil');
$routes->post('getpemilik', 'Jsondata::getpemilik');
$routes->post('savedata', 'Jsondata::savedata');
$routes->post('savealamatbangunan', 'Jsondata::savealamatbangunan');
$routes->post('getdatajnskonsultasi', 'Jsondata::getdatajnskonsultasi');
$routes->post('saveTanah', 'Jsondata::saveTanah');
$routes->post('getdatadokumen', 'Jsondata::getdatadokumen');
$routes->post('SaveDokumen', 'Jsondata::SaveDokumen');
$routes->post('deleteDokumen', 'Jsondata::deleteDokumen');
$routes->post('saveDataPernyataan', 'Jsondata::saveDataPernyataan');
/**
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need to it be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
