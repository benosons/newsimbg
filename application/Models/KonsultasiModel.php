<?php 
namespace App\Models;

use CodeIgniter\Model;

class KonsultasiModel extends Model{

    public function getDataKonsultasi($select = "a.*,c.*", $user_id = null, $id_permohonan = null, $length = null, $start = null, $search = null)
	{
        $builder = $this->db->table('tmdatapemilik a');
        $builder->select($select, FALSE);
		if ($user_id != null || trim($user_id) != '')  $builder->where('a.user_id', $user_id);
		if ($id_permohonan != null || trim($id_permohonan) != '')  $builder->where('a.id_permohonan', $id_permohonan);
		$builder->where("b.status != 26 ");
		$builder->where("b.post_date = DATE_FORMAT(now(),'%Y-%m-%d')");
		$builder->join('tmdatabangunan b', 'a.id = b.id', 'LEFT');
		$builder->join('tr_konsultasi c', 'b.id_jenis_permohonan = c.id', 'LEFT');
		$builder->join('status_sistem d', 'b.status = d.status_progress', 'LEFT');
		$builder->orderBy('a.id', 'desc');
		if($length){
			$builder->limit($length, $start);
		}
        $query   = $builder->get();
        // echo $this->db->getLastQuery();die;
		return $query->getResult();
	}

    public function getDataKonsultasiCount($user_id = null, $id_permohonan = null, $search = null)
	{
        $builder = $this->db->table('tmdatapemilik a');
        $builder->select("COUNT(a.id) AS `count`", FALSE);
		if ($user_id != null || trim($user_id) != '')  $builder->where('a.user_id', $user_id);
		if ($id_permohonan != null || trim($id_permohonan) != '')  $builder->where('a.id_permohonan', $id_permohonan);
		$builder->where("b.status != 26 ");
		$builder->where("a.post_date = DATE_FORMAT(now(),'%Y-%m-%d')");

		$builder->join('tmdatabangunan b', 'a.id = b.id', 'LEFT');
		$builder->join('tr_konsultasi c', 'b.id_jenis_permohonan = c.id', 'LEFT');
		$builder->join('status_sistem d', 'b.status = d.status_progress', 'LEFT');
		$builder->orderBy('a.id', 'asc');
        $query   = $builder->countAllResults();
        // echo $this->db->getLastQuery();die;
		return $query;
	}

	public function insertData($table = null, $data = null)
    {
        $res = $this->db->table($table)->insert($data);
        return  $res;
    }

	public function getDataUserProfil($select="a.*",$user_id= null)
	{
		$builder = $this->db->table('tm_user_data a');
		$builder->select($select,FALSE);
		if ($user_id != null || trim($user_id) != '')  $builder->where('a.user_id',$user_id);
		$query   = $builder->get();
		 // echo $this->db->getLastQuery();die;
		return $query->getRow();
	}

	public function getPemilik($select = "*", $id)
	{
		$builder =$this->db->table('tmdatapemilik a');
		$builder->select($select, FALSE);
		if ($id != null || trim($id) != '')
		$builder->where('a.id', $id);
		$builder->join('tr_kecamatan b', 'a.id_kecamatan = b.id_kecamatan', 'LEFT');
		$builder->join('tr_kabkot c', 'a.id_kabkota = c.id_kabkot', 'LEFT');
		$builder->join('tr_provinsi d', 'a.id_provinsi = d.id_provinsi', 'LEFT');
		$query 	= $builder->get();
		//  echo $this->db->getLastQuery();die;
		return $query->getRow();
	}

	public function updateData($id, $data, $table, $field)
    {
      $builder = $this->db->table($table);
      $query   = $builder->where($field, $id);
      $query->update($data);
      // echo $this->db->getLastQuery();

      return true;
    }

