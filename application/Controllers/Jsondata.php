<?php namespace App\Controllers;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\Files\UploadedFile;
use App\Controller\BaseController;

class Jsondata extends \CodeIgniter\Controller
{
	protected $session;
	protected $request;

  function __construct(RequestInterface $request)
  {
			$this->session = session();
			$this->now = date('Y-m-d H:i:s');
			$this->day = date('Y-m-d');
			$this->dax = date('dmY');
			$this->request = $request;
			$this->logged = $this->session->get('logged_in');
			$this->logModel   = new \App\Models\LogModel();
			$this->konsulModel   = new \App\Models\KonsultasiModel();
			$this->data = array(
				'version' => \CodeIgniter\CodeIgniter::CI_VERSION,
				// 'baseURL' => BASE.'/public',
				'baseURL' => BASE,
				'userid' => $this->session->get('user_id'),
				'username' => $this->session->get('username'),
				'id' => $this->session->get('id'),
				'role' => $this->session->get('role'),
				'email' => $this->session->get('email'),
				'id_provinsi' => $this->session->get('id_provinsi'),
				'provinsi' => $this->session->get('provinsi'),
				'rolename' => $this->session->get('rolename'),
				'logged_in' => $this->session->get('logged_in'),
			);
  }

  public function getalluser()
  {
	  try {
		  $request	= $this->request;
		  $param	= $request->getVar('param');
		  $user = new \App\Models\UserModel();
		  $data = $user->getUsers($param);
		  
		  if($data){
			  $response = [
				  'status'   => 'sukses',
				  'code'     => 200,
				  'data' 	 => $data
			  ];
		  }else{
			  $response = [
				  'status'   => 'gagal',
				  'code'     => '0',
				  'data'     => 'tidak ada data',
			  ];
		  }

	  header('Content-Type: application/json');
	  echo json_encode($response);
	  exit;
	  } catch (\Exception $e) {
		  die($e->getMessage());
	  }
  }

  public function getuser()
  {
	  try {
		  $request	= $this->request;
		  $param 	= $request->getVar('param');
		
		  $user = new \App\Models\UserModel();
		  if($param){
		  	$data = $user->getWhere(['m_user_simponi.id_usersim' => $request->getVar('id')], $param)->getRow();
		  }else{
		  	$data = $user->getWhere(['m_user.id' => $request->getVar('id')])->getRow();
		  }
		  
		  if($data){
			  $response = [
				  'status'   => 'sukses',
				  'code'     => 200,
				  'data' 	 => $data
			  ];
		  }else{
			  $response = [
				  'status'   => 'gagal',
				  'code'     => '0',
				  'data'     => 'tidak ada data',
			  ];
		  }

	  header('Content-Type: application/json');
	  echo json_encode($response);
	  exit;
	  } catch (\Exception $e) {
		  die($e->getMessage());
	  }
  }

  public function getallDealerData()
  {
	  try {
		  $request	= $this->request;
		  $param	= $request->getVar('param');
		  $user = new \App\Models\DealerDataModel();
		  $data = $user->getDealerData($param);
		  
		  if($data){
			  $response = [
				  'status'   => 'sukses',
				  'code'     => 200,
				  'data' 	 => $data
			  ];
		  }else{
			  $response = [
				  'status'   => 'gagal',
				  'code'     => '0',
				  'data'     => 'tidak ada data',
			  ];
		  }

	  header('Content-Type: application/json');
	  echo json_encode($response);
	  exit;
	  } catch (\Exception $e) {
		  die($e->getMessage());
	  }
  }

  public function getDealerData()
  {
	  try {
		  $request	= $this->request;
		  $param 	= $request->getVar('param');
		
		  $user = new \App\Models\DealerDataModel();
		  if($param){
		  	$data = $user->getWhere(['m_user_simponi.id_usersim' => $request->getVar('id')], $param)->getRow();
		  }else{
		  	$data = $user->getWhere(['biller.id_biller' => $request->getVar('id_biller')])->getRow();
		  }
		  
		  if($data){
			  $response = [
				  'status'   => 'sukses',
				  'code'     => 200,
				  'data' 	 => $data
			  ];
		  }else{
			  $response = [
				  'status'   => 'gagal',
				  'code'     => '0',
				  'data'     => 'tidak ada data',
			  ];
		  }

	  header('Content-Type: application/json');
	  echo json_encode($response);
	  exit;
	  } catch (\Exception $e) {
		  die($e->getMessage());
	  }
  }

  public function getallPaymentData()
  {
	  try {
		  $request	= $this->request;
		  $param	= $request->getVar('param');
		  $user = new \App\Models\PaymentDataModel();
		  $data = $user->getPaymentData($param);
		  
		  if($data){
			  $response = [
				  'status'   => 'sukses',
				  'code'     => 200,
				  'data' 	 => $data
			  ];
		  }else{
			  $response = [
				  'status'   => 'gagal',
				  'code'     => '0',
				  'data'     => 'tidak ada data',
			  ];
		  }

	  header('Content-Type: application/json');
	  echo json_encode($response);
	  exit;
	  } catch (\Exception $e) {
		  die($e->getMessage());
	  }
  }

  public function getPaymentData()
  {
	  try {
		  $request	= $this->request;
		  $param 	= $request->getVar('param');
		
		  $user = new \App\Models\PaymentDataModel();
		  if($param){
		  	$data = $user->getWhere(['m_user_simponi.id_usersim' => $request->getVar('id')], $param)->getRow();
		  }else{
		  	$data = $user->getWhere(['transaction.id' => $request->getVar('id')])->getRow();
		  }
		  
		  if($data){
			  $response = [
				  'status'   => 'sukses',
				  'code'     => 200,
				  'data' 	 => $data
			  ];
		  }else{
			  $response = [
				  'status'   => 'gagal',
				  'code'     => '0',
				  'data'     => 'tidak ada data',
			  ];
		  }

	  header('Content-Type: application/json');
	  echo json_encode($response);
	  exit;
	  } catch (\Exception $e) {
		  die($e->getMessage());
	  }
  }

  public function getallVoucherData()
  {
	  try {
		  $request	= $this->request;
		  $param	= $request->getVar('param');
		  $user = new \App\Models\VoucherDataModel();
		  $data = $user->getVoucherData($param);
		  
		  if($data){
			  $response = [
				  'status'   => 'sukses',
				  'code'     => 200,
				  'data' 	 => $data
			  ];
		  }else{
			  $response = [
				  'status'   => 'gagal',
				  'code'     => '0',
				  'data'     => 'tidak ada data',
			  ];
		  }

	  header('Content-Type: application/json');
	  echo json_encode($response);
	  exit;
	  } catch (\Exception $e) {
		  die($e->getMessage());
	  }
  }

