<?php

namespace App\Controllers;

use CodeIgniter\HTTP\RequestInterface;

class Front extends \CodeIgniter\Controller
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

	//FRONTEND

	public function index()
	{
		return redirect('portal');
	}

	public function portal()
	{
		helper('url');
		$uri = current_url(true);
		$this->data['script'] = $this->data['baseURL'] . '/action-js/front/portal.js';
		return \Twig::instance()->display('front/home.html', $this->data);
	}

	public function menu()
	{
		helper('url');
		$uri = current_url(true);

		return \Twig::instance()->display('front/menu.html');
	}

	public function login()
	{
		
		if ($this->logged) {
			return redirect('dashboard');
		} else {
			helper('form');
			helper('url');
			$uri = current_url(true);
			$message = $this->session->getFlashdata('msg');

			if ($message) {
				$this->data['message'] = $message;
			}
			return \Twig::instance()->display('auth/login.html', $this->data);
		}
	}

	// public function layanan_informasi_mahasiswa()
	// {
	// 	helper('url');
	// 	$uri = current_url(true);

	// 	return \Twig::instance()->display('front/layanan_informasi/mahasiswa.html',$this->data);
	// }
	
	// public function layanan_informasi_dosen()
	// {
	// 	helper('url');
	// 	$uri = current_url(true);

	// 	return \Twig::instance()->display('front/layanan_informasi/dosen.html',$this->data);
	// }

	// public function layanan_informasi_buku()
	// {
	// 	helper('url');
	// 	$uri = current_url(true);

	// 	return \Twig::instance()->display('front/buku_digital.html',$this->data);
	// }

	// public function layanan_berita()
	// {
	// 	helper('url');
	// 	$uri = current_url(true);

	// 	return \Twig::instance()->display('front/berita.html',$this->data);
	// }

	// public function detail_berita()
	// {
	// 	helper('url');
	// 	$uri = current_url(true);

	// 	return \Twig::instance()->display('front/detailberita.html', $this->data);
	// }

	// public function layanan_agenda()
	// {
	// 	helper('url');
	// 	$uri = current_url(true);

	// 	return \Twig::instance()->display('front/agenda.html',$this->data);
	// }

	// public function detail_agenda()
	// {
	// 	helper('url');
	// 	$uri = current_url(true);

	// 	return \Twig::instance()->display('front/detailagenda.html', $this->data);
	// }


	// BACKEND

	public function dashboard()
	{

		if ($this->logged) {
			helper('form');
			$this->data['active'] = 'dashboard';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/index.js';
			return \Twig::instance()->display('admin/index.html', $this->data);
		} else {
			return redirect('login');
		}
	}

	public function permohonan()
	{

		if ($this->logged) {
			helper('form');
			$this->data['active'] = 'permohonan';
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/permohonan.js';
			return \Twig::instance()->display('admin/permohonan.html', $this->data);
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
			$this->data['script'] = $this->data['baseURL'].'/action-js/admin/dealerData/dealerData.js';
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
			$this->data['script'] = $this->data['baseURL'].'/action-js/admin/payment.js';
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

	// public function infobox()
	// {

	// 	if ($this->logged) {
	// 		helper('form');
			
	// 		$request	= $this->request;
	// 		$detail 	= $request->getVar('detail');
			
	// 		$this->data['here'] 			= 'infobox';
	// 		$this->data['box'] 				= $detail;
	// 		$this->data['script'] 			= $this->data['baseURL'] . '/action-js/admin/infobox.js';
	// 		return \Twig::instance()->display('admin/infobox.html', $this->data);
	// 	} else {
	// 		return redirect('dashboard');
	// 	}
	// }

	// public function komunikasi()
	// {

	// 	if ($this->logged) {
	// 		helper('form');
	// 		$request	= $this->request;
	// 		$id_tiket 	= $request->getVar('detail');
	// 		$komunikasi = new \App\Models\KomunikasiModel();
			
	// 		if($id_tiket){
	// 			$this->data['detail_tiket'] 	= $komunikasi->gettiket(null, $this->session->get('role'), $id_tiket);
	// 			$this->data['diskusi_tiket'] 	= $komunikasi->getdiskusitiket($id_tiket);
				
	// 		}else{
	// 			$this->data['data_tiket'] 		= $komunikasi->gettiket($this->session->get('user_id'), $this->session->get('role'));
	// 		}
			
	// 		$this->data['here'] 			= 'komunikasi';
	// 		$this->data['script'] 			= $this->data['baseURL'] . '/action-js/admin/komunikasi.js';
	// 		return \Twig::instance()->display('admin/komunikasi.html', $this->data);
	// 	} else {
	// 		return redirect('dashboard');
	// 	}
	// }

	// public function wasdal()
	// {

	// 	if ($this->logged) {
	// 		helper('form');
	// 		$request	= $this->request;
	// 		$id_tiket 	= $request->getVar('detail');
	// 		$komunikasi = new \App\Models\KomunikasiModel();

	// 		$this->data['here'] 			= 'wasdal';
	// 		$this->data['sub'] 				= $request->uri->getSegment(2);
	// 		$this->data['script'] 			= $this->data['baseURL'] . '/action-js/admin/komunikasi.js';
	// 		return \Twig::instance()->display('admin/komunikasi.html', $this->data);
	// 	} else {
	// 		return redirect('dashboard');
	// 	}
	// }

	// public function cicilan()
	// {

	// 	if ($this->logged) {
	// 		helper('form');
	// 		$request	= $this->request;
	// 		$cicilan = new \App\Models\CicilanModel();
	// 		$billing = new \App\Models\BillingModel();
	// 		$user = new \App\Models\UserModel();
	// 		if($request->uri->getSegment(1) == 'detailcicilan'){
	// 			$this->data['detail'] 	= 'detail';
	// 			$this->data['data_rumah'] 	= $cicilan->getdetailrumahcicilan($request->uri->getSegment(2));
	// 			$this->data['data_cicilan'] = $cicilan->getdetailcicilanangsuran($request->uri->getSegment(2));
	// 			$this->data['data_denda'] 	= $cicilan->getdetailcicilandenda($request->uri->getSegment(2));
	// 			$this->data['data_billing'] = $billing->getbilling($request->uri->getSegment(2));
	// 		}else if($request->uri->getSegment(1) == 'detailbilling'){
				
	// 			$this->data['detail_billing'] = $billing->getdetailbilling($request->uri->getSegment(2));
	// 			$this->data['detail_pembayaran_billing'] = $billing->getdetailpembayaranbilling($request->uri->getSegment(2));
				
				
	// 		}else{
	// 			$this->data['data_provinsi'] 	= $user->getprovinsi();
	// 			$this->data['data_lembaga'] 	= $user->getlembaga();
	// 		}

	// 		// echo '<pre>';
	// 		// print_r($this->data);die;
	// 		$this->data['here'] 			= 'cicilan';
	// 		$this->data['script'] 			= $this->data['baseURL'] . '/action-js/admin/cicilan/cicilan.js';
	// 		return \Twig::instance()->display('admin/cicilan/cicilan.html', $this->data);
	// 	} else {
	// 		return redirect('dashboard');
	// 	}
	// }

}
