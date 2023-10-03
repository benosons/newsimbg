<?php

namespace App\Models;

use CodeIgniter\Model;

class ProfileModel extends Model
{

	public function getDataUserProfile($select = "a.*", $user_id = '')
	{

		$builder = $this->db->table('tm_user_data a');
		$builder->select($select, FALSE);

		if ($user_id != null || trim($user_id) != '')  $builder->where('a.user_id', $user_id);
		$query 	= $builder->get();
		// echo $this->db->getLastQuery();die;
		return $query->getRow();
	}

	public function insertProfile($data)
	{
		$builder = $this->db->table('tm_user_data');
		$query = $builder->insert($data);
		return $query;
	}
}