  public function getVoucherData()
  {
	  try {
		  $request	= $this->request;
		  $param 	= $request->getVar('param');
		
		  $user = new \App\Models\VoucherDataModel();
		  if($param){
		  	$data = $user->getWhere(['m_user_simponi.id_usersim' => $request->getVar('id')], $param)->getRow();
		  }else{
		  	$data = $user->getWhere(['master_voucher.id_voucher' => $request->getVar('id_voucher')])->getRow();
		  }
		  
		  if($data){
			  $response = [
				  'status'   => 'sukses',
				  'code'     => 200,
				  'data' 	 => $data
			  ];
		  }else{
			  $response = [
				  'status'   => 'gagal',
				  'code'     => '0',
				  'data'     => 'tidak ada data',
			  ];
		  }

	  header('Content-Type: application/json');
	  echo json_encode($response);
	  exit;
	  } catch (\Exception $e) {
		  die($e->getMessage());
	  }
  }

  public function getallTokenData()
  {
	  try {
		  $request	= $this->request;
		  $param	= $request->getVar('param');
		  $user = new \App\Models\TokenDataModel();
		  $data = $user->getTokenData($param);
		  
		  if($data){
			  $response = [
				  'status'   => 'sukses',
				  'code'     => 200,
				  'data' 	 => $data
			  ];
		  }else{
			  $response = [
				  'status'   => 'gagal',
				  'code'     => '0',
				  'data'     => 'tidak ada data',
			  ];
		  }

	  header('Content-Type: application/json');
	  echo json_encode($response);
	  exit;
	  } catch (\Exception $e) {
		  die($e->getMessage());
	  }
  }

  public function getTokenData()
  {
	  try {
		  $request	= $this->request;
		  $param 	= $request->getVar('param');
		
		  $user = new \App\Models\TokenDataModel();
		  if($param){
		  	$data = $user->getWhere(['m_user_simponi.id_usersim' => $request->getVar('id')], $param)->getRow();
		  }else{
		  	$data = $user->getWhere(['bank_token.id_token' => $request->getVar('id_token')])->getRow();
		  }
		  
		  if($data){
			  $response = [
				  'status'   => 'sukses',
				  'code'     => 200,
				  'data' 	 => $data
			  ];
		  }else{
			  $response = [
				  'status'   => 'gagal',
				  'code'     => '0',
				  'data'     => 'tidak ada data',
			  ];
		  }

	  header('Content-Type: application/json');
	  echo json_encode($response);
	  exit;
	  } catch (\Exception $e) {
		  die($e->getMessage());
	  }
  }

  public function adduser()
  {
	try {
		
		$request		= $this->request;
		$param		= $request->getVar('param');
		
		$method			= $request->getMethod();
		$user = new \App\Models\UserModel();

		if($method == 'post'){
				
				if($request->getVar('id')){
					$data = [
						'name' 		=> $request->getVar('name'),	
						'email' 		=> $request->getVar('email'),	
						'username' 		=> $request->getVar('username'),	
						'id_role' 			=> $request->getVar('id_role'),
						'status' 		=> 1,
						'update_date' 	=> $this->now,
						'update_by' 	=> $this->session->get('id')
					];
					
					if($request->getVar('password')){
						$data['password'] = md5($request->getVar('password'));
					}
					
					$user->updateUser($request->getVar('id'), $data);
					
				}else{
					$data = [
						'name' 			=> $request->getVar('name'),	
						'email' 		=> $request->getVar('email'),	
						'username' 		=> $request->getVar('username'),	
						'password' 		=> md5($request->getVar('password')),
						'id_role' 		=> $request->getVar('id_role'),
						'status' 		=> 1,
						'create_date' 	=> $this->now,
						'update_date' 	=> $this->now,
						'create_by' 	=> $this->session->get('id'),
						'update_by' 	=> $this->session->get('id')
					];
					
					$user->insertUser($data);
				}
		}
		redirect('users','refresh');
	} catch (\Exception $e) {
		die($e->getMessage());
	}
  }

  public function addrole()
  {
	try {
		
		$request	= $this->request;
		$param		= $request->getVar('param');
		
		$method		= $request->getMethod();
		$user 		= new \App\Models\UserModel();

		if($method == 'post'){
				
				
			$data = [
				'role' 			=> $request->getVar('role'),	
				'status' 		=> 1,
			];
			$user->insertRole($data);
		}
		redirect('users','refresh');
	} catch (\Exception $e) {
		die($e->getMessage());
	}
  }

  public function deleteuser()
  {
	try {
		$request		= $this->request;
		$param		= $request->getVar('param');
		$method			= $request->getMethod();
		$user = new \App\Models\UserModel();

		$user->deleteUser($request->getVar('id'));
		
		$response = [
			'status'   => 'success',
			'code'     => 200,
		];

		header('Content-Type: application/json');
		echo json_encode($response);
		exit;
	} catch (\Exception $e) {
		die($e->getMessage());
	}
  }

  public function getallpermohonan()
  {
	  try {
		  $request	= $this->request;
		  $param	= $request->getVar('param');
		  $konsultasi = new \App\Models\KonsultasiModel();
		  $user_id				= $this->session->get('user_id');
		  $filterQuery			= 'a.*, b.no_konsultasi,b.pernyataan,b.status, b.almt_bgn,c.nm_konsultasi,d.status_pemohon';

		  $data = $konsultasi->getDataKonsultasi($filterQuery, $user_id, '', $request->getVar('length'), $request->getVar('start'), $request->getVar('search'));
		  $count = $konsultasi->getDataKonsultasiCount($user_id, '', $request->getVar('search'));
		  
		  if($data){
			  $response = [
				  'status'   => 'sukses',
				  'code'     => 200,
				  'recordsTotal' => $count,
				  'data' 	 => $data
			  ];
		  }else{
			  $response = [
				  'status'   => 'gagal',
				  'code'     => '0',
				  'data'     => 'tidak ada data',
			  ];
		  }

	  header('Content-Type: application/json');
	  echo json_encode($response);
	  exit;
	  } catch (\Exception $e) {
		  die($e->getMessage());
	  }
  }

  public function getjsonjbg()
  {
	try {
		$request		= $this->request;
		$method			= $request->getMethod();
		$komunikasi 	= new \App\Models\KegiatanModel();
		
		$data = $komunikasi->getjbg($request->getVar('id'));
		
		if($data){
			$response = [
				'status'   => 'sukses',
				'code'     => 200,
				'data' 	 => $data
			];
		}else{
			$response = [
				'status'   => 'gagal',
				'code'     => '0',
				'data'     => 'tidak ada data',
			];
		}

	header('Content-Type: application/json');
	echo json_encode($response);
	exit;
	} catch (\Exception $e) {
		die($e->getMessage());
	}
  }

