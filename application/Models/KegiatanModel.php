<?php 
namespace App\Models;

use CodeIgniter\Model;

class KegiatanModel extends Model{
    protected $table = 'data_kegiatan';
    protected $primaryKey = 'id';
    protected $allowedFields = [ 'kegiatan', 'tanggal_kegiatan', 'keterangan', 'create_date', 'create_by', 'update_date', 'update_by', 'status', 'path' ];

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
    //   $builder->where('status <> 0');
      $query   = $builder->get();
      // echo $this->db->getLastQuery();die;
      return $query->getResult();
    }

    public function getjbg($id = null)
    {
      $builder = $this->db->table('tm_jenis_bg');
      $builder->select("*");
    //   $builder->where('status <> 0');
      $query   = $builder->get();
      // echo $this->db->getLastQuery();die;
      return $query->getResult();
    }

    public function getPermohonan($param = null)
    {

        $builder = $this->db->table('tm_slf_permohonan');
        $builder->select("tm_slf_permohonan.id_permohonan_slf, tm_jenis_permohonan.nm_jns_permohonan, tm_slf_permohonan.nama_pemilik, tm_slf_permohonan.no_registrasi_slf, CONCAT(tm_slf_permohonan.alamat_bg, ', ', tr_kecamatan.nama_kecamatan, ', ', tr_kabkot.nama_kabkota) AS address, tm_slf_permohonan.status");
        $builder->join('tm_jenis_permohonan ', 'tm_jenis_permohonan.id_jns_permohonan = tm_slf_permohonan.id_jenis_permohonan', 'INNER');
        $builder->join('tr_kecamatan', 'tr_kecamatan.id_kecamatan = tm_slf_permohonan.id_kecamatan_bg', 'INNER');
        $builder->join('tr_kabkot', 'tr_kabkot.id_kabkot = tm_slf_permohonan.id_kabkot_bg', 'INNER');
        $builder->where('tm_slf_permohonan.status is not Null');
        $query   = $builder->get();
      
      // echo $this->db->getLastQuery();
      return $query->getResult();
    }

}
