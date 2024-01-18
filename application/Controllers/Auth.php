<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Controller\BaseController;

class Auth extends \CodeIgniter\Controller
{

	public function auth()
	{
		try {

			$session = session();
			$model = new UserModel();
			$userModel = new \App\Models\UserModel();

			$email = $this->request->getVar('username');
			$password = $this->request->getVar('password');
			$field = 'username';
			if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
				$field = 'email';
			}

			$dataemail = $model->getWhereis([$field => $email]);
			if (!$dataemail) {
				$session->setFlashdata('msg', 'User Belum Terdaftar');
				return redirect('login');
			}

			$dataactive = $model->getWhere(['m_user.' . $field => $email, 'm_user.status' => 0])->getRow();

			if ($dataactive) {
				$session->setFlashdata('msg', 'User Tidak Aktif');
				return redirect('login');
			}

			$datastatus = $model->getWhere(['m_user.' . $field => $email, 'm_user.status' => 1])->getRow();

			if (!$datastatus) {
				$session->setFlashdata('msg', 'User Belum di Verifikasi');
				return redirect('login');
			}

			if ($dataemail && $datastatus) {
				$pass = $dataemail->password;
				// $hash =  substr_replace($pass, "$2y$10", 0, 1);
				// $verify_pass = password_verify($password, $pass);
				$verify_pass = md5($password) == $pass ? 1 : 0;
				if ($verify_pass) {
					$ses_data = [
						'username' 		=> $dataemail->username,
						'id' 			=> $dataemail->id,
						'role' 			=> $dataemail->id_role,
						'rolename' 		=> $dataemail->role,
						'email' 		=> $dataemail->email,
						'logged_in'     => TRUE,

					];

					$session->set($ses_data);

					$userModel->updateIsLogin($dataemail->id, ['islogin' => 1]);
					return redirect('dashboard');
				} else {
					$session->setFlashdata('msg', 'Username atau password salah');
					return redirect('login');
				}
			} else {
				$session->setFlashdata('msg', 'User belum terdaftar');
				return redirect('login');
			}
		} catch (\Exception $e) {
			die($e->getMessage());
		}
	}

	public function reg()
	{
		$userModel = new \App\Models\UserModel();

		$username = $this->request->getVar('username');
		$email = $this->request->getVar('email');
		$password = $this->request->getVar('password');
		$role = $this->request->getVar('regas');
		$nama = $this->request->getVar('nama');

		$data = array(
			'username' => $username,
			'password' => md5($password),
			'id_role' => $role,
			'name' => $nama,
			'email' => $email,
			'status' => 1,
			'create_date' => date('Y-m-d H:i:s'),
			'create_by' => 1
		);

		$insert = $userModel->insertUser($data);

		if ($insert) {
			$response = array(
				'code' => 200,
			);
		} else {
			$response = array(
				'code' => 0,
			);
		}

		echo json_encode($response);
	}

	public function logout()
	{
		$session = session();
		$userModel = new \App\Models\UserModel();
		$userModel->updateIsLogin($session->get('user_id'), ['islogin' => null]);
		$session->destroy();
		return redirect('login');
	}
}