  public function getwil()
  {
	try {
		$request	= $this->request;
		$method		= $request->getMethod();
		$glob 		= new \App\Models\GlobalModel();
		$param 		= $request->getVar('param');

		if($param == 'kabupaten'){
			$data 		= $glob->getkabkot($request->getVar('id'));
		}else if($param == 'kecamatan'){
			$data 		= $glob->getkecamatan($request->getVar('id'));
		}else if($param == 'kelurahan'){
			$data 		= $glob->getkelurahan($request->getVar('id'));
		}
		
		if($data){
			$response = [
				'status'   => 'sukses',
				'code'     => 200,
				'data' 	 => $data
			];
		}else{
			$response = [
				'status'   => 'gagal',
				'code'     => '0',
				'data'     => [],
			];
		}

	header('Content-Type: application/json');
	echo json_encode($response);
	exit;
	} catch (\Exception $e) {
		die($e->getMessage());
	}
  }

  public function getjsonkec()
  {
	try {
		$request		= $this->request;
		$method			= $request->getMethod();
		$komunikasi 	= new \App\Models\KegiatanModel();
		
		$data = $komunikasi->getkecamatan($request->getVar('id'));
		
		if($data){
			$response = [
				'status'   => 'sukses',
				'code'     => 200,
				'data' 	 => $data
			];
		}else{
			$response = [
				'status'   => 'gagal',
				'code'     => '0',
				'data'     => 'tidak ada data',
			];
		}

	header('Content-Type: application/json');
	echo json_encode($response);
	exit;
	} catch (\Exception $e) {
		die($e->getMessage());
	}
  }

  public function getjsonkel()
  {
	try {
		$request		= $this->request;
		$method			= $request->getMethod();
		$komunikasi 	= new \App\Models\KegiatanModel();
		
		$data = $komunikasi->getkelurahan($request->getVar('id'));
		
		if($data){
			$response = [
				'status'   => 'sukses',
				'code'     => 200,
				'data' 	 => $data
			];
		}else{
			$response = [
				'status'   => 'gagal',
				'code'     => '0',
				'data'     => 'tidak ada data',
			];
		}

	header('Content-Type: application/json');
	echo json_encode($response);
	exit;
	} catch (\Exception $e) {
		die($e->getMessage());
	}
  }

  public function getjsoncount()
  {
	try {
		$request		= $this->request;
		$method			= $request->getMethod();
		$komunikasi 	= new \App\Models\KegiatanModel();
		
		$data = $komunikasi->getcount();
		
		if($data){
			$response = [
				'status'   => 'sukses',
				'code'     => 200,
				'data' 	 => $data
			];
		}else{
			$response = [
				'status'   => 'gagal',
				'code'     => '0',
				'data'     => 'tidak ada data',
			];
		}

	header('Content-Type: application/json');
	echo json_encode($response);
	exit;
	} catch (\Exception $e) {
		die($e->getMessage());
	}
  }

  public function addpermohonan()
  {
	try {
		// print(1);
		// $dax = date('Y-m-d');

		$request		= $this->request;
		
		$method			= $request->getMethod();
		$perm = new \App\Models\KegiatanModel();

		

		// $day = date('dmY');
		// $noreg = 'PBG-997101-'+$this->dax+'-1';

		if($method == 'post'){

			$data = [
				'id_jenis_permohonan'            => $request->getVar('id_jenis_permohonan'),        
				'id_fungsi_bg'                   => $request->getVar('id_fungsi_bg'),
				'id_jenis_bg'                    => $request->getVar('id_jenis_bg'),
				'nama_bg'                        => $request->getVar('nama_bg'),
				'luas_bg'                        => $request->getVar('luas_bg'),
				'jml_lantai_bg'                  => $request->getVar('jml_lantai_bg'),
				'tinggi_bg'                      => $request->getVar('tinggi_bg'),
				'luas_basement_bg'               => $request->getVar('luas_basement_bg'),
				'jml_lantai_basement_bg'         => $request->getVar('jml_lantai_basement_bg'),
				'id_prov_bg'                     => $request->getVar('id_prov_bg'),
				'id_kabkot_bg'                   => $request->getVar('id_kabkot_bg'),
				'id_kec_bg'                      => $request->getVar('id_kec_bg'),
				'id_kel_bg'                      => $request->getVar('id_kel_bg'),
				'alamat_bg'                      => $request->getVar('alamat_bg'),
				'id_stat_kepemilikan'            => $request->getVar('id_stat_kepemilikan'),
				'id_jenis_tanda_pengenal'        => $request->getVar('id_jenis_tanda_pengenal'),
				'nama_pemilik'                   => $request->getVar('nama_pemilik'),
				'no_tanda_pengenal'              => $request->getVar('no_tanda_pengenal'),
				'id_prov_pemilik'                => $request->getVar('id_prov_pemilik'),
				'id_kabkot_pemilik'              => $request->getVar('id_kabkot_pemilik'),
				'id_kec_pemilik'                 => $request->getVar('id_kec_pemilik'),
				'id_kel_pemilik'                 => $request->getVar('id_kel_pemilik'),
				'alamat_pemilik'                 => $request->getVar('alamat_pemilik'),
				'no_telp_pemilik'                => $request->getVar('no_telp_pemilik'),
				'email_pemilik'                  => $request->getVar('email_pemilik'),
				'id_jenis_dok_tanah'             => $request->getVar('id_jenis_dok_tanah'),
				'no_dok_tanah'                   => $request->getVar('no_dok_tanah'),
				'tgl_terbit_dok_tanah'           => $request->getVar('tgl_terbit_dok_tanah'),
				'luas_tanah'                     => $request->getVar('luas_tanah'),
				'id_hak_tanah'                   => $request->getVar('id_hak_tanah'),
				'nama_hak_tanah'                 => $request->getVar('nama_hak_tanah'),
				'alamat_tanah'                   => $request->getVar('alamat_tanah'),
				'perjanjian_pemanfaatan_tanah'   => $request->getVar('perjanjian_pemanfaatan_tanah'),
				'no_registrasi'					 => $request->getVar('no_registrasi'),
				'in_date'						 => $request->getVar('in_date'),

				'created_date' 					 => $this->now,
				'updated_date' 					 => $this->now,
				'created_by' 					 => $this->session->get('id'),
				'updated_by' 					 => $this->session->get('id')
			];
			
			$perm->insertPermohonan($data);

		}

		$response = [
			'status'   => 'sukses',
			'code'     => 200,
		];

		// return $response;
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;
		// redirect('permohonan','refresh');
		
		// echo json_encode($response);
	} catch (\Exception $e) {
		die($e->getMessage());
	}
  }

