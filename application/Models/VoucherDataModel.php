<?php 
namespace App\Models;

use CodeIgniter\Model;

class VoucherDataModel extends Model{
    protected $table = 'master_voucher';
    protected $primaryKey = 'id_voucher';
    protected $useAutoIncrement = true;
    protected $allowedFields = ['kd_voucher', 'nm_voucher', 'min_pembelian', 'jml_potongan', 'stock', 'expired_by', 'jns_potongan', 'status'];

    public function getWhereis($where = null)
    {

      $builder = $this->db->table('master_voucher');
      $builder->select("master_voucher.*");
      $query   = $builder->getWhere($where);
      
      return  $query->getRow();
    }

    public function getWhere($where = null, $param = null)
    {
      
      if($param){
        $builder = $this->db->table('m_user_simponi');
        $builder->select("m_user_simponi.*, m_provinsi.id as id_provinsi, m_provinsi.provinsi");
        // $builder->join('m_provinsi', 'm_provinsi.id = m_user_simponi.id_provinsi', 'INNER');
      }else{
        $builder = $this->db->table('master_voucher');
        $builder->select("master_voucher.*");
      }
      $query   = $builder->getWhere($where);
     
      return  $query;
    }

    // public function getUsers($param = null)
    // {

    //     $builder = $this->db->table('m_user');
    //     $builder->select("m_user.*, m_role.role");
    //     $builder->join('m_role', 'm_role.id = m_user.id_role', 'INNER');
    //     $query   = $builder->get();
      
    //   // echo $this->db->getLastQuery();
    //   return $query->getResult();
    // }

    public function getVoucherData($param = null)
    {

        $builder = $this->db->table('master_voucher');
        $builder->select("master_voucher.*");
        $query   = $builder->get();
      
      // echo $this->db->getLastQuery();
      return $query->getResult();
    }

    // public function getprovinsi($id = null)
    // {
    //   $builder = $this->db->table('m_provinsi');
    //   $builder->select("*");
    //   $builder->orderBy('provinsi', 'ASC');
    //   $builder->where('status <> 0');
    //   $query   = $builder->get();
    //   // echo $this->db->getLastQuery();die;
    //   return $query->getResult();
    // }

    // public function getkabupaten($id = null)
    // {
    //   $builder = $this->db->table('m_kabupaten');
    //   $builder->select("*");
    //   $builder->orderBy('kabupaten', 'ASC');
    //   $builder->where('status <> 0');
    //   $builder->where("id_provinsi = $id");
    //   $query   = $builder->get();
    //   // echo $this->db->getLastQuery();die;
    //   return $query->getResult();
    // }

    // public function getkecamatan($id = null)
    // {
    //   $builder = $this->db->table('m_kecamatan');
    //   $builder->select("*");
    //   $builder->orderBy('kecamatan', 'ASC');
    //   $builder->where('status <> 0');
    //   $builder->where("id_kabupaten = $id");
    //   $query   = $builder->get();
    //   // echo $this->db->getLastQuery();die;
    //   return $query->getResult();
    // }

    // public function getlembaga($id = null)
    // {
    //   $builder = $this->db->table('m_lembaga');
    //   $builder->select("*");
    //   $builder->where('status <> 0');
    //   $query   = $builder->get();
    //   // echo $this->db->getLastQuery();die;
    //   return $query->getResult();
    // }

    // public function getrole($id = null)
    // {
    //   $builder = $this->db->table('m_role');
    //   $builder->select("*");
    //   $builder->where('status <> 0');
    //   $query   = $builder->get();
    //   // echo $this->db->getLastQuery();die;
    //   return $query->getResult();
    // }


    // public function updateIsLogin($id, $data)
    // {
    //   $builder = $this->db->table('m_user');
    //   $query   = $builder->where('id', $id);
    //   $query->update($data);
    //   // echo $this->db->getLastQuery();

    //   return true;
    // }

    public function insertVoucherData($data = null)
    {
        $res = $this->db->table('master_voucher')->insert($data);
        return  $res;
    }

    public function updateVoucherData($id = null, $data = null)
    {
      
        $res = $this->db->table('master_voucher')->where('id_voucher', $id)->update($data);
        //  echo $this->db->getLastQuery();die;
        return  $res;
    }

    public function deleteVoucher($id = null)
    {
        $res = $this->db->table('master_voucher')->where('id_voucher', $id)->delete();
        return  $res;
    }

    public function getData($table = null, $id = null)
    {

        $builder = $this->db->table("data_$table");
        $builder->select("*");
        if($id){
          $query  = $builder->getWhere(['id' => $id]);
          return $query->getRow();
        }else{
          $query   = $builder->get();
          return $query->getResult();
        }
      
    }

    public function deleteData($id = null, $table = null)
    {
        $res = $this->db->table("data_$table")->where('id', $id)->delete();
        return  $res;
    }

}
