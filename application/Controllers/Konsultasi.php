<?php

namespace App\Controllers;

use CodeIgniter\HTTP\RequestInterface;

class Konsultasi extends \CodeIgniter\Controller
{

	protected $session;
	protected $request;

	function __construct(RequestInterface $request)
	{
		$this->session = session();
		// $this->now = date('Y-m-d H:i:s');
		$this->request = $request;
		$this->logged = $this->session->get('logged_in');
		$this->data = array(
			'version' => \CodeIgniter\CodeIgniter::CI_VERSION,
			// 'baseURL' => BASE . '/public',
			'baseURL' => BASE,
			'userid' => $this->session->get('user_id'),
			'username' => $this->session->get('username'),
			'id' => $this->session->get('id'),
			'role' => $this->session->get('role'),
			'id_provinsi' => $this->session->get('id_provinsi'),
			'provinsi' => $this->session->get('provinsi'),
			'rolename' => $this->session->get('rolename'),
			'logged_in' => $this->session->get('logged_in'),
		);
	}

	public function permohonan()
	{
		
		if ($this->logged && ($this->data['role'] == 10 || $this->data['role'] == 200)) {
			helper('form');
			$user_id				= $this->session->get('user_id');
			$this->data['user_id'] 	= $user_id;
			$filterQuery			= 'a.*, b.no_konsultasi,b.pernyataan,b.status, b.almt_bgn,c.nm_konsultasi,d.status_pemohon';
			$konultasi = new \App\Models\KonsultasiModel();

			$this->data['active'] = 'permohonan';			
			$this->data['data_jenis']		= $perm->getjenis();
			$this->data['data_fungsi']		= $perm->getfungsi();
			// $this->data['data_jbg']		= $perm->getjbg();
			$this->data['data_prov']		= $perm->getprov();
			print_r($this->data['data_prov']);die;
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/permohonan/permohonan.js';
			return \Twig::instance()->display('admin/permohonan/permohonan.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	public function verifikasi_dokumen()
	{

		if ($this->logged && ($this->data['role'] == 20 || $this->data['role'] == 200)) {
			helper('form');
			$this->data['active'] = 'verifikasi_dokumen';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/dinas_teknis/verifikasi_dokumen.js';
			return \Twig::instance()->display('admin/dinas_teknis/verifikasi_dokumen.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	public function bangunan_bertahap()
	{

		if ($this->logged && ($this->data['role'] == 20 || $this->data['role'] == 200)) {
			helper('form');
			$this->data['active'] = 'bangunan_bertahap';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/dinas_teknis/bangunan_bertahap.js';
			return \Twig::instance()->display('admin/dinas_teknis/bangunan_bertahap.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	public function profil_pu()
	{

		if ($this->logged && ($this->data['role'] == 20 || $this->data['role'] == 30 || $this->data['role'] == 40 || $this->data['role'] == 50 || $this->data['role'] == 60 || $this->data['role'] == 70 || $this->data['role'] == 200)) {
			helper('form');
			$this->data['active'] = 'profil_pu';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/pengaturan/profil_pu.js';
			return \Twig::instance()->display('admin/pengaturan/profil_pu.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	public function data_asn()
	{

		if ($this->logged && ($this->data['role'] == 20 || $this->data['role'] == 200)) {
			helper('form');
			$this->data['active'] = 'data_asn';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/pengaturan/data_asn.js';
			return \Twig::instance()->display('admin/pengaturan/data_asn.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	public function input_tpa()
	{

		if ($this->logged && ($this->data['role'] == 20 || $this->data['role'] == 30 || $this->data['role'] == 40 || $this->data['role'] == 200)) {
			helper('form');
			$this->data['active'] = 'input_tpa';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/pengaturan/input_tpa.js';
			return \Twig::instance()->display('admin/pengaturan/input_tpa.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	public function surat_keputusan()
	{

		if ($this->logged  && ($this->data['role'] == 20 || $this->data['role'] == 30 || $this->data['role'] == 40 || $this->data['role'] == 200)) {
			helper('form');
			$this->data['active'] = 'surat_keputusan';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/pengaturan/surat_keputusan.js';
			return \Twig::instance()->display('admin/pengaturan/surat_keputusan.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	public function data_kampus()
	{

		if ($this->logged && ($this->data['role'] == 20 || $this->data['role'] == 200)) {
			helper('form');
			$this->data['active'] = 'data_kampus';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/pengaturan/data_kampus.js';
			return \Twig::instance()->display('admin/pengaturan/data_kampus.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	public function konsultasi()
	{

		if ($this->logged  && ($this->data['role'] == 20 || $this->data['role'] == 30 || $this->data['role'] == 50 || $this->data['role'] == 60 || $this->data['role'] == 200)) {
			helper('form');
			$this->data['active'] = 'konsultasi';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/monitoring/konsultasi.js';
			return \Twig::instance()->display('admin/monitoring/konsultasi.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	public function pengawas_pupr()
	{

		if ($this->logged && ($this->data['role'] == 40 || $this->data['role'] == 200)) {
			helper('form');
			$this->data['active'] = 'pengawas_pupr';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/pengawas_teknis/pengawas_pupr.js';
			return \Twig::instance()->display('admin/pengawas_teknis/pengawas_pupr.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	public function penilaian_konsultasi()
	{

		if ($this->logged && ($this->data['role'] == 30 || $this->data['role'] == 200)) {
			helper('form');
			$this->data['active'] = 'penilaian_konsultasi';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/pengawas_teknis/penilaian_konsultasi.js';
			return \Twig::instance()->display('admin/pengawas_teknis/penilaian_konsultasi.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	public function inspeksi()
	{
		if ($this->logged  && ($this->data['role'] == 20 || $this->data['role'] == 30 || $this->data['role'] == 40 || $this->data['role'] == 200)) {
			helper('form');
			$this->data['active'] = 'inspeksi';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/pengawas_teknis/inspeksi.js';
			return \Twig::instance()->display('admin/pengawas_teknis/inspeksi.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	public function validasi_rekomtek_kadis()
	{
		if ($this->logged && ($this->data['role'] == 40 || $this->data['role'] == 200)) {
			helper('form');
			$this->data['active'] = 'validasi_rekomtek_kadis';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/validasi_rekom/validasi_rekomtek_kadis.js';
			return \Twig::instance()->display('admin/validasi_rekom/validasi_rekomtek_kadis.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	public function validasi_hasil_inspeksi()
	{
		if ($this->logged && ($this->data['role'] == 40 || $this->data['role'] == 200)) {
			helper('form');
			$this->data['active'] = 'validasi_hasil_inspeksi';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/validasi_hasil_inspeksi/validasi_hasil_inspeksi.js';
			return \Twig::instance()->display('admin/validasi_hasil_inspeksi/validasi_hasil_inspeksi.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	public function penagihan_retribusi()
	{
		if ($this->logged && ($this->data['role'] == 50 || $this->data['role'] == 200)) {
			helper('form');
			$this->data['active'] = 'penagihan_retribusi';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/penagihan_retribusi/penagihan_retribusi.js';
			return \Twig::instance()->display('admin/penagihan_retribusi/penagihan_retribusi.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	public function penyerahan_dokumen()
	{
		if ($this->logged && ($this->data['role'] == 50 || $this->data['role'] == 200)) {
			helper('form');
			$this->data['active'] = 'penyerahan_dokumen';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/penyerahan_dokumen/penyerahan_dokumen.js';
			return \Twig::instance()->display('admin/penyerahan_dokumen/penyerahan_dokumen.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	public function penerbitan_dokumen()
	{
		if ($this->logged && ($this->data['role'] == 70 || $this->data['role'] == 200)) {
			helper('form');
			$this->data['active'] = 'penerbitan_dokumen';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/penerbitan_dokumen/penerbitan_dokumen.js';
			return \Twig::instance()->display('admin/penerbitan_dokumen/penerbitan_dokumen.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	// public function data_mahasiswa()
	// {
	// 	if ($this->logged) {
	// 		$this->data['script'] = $this->data['baseURL'].'/action-js/admin/data_mahasiswa.js';
	// 		return \Twig::instance()->display('admin/mahasiswa/data_mahasiswa.html', $this->data);
	// 	} else {
	// 		return redirect('login');
	// 	}
	// }

	// public function data_dosen()
	// {
	// 	if ($this->logged) {
	// 		$this->data['script'] = $this->data['baseURL'].'/action-js/admin/data_dosen.js';
	// 		return \Twig::instance()->display('admin/dosen/data_dosen.html', $this->data);
	// 	} else {
	// 		return redirect('login');
	// 	}
	// }

	// public function data_kampus()
	// {
	// 	if ($this->logged) {
	// 		$this->data['script'] = $this->data['baseURL'].'/action-js/admin/data_kampus.js';
	// 		return \Twig::instance()->display('admin/kampus/data_kampus.html', $this->data);
	// 	} else {
	// 		return redirect('login');
	// 	}
	// }

	// public function data_jadwal()
	// {
	// 	if ($this->logged) {
	// 		$this->data['script'] = $this->data['baseURL'].'/action-js/admin/data_jadwal.js';
	// 		return \Twig::instance()->display('admin/jadwal/data_jadwal.html', $this->data);
	// 	} else {
	// 		return redirect('login');
	// 	}
	// }

	// public function data_buku()
	// {
	// 	if ($this->logged) {
	// 		$this->data['script'] = $this->data['baseURL'].'/action-js/admin/data_buku.js';
	// 		return \Twig::instance()->display('admin/buku/data_buku.html', $this->data);
	// 	} else {
	// 		return redirect('login');
	// 	}
	// }

	// public function data_slider()
	// {
	// 	if ($this->logged) {
	// 		$this->data['script'] = $this->data['baseURL'].'/action-js/admin/content/data_slider.js';
	// 		return \Twig::instance()->display('admin/content/data_slider.html', $this->data);
	// 	} else {
	// 		return redirect('login');
	// 	}
	// }

	// public function data_berita()
	// {
	// 	if ($this->logged) {
	// 		$this->data['script'] = $this->data['baseURL'].'/action-js/admin/content/data_berita.js';
	// 		return \Twig::instance()->display('admin/content/data_berita.html', $this->data);
	// 	} else {
	// 		return redirect('login');
	// 	}
	// }

	public function user()
	{

		if ($this->logged) {
			helper('form');
			$user = new \App\Models\UserModel();

			$this->data['active'] 			= 'users';
			$this->data['data_role']		= $user->getrole();

			$this->data['script'] 			= $this->data['baseURL'] . '/action-js/admin/user/user.js';
			return \Twig::instance()->display('admin/user/index.html', $this->data);
		} else {
			return redirect('dashboard');
		}
	}

	public function vouchers()
	{

		if ($this->logged) {
			helper('form');
			$user = new \App\Models\UserModel();

			$this->data['active'] 			= 'vouchers';
			$this->data['data_role']		= $user->getrole();

			$this->data['script'] 			= $this->data['baseURL'] . '/action-js/admin/vouchers.js';
			return \Twig::instance()->display('admin/vouchers.html', $this->data);
		} else {
			return redirect('dashboard');
		}
	}

	public function dealerData()
	{
		if ($this->logged) {
			helper('form');
			$user = new \App\Models\UserModel();

			$this->data['active'] = 'dealerData';
			$this->data['data_role']		= $user->getrole();
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/dealerData/dealerData.js';
			return \Twig::instance()->display('admin/dealerData/dealerData.html', $this->data);
		} else {
			return redirect('dashboard');
		}
	}

	public function data_payment()
	{
		if ($this->logged) {
			helper('form');
			$user = new \App\Models\UserModel();

			$this->data['active'] = 'payment';
			$this->data['data_role']		= $user->getrole();
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/payment.js';
			return \Twig::instance()->display('admin/payment/payment.html', $this->data);
		} else {
			return redirect('dashboard');
		}
	}

	public function reportVouchers()
	{

		if ($this->logged) {
			helper('form');
			$user = new \App\Models\UserModel();

			$this->data['active'] 			= 'vouchers';
			$this->data['data_role']		= $user->getrole();

			$this->data['script'] 			= $this->data['baseURL'] . '/action-js/admin/reportVouchers.js';
			return \Twig::instance()->display('admin/reportVouchers.html', $this->data);
		} else {
			return redirect('dashboard');
		}
	}

	public function tokenData()
	{

		if ($this->logged) {
			helper('form');
			$user = new \App\Models\UserModel();

			$this->data['active'] 			= 'token';
			$this->data['data_role']		= $user->getrole();

			$this->data['script'] 			= $this->data['baseURL'] . '/action-js/admin/tokenData.js';
			return \Twig::instance()->display('admin/tokenData/tokenData.html', $this->data);
		} else {
			return redirect('dashboard');
		}
	}

	public function log()
	{

		if ($this->logged) {
			helper('form');

			$this->data['here'] 			= 'log';
			$this->data['script'] 			= $this->data['baseURL'] . '/action-js/admin/user/log.js';
			return \Twig::instance()->display('admin/user/log.html', $this->data);
		} else {
			return redirect('dashboard');
		}
	}

}