  public function savepermohonan()
  {
	  	$user_id			= $this->session->get('id');
	  	$db = \Config\Database::connect(); // Connect to the database
		$db->query('START TRANSACTION');
	  
	  $id_izin			= $this->request->getVar('id_izin');
	  $id_kolektif		= $this->request->getVar('id_kolektif');
	  $tipeA			= $this->request->getVar('tipeA');
	  $jumlahA			= $this->request->getVar('jumlahA');
	  $luasA			= $this->request->getVar('luasA');
	  $tinggiA			= $this->request->getVar('tinggiA');
	  $lantaiA			= $this->request->getVar('lantaiA');
	  $id_fungsi_bg		= $this->request->getVar('id_fungsi_bg');
	  $id_jns_bg		= $this->request->getVar('id_jns_bg');
	  if ($id_izin == '') {
		  $id_izin		= $this->request->getVar('id_existing');
	  }
	  $nama_bangunan				= $this->request->getVar('nama_bangunan');
	  $nama_bangunan_prasarana 		= $this->request->getVar('nama_bangunan_prasarana');
	  $nama_bangunan_kolektif		= $this->request->getVar('nama_bangunan_kolektif');
	  $nama_bangunan_pertashop 		= $this->request->getVar('nama_bangunan_pertashop');
	  if ($nama_bangunan) {
		  $nama_bangunan			= $this->request->getVar('nama_bangunan');
	  } else if ($nama_bangunan_kolektif) {
		  $nama_bangunan			= $this->request->getVar('nama_bangunan_kolektif');
	  } else if ($nama_bangunan_prasarana){
		  $nama_bangunan			= $this->input->post('nama_bangunan_prasarana');
	  }else{
		  $nama_bangunan			= $this->request->getVar('nama_bangunan_pertashop');
	  }

	  $luas_bg				= $this->request->getVar('luas_bg');
	  $tinggi_bg			= $this->request->getVar('tinggi_bg');
	  $lantai_bg			= $this->request->getVar('lantai_bg');
	  $luas_basement		= $this->request->getVar('luas_basement');
	  $lapis_basement		= $this->request->getVar('lapis_basement');
	  $id_prasarana_bg		= $this->request->getVar('id_prasarana_bg');
	  $luas_bgp				= $this->request->getVar('luas_bgp');
	  $tinggi_bgp			= $this->request->getVar('tinggi_bgp');
	  $id_prototype			= $this->request->getVar('id_prototype');
	  $jual					= $this->request->getVar('jual');
	  $imb					= $this->request->getVar('imb');
	  $slf					= $this->request->getVar('slf');
	  $cetak				= $this->request->getVar('cetak');
	  $id_doc_tek			= $this->request->getVar('id_doc_tek');
	  $no_imb				= $this->request->getVar('no_imb');
	  $no_slf				= $this->request->getVar('no_slf');
	  $permohonan_slf		= $this->request->getVar('permohonan_slf');

	  if ($id_fungsi_bg == 6) {
		  $jns_campur		= $this->request->getVar('dcampur');
		  $id_jns_bg		= json_encode($jns_campur);
	  }

	if ($id_izin == '1') {
		if ($id_fungsi_bg == '1') { //Fungsi Hunian
				if ($id_doc_tek == '1') {
					if ($luas_bg <= 72) { // Fungsi Hunian Sederhana Penyedia Jasa
						if($lantai_bg <= '2'){
							$jenis_konsultasi = '1';
							$id_klasifikasi = '1';
						}
					} else if ($luas_bg <= 90){ //Fungsi Hunian Sederhana Penyedia Jasa 
						if($lantai_bg <= '2')
						$jenis_konsultasi = '1';
						$id_klasifikasi = '1';
					}else if($luas_bg > 91) { //Fungsi Hunian Tidak Sederhana Penyedia Jasa
						$jenis_konsultasi = '2';
						$id_klasifikasi = '2';
					}
				} else if ($id_doc_tek == '2') { //Fungsi Hunian Prototype
					$jenis_konsultasi = '3';
				} else if ($id_doc_tek == '3') { //Fungsi Hunian Pengembangan Prototype
					$jenis_konsultasi = '4';
				} else if ($id_doc_tek == '4') { //Fungsi Hunian Tahan Gempa
					$jenis_konsultasi = '5';
				}
		} else if ($id_fungsi_bg == '2') { //Fungsi Non Hunian dan Non Khusus serta Non Campuran
				$jenis_konsultasi = '6';
		} else if ($id_fungsi_bg == '3') {
				if ($jual == '1') {
					$jenis_konsultasi = '7';
				} else {
					$jenis_konsultasi = '6';
				}
		} else if ($id_fungsi_bg == '4') {
				$jenis_konsultasi = '6';
		} else if ($id_fungsi_bg == '5') {
				$jenis_konsultasi = '9';
		} else if ($id_fungsi_bg == '6') { //Fungsi Campuran
				$jenis_konsultasi = '13';
		}
	} else if ($id_izin == '2') {
		  if ($id_fungsi_bg == '1') {
			  if ($imb == '1') {
				  if ($slf == '1') {
					  $jenis_konsultasi = '15';
				  } else {
					  $jenis_konsultasi = '14';
				  }
			  } else {
				  $jenis_konsultasi = '14';
			  }
		  } else if ($id_fungsi_bg == '2') {
			  if ($imb == '1') {
				  if ($slf == '1') {
					  $jenis_konsultasi = '15';
				  } else {
					  $jenis_konsultasi = '14';
				  }
			  } else {
				  $jenis_konsultasi = '14';
			  }
		  } else if ($id_fungsi_bg == '3') {
			  if ($imb == '1') {
				  if ($slf == '1') {
					  $jenis_konsultasi = '15';
				  } else {
					  $jenis_konsultasi = '14';
				  }
			  } else {
				  $jenis_konsultasi = '14';
			  }
		  } else if ($id_fungsi_bg == '4') {
			  if ($imb == '1') {
				  if ($slf == '1') {
					  $jenis_konsultasi = '15';
				  } else {
					  $jenis_konsultasi = '14';
				  }
			  } else {
				  $jenis_konsultasi = '14';
			  }
		  } else if ($id_fungsi_bg == '6') {
			  if ($imb == '1' || $slf == '1') {
				  $jenis_konsultasi = '15';
			  } else {
				  $jenis_konsultasi = '14';
			  }
		  } else if ($id_fungsi_bg == '5') {
			  $jenis_konsultasi = '16';
		  }
		  $jenis_konsultasi 	= '14';
	} else if ($id_izin == '3') {
		  $jenis_konsultasi 	= '18';
	} else if ($id_izin == '4') {
		  if ($luasA[1] <= 72) { // Fungsi Hunian Sederhana Kolektif Luas Maksimal 72m
			  if($lantaiA[1] == '1'){
				  $jenis_konsultasi 	= '29'; // Fungsi Hunian Luas Maksimal 72m dengan 1 Lantai Kolektif
				  $id_klasifikasi 	= '1';
				  $tahap_pbg 			= null;
			  }else if($lantaiA[1] == '2'){
				  $jenis_konsultasi 	= '30'; // Fungsi Hunian Luas Maksimal 72 dengan 2 Lantai
				  $id_klasifikasi 	= '2';
				  $tahap_pbg 			= null;
			  }else{
				  $jenis_konsultasi 	= '33';
				  $id_klasifikasi 	= '2';
				  $tahap_pbg 			= null;
			  }
		  } else if ($luasA[1] <= 90){ //Fungsi Hunian SederhanaKolektif dengan Luas Maksimal 90 Penyedia Jasa 
			  if($lantaiA[1] == '1'){
				  $jenis_konsultasi 	= '30'; //Fungsi Hunian Kolektif Luas 90 m dengan 1 Lantai
				  $id_klasifikasi 	= '1';
			  }else if($lantaiA[1] == '2'){
				  $jenis_konsultasi 	= '30';
				  $id_klasifikasi 	= '1';
				  $tahap_pbg 			= null;
			  }else{
				  $jenis_konsultasi 	= '33';// Fungsi Hunian Kolektif Bangunan Tidak Sederhana
				  $id_klasifikasi 	= '2';
				  $tahap_pbg 			= null;
			  }
		  }else{
			  if($lantaiA[1] == '1'){
				  $jenis_konsultasi 	= '31';
				  $id_klasifikasi 	= '2';
				  $tahap_pbg 			= null;
			  }else if($lantaiA[1] == '2'){
				  $jenis_konsultasi 	= '32';
				  $id_klasifikasi 	= '2';
				  $tahap_pbg 			= null;
			  }else{
				  $jenis_konsultasi 	= '33';
				  $id_klasifikasi 	= '2';
				  $tahap_pbg 			= null;
			  }
		  }
	} else if ($id_izin == '5') {
		  $jenis_konsultasi 	= '12';
	} else if ($id_izin == '6') {
		  $jenis_konsultasi 	= '17';
	} else if($id_izin == '7'){
		  $jenis_konsultasi 	= '21';
		  $id_fungsi_bg 		='3';
		  $id_jns_bg			='2';
		  $luas_bgp 			='10.01';
		  $tinggi_bgp 		='2.6';
	}
	$data	= array(
		'id_izin'				=> $id_izin,
		'id_prov_bgn'			=> $id_kolektif,
		'tipeA'				=> json_encode($tipeA),
		'jumlahA'				=> json_encode($jumlahA),
		'luasA'				=> json_encode($luasA),
		'tinggiA'				=> json_encode($tinggiA),
		'lantaiA'				=> json_encode($lantaiA),
		'id_fungsi_bg'		=> $id_fungsi_bg,
		'id_jns_bg'			=> $id_jns_bg,
		'nm_bgn'				=> $nama_bangunan,
		'luas_bgn'			=> $luas_bg,
		'tinggi_bgn'			=> $tinggi_bg,
		'jml_lantai'			=> $lantai_bg,
		'luas_basement'		=> $luas_basement,
		'lapis_basement'		=> $lapis_basement,
		'id_prasarana_bg'		=> $id_prasarana_bg,
		'luas_bgp'			=> $luas_bgp,
		'tinggi_bgp'			=> $tinggi_bgp,
		'jual'				=> $jual,
		'imb'					=> $imb,
		'slf'					=> $slf,
		'status'				=> 0,
		'id_prototype'		=> $id_prototype,
		'id_jenis_permohonan' => $jenis_konsultasi,
		'id_doc_tek'			=> $id_doc_tek,
		'no_imb'				=> $no_imb,
		'no_slf'				=> $no_slf,
		'permohonan_slf'		=> $permohonan_slf,
		'cetak_dok'			=> json_encode($cetak),
		'last_update'			=> date("Y-m-d h:i:sa"),
	);

	$dataP	= array(
		'user_id' => $user_id,
		'post_date' => date("Y-m-d"),
		'post_by' => $this->session->get('email')
	);
		
	$this->konsulModel->insertData('tmdatapemilik', $dataP);
	$idP		=  $this->konsulModel->insertID();
	$data['id'] = $idP;
	
	if ($idP) {
		
		$this->konsulModel->insertData('tmdatabangunan', $data);
		$lastid = $this->konsulModel->insertID();
		$db->query('COMMIT');
		$response = [
			'status'   	=> 'success',
			'code'     	=> 200,
			'data'		=> [
				'id_pemilik' => $idP,
				'id_bangunan'	=> $lastid
			]
		];
	} else {
		$db->query('ROLLBACK');
		$response = [
			'status'   => 'failed',
			'code'     => 0,
		];
	}

	header('Content-Type: application/json');
	echo json_encode($response);
	exit;
  }