	public function getTanah($select = "a.*,b.Jns_dok", $id = '')
	{
		$builder = $this->db->table('tmdatatanah a');
		$builder->select($select, FALSE);
		if ($id != null || trim($id) != '')  $builder->where('a.id', $id);
		$builder->join('tr_doktanah b','a.id_dokumen = b.id','LEFT');
		$query 	= $builder->get();
		// echo $this->db->getLastQuery();die;
		return $query->getResult();
	}

	public function getBangunanData($select = "*", $id)
	{
		$builder = $this->db->table('tmdatabangunan a');
		$builder->select($select, FALSE);
		if ($id != null || trim($id) != '')
			$$builder->where('a.id', $id);
		$query 	= $builder->get();
		return $query->getRow();
	}

	public function getDataDokumen($select="a.*",$id='',$status='')
	{
		$builder = $this->db->table('tmpersyaratankonsultasi a');
		$builder->select($select,FALSE);
		if ($id != null || trim($id) != '')  $builder->where('a.id',$id);
		if ($status != null || trim($status) != '')  $builder->where('a.status',$status);
		$query 	= $builder->get();
		return $query->getResult();
	}

	public function getDataTanah($select="a.*",$id_jenis_permohonan='')
	{
		$builder = $this->db->table('tr_konsultasi_syarat a');
		$builder->select($select,FALSE);
		if ($id_jenis_permohonan != null || trim($id_jenis_permohonan) != '')  $builder->where('a.id',$id_jenis_permohonan);
		$builder->where('a.id_detail_jenis_persyaratan','1');
		$builder->join('tr_pbg_syarat_detail b','a.id_persyaratan = b.id_persyaratan','LEFT');
		$builder->join('tr_dokumen_syarat c','b.id_syarat = c.id','LEFT');
		$query 	= $builder->get();
		return $query->getResult();
	}

	public function getDataJnsKonsultasi($select="a.*",$id='')
	{
		$builder = $this->db->table('tmdatabangunan a');
		$builder->select($select,FALSE);
		if ($id != null || trim($id) != '')  $builder->where('a.id',$id);
		$query 	= $builder->get();
		// echo $this->db->getLastQuery();
		return $query->getRow();
	}

	public function getBangunan($select = "*", $id)
	{
		$builder = $this->db->table('tmdatabangunan a');
		$builder->select($select, FALSE);
		if ($id != null || trim($id) != '')
		$builder->where('a.id', $id);
		$builder->join('tr_kelurahan h', 'a.id_kel_bgn = h.id_kelurahan', 'LEFT');
		$builder->join('tr_kecamatan b', 'a.id_kec_bgn = b.id_kecamatan', 'LEFT');
		$builder->join('tr_kabkot c', 'a.id_kabkot_bgn = c.id_kabkot', 'LEFT');
		$builder->join('tr_provinsi d', 'a.id_prov_bgn = d.id_provinsi', 'LEFT');
		$builder->join('tr_konsultasi e', 'a.id_jenis_permohonan = e.id', 'LEFT');
		$builder->join('tr_prototype f', 'a.id_prototype = f.idp', 'LEFT');
		$builder->join('tr_prasarana g', 'a.id_prasarana_bg = g.idp', 'LEFT');
		$builder->join('tr_konsultasi i', 'a.id_jenis_permohonan = i.id', 'LEFT');
		$query 	= $builder->get();
		return $query->getRow();
	}

	public function getDataUmumBertahap($select = "a.*", $id_jenis_permohonan = '',  $tahap_pbg='')
	{
		$builder = $this->db->table('tr_konsultasi_syarat a');
		$builder->select($select, FALSE);
		if ($id_jenis_permohonan != null || trim($id_jenis_permohonan) != '')  $builder->where('a.id', $id_jenis_permohonan);
		if ($tahap_pbg != null || trim($tahap_pbg) != '')  $builder->where('c.id_tahap', $tahap_pbg);
		$builder->where('a.id_jenis_persyaratan', '1');
		$builder->join('tr_pbg_syarat_detail b', 'a.id_persyaratan = b.id_persyaratan', 'LEFT');
		$builder->join('tr_dokumen_syarat c', 'b.id_syarat = c.id', 'LEFT');
		$query 	= $builder->get();
		return $query->getResult();
	}

