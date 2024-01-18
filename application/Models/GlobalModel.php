<?php

namespace App\Models;

use CodeIgniter\Model;

class GlobalModel extends Model
{

  public function getprov($id = null)
  {
    $builder = $this->db->table('tr_provinsi');
    $builder->select("*");
    $query   = $builder->get();
    //   echo $this->db->getLastQuery();die;
    return $query->getResult();
  }

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

  public function listDataProvinsi($select = "a.*")
  {
    $builder = $this->db->table('tr_provinsi a');
    $builder->select($select, FALSE);
    $query   = $builder->get();
    return $query->getResult();
  }

  public function listDataKabKota($select = "a.*", $id_kabkot = '', $id_provinsi = '')
  {
    $builder = $this->db->table('tr_kabkot a');
    $builder->select($select, FALSE);
    if ($id_kabkot != null || trim($id_kabkot) != '')  $builder->where('a.id_kabkot', $id_kabkot);
    if ($id_provinsi != null || trim($id_provinsi) != '')  $builder->where('a.id_provinsi', $id_provinsi);
    $builder->orderBy('a.id_kabkot', 'asc');
    $query   = $builder->get();
    return $query->getResult();
  }

  public function listDataKecamatan($select = "a.*", $id_kecamatan = '', $id_kabkot = '')
  {
    $builder = $this->db->table('tr_kecamatan a');
    $builder->select($select, FALSE);
    if ($id_kecamatan != null || trim($id_kecamatan) != '')  $builder->where('a.id_kecamatan', $id_kecamatan);
    if ($id_kabkot != null || trim($id_kabkot) != '')  $builder->where('a.id_kabkot', $id_kabkot);
    $builder->join('tr_kabkot b', 'a.id_kabkot = b.id_kabkot', 'LEFT');
    $builder->join('tr_provinsi c', 'b.id_provinsi = c.id_provinsi', 'LEFT');
    $builder->orderBy('a.id_kecamatan', 'asc');
    $query   = $builder->get();
    return $query->getResult();
  }

  public function setData($table, $data, $key = '', $value = '')
  {
    $builder = $this->db->table($table);
    if ($value != '') {
      $builder->where($key, $value);
      $update = $builder->update($data);
      return $update;
    }
    // else {
    //   $post = $this->session->userdata('loc_email') ? $this->session->userdata('loc_email') : 'System Apps';
    //   $this->db->set('post_by', "'$post'", FALSE);
    //   $this->db->set('post_date', 'NOW()', FALSE);
    //   $this->db->insert($table, $data);
    //   return $this->db->insert_id();
    // }
  }

  public function setDatakol($table, $dataKolektif, $key = '', $value = '')
  {
    $builder = $this->db->table($table);
    if ($value != '') {
      $builder->where($key, $value);
      $update = $builder->update($dataKolektif);
      return $update;
    } else {
      $insert = $builder->insert($dataKolektif);
      return $insert;
    }
  }
}