  public function getpemilik()
  {
	try {
		$request	= $this->request;
		$method		= $request->getMethod();
		$konsultasi	= new \App\Models\KonsultasiModel();
		$param 		= $request->getVar('param');
		
		$data 		= $konsultasi->getPemilik('', $request->getVar('id'));
		
		if($data){
			$response = [
				'status'   => 'sukses',
				'code'     => 200,
				'data' 	 => $data
			];
		}else{
			$response = [
				'status'   => 'gagal',
				'code'     => '0',
				'data'     => 'tidak ada data',
			];
		}

	header('Content-Type: application/json');
	echo json_encode($response);
	exit;
	} catch (\Exception $e) {
		die($e->getMessage());
	}
  }

  public function savedata()
  {
	try {
		// print(1);
		// $dax = date('Y-m-d');

		$request		= $this->request;
		
		$method			= $request->getMethod();
		$konsultasi = new \App\Models\KonsultasiModel();

		// $day = date('dmY');
		// $noreg = 'PBG-997101-'+$this->dax+'-1';

		if($method == 'post'){

			$data = [
				'user_id' 						=> $request->getVar('user_id'),
				'nm_pemilik' 					=> $request->getVar('nm_pemilik'),
				'jns_pemilik' 					=> $request->getVar('jns_pemilik'),
				'glr_depan' 					=> $request->getVar('glr_depan'),
				'glr_belakang' 					=> $request->getVar('glr_belakang'),
				'alamat' 						=> $request->getVar('alamat'),
				'id_provinsi' 					=> $request->getVar('id_provinsi'),
				'id_kabkota' 					=> $request->getVar('id_kabkota'),
				'id_kecamatan' 					=> $request->getVar('id_kecamatan'),
				'id_kelurahan' 					=> $request->getVar('id_kelurahan'),
				'jenis_id' 						=> $request->getVar('jenis_id'),
				'no_ktp' 						=> $request->getVar('no_ktp'),
				'no_kitas' 						=> $request->getVar('no_kitas'),
				'no_hp' 						=> $request->getVar('no_hp'),
				'email' 						=> $request->getVar('email'),
				'unit_organisasi' 				=> $request->getVar('unit_organisasi')
			];
			if($request->getVar('id')){
				$konsultasi->updateData($request->getVar('id'), $data, 'tmdatapemilik', 'id' );
				$lastid = $request->getVar('id');
			} else {
				$konsultasi->insertData('tmdatapemilik', $data );
				$lastid = $konsultasi->insertID();
			}

		}

		$response = [
			'status'   => 'sukses',
			'code'     => 200,
			'data'     => $lastid,
		];

		// return $response;
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;
		// redirect('permohonan','refresh');
		
		// echo json_encode($response);
	} catch (\Exception $e) {
		die($e->getMessage());
	}
  }