	public function getDataUmum($select="a.*",$id_jenis_permohonan='')
	{
		$builder = $this->db->table('tr_konsultasi_syarat a');
		$builder->select($select,FALSE);
		if ($id_jenis_permohonan != null || trim($id_jenis_permohonan) != '')  $builder->where('a.id',$id_jenis_permohonan);
		$builder->where('a.id_jenis_persyaratan','1');
		$builder->join('tr_pbg_syarat_detail b','a.id_persyaratan = b.id_persyaratan','LEFT');
		$builder->join('tr_dokumen_syarat c','b.id_syarat = c.id','LEFT');
		$query 	= $builder->get();
		return $query->getResult();
	}

	public function getDataArsitektur($select="a.*",$id_jenis_permohonan='')
	{
		$builder = $this->db->table('tr_konsultasi_syarat a');
		$builder->select($select,FALSE);
		if ($id_jenis_permohonan != null || trim($id_jenis_permohonan) != '')  $builder->where('a.id',$id_jenis_permohonan);
		$builder->where('a.id_detail_jenis_persyaratan','2');
		$builder->join('tr_pbg_syarat_detail b','a.id_persyaratan = b.id_persyaratan','LEFT');
		$builder->join('tr_dokumen_syarat c','b.id_syarat = c.id','LEFT');
		$query 	= $builder->get();
		return $query->getResult();
	}

	public function getDataStruktur($select="a.*",$id_jenis_permohonan='')
	{
		$builder = $this->db->table('tr_konsultasi_syarat a');
		$builder->select($select,FALSE);
		if ($id_jenis_permohonan != null || trim($id_jenis_permohonan) != '')  $builder->where('a.id',$id_jenis_permohonan);
		$builder->where('a.id_detail_jenis_persyaratan','3');
		$builder->join('tr_pbg_syarat_detail b','a.id_persyaratan = b.id_persyaratan','LEFT');
		$builder->join('tr_dokumen_syarat c','b.id_syarat = c.id','LEFT');
		$query 	= $builder->get();
		return $query->getResult();
	}

	public function getDataMEP($select="a.*",$id_jenis_permohonan='')
	{
		$builder = $this->db->table('tr_konsultasi_syarat a');
		$builder->select($select,FALSE);
		if ($id_jenis_permohonan != null || trim($id_jenis_permohonan) != '')  $builder->where('a.id',$id_jenis_permohonan);
		$builder->where('a.id_detail_jenis_persyaratan','4');
		$builder->join('tr_pbg_syarat_detail b','a.id_persyaratan = b.id_persyaratan','LEFT');
		$builder->join('tr_dokumen_syarat c','b.id_syarat = c.id','LEFT');
		$query 	= $builder->get();
		return $query->getResult();
	}

	function RemoveTeknisTanah($id_detail)
	{
		$res = $this->db->table('tmpersyaratankonsultasi')->where('id_detail', $id_detail)->delete();
        return  $res;
	}

	public function get_id_kabkot($id)
	{
		$sql = "SELECT id, no_konsultasi, id_kabkot_bgn, id_kec_bgn , id_izin
		FROM tmdatabangunan where id = ".$id;
		$hasil = $this->db->query($sql)->getRowArray();
		return $hasil;
	}

	public function get_nomor_registrasi($id_kec_bg, $tgl_skrg)
	{
		$sql = "SELECT max(no_konsultasi) as no_urut 
			FROM tmdatabangunan WHERE SUBSTR(no_konsultasi,5,6) = '$id_kec_bg'
			and SUBSTR(no_konsultasi,12,8) = '$tgl_skrg'";
		$hasil = $this->db->query($sql)->getRowArray();
		return $hasil;
	}
}
