<?php

namespace App\Controllers;

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
		$this->data = array(
			'version' => \CodeIgniter\CodeIgniter::CI_VERSION,
			// 'baseURL' => BASE.'/public',
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

	public function getalluser()
	{
		try {
			$request	= $this->request;
			$param	= $request->getVar('param');
			$user = new \App\Models\UserModel();
			$data = $user->getUsers($param);

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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
			if ($param) {
				$data = $user->getWhere(['m_user_simponi.id_usersim' => $request->getVar('id')], $param)->getRow();
			} else {
				$data = $user->getWhere(['m_user.id' => $request->getVar('id')])->getRow();
			}

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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
			if ($param) {
				$data = $user->getWhere(['m_user_simponi.id_usersim' => $request->getVar('id')], $param)->getRow();
			} else {
				$data = $user->getWhere(['biller.id_biller' => $request->getVar('id_biller')])->getRow();
			}

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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
			if ($param) {
				$data = $user->getWhere(['m_user_simponi.id_usersim' => $request->getVar('id')], $param)->getRow();
			} else {
				$data = $user->getWhere(['transaction.id' => $request->getVar('id')])->getRow();
			}

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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
			if ($param) {
				$data = $user->getWhere(['m_user_simponi.id_usersim' => $request->getVar('id')], $param)->getRow();
			} else {
				$data = $user->getWhere(['master_voucher.id_voucher' => $request->getVar('id_voucher')])->getRow();
			}

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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
			if ($param) {
				$data = $user->getWhere(['m_user_simponi.id_usersim' => $request->getVar('id')], $param)->getRow();
			} else {
				$data = $user->getWhere(['bank_token.id_token' => $request->getVar('id_token')])->getRow();
			}

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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

			if ($method == 'post') {

				if ($request->getVar('id')) {
					$data = [
						'name' 		=> $request->getVar('name'),
						'email' 		=> $request->getVar('email'),
						'username' 		=> $request->getVar('username'),
						'id_role' 			=> $request->getVar('id_role'),
						'status' 		=> 1,
						'update_date' 	=> $this->now,
						'update_by' 	=> $this->session->get('id')
					];

					if ($request->getVar('password')) {
						$data['password'] = md5($request->getVar('password'));
					}

					$user->updateUser($request->getVar('id'), $data);
				} else {
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
			redirect('users', 'refresh');
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

			if ($method == 'post') {


				$data = [
					'role' 			=> $request->getVar('role'),
					'status' 		=> 1,
				];
				$user->insertRole($data);
			}
			redirect('users', 'refresh');
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
			$user = new \App\Models\KegiatanModel();
			$data = $user->getPermohonan($param);

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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

	public function getpermohonan()
	{
		try {
			$request	= $this->request;
			$param	= $request->getVar('param');
			$user = new \App\Models\KegiatanModel();
			$data = $user->getPermohonanfull($param);

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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

	public function listDataPersonilAsn()
	{
		try {
			$request	= $this->request;
			$param	= $request->getVar('param');
			$user = new \App\Models\KegiatanModel();
			$data = $user->getListDataAsn($param);

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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

	public function getjsonkabkot()
	{
		try {
			$request		= $this->request;
			$method			= $request->getMethod();
			$komunikasi 	= new \App\Models\KegiatanModel();

			$data = $komunikasi->getkabkot($request->getVar('id'));

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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

	public function getjsonkec()
	{
		try {
			$request		= $this->request;
			$method			= $request->getMethod();
			$komunikasi 	= new \App\Models\KegiatanModel();

			$data = $komunikasi->getkecamatan($request->getVar('id'));

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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

			if ($data) {
				$response = [
					'status'   => 'sukses',
					'code'     => 200,
					'data' 	 => $data
				];
			} else {
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

			if ($method == 'post') {

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

	public function addDealerData()
	{
		try {
			$request		= $this->request;
			$param		= $request->getVar('param');

			$method			= $request->getMethod();
			$dealer = new \App\Models\DealerDataModel();

			if ($method == 'post') {

				if ($request->getVar('id_biller')) {
					$data = [
						'nm_biller' 	=> $request->getVar('nm_biller'),
						'alamat' 		=> $request->getVar('alamat'),
						'kontak' 		=> $request->getVar('kontak'),
						'create_dtm' 	=> $this->now,
						'status' 		=> 1
					];

					$dealer->updateDealerData($request->getVar('id_biller'), $data);
				} else {
					$data = [
						'nm_biller' 	=> $request->getVar('nm_biller'),
						'alamat' 		=> $request->getVar('alamat'),
						'kontak' 		=> $request->getVar('kontak'),
						'create_dtm' 	=> $this->now,
						'status' 		=> 1
					];
					$dealer->insertDealerData($data);
				}
			}
			redirect('dealerData', 'refresh');
		} catch (\Exception $e) {
			die($e->getMessage());
		}
	}

	public function deleteDealerData()
	{
		try {
			$request		= $this->request;
			$param		= $request->getVar('param');
			$method			= $request->getMethod();
			$dealerData = new \App\Models\DealerDataModel();

			$dealerData->deleteDealerData($request->getVar('id_biller'));

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

	public function addPaymentData()
	{
		try {
			$request		= $this->request;
			$param		= $request->getVar('param');

			$method			= $request->getMethod();
			$user = new \App\Models\PaymentDataModel();

			if ($method == 'post') {

				if ($request->getVar('id')) {
					$data = [
						'dateTransaction' 		=> $request->getVar('dateTransaction'),
						'nominal' 		=> $request->getVar('nominal'),
						'status' 		=> 1
					];

					$user->update($request->getVar('id'), $data);
				} else {
					$data = [
						'dateTransaction' 		=> $request->getVar('dateTransaction'),
						'nominal' 		=> $request->getVar('nominal'),
						'status' 		=> 1
					];
					$user->insert($data);
				}
			}
			redirect('payment', 'refresh');
		} catch (\Exception $e) {
			die($e->getMessage());
		}
	}

	public function deletePaymentData()
	{
		try {
			$request		= $this->request;
			$param		= $request->getVar('param');
			$method			= $request->getMethod();
			$payment = new \App\Models\PaymentDataModel();

			$payment->deletePaymentData($request->getVar('id'));

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

	public function addTokenData()
	{
		try {
			$request		= $this->request;
			$param		= $request->getVar('param');

			$method			= $request->getMethod();
			$token = new \App\Models\TokenDataModel();

			if ($method == 'post') {

				if ($request->getVar('id')) {
					$data = [
						'token'				 	=> $request->getVar('token'),
						'id_user'		 		=> $request->getVar('id_user'),
						'valid_until'	 		=> $request->getVar('valid_until'),
					];

					$token->update($request->getVar('id'), $data);
				} else {
					$data = [
						'token'				 	=> $request->getVar('token'),
						'id_user'		 		=> $request->getVar('id_user'),
						'valid_until'	 		=> $request->getVar('valid_until'),
					];
					$token->insert($data);
				}
			}
			redirect('tokenData', 'refresh');
		} catch (\Exception $e) {
			die($e->getMessage());
		}
	}

	public function deleteTokenData()
	{
		try {
			$request		= $this->request;
			$param		= $request->getVar('param');
			$method			= $request->getMethod();
			$token = new \App\Models\TokenDataModel();

			$token->deleteTokenData($request->getVar('id_token'));

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

	public function addVoucherData()
	{
		try {

			$request		= $this->request;
			$param		= $request->getVar('param');

			$method			= $request->getMethod();
			$voucher = new \App\Models\VoucherDataModel();

			if ($method == 'post') {

				if ($request->getVar('id_voucher')) {
					$data = [
						'kd_voucher' 		=> $request->getVar('kd_voucher'),
						'nm_voucher' 		=> $request->getVar('nm_voucher'),
						'min_pembelian' 	=> $request->getVar('min_pembelian'),
						'jml_potongan' 		=> $request->getVar('jml_potongan'),
						'stock' 		=> $request->getVar('stock'),
						// date('d',$timestamp);
						'expired_by' 	=> $request->getVar('expired_by'),
						'jns_potongan' 	=> $request->getVar('jns_potongan')
					];

					$voucher->update($request->getVar('id_voucher'), $data);
				} else {
					$data = [
						'kd_voucher' 		=> $request->getVar('kd_voucher'),
						'nm_voucher' 		=> $request->getVar('nm_voucher'),
						'min_pembelian' 	=> $request->getVar('min_pembelian'),
						'jml_potongan' 		=> $request->getVar('jml_potongan'),
						'stock' 		=> $request->getVar('stock'),
						// date('d',$timestamp);
						'expired_by' 	=> $request->getVar('expired_by'),
						'jns_potongan' 	=> $request->getVar('jns_potongan')
					];
					$voucher->insert($data);
				}
			}
			redirect('reportVouchers', 'refresh');
		} catch (\Exception $e) {
			die($e->getMessage());
		}
	}

	public function deleteVoucher()
	{
		try {
			$request		= $this->request;
			$param		= $request->getVar('param');
			$method			= $request->getMethod();
			$voucher = new \App\Models\VoucherDataModel();

			$voucher->deleteVoucher($request->getVar('id_voucher'));

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

	// VERIFIKASI DOKUMEN
	public function status_dt_teknis()
	{
		$request = $this->request;
		$perm = new \App\Models\KegiatanModel();
		$user_id		= 1;
		$id_kabkot		= 3273;
		$status			= $request->getVar('status_syarat');
		$no_surat		= $request->getVar('no_surat');
		$catatan		= $request->getVar('catatan');
		// $id_pemilik		= $request->getVar('id_pemilik');
		$id_permohonan	= $request->getVar('id_permohonan');
		// $id_pemilik = 0;
		$email			= $request->getVar('email');
		$no_konsultasi	= $request->getVar('no_konsultasi');
		$tgl_skrg 		= date('Y-m-d');

		if (!file_exists($_FILES['file']['tmp_name']) || !is_uploaded_file($_FILES['file']['tmp_name'])) {
			$imgname = "";
		} else {
			if (array_key_exists("file", $_FILES)) {
				foreach ($_FILES as $key => $value) {
					$basepath = './uploads/fileverifikasi/';
					if (!is_dir($basepath)) {
						mkdir($basepath, 0777, true);
					}

					// for ($i = 0; $i < count($value['tmp_name']); $i++) {
					$tmp_name = $value['tmp_name'];
					if ($tmp_name) {
						$path = $value['name'];
						$ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
						$imgname = "SuratPemberitahuan-" . date('dmYHis') . "-" . $path;
						$terupload = move_uploaded_file($tmp_name, $basepath . $imgname);
						if ($terupload) {
						}
					}
				}
			}

			if ($status == '1') {
				if ($id_kabkot == '31') {
					$data	= array(
						'tanggal' => $tgl_skrg,
						'status' => 4,
						// 'id_dki' => '1',
						'no_surat' => $no_surat,
						'id_permohonan' => $id_permohonan,
						'catatan' => $catatan,
						'dir_file' => $imgname,
						'create_by' => $user_id
					);
				} else {
					$data	= array(
						'tanggal' => $tgl_skrg,
						'status' => '4',
						'no_surat' => $no_surat,
						'id_permohonan' => $id_permohonan,
						'catatan' => $catatan,
						'dir_file' => $imgname,
						'create_by' => $user_id
					);
				}
			} else {
				$data	= array(
					'tanggal' => $tgl_skrg,
					'status' => '3',
					'no_surat' => $no_surat,
					'id_permohonan' => $id_permohonan,
					'catatan' => $catatan,
					'dir_file' => $imgname,
					'create_by' => $user_id
				);
			}

			// insert th_data_konsultasi
			$insertVerifikasiDokumen = $perm->insertVerifikasiDokumen($data);
			// updatestatuspermohonan
			$updatepermohonan = $perm->updatePermohonan(['status' => $data['status']], ['id' => $id_permohonan]);

			if ($insertVerifikasiDokumen && $updatepermohonan) {
				if ($status == '2') {
					$ket = "Dikembalikan ke Pemohon agar di perbaiki/dilengkapi";
					$response = array(
						'code' => 200,
						'msg' => $ket
					);
				} else if ($status == '1') {
					$ket = "Sudah Lengkap dan akan masuk ketahap Penugasan TPT/TPA";
					$response = array(
						'code' => 200,
						'msg' => $ket
					);
				} else {
					$ket = "Belum ditentukan";
					$response = array(
						'code' => 0,
						'msg' => $ket
					);
				}
			} else {
				$response = array(
					'code' => 200,
					'msg' => 'Data Gagal Disimpan'
				);
			}

			echo json_encode($response);
		}
	}
}



//   public function getlog()
//   {
// 	  try {
// 		  $request	= $this->request;

// 		  $log = new \App\Models\LogModel();
// 		  $data = $log->getLogs($request->getVar('length'), $request->getVar('start'), $request->getVar('search'));
// 		  $count = $log->countLogs($request->getVar('search'));
		  
// 		  if($data){
// 			  $response = [
// 					'status'   => 'sukses',
// 					'code'     => 200,
// 					// 'draw' 		=> $request->getPost('draw'),
// 					'recordsTotal' => $count,
// 					// 'recordsFiltered' => $datatable->countFiltered(),
// 					'data' => $data
// 			  ];
// 		  }else{
// 			  $response = [
// 				  'status'   => 'gagal',
// 				  'code'     => '0',
// 				  'data'     => [],
// 			  ];
// 		  }

// 	  header('Content-Type: application/json');
// 	  echo json_encode($response);
// 	  exit;
// 	  } catch (\Exception $e) {
// 		  die($e->getMessage());
// 	  }
//   }

//   public function getpenyesuaiangrafik()
//   {
// 	  try {
// 		  $request	= $this->request;

// 		  $statistik = new \App\Models\StatistikModel();
// 		  $data = $statistik->getpenyesuaian();
		  
// 		  if($data){
// 			  $response = [
// 					'status'   => 'sukses',
// 					'code'     => 200,
// 					'data' 	   => $data
// 			  ];
// 		  }else{
// 			  $response = [
// 				  'status'   => 'gagal',
// 				  'code'     => '0',
// 				  'data'     => [],
// 			  ];
// 		  }

// 	  header('Content-Type: application/json');
// 	  echo json_encode($response);
// 	  exit;
// 	  } catch (\Exception $e) {
// 		  die($e->getMessage());
// 	  }
//   }

//   public function addpenyesuaiangrafik()
//   {
// 	try {
// 		$request		= $this->request;
// 		$method			= $request->getMethod();
// 		$statistik = new \App\Models\StatistikModel();

// 		if($method == 'post'){
// 			if($request->getVar('id_grafik')){
// 				$data = [
// 					'penyesuaian' => $request->getVar('penyesuaian'),
// 				];

// 				$statistik->update($request->getVar('id_grafik'), $data);
// 			}
// 		}
// 		$response = [
// 			'status'   => 'success',
// 			'code'     => 200,
// 		];

// 		header('Content-Type: application/json');
// 		echo json_encode($response);
// 		exit;
// 	} catch (\Exception $e) {
// 		die($e->getMessage());
// 	}
//   }

//   public function getdatariwayatpnbp()
//   {
// 	  try {
// 		  $request	= $this->request;

// 		  $statistik = new \App\Models\StatistikModel();
// 		  $data = $statistik->getdatariwayatpnbp();
		  
// 		  if($data){
// 			  $response = [
// 					'status'   => 'sukses',
// 					'code'     => 200,
// 					'data' 	   => $data
// 			  ];
// 		  }else{
// 			  $response = [
// 				  'status'   => 'gagal',
// 				  'code'     => '0',
// 				  'data'     => [],
// 			  ];
// 		  }

// 	  header('Content-Type: application/json');
// 	  echo json_encode($response);
// 	  exit;
// 	  } catch (\Exception $e) {
// 		  die($e->getMessage());
// 	  }
//   }

//   public function getbox()
//   {
// 	  try {
// 		  $request	= $this->request;
// 		  $box = $request->getVar('box');
// 		  $component = new \App\Models\ComponentModel();
// 		  if($box){
// 			$data = $component->getBoxdetail($box);
// 			$count = 0;
// 		  }else{
// 			$data = $component->getBox($request->getVar('length'), $request->getVar('start'), $request->getVar('search'));
// 			$count = count($data);
// 		  }
		  
// 		  if($data){
// 			  $response = [
// 					'status'   		=> 'sukses',
// 					'code'     		=> 200,
// 					'recordsTotal' 	=> $count,
// 					'data' 			=> $data
// 			  ];
// 		  }else{
// 			  $response = [
// 				  'status'   => 'gagal',
// 				  'code'     => '0',
// 				  'data'     => [],
// 			  ];
// 		  }

// 	  header('Content-Type: application/json');
// 	  echo json_encode($response);
// 	  exit;
// 	  } catch (\Exception $e) {
// 		  die($e->getMessage());
// 	  }
//   }

//   public function replytiket()
//   {
// 	try {
// 		$request		= $this->request;
// 		$id		= $request->getVar('ids');
		
// 		$method			= $request->getMethod();
// 		$komunikasi = new \App\Models\KomunikasiModel();
		
// 		if($method == 'post'){
// 			if($id){
// 				$data = [
// 					'id_tiket'		=> $id,
// 					'isi_reply'		=> $request->getVar('reply'),
// 					'created_at'	=> date('Y-m-d H:i:s'),
// 					'created_by'	=> $this->session->get('id'),
// 					'updated_at'	=> date('Y-m-d H:i:s'),
// 					'updated_by'	=> $this->session->get('id')
// 				];
				
// 				$kom = $komunikasi->insertReply($data);
// 				if($kom){
// 					$datatiket = [
// 						'updated_at'	=> date('Y-m-d H:i:s'),
// 						'updated_by'	=> $this->session->get('id')
// 					];
	
// 					$komunikasi->updateTiket($id, $datatiket);
// 				}
				

// 			}
// 		}
// 		header("Status: 301 Moved Permanently");
// 		header("Location:komunikasi?detail=". $id);
// 		exit;
// 	} catch (\Exception $e) {
// 		die($e->getMessage());
// 	}
//   }

//   public function deletetiket()
//   {
// 	try {
// 		$request		= $this->request;
// 		$param			= $request->getVar('param');
// 		$method			= $request->getMethod();
// 		$komunikasi 	= new \App\Models\KomunikasiModel();
		
// 		$komunikasi->deletekomunikasi($request->getVar('id'));
		
// 		$response = [
// 			'status'   => 'success',
// 			'code'     => 200,
// 		];

// 		header("Status: 301 Moved Permanently");
// 		header("Location:komunikasi");
// 		exit;
// 	} catch (\Exception $e) {
// 		die($e->getMessage());
// 	}
//   }

//   public function getcicilan()
//   {
// 	  try {
		
// 		  $request		= $this->request;
// 		  $param		= $request->getVar('param');
// 		  $req = [
// 				'hdno'		=> $request->getVar('hdno'),
// 				'nama' 		=> $request->getVar('nama'),
// 				'alamat' 		=> $request->getVar('alamat'),
// 				'provinsi' 	=> $request->getVar('provinsi'),
// 				'kecamatan' 	=> $request->getVar('kecamatan'),
// 				'kabupaten' 	=> $request->getVar('kabupaten'),
// 				'lembaga' 	=> $request->getVar('lembaga'),
// 				'status' 		=> $request->getVar('status')
// 		  ];

// 		  $cicilan = new \App\Models\CicilanModel();
// 		  $data = $cicilan->getcicilan($request->getVar('length'), $request->getVar('start'), $request->getVar('search'), $req);
// 		  $count = $cicilan->countcicilan($request->getVar('search'), $req);
		  
// 		  if($data){
// 			  $response = [
// 					'status'   => 'sukses',
// 					'code'     => 200,
// 					// 'draw' 		=> $request->getPost('draw'),
// 					'recordsTotal' => $count->jumlah,
// 					// 'recordsFiltered' => $datatable->countFiltered(),
// 					'data' => $data
// 			  ];
// 		  }else{
// 			  $response = [
// 				  'status'   => 'gagal',
// 				  'code'     => '0',
// 				  'data'     => [],
// 			  ];
// 		  }

// 	  header('Content-Type: application/json');
// 	  echo json_encode($response);
// 	  exit;
// 	  } catch (\Exception $e) {
// 		  die($e->getMessage());
// 	  }
//   }

//   public function getwilayah()
//   {
// 	  try {
// 		  $request	= $this->request;
// 		  $param	= $request->getVar('param');
// 		  $id		= $request->getVar('id');
// 		  $user = new \App\Models\UserModel();
// 		  if($param == 'kabupaten'){
// 		  	$data = $user->getkabupaten($id);
// 		  }else if($param == 'kecamatan'){
// 			$data = $user->getkecamatan($id);
// 		  }
		  
// 		  if($data){
// 			  $response = [
// 				  'status'   => 'sukses',
// 				  'code'     => 200,
// 				  'data' 	 => $data
// 			  ];
// 		  }else{
// 			  $response = [
// 				  'status'   => 'gagal',
// 				  'code'     => '0',
// 				  'data'     => [],
// 			  ];
// 		  }

// 	  header('Content-Type: application/json');
// 	  echo json_encode($response);
// 	  exit;
// 	  } catch (\Exception $e) {
// 		  die($e->getMessage());
// 	  }
//   }

//   public function ubahpembayaran()
//   {
// 	try {
// 		$request		= $this->request;
// 		$param		= $request->getVar('param');
		
// 		$method			= $request->getMethod();
// 		$cicilan = new \App\Models\CicilanModel();

// 		if($method == 'post'){
// 			$data = [
// 				'kode_billing' => $request->getVar('kode_billing'),
// 				'ntpn' => $request->getVar('ntpn'),
// 				'ntbp' => $request->getVar('ntbp'),
// 				'setoran' => $request->getVar('setoran'),
// 				'kode_akun' => $request->getVar('kode_akun'),
// 				'keterangan' => $request->getVar('keterangan'),
// 				'angsuran_ke' => $request->getVar('angsuran_ke'),
// 				'status' => 1
// 			];
			
// 			$cicilan->ubahpembayaran($request->getVar('id_rumah'), $request->getVar('id'), $data);
// 			$this->logModel->insert([
// 				'tgl' => date('Y-m-d H:i:s'), 
// 				'username' => $this->session->get('username'), 
// 				'keterangan' => "Mengubah data pembayaran ".$request->getVar('hdno'),
// 			]);
// 		}
// 		$response = [
// 					'status'   => 'success',
// 					'code'     => '200',
// 				];

// 		header('Content-Type: application/json');
// 		echo json_encode($response);
// 		exit;
// 	} catch (\Exception $e) {
// 		die($e->getMessage());
// 	}
//   }

//   public function pembayaran()
//   {
// 	try {
// 		$request		= $this->request;
		
// 		$method			= $request->getMethod();
// 		$cicilan = new \App\Models\CicilanModel();

// 		if($method == 'post'){
// 			$data = [
// 				'id_rumah' => $request->getVar('id_rumah'),
// 				'kode_billing' => $request->getVar('kode_billing'),
// 				'ntpn' => $request->getVar('ntpn'),
// 				'ntbp' => $request->getVar('ntbp'),
// 				'setoran' => $request->getVar('setoran'),
// 				'kode_akun' => $request->getVar('kode_akun'),
// 				'keterangan' => $request->getVar('keterangan'),
// 				'angsuran_ke' => $request->getVar('angsuran_ke'),
// 				'tgl_bayar' => $this->now,
// 				'status' => $request->getVar('status')
// 			];
			
// 			$cicilan->pembayaran($data);
// 			$this->logModel->insert([
// 				'tgl' => date('Y-m-d H:i:s'), 
// 				'username' => $this->session->get('username'), 
// 				'keterangan' => "Menambahkan data pembayaran ".$request->getVar('hdno'),
// 			]);
// 		}
// 		$response = [
// 					'status'   => 'success',
// 					'code'     => '200',
// 				];

// 		header('Content-Type: application/json');
// 		echo json_encode($response);
// 		exit;
// 	} catch (\Exception $e) {
// 		die($e->getMessage());
// 	}
//   }

//   public function kodebilling()
//   {
// 	try {
// 		$request		= $this->request;
		
// 		$method			= $request->getMethod();
// 		$billing = new \App\Models\BillingModel();

// 		if($method == 'post'){
// 			$data = [
// 						'id_rumah' => $request->getVar('id_rumah'),
// 						'expired_date' => date('Y-m-d H:i:s', strtotime(date('Y-m-d H:i:s'). ' + '.$request->getVar('batas').' days')),
// 						'kode_kl' => '033',
// 						'kode_eselon_1' => '05',
// 						'kode_satker' => '452780',
// 						'jenis_pnbp' => 'U',
// 						'kode_mata_uang' => '1',
// 						'total_nominal_billing' => $request->getVar('total'),
// 						'nama_wajib_bayar' => $request->getVar('nama'),
// 						'created_at' => $this->now,
// 						'created_by' => $this->session->get('id')
// 					];
			
// 			$lastid = $billing->save_billing($request->getVar('id_rumah'), $data);
			
// 			foreach ($request->getVar('detail') as $key => $value) {
// 				//save billing
// 				$data_bil = [
// 					'id_billing' => $lastid,
// 					'nama_wajib_bayar' => $value['namabayar'],
// 					'kode_tarif_simponi' => $value['akunbayar'],
// 					'kode_pp_simponi' => 'YYYYYYY',
// 					'kode_akun' => $value['akunbayar'],
// 					'nominal_tarif_pnbp' => $value['tarifbayar'],
// 					'volume' => $value['volume'],
// 					'satuan_tarif' => '-',
// 					'total_tarif_per_record' => $value['totaltarifbayar'],
// 					'keterangan' => $value['keteranganbayar']
// 				];

// 				//insert ke database
// 				$billing->save_billing_detail($data_bil);
// 			}
// 			$this->logModel->insert([
// 				'tgl' => date('Y-m-d H:i:s'), 
// 				'username' => $this->session->get('username'), 
// 				'keterangan' => "Membuat billing SIMPONI",
// 			]);
// 		}
// 		$response = [
// 					'status'   => 'success',
// 					'code'     => '200',
// 				];

// 		header('Content-Type: application/json');
// 		echo json_encode($response);
// 		exit;
// 	} catch (\Exception $e) {
// 		die($e->getMessage());
// 	}
//   }

//   public function addslider()
//   {
// 	try {
// 		$request		= $this->request;
// 		$param		= $request->getVar('param');
		
// 		$method			= $request->getMethod();
// 		$image = new \App\Models\ImageModel();
// 		if($method == 'post'){
				
// 				if($request->getVar('id')){
// 					$data = [
// 						'title' 		=> $request->getVar('title'),	
// 						'status' 		=> 1,
// 						'update_date' 	=> $this->now,
// 						'update_by' 	=> $this->session->get('id'),
// 						'type' 			=> 'slider'
// 					];
					
// 					$image->updateImage($request->getVar('id'), $data);
// 					if(array_key_exists("images",$_FILES)){

// 						foreach ($_FILES as $key => $value) {
							
// 							$basepath = './uploads/slider/'.$request->getVar('id').'/';
// 							if(!is_dir($basepath)){
// 								mkdir($basepath, 0777, true);
// 							}
							
// 							$tmp_name = $value['tmp_name'][0];
// 							if($tmp_name){
// 								$files = glob("$basepath*"); // get all file names
// 								foreach($files as $file){ // iterate files
// 									if(is_file($file)) {
// 										unlink($file); // delete file
// 									}
// 								}
// 								$path = $value['name'][0];
// 								$ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
// 								$imgname = "slider-".$request->getVar('id')."-".$path;
// 								$terupload = move_uploaded_file($tmp_name, $basepath.$imgname);
// 								$image->updateImage($request->getVar('id'), ['path' => $basepath.$imgname]);
// 							}
// 						}

// 					};
					
// 				}else{
// 					$data = [
// 						'title' 		=> $request->getVar('title'),	
// 						'status' 		=> 1,
// 						'create_date' 	=> $this->now,
// 						'update_date' 	=> $this->now,
// 						'create_by' 	=> $this->session->get('id'),
// 						'update_by' 	=> $this->session->get('id'),
// 						'type' 			=> 'slider'
// 					];
// 					$image->insertImage($data);
// 					$lastid = $image->insertID();

// 					if(array_key_exists("images",$_FILES)){

// 						foreach ($_FILES as $key => $value) {
// 							$basepath = './uploads/slider/'.$lastid.'/';
// 							if(!is_dir($basepath)){
// 								mkdir($basepath, 0777, true);
// 							}
							
// 							$tmp_name = $value['tmp_name'][0];
// 							$path = $value['name'][0];
// 							$ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
// 							$imgname = "slider-".$lastid."-".$path;
// 							$terupload = move_uploaded_file($tmp_name, $basepath.$imgname);
// 							$image->updateImage($lastid, ['path' => $basepath.$imgname]);
// 						}

// 					};
// 				}
// 		}
// 		redirect('data_slider','refresh');
// 	} catch (\Exception $e) {
// 		die($e->getMessage());
// 	}
//   }

//   public function addmahasiswa()
//   {
// 	try {
// 		$request		= $this->request;
// 		$param		= $request->getVar('param');
		
// 		$method			= $request->getMethod();
// 		$mahasiswa = new \App\Models\MahasiswaModel();
// 		if($method == 'post'){
				
// 				if($request->getVar('id')){
// 					$data = [
// 						'nama' 				=> $request->getVar('nama'),
// 						'npm' 				=> $request->getVar('npm'),
// 						'semester' 			=> $request->getVar('semester'),
// 						'jurusan' 			=> $request->getVar('jurusan'),
// 						'status_mahasiswa' => ($request->getVar('status_mahasiswa') == 'on') ? 1 : 0,
// 						'status_perwalian' => ($request->getVar('status_perwalian') == 'on') ? 1 : 0,
// 						'update_date' 	=> $this->now,
// 						'update_by' 	=> $this->session->get('id')
// 					];
					
// 					$mahasiswa->update($request->getVar('id'), $data);

					
// 				}else{
// 					$data = [
// 						'nama' => $request->getVar('nama'),
// 						'npm' => $request->getVar('npm'),
// 						'semester' => $request->getVar('semester'),
// 						'jurusan' => $request->getVar('jurusan'),
// 						'status_mahasiswa' => ($request->getVar('status_mahasiswa') == 'on') ? 1 : 0,
// 						'status_perwalian' => ($request->getVar('status_perwalian') == 'on') ? 1 : 0,
// 						'create_date' 	=> $this->now,
// 						'update_date' 	=> $this->now,
// 						'create_by' 	=> $this->session->get('id'),
// 						'update_by' 	=> $this->session->get('id')
// 					];
					
// 					$mahasiswa->insert($data);
// 					$lastid = $mahasiswa->insertID();

// 				}
// 		}
// 		redirect('data_mahasiswa','refresh');
// 	} catch (\Exception $e) {
// 		die($e->getMessage());
// 	}
//   }

//   public function adddosen()
//   {
// 	try {
// 		$request		= $this->request;
// 		$param		= $request->getVar('param');
		
// 		$method			= $request->getMethod();
// 		$dosen = new \App\Models\DosenModel();
// 		if($method == 'post'){
				
// 				if($request->getVar('id')){
// 					$data = [
// 						'nama' 			=> $request->getVar('nama'),
// 						'mata_kuliah' 	=> $request->getVar('mata_kuliah'),
// 						'jadwal' 		=> $request->getVar('jadwal'),
// 						'kelas' 		=> $request->getVar('kelas'),
// 						'perkuliahan' 	=> ($request->getVar('perkuliahan') == 'on') ? 'online' : 'offline',
// 						'status' 		=> 1,
// 						'tugas' 		=> $request->getVar('tugas'),
// 						'update_by' 	=> $this->session->get('id'),
// 						'update_date' 	=> $this->now
// 					];
					
// 					$dosen->update($request->getVar('id'), $data);

					
// 				}else{
// 					$data = [
// 						'nama' 			=> $request->getVar('nama'),
// 						'mata_kuliah' 	=> $request->getVar('mata_kuliah'),
// 						'jadwal' 		=> $request->getVar('jadwal'),
// 						'kelas' 		=> $request->getVar('kelas'),
// 						'perkuliahan' 	=> ($request->getVar('perkuliahan') == 'on') ? 'online' : 'offline',
// 						'status' 		=> 1,
// 						'tugas' 		=> $request->getVar('tugas'),
// 						'create_by' 	=> $this->session->get('id'),
// 						'create_date' 	=> $this->now,
// 						'update_by' 	=> $this->session->get('id'),
// 						'update_date' 	=> $this->now
// 					];
					
					
// 					$dosen->insert($data);
// 					$lastid = $dosen->insertID();

// 				}
// 		}
// 		redirect('data_dosen','refresh');
// 	} catch (\Exception $e) {
// 		die($e->getMessage());
// 	}
//   }

//   public function addkegiatan()
//   {
// 	try {
// 		$request		= $this->request;
// 		$param		= $request->getVar('param');
		
// 		$method			= $request->getMethod();
// 		$kegiatan = new \App\Models\KegiatanModel();
// 		if($method == 'post'){
				
// 				if($request->getVar('id')){
// 					$data = [
// 						'kegiatan' => $request->getVar('kegiatan'),
// 						'tanggal_kegiatan' => $request->getVar('tanggal_kegiatan'),
// 						'keterangan' => $request->getVar('keterangan'),
// 						'update_date' => $this->now,
// 						'update_by' => $this->session->get('id'),
// 						'status' => 1

// 					];
					
// 					$kegiatan->update($request->getVar('id'), $data);
// 					if(array_key_exists("images",$_FILES)){

// 						foreach ($_FILES as $key => $value) {
							
// 							$basepath = './uploads/kegiatan/'.$request->getVar('id').'/';
// 							if(!is_dir($basepath)){
// 								mkdir($basepath, 0777, true);
// 							}
							
// 							$tmp_name = $value['tmp_name'][0];
// 							if($tmp_name){
// 								$files = glob("$basepath*"); // get all file names
// 								foreach($files as $file){ // iterate files
// 									if(is_file($file)) {
// 										unlink($file); // delete file
// 									}
// 								}
// 								$path = $value['name'][0];
// 								$ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
// 								$imgname = "kegiatan-".$request->getVar('id')."-".$path;
// 								$terupload = move_uploaded_file($tmp_name, $basepath.$imgname);
// 								$kegiatan->update($request->getVar('id'), ['path' => $basepath.$imgname]);
// 							}
// 						}

// 					};
					
// 				}else{

// 					$data = [
// 						'kegiatan' => $request->getVar('kegiatan'),
// 						'tanggal_kegiatan' => $request->getVar('tanggal_kegiatan'),
// 						'keterangan' => $request->getVar('keterangan'),
// 						'create_date' 	=> $this->now,
// 						'update_date' => $this->now,
// 						'create_by' 	=> $this->session->get('id'),
// 						'update_by' => $this->session->get('id'),
// 						'status' => 1
// 					];
// 					$kegiatan->insert($data);
// 					$lastid = $kegiatan->insertID();
					
// 					if(array_key_exists("images",$_FILES)){

// 						foreach ($_FILES as $key => $value) {
// 							$basepath = './uploads/kegiatan/'.$lastid.'/';
// 							if(!is_dir($basepath)){
// 								mkdir($basepath, 0777, true);
// 							}
							
// 							$tmp_name = $value['tmp_name'][0];
// 							$path = $value['name'][0];
// 							$ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
// 							$imgname = "kegiatan-".$lastid."-".$path;
// 							$terupload = move_uploaded_file($tmp_name, $basepath.$imgname);
// 							$kegiatan->update($lastid, ['path' => $basepath.$imgname]);
// 						}

// 					};
// 				}
// 		}
// 		redirect('data_kampus','refresh');
// 	} catch (\Exception $e) {
// 		die($e->getMessage());
// 	}
//   }

//   public function addberita()
//   {
// 	try {
// 		$request		= $this->request;
// 		$param		= $request->getVar('param');
		
// 		$method			= $request->getMethod();
// 		$berita = new \App\Models\BeritaModel();
// 		if($method == 'post'){
				
// 				if($request->getVar('id')){
// 					$data = [
// 						'title' => $request->getVar('title'),
// 						'redaksi' => $request->getVar('redaksi'),
// 						'tanggal' => $request->getVar('tanggal'),
// 						'update_date' => $this->now,
// 						'update_by' => $this->session->get('id'),
// 						'status' => 1

// 					];
					
// 					$berita->update($request->getVar('id'), $data);
// 					if(array_key_exists("images",$_FILES)){

// 						foreach ($_FILES as $key => $value) {
							
// 							$basepath = './uploads/berita/'.$request->getVar('id').'/';
// 							if(!is_dir($basepath)){
// 								mkdir($basepath, 0777, true);
// 							}
							
// 							$tmp_name = $value['tmp_name'][0];
// 							if($tmp_name){
// 								$files = glob("$basepath*"); // get all file names
// 								foreach($files as $file){ // iterate files
// 									if(is_file($file)) {
// 										unlink($file); // delete file
// 									}
// 								}
// 								$path = $value['name'][0];
// 								$ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
// 								$imgname = "berita-".$request->getVar('id')."-".$path;
// 								$terupload = move_uploaded_file($tmp_name, $basepath.$imgname);
// 								$berita->update($request->getVar('id'), ['path' => $basepath.$imgname]);
// 							}
// 						}

// 					};
					
// 				}else{

// 					$data = [
// 						'title' => $request->getVar('title'),
// 						'redaksi' => $request->getVar('redaksi'),
// 						'tanggal' => $request->getVar('tanggal'),
// 						'create_date' 	=> $this->now,
// 						'update_date' => $this->now,
// 						'create_by' 	=> $this->session->get('id'),
// 						'update_by' => $this->session->get('id'),
// 						'status' => 1
// 					];
// 					$berita->insert($data);
// 					$lastid = $berita->insertID();
					
// 					if(array_key_exists("images",$_FILES)){

// 						foreach ($_FILES as $key => $value) {
// 							$basepath = './uploads/berita/'.$lastid.'/';
// 							if(!is_dir($basepath)){
// 								mkdir($basepath, 0777, true);
// 							}
							
// 							$tmp_name = $value['tmp_name'][0];
// 							$path = $value['name'][0];
// 							$ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
// 							$imgname = "berita-".$lastid."-".$path;
// 							$terupload = move_uploaded_file($tmp_name, $basepath.$imgname);
// 							$berita->update($lastid, ['path' => $basepath.$imgname]);
// 						}

// 					};
// 				}
// 		}
// 		redirect('data_berita','refresh');
// 	} catch (\Exception $e) {
// 		die($e->getMessage());
// 	}
//   }

//   public function addbuku()
//   {
// 	try {
// 		$request		= $this->request;
// 		$param		= $request->getVar('param');
		
// 		$method			= $request->getMethod();
// 		$buku = new \App\Models\BukuModel();
// 		if($method == 'post'){
				
// 				if($request->getVar('id')){
// 					$data = [
// 						'title' => $request->getVar('title'),
// 						'keterangan' => $request->getVar('redaksi'),
// 						'ketersediaan' => $request->getVar('ketersediaan'),
// 						'update_date' => $this->now,
// 						'update_by' => $this->session->get('id'),
// 						'status' => 1

// 					];
					
// 					$buku->update($request->getVar('id'), $data);
// 					if(array_key_exists("images",$_FILES)){

// 						foreach ($_FILES as $key => $value) {
							
// 							$basepath = './uploads/buku/'.$request->getVar('id').'/';
// 							if(!is_dir($basepath)){
// 								mkdir($basepath, 0777, true);
// 							}
							
// 							$tmp_name = $value['tmp_name'][0];
// 							if($tmp_name){
// 								$files = glob("$basepath*"); // get all file names
// 								foreach($files as $file){ // iterate files
// 									if(is_file($file)) {
// 										unlink($file); // delete file
// 									}
// 								}
// 								$path = $value['name'][0];
// 								$ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
// 								$imgname = "buku-".$request->getVar('id')."-".$path;
// 								$terupload = move_uploaded_file($tmp_name, $basepath.$imgname);
// 								$buku->update($request->getVar('id'), ['path' => $basepath.$imgname]);
// 							}
// 						}

// 					};
					
// 				}else{

// 					$data = [
// 						'title' => $request->getVar('title'),
// 						'keterangan' => $request->getVar('keterangan'),
// 						'ketersediaan' => $request->getVar('ketersediaan'),
// 						'create_date' 	=> $this->now,
// 						'update_date' => $this->now,
// 						'create_by' 	=> $this->session->get('id'),
// 						'update_by' => $this->session->get('id'),
// 						'status' => 1
// 					];
// 					$buku->insert($data);
// 					$lastid = $buku->insertID();
					
// 					if(array_key_exists("images",$_FILES)){

// 						foreach ($_FILES as $key => $value) {
// 							$basepath = './uploads/buku/'.$lastid.'/';
// 							if(!is_dir($basepath)){
// 								mkdir($basepath, 0777, true);
// 							}
							
// 							$tmp_name = $value['tmp_name'][0];
// 							$path = $value['name'][0];
// 							$ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
// 							$imgname = "buku-".$lastid."-".$path;
// 							$terupload = move_uploaded_file($tmp_name, $basepath.$imgname);
// 							$buku->update($lastid, ['path' => $basepath.$imgname]);
// 						}

// 					};
// 				}
// 		}
// 		redirect('data_buku','refresh');
// 	} catch (\Exception $e) {
// 		die($e->getMessage());
// 	}
//   }

//   public function getdata()
//   {
// 	  try {
// 		  $request	= $this->request;
// 		  $table	= $request->getVar('table');
// 		  $id	= $request->getVar('id');
// 		  $user = new \App\Models\UserModel();
// 		  $data = $user->getData($table, $id);
		  
// 		  if($data){
// 			  $response = [
// 				  'status'   => 'sukses',
// 				  'code'     => 200,
// 				  'data' 	 => $data
// 			  ];
// 		  }else{
// 			  $response = [
// 				  'status'   => 'gagal',
// 				  'code'     => '0',
// 				  'data'     => 'tidak ada data',
// 			  ];
// 		  }

// 	  header('Content-Type: application/json');
// 	  echo json_encode($response);
// 	  exit;
// 	  } catch (\Exception $e) {
// 		  die($e->getMessage());
// 	  }
//   }

//   public function deletedata()
//   {
// 	try {
// 		$request		= $this->request;
// 		$method			= $request->getMethod();
// 		$user = new \App\Models\UserModel();

// 		$user->deleteData($request->getVar('id'), $request->getVar('table'));
// 		if (file_exists($request->getVar('path'))) {
// 			unlink($request->getVar('path'));
// 		}

// 		$response = [
// 			'status'   => 'success',
// 			'code'     => 200,
// 		];

// 		header('Content-Type: application/json');
// 	  	echo json_encode($response);
// 		exit;
// 	} catch (\Exception $e) {
// 		die($e->getMessage());
// 	}
//   }

// }