  public function savealamatbangunan()
  {
	$user_id			= $this->session->get('id');
	$db = \Config\Database::connect(); // Connect to the database
	$db->query('START TRANSACTION');
	$id_bgn			= $this->request->getVar('id');

	$data	= array(
		'id_prov_bgn' => $this->request->getVar('id_prov_bgn'),
		'id_kabkot_bgn' => $this->request->getVar('id_kabkot_bgn'),
		'id_kec_bgn' => $this->request->getVar('id_kec_bgn'),
		'id_kel_bgn' => $this->request->getVar('id_kel_bgn'),
		'almt_bgn' => $this->request->getVar('almt_bgn')
	);
	
	if($this->request->getVar('id')){
		$this->konsulModel->updateData($this->request->getVar('id'), $data, 'tmdatabangunan', 'id' );
		$lastid = $this->request->getVar('id');
	} else {
		$this->konsulModel->insertData('tmdatabangunan', $data );
		$lastid = $this->konsulModel->insertID();
	}

	$db->query('COMMIT');
	$response = [
		'status'   	=> 'success',
		'code'     	=> 200,
		'data'		=> $lastid
	];

	header('Content-Type: application/json');
	echo json_encode($response);
	exit;
  }

  public function getdatajnskonsultasi()
  {
	try {
		$request		= $this->request;
		$id		= $request->getVar('id');
		$method			= $request->getMethod();
		
		$data = json_decode( json_encode($this->konsulModel->getdatajnskonsultasi('a.*', $id)), true);
		
		$id_jenis_permohonan = $data['id_jenis_permohonan'];
		$data['id_jenis_permohonan']	= $id_jenis_permohonan;
		if ($id != '') {
			$filterPemilik	= '	a.*,b.nama_kecamatan,c.nama_kabkota,d.nama_provinsi';
			$data['DataPemilik']	= json_decode( json_encode($this->konsulModel->getPemilik($filterPemilik, $id)), true);
		}
		$data['Konsultasi'] = json_decode( json_encode($this->konsulModel->getDataKonsultasi('a.*', $id)), true);
		// print_r($data);die;
		if($data){
			$response = [
				'status'   => 'sukses',
				'code'     => 200,
				'data' 	 => $data
			];
		}else{
			$response = [
				'status'   => 'gagal',
				'code'     => '0',
				'data'     => 'tidak ada data',
			];
		}

	header('Content-Type: application/json');
	echo json_encode($response);
	exit;
	} catch (\Exception $e) {
		die($e->getMessage());
	}
  }
	
  public function saveTanah()
  {
	  	$user_id			= $this->session->get('id');
	  	$db = \Config\Database::connect(); // Connect to the database
		$db->query('START TRANSACTION');

		$user_id						= $this->session->get('id');
		$id_tanah						= $this->request->getVar('id_tanah');
		$id								= $this->request->getVar('id');
		$id_dokumen						= $this->request->getVar('id_dokumen');
		$nama_jns_dok_lain				= $this->request->getVar('nama_jns_dok_lain');
		$nomor_dokumen					= $this->request->getVar('nomor_dokumen');
		$tgl_terbit_dokumen				= $this->request->getVar('tgl_terbit_dokumen');
		$lokasi_tanah					= $this->request->getVar('lokasi_tanah');
		$nama_provinsi					= $this->request->getVar('nama_provinsi');
		$nama_kabkota					= $this->request->getVar('nama_kabkota');
		$nama_kecamatan					= $this->request->getVar('nama_kecamatan');
		$luas_tanah						= $this->request->getVar('luas_tanah');
		$nama_pemegang_hak_atas_tanah	= $this->request->getVar('atas_nama');
		$hat							= $this->request->getVar('hat');
		$hat2							= $this->request->getVar('hat2');
		$id_status_izin_pemanfaatan		= $this->request->getVar('id_status_izin_pemanfaatan');
		$no_dok_izin_pemanfaatan		= $this->request->getVar('no_dok_izin_pemanfaatan');
		$tgl_terbit_pemanfaatan			= $this->request->getVar('tgl_terbit_phat');
		$nama_pemegang_izin				= $this->request->getVar('nama_penerima_kuasa');

		if(array_key_exists("dir_file_tan",$_FILES)){
			$dir_file_tan = $this->uploadfiletanah('./object-storage/dekill/Earth/', $this->request->getFile('dir_file_tan'));
		};
		if(array_key_exists("dir_file_phat",$_FILES)){
			$dir_file_phat = $this->uploadfiletanah('./object-storage/dekill/Earth/', $this->request->getFile('dir_file_phat'));
		};
		
		$data	= array(
			'id' => $id,
			'id_dokumen' => $id_dokumen,
			'dir_file' => $dir_file_tan,
			'jenis_dokumen_phat' => $nama_jns_dok_lain,
			'no_dok' => $nomor_dokumen,
			'tanggal_dok' => date('Y-m-d', strtotime($tgl_terbit_dokumen)),
			'lokasi_tanah' => $lokasi_tanah,
			'id_provinsi' => $nama_provinsi,
			'id_kabkot' => $nama_kabkota,
			'id_kecamatan' => $nama_kecamatan,
			'luas_tanah' => $luas_tanah,
			'atas_nama_dok' => $nama_pemegang_hak_atas_tanah,
			'status_phat' => $hat2,
			'dir_file_phat' => $dir_file_phat,
			'no_dokumen_phat' => $no_dok_izin_pemanfaatan,
			'nama_penerima_phat' => $nama_pemegang_izin,
			'hat' => $hat,
			'tgl_terbit_phat' => date('Y-m-d', strtotime($tgl_terbit_pemanfaatan)),
		);
		
	if ($id_tanah) {
		
		$this->konsulModel->insertData('tmdatatanah', $data);
		$lastid = $this->konsulModel->insertID();
		$db->query('COMMIT');
		$response = [
			'status'   	=> 'success',
			'code'     	=> 200,
			'data'		=> $id
		];
	} else {
		
		$this->konsulModel->insertData('tmdatatanah', $data);
		$lastid = $this->konsulModel->insertID();
		$data['lastid'] = $lastid;
		
		$db->query('COMMIT');
		$response = [
			'status'   	=> 'success',
			'code'     	=> 200,
			'data'		=> json_decode( json_encode($this->konsulModel->getTanah('a.*', $id)), true)

		];
	}

	header('Content-Type: application/json');
	echo json_encode($response);
	exit;
  }

