<?php

namespace App\Models;

use CodeIgniter\Model;

class KegiatanModel extends Model
{
  protected $table = 'data_kegiatan';
  protected $primaryKey = 'id';
  protected $allowedFields = ['kegiatan', 'tanggal_kegiatan', 'keterangan', 'create_date', 'create_by', 'update_date', 'update_by', 'status', 'path'];

  public function getjenis($id = null)
  {
    $builder = $this->db->table('tm_jenis_permohonan');
    $builder->select("*");
    //   $builder->where('status <> 0');
    $query   = $builder->get();
    // echo $this->db->getLastQuery();die;
    return $query->getResult();
  }

  public function getfungsi($id = null)
  {
    $builder = $this->db->table('tr_fungsi_bg');
    $builder->select("*");
    // $builder->where('status <> 0');
    $query   = $builder->get();
    // echo $this->db->getLastQuery();die;
    return $query->getResult();
  }

  public function getjbg($id)
  {
    $builder = $this->db->table('tm_jenis_bg');
    $builder->select("*");
    $builder->where('id_fungsi_bg', $id);
    $query   = $builder->get();
    return $query->getResult();
  }

  public function getPermohonan($param = null)
  {

    $builder = $this->db->table('data_permohonan');
    $builder->select("data_permohonan.id, tm_jenis_permohonan.nm_jns_permohonan, data_permohonan.nama_pemilik, data_permohonan.no_registrasi, CONCAT(data_permohonan.alamat_bg, ', ', tr_kecamatan.nama_kecamatan, ', ', tr_kabkot.nama_kabkota) AS address, data_permohonan.status, tr_fungsi_bg.fungsi_bg, data_permohonan.in_date, status_sistem.status_pemohon, status_sistem.status_dinas");
    $builder->join('tm_jenis_permohonan ', 'tm_jenis_permohonan.id_jns_permohonan = data_permohonan.id_jenis_permohonan', 'INNER');
    $builder->join('tr_fungsi_bg ', 'tr_fungsi_bg.id_fungsi_bg = data_permohonan.id_fungsi_bg', 'INNER');
    $builder->join('tr_kecamatan', 'tr_kecamatan.id_kecamatan = data_permohonan.id_kec_bg', 'INNER');
    $builder->join('tr_kabkot', 'tr_kabkot.id_kabkot = data_permohonan.id_kabkot_bg', 'INNER');
    $builder->join('status_sistem', 'status_sistem.status_progress = data_permohonan.status', 'INNER');
    $builder->where('data_permohonan.status is not Null');
    if ($param != NULL) {
      $builder->where($param);
    }
    $query   = $builder->get();

    // echo $this->db->getLastQuery();
    return $query->getResult();
  }

  public function getPermohonanfull($param = null)
  {

    $builder = $this->db->table('data_permohonan');
    $builder->select("data_permohonan.*, tm_jenis_permohonan.nm_jns_permohonan, CONCAT(data_permohonan.alamat_bg, ', ', tr_kecamatan.nama_kecamatan, ', ', tr_kabkot.nama_kabkota) AS address, tr_fungsi_bg.fungsi_bg, status_sistem.status_pemohon, status_sistem.status_dinas");
    $builder->join('tm_jenis_permohonan ', 'tm_jenis_permohonan.id_jns_permohonan = data_permohonan.id_jenis_permohonan', 'INNER');
    $builder->join('tr_fungsi_bg ', 'tr_fungsi_bg.id_fungsi_bg = data_permohonan.id_fungsi_bg', 'INNER');
    $builder->join('tr_kecamatan', 'tr_kecamatan.id_kecamatan = data_permohonan.id_kec_bg', 'INNER');
    $builder->join('tr_kabkot', 'tr_kabkot.id_kabkot = data_permohonan.id_kabkot_bg', 'INNER');
    $builder->join('status_sistem', 'status_sistem.status_progress = data_permohonan.status', 'INNER');
    $builder->where('data_permohonan.status is not Null');
    if ($param != NULL) {
      $builder->where($param);
    }
    $query   = $builder->get();

    // echo $this->db->getLastQuery();
    return $query->getResult();
  }
  public function getprov($id = null)
  {
    $builder = $this->db->table('tm_prov');
    $builder->select("*");
    $query   = $builder->get();
    return $query->getResult();
  }

  public function getkabkot($id)
  {
    $builder = $this->db->table('tr_kabkot');
    $builder->select("*");
    $builder->where('id_provinsi', $id);
    $query   = $builder->get();
    return $query->getResult();
  }

  public function getkecamatan($id)
  {
    $builder = $this->db->table('tr_kecamatan');
    $builder->select("*");
    $builder->where('id_kabkot', $id);
    $query   = $builder->get();
    return $query->getResult();
  }

  public function getkelurahan($id)
  {
    $builder = $this->db->table('tr_kelurahan');
    $builder->select("*");
    $builder->where('id_kecamatan', $id);
    $query   = $builder->get();
    return $query->getResult();
  }

  public function getcount($id = null)
  {
    $this->day = date('Y-m-d');
    $builder = $this->db->table('data_permohonan');
    $builder->select("count(*)");
    $builder->where('in_date', $this->day);
    $query   = $builder->get();
    return $query->getResult();
  }

  public function insertPermohonan($data = null)
  {
    $res = $this->db->table('data_permohonan')->insert($data);

    return  $res;
  }

  public function updatePermohonan($data, $where)
  {
    $builder = $this->db->table('data_permohonan');
    $builder->where($where);
    $update = $builder->update($data);
    return $update;
  }

  // Verifikasi Dokumen

  public function insertVerifikasiDokumen($data = null)
  {
    $builder = $this->db->table('verifikasi_dokumen');
    $query = $builder->insert($data);
    return $query;
  }

  // List Data ASN
  public function getListDataAsn($where = null)
  {
    $builder = $this->db->table('tm_personal');
    if ($where != NULL) {
      $builder->where($where);
    }
    $query = $builder->get();
    return $query->getResult();
  }
}