  public function uploadfiletanah($path, $file)
  {
	
	  $basepath = $path;
	  if(!is_dir($basepath)){
		  mkdir($basepath, 0777, true);
	  }
	  $filename = $file->getName();
	  $temp = $file->getTempName();
	  $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
	  
	  move_uploaded_file($temp, $basepath.$filename);

	  return $filename;
  }

  public function uploadfiledokumen($path, $file)
  {
	
	  $basepath = $path;
	  if(!is_dir($basepath)){
		  mkdir($basepath, 0777, true);
	  }
	  $filename = $file->getName();
	  $temp = $file->getTempName();
	  $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
	  
	  move_uploaded_file($temp, $basepath.$filename);

	  return $filename;
  }

  public function getdatadokumen()
  {
	try {
		$request		= $this->request;
		$id				= $request->getVar('id');
		$method			= $request->getMethod();
		
		$data = json_decode( json_encode($this->konsulModel->getdatajnskonsultasi('a.*', $id)), true);
		
		$id_jenis_permohonan = $data['id_jenis_permohonan'];
		$data['id_jenis_permohonan']	= $id_jenis_permohonan;
		$tahap_pbg 						= $data['tahap_pbg'];
		if($tahap_pbg != ''){
			if ($id != '') {
				$filterPemilik			= '	a.*,b.nama_kecamatan,c.nama_kabkota,d.nama_provinsi';
				$data['DataPemilik']	= json_decode( json_encode($this->konsulModel->getPemilik($filterPemilik, $id)), true);
				$filterBangunan			= '	a.*,b.nama_kecamatan,c.nama_kabkota,d.nama_provinsi,e.nm_konsultasi,f.dir_file,h.nama_kelurahan';
				$data['DataBangunan']	= json_decode( json_encode($this->konsulModel->getBangunan($filterBangunan, $id)), true);
				$data['DataUmum']		= json_decode( json_encode($this->konsulModel->getDataDokumen('a.*', $id)), true);
				$filterQuery			= 'b.id_detail, b.id_syarat, c.nm_dokumen,c.keterangan,c.id_tahap';
				$data['DokumenUmum']	= json_decode( json_encode($this->konsulModel->getDataUmumBertahap($filterQuery, $id_jenis_permohonan, $tahap_pbg)), true);
			}
		}else{
			$data['id_jenis_permohonan']	= $id_jenis_permohonan;
			if ($id != '') {
				$filterPemilik			= '	a.*,b.nama_kecamatan,c.nama_kabkota,d.nama_provinsi';
				$data['DataPemilik']	= json_decode( json_encode($this->konsulModel->getPemilik($filterPemilik, $id)), true);
				$filterBangunan			= '	a.*,b.nama_kecamatan,c.nama_kabkota,d.nama_provinsi,e.nm_konsultasi,h.nama_kelurahan';
				$data['DataBangunan']	= json_decode( json_encode($this->konsulModel->getBangunan($filterBangunan, $id)), true);
				//Begin Data Umum 
				$data['DataFile']		= $this->konsulModel->getDataDokumen('a.*', $id);
				$filterQuery				= 'b.id_detail, b.id_syarat, c.nm_dokumen,c.keterangan';
				$data['DataTkTanah']	= json_decode( json_encode($this->konsulModel->getDataTanah($filterQuery, $id_jenis_permohonan)), true);
				$filterQuery			= 'b.id_detail, b.id_syarat, c.nm_dokumen,c.keterangan';
				$data['DokumenUmum']	= json_decode( json_encode($this->konsulModel->getDataUmum($filterQuery, $id_jenis_permohonan)), true);
				$filterQuery				= 'b.id_detail, b.id_syarat,c.id, c.nm_dokumen,c.keterangan';
				$data['DataArsitektur']	= json_decode( json_encode($this->konsulModel->getDataArsitektur($filterQuery, $id_jenis_permohonan)), true);
				$filterQuery				= 'b.id_detail, b.id_syarat, c.nm_dokumen,c.keterangan';
				$data['DataStruktur']	= json_decode( json_encode($this->konsulModel->getDataStruktur($filterQuery, $id_jenis_permohonan)), true);
				$filterQuery				= 'b.id_detail, b.id_syarat, c.nm_dokumen,c.keterangan';
				$data['DataMPE']		= json_decode( json_encode($this->konsulModel->getDataMEP($filterQuery, $id_jenis_permohonan)), true);
			}
		}

		if($data){
			$response = [
				'status'   => 'sukses',
				'code'     => 200,
				'data' 	 => $data
			];
		}else{
			$response = [
				'status'   => 'gagal',
				'code'     => '0',
				'data'     => [],
			];
		}

	header('Content-Type: application/json');
	echo json_encode($response);
	exit;
	} catch (\Exception $e) {
		die($e->getMessage());
	}
  }

  public function SaveDokumen()
  {
	try {
		// print(1);
		// $dax = date('Y-m-d');

		$request		= $this->request;
		
		$method			= $request->getMethod();
		$konsultasi = new \App\Models\KonsultasiModel();	
		
		if($method == 'post'){
			if(array_key_exists("d_file",$_FILES)){
				$d_file = $this->uploadfiledokumen('./object-storage/dekill/Requirement/', $this->request->getFile('d_file'));
			};

			$dataPersyaratan = array(
				'id' => $request->getVar('id'),
				'dir_file' => $d_file,
				'id_persyaratan' => $request->getVar('kode_jenis_syarat'),
				'id_persyaratan_detail' =>  $request->getVar('id_syarat')
			);
			
			$konsultasi->insertData('tmpersyaratankonsultasi', $dataPersyaratan );
			$lastid = $konsultasi->insertID();
			$dataPersyaratan['nm_data'] = $request->getVar('nm_data');
		}
		
		$response = [
			'status'   => 'sukses',
			'code'     => 200,
			'data'     => $this->konsulModel->getDataDokumen('a.*', $request->getVar('id'))
		];

		// return $response;
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;
		// redirect('permohonan','refresh');
		
		// echo json_encode($response);
	} catch (\Exception $e) {
		die($e->getMessage());
	}
  }

  public function deleteDokumen()
  {
	try {

		$request		= $this->request;
		
		$method			= $request->getMethod();
		$konsultasi = new \App\Models\KonsultasiModel();	
		$id_detail 		= $request->getVar('id_detail');
		$path 			= $request->getVar('path');

		if($method == 'post'){

			if (file_exists($path)) {
				unlink($path);
			}
			$konsultasi->RemoveTeknisTanah($id_detail);
		}
		
		$response = [
			'status'   => 'sukses',
			'code'     => 200
		];

		// return $response;
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;
		// redirect('permohonan','refresh');
		
		// echo json_encode($response);
	} catch (\Exception $e) {
		die($e->getMessage());
	}
  }

  public function saveDataPernyataan()
  {
	  	$user_id			= $this->session->get('id');
	  	$db = \Config\Database::connect(); // Connect to the database
		$db->query('START TRANSACTION');
	  
		$id				= $this->request->getVar('id');
		$pernyataan		=  $this->request->getVar('pernyataan');
		$tgl_skrg 		= date('Y-m-d');
		$no_konsultasi 	= $this->nomor_registrasi($id);

		if ($pernyataan == '1') {
			$data	= array(
				'pernyataan' => $pernyataan,
				'no_konsultasi' => $no_konsultasi,
				'tgl_pernyataan' => $tgl_skrg,
				'status' => '1',
				'post_date' => date('Y-m-d')
			);
			
			$this->konsulModel->updateData($id, $data, 'tmdatabangunan', 'id' );
			// $this->session->set_flashdata('message', 'Data User Berhasil di Ubah.');
			// $this->session->set_flashdata('status', 'success');
			// $this->load->library('ciqrcode'); //pemanggilan library QR CODE
			// $config['imagedir']     = 'object-storage/dekill/QR_Code/'; //direktori penyimpanan qr code
			// $config['quality']      = true; //boolean, the default is true
			// $config['size']         = '1024'; //interger, the default is 1024
			// $config['black']        = array(224, 255, 255); // array, default is array(255,255,255)
			// $config['white']        = array(70, 130, 180); // array, default is array(0,0,0)
			// $this->ciqrcode->initialize($config);
			// $image_name = $no_konsultasi . '.png'; //buat name dari qr code sesuai dengan nim
			// $params['data'] = 'http://simbg.pu.go.id/Main/Konsultasi/' . $no_konsultasi; //data yang akan di jadikan QR CODE
			// $params['level'] = 'H'; //H=High
			// $params['size'] = 10;
			// $params['savename'] = FCPATH . $config['imagedir'] . $image_name; //simpan image QR CODE ke folder assets/images/
			// $data['QR'] = $this->ciqrcode->generate($params);
		}
		
		$db->query('COMMIT');
		$response = [
			'status'   	=> 'success',
			'code'     	=> 200,
			'data'		=> []
		];

		header('Content-Type: application/json');
		echo json_encode($response);
		exit;
  }

  public function nomor_registrasi($id = null)
  {
	  $que = $this->konsulModel->get_id_kabkot($id);
	  
	  $no_reg_awal = $que['id_kec_bgn'];
	  $id_izin = $que['id_izin'];
	  $tgl_disetujui = date('d') . date('m') . date('Y');;
	  $mydata2 = $this->konsulModel->get_nomor_registrasi($no_reg_awal, $tgl_disetujui);
	  if ($id_izin == '2') {
		  if (count($mydata2) > 0) {
			  $no_baru = SUBSTR($mydata2['no_urut'], -2) + 1;
			  if ($no_baru < 10) {
				  $no_registrasi = "SLF-" . $no_reg_awal . "-" . $tgl_disetujui . "-0" . $no_baru;
			  } else {
				  $no_registrasi = "SLF-" . $no_reg_awal . "-" . $tgl_disetujui . "-" . $no_baru;
			  }
		  } else {
			  $no_registrasi = "SLF-" . $no_reg_awal . "-" . $tgl_disetujui . "-01";
		  }
	  } else {
		
		  if (count($mydata2) > 0) {
			  $no_baru = SUBSTR(is_numeric($mydata2['no_urut']) ? $mydata2['no_urut'] : 0, -2) + 1;
			  
			  if ($no_baru < 10) {
				  $no_registrasi = "PBG-" . $no_reg_awal . "-" . $tgl_disetujui . "-0" . $no_baru;
			  } else {
				  $no_registrasi = "PBG-" . $no_reg_awal . "-" . $tgl_disetujui . "-" . $no_baru;
			  }
		  } else {
			  $no_registrasi = "PBG-" . $no_reg_awal . "-" . $tgl_disetujui . "-01";
		  }
	  }
	  
	  return $no_registrasi;
  }

  public function getdatajnskonsultasiall()
  {
	try {
		$request		= $this->request;
		$id		= $request->getVar('id');
		$method			= $request->getMethod();
		
		$data = json_decode( json_encode($this->konsulModel->getdatajnskonsultasi('a.*', $id)), true);
		
		$id_jenis_permohonan = $data['id_jenis_permohonan'];
		$data['id_jenis_permohonan']	= $id_jenis_permohonan;
		if ($id != '') {
			$filterPemilik	= '	a.*,b.nama_kecamatan,c.nama_kabkota,d.nama_provinsi';
			$data['DataPemilik']	= json_decode( json_encode($this->konsulModel->getPemilik($filterPemilik, $id)), true);
			$data['DataTanah']		= json_decode( json_encode($this->konsulModel->getTanah('a.*, b.Jns_dok', $id)), true);
			$filterBangunan			= '	a.*,b.nama_kecamatan,c.nama_kabkota,d.nama_provinsi,e.nm_konsultasi';
			$data['DataBangunan']	= json_decode( json_encode($this->konsulModel->getBangunan($filterBangunan, $id)), true);
			
			
			$data['DataFile']		= $this->konsulModel->getDataDokumen('a.*', $id);
			$filterQuery				= 'b.id_detail, b.id_syarat, c.nm_dokumen,c.keterangan';
			$data['DataTkTanah']	= json_decode( json_encode($this->konsulModel->getDataTanah($filterQuery, $id_jenis_permohonan)), true);
			$filterQuery			= 'b.id_detail, b.id_syarat, c.nm_dokumen,c.keterangan';
			$data['DokumenUmum']	= json_decode( json_encode($this->konsulModel->getDataUmum($filterQuery, $id_jenis_permohonan)), true);
			$filterQuery				= 'b.id_detail, b.id_syarat,c.id, c.nm_dokumen,c.keterangan';
			$data['DataArsitektur']	= json_decode( json_encode($this->konsulModel->getDataArsitektur($filterQuery, $id_jenis_permohonan)), true);
			$filterQuery				= 'b.id_detail, b.id_syarat, c.nm_dokumen,c.keterangan';
			$data['DataStruktur']	= json_decode( json_encode($this->konsulModel->getDataStruktur($filterQuery, $id_jenis_permohonan)), true);
			$filterQuery				= 'b.id_detail, b.id_syarat, c.nm_dokumen,c.keterangan';
			$data['DataMPE']		= json_decode( json_encode($this->konsulModel->getDataMEP($filterQuery, $id_jenis_permohonan)), true);
		}
		$data['Konsultasi'] = json_decode( json_encode($this->konsulModel->getDataKonsultasi('a.*', $id)), true);
		// print_r($data);die;
		if($data){
			$response = [
				'status'   => 'sukses',
				'code'     => 200,
				'data' 	 => $data
			];
		}else{
			$response = [
				'status'   => 'gagal',
				'code'     => '0',
				'data'     => 'tidak ada data',
			];
		}

	header('Content-Type: application/json');
	echo json_encode($response);
	exit;
	} catch (\Exception $e) {
		die($e->getMessage());
	}
  }

}